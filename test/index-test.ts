import TextLintTester from "textlint-tester";
import rule from "../src/index";
const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
    valid: [
        // no problem
        "text",
        {
            text: "It is bugs, but it should be ignored",
            options: {
                allows: ["it should be ignored"]
            }
        }
    ],
    invalid: [
        // single match
        {
            text: "It is bugs.",
            errors: [
                {
                    message: "Found bugs.",
                    line: 1,
                    column: 7
                }
            ]
        },
        // multiple match
        {
            text: `It has many bugs.

One more bugs`,
            errors: [
                {
                    message: "Found bugs.",
                    line: 1,
                    column: 13
                },
                {
                    message: "Found bugs.",
                    line: 3,
                    column: 10
                }
            ]
        },

    ]
});
