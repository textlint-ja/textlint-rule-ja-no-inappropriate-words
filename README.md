# textlint-rule-ja-no-inappropriate-words

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

不適切表現をチェックするtextlintルール

参照: [MosasoM/inappropriate-words-ja](https://github.com/MosasoM/inappropriate-words-ja)

```
1:1  error    放送禁止用語「サラブレッド」が含まれています。　備考: 比喩表現に注意。サラブレッドには厳格な血統登録が行われ、1頭1頭に全て血統書が存在する　参照: http://monoroch.net/kinshi/  no-hoso-kinshi-yogo
1:8  ✓ error  放送禁止用語「魚屋」が含まれています。　言い換え語: 鮮魚商　備考: 職業名　参照: http://monoroch.net/kinshi/                                                                    no-hoso-kinshi-yogo
```

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-ja-no-inappropriate-words

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "ja-no-inappropriate-words": true
    }
}
```

Via CLI

```
textlint --rule ja-no-inappropriate-words README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## Disclaimer

Please see [DISCLAIMER.md](https://github.com/hata6502/textlint-rule-ja-no-inappropriate-words/blob/master/DISCLAIMER.md).

## License

MIT © Tomoyuki Hata
