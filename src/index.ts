import 'isomorphic-fetch';

import { TextlintRuleModule, TextlintRuleReporter } from '@textlint/types';
import fastXmlParser from 'fast-xml-parser';
const fs = require('fs');
import os from 'os';

const dictionaryUrl = 'http://monoroch.net/kinshi/housouKinshiYougo.xml';
const referenceUrl = 'http://monoroch.net/kinshi/';
const dictionaryPath = `${os.tmpdir()}/housouKinshiYougo.xml`;
const maxAge = 604800;

interface Word {
  ['#text']?: string;
  ['@_reading']?: string;
}

interface Dictionary {
  housouKinshiYougoList?: {
    dirtyWord?: {
      notes?: string;
      replaceWordList?: {
        word?: Word | Word[];
      };
      word?: Word;
    }[];
  };
}

const fetchAndCacheDictionary = async () => {
  try {
    const response = await fetch(dictionaryUrl);

    if (response.status >= 400) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    const text = await response.text();

    fs.writeFileSync(dictionaryPath, text);

    return text;
  } catch (e) {
    console.error(e);

    return;
  }
}

const readDictionaryFromCache = ({ ignoreMaxAge = false }: { ignoreMaxAge?: boolean }) => {
  try {
    const stats = fs.statSync(dictionaryPath);

    if (ignoreMaxAge || new Date().getTime() - stats.mtime.getTime() < maxAge * 1000) {
      return fs.readFileSync(dictionaryPath).toString();
    }
  } catch { }
}

const getDictionary = async () => {
  const text = readDictionaryFromCache({})
    || await fetchAndCacheDictionary()
    || readDictionaryFromCache({ ignoreMaxAge: true });

  if (!text) {
    throw new Error('辞書データを取得できませんでした。');
  }

  const dictionary: Dictionary = fastXmlParser.parse(text, { ignoreAttributes: false });

  return dictionary;
}

const reporter: TextlintRuleReporter = (context) => {
  const { fixer, getSource, report, RuleError, Syntax } = context;

  return {
    async [Syntax.Str](node) {
      const text = getSource(node);

      const { housouKinshiYougoList } = await getDictionary();

      housouKinshiYougoList?.dirtyWord?.forEach(({ notes, replaceWordList, word }) => {
        if (!word) {
          return;
        }

        const replaceWordArray = replaceWordList?.word instanceof Array
          ? replaceWordList.word : replaceWordList?.word && [replaceWordList.word];

        [word["#text"], word["@_reading"]].forEach((dirtyWord) => {
          if (!dirtyWord) {
            return;
          }

          const index = text.indexOf(dirtyWord);

          if (index === -1) {
            return;
          }

          const ruleError = new RuleError(
            [
              `放送禁止用語「${dirtyWord}」が含まれています。`,
              ...replaceWordArray && [`言い換え語: ${replaceWordArray.map((word) => word["#text"]).join(', ')}`] || [],
              ...notes && [`備考: ${notes}`] || [],
              `参照: ${referenceUrl}`
            ].join('　'),
            {
              index,
              fix: replaceWordArray?.[0]["#text"] && fixer.replaceTextRange(
                [index, index + dirtyWord.length],
                replaceWordArray[0]["#text"]
              ) || undefined
            }
          );

          report(node, ruleError);
        });
      });
    }
  }
};

const module: TextlintRuleModule = {
  fixer: reporter,
  linter: reporter
};

export default module;
