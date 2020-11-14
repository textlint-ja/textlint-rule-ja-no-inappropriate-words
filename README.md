# textlint-rule-ja-no-inappropriate-words

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

不適切表現をチェックするtextlintルール

参照: [MosasoM/inappropriate-words-ja](https://github.com/MosasoM/inappropriate-words-ja)

```
1:1  error    不適切表現「いざり」が含まれています。  ja-no-inappropriate-words
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

The following creations are included in this product:

- [MosasoM/inappropriate-words-ja](https://github.com/MosasoM/inappropriate-words-ja)

Please see [DISCLAIMER.md](https://github.com/hata6502/textlint-rule-ja-no-inappropriate-words/blob/master/DISCLAIMER.md).

## License

MIT © Tomoyuki Hata
