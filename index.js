function addBroadcastMethod(events, w, event_name) {
  w = w || window;
  event_name = event_name || '__or_event';

  events.broadcast = function broadcast() {
    var args = Array.prototype.slice.call(arguments, 0);
    var json = JSON.stringify(args);
    w.localStorage.setItem(event_name, json);
  };

  w.addEventListener('storage', function (e) {
    if (e.key === event_name) {
      events.trigger.apply(null, JSON.parse(e.newValue));
    }
  });

  return events;
}

module.exports = addBroadcastMethod;
