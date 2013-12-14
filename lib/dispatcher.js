try {
  (function() {
    var handler = function() {
      if (window._citt) {
        if (typeof Event != "undefined") {
          var e = new CustomEvent("citt", {error: window._citt});
          window.dispatchEvent(e);
        } else if (document.createEvent) {
          var e = document.createEvent("Event");
          e.initEvent("citt", false, false);
          e.error = window._citt;
          window.dispatchEvent(e);
        }
      }
      window._citt = undefined;
    };
    if (window.addEventListener)
      window.addEventListener("error", handler, false);
    else if (window.attachEvent)
      window.attachEvent("error", handler);
  })();
} catch(e) { }
