function addBroadcastMethod(events, w, localStorage_key) {
  var windowId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  w = w || window;
  localStorage_key = localStorage_key || '__or_event';

  events.broadcast = function broadcast() {
    var args = Array.prototype.slice.call(arguments, 0);
    // adding a timestamp to ensure every message is different
    var obj = { args: args, ts: Date.now(), windowId: windowId };
    var json = JSON.stringify(obj);
    w.localStorage.setItem(localStorage_key, json);
  };

  w.addEventListener('storage', function (e) {
    var obj, args;
    if (e.key === localStorage_key) {
      obj = JSON.parse(e.newValue);
      args = obj.args;
      if (obj.windowId !== windowId) {
        // this prevents IE9-11 buggy behaviour triggering
        // event on the same window
        events.trigger.apply(null, args);
      }
    }
  });

  return events;
}

module.exports = addBroadcastMethod;
