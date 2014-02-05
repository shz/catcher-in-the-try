try {
  (function() {
    var useCustomEvent = false;
    try {
      var e = new CustomEvent('test');
      useCustomEvent = true;
    } catch (err) {}

    var handler = function() {
      if (window._citt) {
        if (useCustomEvent) {
          var e = new CustomEvent("citt", {detail: window._citt});
          window.dispatchEvent(e);
        } else if (document.createEvent) {
          var e = document.createEvent("Event");
          e.initEvent("citt", false, false);
          e.detail = window._citt;
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
