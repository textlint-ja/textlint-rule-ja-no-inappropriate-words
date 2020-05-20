# textlint-rule-no-hoso-kinshi-yogo

放送禁止用語をチェックするtextlintルール

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
