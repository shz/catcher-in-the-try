# Catcher in the try

Using `window.onerror` is a rather poor solution for catching client side errors,
because it doesn't give very useful error messages (for example, there's no stack trace).

Catcher in the try solves this problem by maniulating JS source code to properly
track the full exception object all the way up to your custom error handler.

**Example:**
```javascript
window.addEventListener('citt', function(e) {
  console.log('Oh noes!');
  console.log(e.error.stack);
}, false);
```

(And before you ask, yes, it works with jQuery too).

## Usage

You need to wire up both the client and backend to make things work.

### Client Side

Listen for the `citt` event on the `window`, as in the above example.

### Backend

There are a couple different ways to wire things up.

```javascript
var citt = require('catcher-in-the-try');

// This will asynchronously read in a file and apply CITT to it.  If
// there were no errors, you get back the modified source code.
citt.wrapFile('foo.js', function(err, src) {  });

// This synchronously applies CITT to a piece of source code
var src = citt.wrapSrc('var a = 1;');

// This synchronously applies CITT to a piece of AST conforming to
// the Mozilla Parser API spec.
citt.wrap(require('acorn').parse('var a = 1;'));
```

If CITT is part of a larger asset pipeline that already uses the Mozilla
Parser API, you probably want to user the latter for (`citt.wrap`).  It
plays nicely with `esprima`, `esmangle`, etc. and also preserves
location information in the tree.

If you want things a bit more standalone, use the `citt.wrapSrc` or
`citt.wrapFile` functions.  Note that these do not deal with source
mapping, so if you're using this as part of a pipeline you want to put
CITT *before* any minification step (which is a good idea anyway, as it
will save you more space).

### Browser Support

Works in modern browsers, should work in all older IEs as well, though I
haven't really tested them thoroughly...

## Installation

```bash
npm install catcher-in-the-try
```

## How it works

Every single function is wrapped in a try-catch block that
simply sets `window._citt` to the `Error` object
that it caught, and then rethrows.

An `error` handler is attached to the window that simply
looks for this `_citt` variable, and passes it
on to the custom error handler.

Pretty easy!

## License

Public domain, see [license.txt](license.txt) for details.

Developed and open sourced at [Vizify](https://www.vizify.com), from
Portland with love.
