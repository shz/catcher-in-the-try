var escodegen = require('escodegen');

var citt = require('./lib/citt');
var ast = {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "Identifier",
                    "name": "setTimeout"
                },
                "arguments": [
                    {
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [],
                        "defaults": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ThrowStatement",
                                    "argument": {
                                        "type": "NewExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "Error"
                                        },
                                        "arguments": [
                                            {
                                                "type": "Literal",
                                                "value": "uhoh",
                                                "raw": "'uhoh'"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        "rest": null,
                        "generator": false,
                        "expression": false
                    },
                    {
                        "type": "Literal",
                        "value": 100,
                        "raw": "100"
                    }
                ]
            }
        }
    ]
};

citt.wrap(ast);
console.log(JSON.stringify(ast, null, 2));
console.log(escodegen.generate(ast));
