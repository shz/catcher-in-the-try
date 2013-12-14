var fs = require('fs')
  , acorn = require('acorn')
  , estraverse = require('estraverse')
  ;

var dispatcherJs = fs.readFileSync(require('path').join(__dirname, 'dispatcher.js'), {encoding: 'utf8'});

// Wraps a block-type AST node with the appropriate try-catch handlers
var wrapBlock = function(node) {
  var body = {
    type: 'TryStatement',
    block: node.body instanceof Array ? {type: 'BlockStatement', body: node.body} : node.body,
    handlers: [{
      type: 'CatchClause',
      param: {type: 'Identifier', name: '_citt'},
      body: {
        type: 'BlockStatement',
        body: acorn.parse('window._citt = _citt; throw _citt').body
      }
    }]
  };

  node.body = node.body instanceof Array ? [body] : body;
}

exports.wrap = function(ast) {
  // Wrap the inside of every function inside a try/catch block that
  // assigns to the error to a global variable.
  estraverse.traverse(ast, {
    enter: function(node, parent) {
      if (node.type == 'FunctionExpression'
      || node.type == 'FunctionDeclaration')
        wrapBlock(node);
    },
    exit: function(node, parent) {}
  });

  // Now, wrap the root's AST to catch things like undefined object
  // errors and the like.
  wrapBlock(ast);

  // Attach our global error handler to the front of the body
  ast.body.unshift(acorn.parse(dispatcherJs).body[0]);
};

exports.wrapSrc = function(src) {
  var ast = acorn.parse(data);
  exports.wrap(ast);
  return escodegen.generate(ast);
};

exports.wrapFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf8'}, function(err, src) {
    if (err)
      return callback(err);

    try {
      return callback(undefined, exports.wrapSrc(src));
    } catch (err) {
      return callback(err);
    }
  });
};
