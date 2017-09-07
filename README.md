occamsrazor-broadcast-browser
=============================
[![Build Status](https://travis-ci.org/sithmel/occamsrazor-broadcast-browser.svg?branch=master)](https://travis-ci.org/sithmel/occamsrazor-broadcast-browser)

This is a plugin that adds to [occamsrazor](https://github.com/sithmel/occamsrazor.js) a broadcast method.
This method enables to send messages to all browser window (or iframes) belonging to the same session.

```js
var or = require('occamsrazor');
var addBroadcastMethod = require('occamsrazor-broadcast-browser');

var events = or();
addBroadcastMethod(events);

events.trigger('hello', 'world'); // trigger the event on this browser window
events.broadcast('hello', 'world'); // trigger the event on other browser windows
```

Syntax:
**addBroadcastMethod(events, window, localStorage_key);**

* events: an occamsrazor instance
* window (optional): the global object, it defaults to "window"
* localStorage_key (optional): the localStorage_key used to store the event arguments. It defaults to "__or_event"
