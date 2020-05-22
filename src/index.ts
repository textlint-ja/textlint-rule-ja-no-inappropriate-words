import { polyfill } from 'es6-promise';
polyfill();
import 'isomorphic-fetch';

import { TextlintRuleModule } from '@textlint/types';
import xml2js from 'xml2js';

const dictionaryUrl = 'http://monoroch.net/kinshi/housouKinshiYougo.xml';
const referenceUrl = 'http://monoroch.net/kinshi/';

interface Dictionary {
  housouKinshiYougoList?: {
    dirtyWord?: {
      notes?: string[];
      replaceWordList?: {
        word?: {
          _?: string;
        }[];
      }[];
      word?: {
        _?: string;
      }[];
    }[];
  };
}

let cachedDictionary: Dictionary | undefined;

const fetchDictionary = async () => {
  if (cachedDictionary) {
    return cachedDictionary;
  }

  const response = await fetch(dictionaryUrl);

  if (response.status >= 400) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  const text = await response.text();
  const dictionary: Dictionary = await xml2js.parseStringPromise(text);

  cachedDictionary = dictionary

  return dictionary;
}

const report: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, report, getSource } = context;

  return {
    async [Syntax.Str](node) {
      const text = getSource(node);

      const { housouKinshiYougoList } = await fetchDictionary();

      housouKinshiYougoList?.dirtyWord?.forEach((dirtyWord) => {
        const notes = dirtyWord.notes?.[0];
        const replaceWordList = dirtyWord.replaceWordList || [];
        const word = dirtyWord.word?.[0]._ || '';
        const index = text.indexOf(word);

        if (index === -1) {
          return;
        }

        const replaceWords = replaceWordList.map(({ word }) => word?.[0]._).join(', ') || '(なし)';

        const ruleError = new RuleError(
          `放送禁止用語「${word}」が含まれています。　言い換え語: ${replaceWords}　備考: ${notes}　参照: ${referenceUrl}`,
          { index }
        );

        report(node, ruleError);
      });
    }
  }
};

export default report;
