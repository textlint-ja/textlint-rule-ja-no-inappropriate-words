import TextLintTester from 'textlint-tester';
import rule from '../src/index';

const tester = new TextLintTester();

tester.run('no-hoso-kinshi-yogo', rule, {
  valid: ['問題のない文章です。'],
  invalid: [
    {
      text: '放送禁止用語「魚屋」が含まれた文章です。',
      output: '放送禁止用語「鮮魚商」が含まれた文章です。',
      errors: [
        {
          message: '放送禁止用語「魚屋」が含まれています。　言い換え語: 鮮魚商　備考: 職業名　参照: http://monoroch.net/kinshi/',
          line: 1,
          column: 8
        }
      ]
    },
    {
      text: `放送禁止用語「魚屋」が含まれた文章です。

放送禁止用語「さかなや」が含まれた文章です。`,
      output: `放送禁止用語「鮮魚商」が含まれた文章です。

放送禁止用語「鮮魚商」が含まれた文章です。`,
      errors: [
        {
          message: '放送禁止用語「魚屋」が含まれています。　言い換え語: 鮮魚商　備考: 職業名　参照: http://monoroch.net/kinshi/',
          line: 1,
          column: 8
        },
        {
          message: '放送禁止用語「さかなや」が含まれています。　言い換え語: 鮮魚商　備考: 職業名　参照: http://monoroch.net/kinshi/',
          line: 3,
          column: 8
        }
      ]
    },
  ]
});
