function addBroadcastMethod(events, w, localStorage_key) {
  w = w || window;
  localStorage_key = localStorage_key || '__or_event';

  events.broadcast = function broadcast() {
    var args = Array.prototype.slice.call(arguments, 0);
    var json = JSON.stringify(args);
    w.localStorage.setItem(localStorage_key, json);
  };

  w.addEventListener('storage', function (e) {
    if (e.key === localStorage_key) {
      events.trigger.apply(null, JSON.parse(e.newValue));
    }
  });

  return events;
}

module.exports = addBroadcastMethod;
