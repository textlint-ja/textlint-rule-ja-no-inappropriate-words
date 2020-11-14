import TextLintTester from 'textlint-tester';
import rule from '../src/index';

const tester = new TextLintTester();

tester.run('no-hoso-kinshi-yogo', rule, {
  valid: ['勉強のかたわら掃除をしました。'],
  invalid: [
    {
      text: '不適切表現「いざり」が含まれた文章です。',
      errors: [
        {
          message: '不適切表現「いざり」が含まれています。',
          line: 1,
          column: 7
        }
      ]
    }
  ]
});
