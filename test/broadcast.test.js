var assert = require('chai').assert
var addBroadcastMethod = require('..')
var or = require('occamsrazor')

// that is supposed to work in the browser, so I have to mock localstorage in nodejs
var windowObject = {}
var LocalStorage = require('node-localstorage').LocalStorage
var localStorage = new LocalStorage('./scratch')
windowObject.localStorage = localStorage
windowObject.addEventListener = localStorage.on.bind(localStorage)

describe('adapter', function () {
  var events, events2

  beforeEach(function () {
    // using 2 events to simulate 2 different windows
    events = addBroadcastMethod(or(), windowObject)
    events2 = addBroadcastMethod(or(), windowObject)
  })

  after(function () {
    localStorage._deleteLocation()
  })

  it('is a function', function () {
    assert.typeOf(addBroadcastMethod, 'function')
  })

  it('has a broadcast event', function () {
    assert.typeOf(events.broadcast, 'function')
  })

  it('fires trigger', function (done) {
    events.on('hello', 'world', function (hello, world) {
      assert.equal(hello, 'hello')
      assert.equal(world, 'world')
      done()
    })
    events2.broadcast('hello', 'world')
  })
})
