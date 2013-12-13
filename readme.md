# Catcher in the try

Using `window.onerror` is a rather poor solution for catching client side errors,
because it doesn't give very useful error messages (for example, there's no stack trace).

Catcher in the try solves this problem by maniulating JS source code to properly
track the full exception object all the way up to your custom error handler.

**Example:**
```
window.addEventListener('citterror', function(e) {
  console.log('Oh noes!');
  console.log(e.stack);
}, false);
```

(And before you ask, yes, it works with jQuery too).

## Usage



## Installation

```bash
npm install catcher-in-the-try
```

## How it works

Every single function is wrapped in a try-catch block that
simply sets `window._cittLastError` to the `Error` object
that it caught.

An `onerror` handler is attached to the window that simply
looks for this `_cittLastError` variable, and passes it
on to the custom error handler.

Pretty easy!

## License

Public domain, see [license.txt](license.txt) for details.

Developed and open sourced at [Vizify](https://www.vizify.com), from
Portland with love.
