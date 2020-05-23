import 'isomorphic-fetch';

import { TextlintRuleModule } from '@textlint/types';
import fastXmlParser from 'fast-xml-parser';
const fs = require('fs');
import os from 'os';

const dictionaryUrl = 'http://monoroch.net/kinshi/housouKinshiYougo.xml';
const referenceUrl = 'http://monoroch.net/kinshi/';
const dictionaryPath = `${os.tmpdir()}/housouKinshiYougo.xml`;
const maxAge = 604800;

interface Dictionary {
  housouKinshiYougoList?: {
    dirtyWord?: {
      notes?: string;
      replaceWordList?: {
        word?: string | string[];
      };
      word?: string;
    }[];
  };
}

const fetchDictionary = async () => {
  const response = await fetch(dictionaryUrl);

  if (response.status >= 400) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.text();
}

const readDictionaryFromFs = () => {
  try {
    const stats = fs.statSync(dictionaryPath);

    if (new Date().getTime() - stats.mtime.getTime() < maxAge * 1000) {
      return fs.readFileSync(dictionaryPath).toString();
    }
  } catch { }
}

const getDictionary = async () => {
  const text = readDictionaryFromFs() || await fetchDictionary();

  fs.writeFileSync(dictionaryPath, text);

  const dictionary: Dictionary = fastXmlParser.parse(text);

  return dictionary;
}

const report: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, report, getSource } = context;

  return {
    async [Syntax.Str](node) {
      const text = getSource(node);

      const { housouKinshiYougoList } = await getDictionary();

      housouKinshiYougoList?.dirtyWord?.forEach(({ notes, replaceWordList, word = '' }) => {
        const index = text.indexOf(word);

        if (index === -1) {
          return;
        }

        const replaceWords = typeof replaceWordList?.word === 'string'
          ? replaceWordList.word : replaceWordList?.word?.join(', ');

        const ruleError = new RuleError(
          [
            `放送禁止用語「${word}」が含まれています。`,
            ...replaceWords && [`言い換え語: ${replaceWords}`] || [],
            ...notes && [`備考: ${notes}`] || [],
            `参照: ${referenceUrl}`
          ].join('　'),
          { index }
        );

        report(node, ruleError);
      });
    }
  }
};

export default report;
