# textlint-rule-no-hoso-kinshi-yogo

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

放送禁止用語をチェックするtextlintルール

参照: [放送禁止用語一覧](http://monoroch.net/kinshi/)

```
1:1  ✓ error  放送禁止用語「魚屋」が含まれています。　言い換え語: 鮮魚商　備考: 職業名　参照: http://monoroch.net/kinshi/  no-hoso-kinshi-yogo
```

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-no-hoso-kinshi-yogo

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "no-hoso-kinshi-yogo": true
    }
}
```

Via CLI

```
textlint --rule no-hoso-kinshi-yogo README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## License

MIT © Hood
