var escodegen = require('escodegen');

var citt = require('./lib/citt');
var ast = {
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "st"
                    },
                    "init": {
                        "type": "Identifier",
                        "name": "setTimeout"
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "FunctionDeclaration",
            "id": {
                "type": "Identifier",
                "name": "fail"
            },
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
                                    "value": "uh oh",
                                    "raw": "'uh oh'"
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
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "Identifier",
                    "name": "st"
                },
                "arguments": [
                    {
                        "type": "Identifier",
                        "name": "fail"
                    },
                    {
                        "type": "Literal",
                        "value": 200,
                        "raw": "200"
                    }
                ]
            }
        }
    ]
};

citt.wrap(ast);
console.log(JSON.stringify(ast, null, 2));
console.log(escodegen.generate(ast));
