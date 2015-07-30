var mod = require('../lib/index')
var test = require('tape')
var test_ua = 'Mozilla/5.0 (X11; Linux armv7l; rv:2.0.1) Gecko Firefox/5.0.1'

test('need a widget_path in the config', function (t) {
  t.throws(mod)

  t.ok(true)
  t.end()
})

test('host of widget-dev uses the host direct', function (t) {
  var config = {
    widget_path: 'login'
  }
  var relative = mod(config)
  var urls = relative({
    headers: {
      'user-agent': test_ua,
      'host': 'widget-dev.redmantech.com'
    }
  }, {
    'assets': '/assets'
  })
  t.equal(urls.assets, '//widget-dev.redmantech.com/login/assets')
  t.end()
})

test('host of a site uses the app path', function (t) {
  var config = {
    widget_path: 'login'
  }
  var relative = mod(config)
  var urls = relative({
    headers: {
      'user-agent': test_ua,
      'host': 'ryanramage.redmantech.ca',
      'x-engine-path': '/app'
    }
  }, {
    'assets': '/assets'
  })
  t.equal(urls.assets, '//ryanramage.redmantech.ca/app/login/assets')
  t.end()
})
