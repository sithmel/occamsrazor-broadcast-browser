function addBroadcastMethod(events, w, localStorage_key) {
  w = w || window;
  localStorage_key = localStorage_key || '__or_event';

  events.broadcast = function broadcast() {
    var args = Array.prototype.slice.call(arguments, 0);
    // adding a timestamp to ensure every message is different
    var obj = { args: args, ts: Date.now() };
    var json = JSON.stringify(obj);
    w.localStorage.setItem(localStorage_key, json);
  };

  w.addEventListener('storage', function (e) {
    var obj, args;
    if (e.key === localStorage_key) {
      obj = JSON.parse(e.newValue);
      args = obj.args;
      events.trigger.apply(null, args);
    }
  });

  return events;
}

module.exports = addBroadcastMethod;
