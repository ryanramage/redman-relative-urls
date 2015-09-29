var URI = require('URIjs')
var ua = require('useragent')

module.exports = function (config) {
  if (!config) config = {}
  if (!config.fallback_proxy_path) config.fallback_proxy_path = '/widget-proxy'
  if (!config.widget_path) throw new Error('we need at least a widget_path in the config')

  var widget_path = config.widget_path
  var keypath_strip_leading_slash = false
  if (widget_path.indexOf('/') !== 0) widget_path = '/' + widget_path
  if (widget_path === '/') keypath_strip_leading_slash = true

  return function (req, urls) {
    var rel = {} // the objecy we will be returning

    // Get the user agent.
    var agent = ua.parse(req.headers['user-agent'])
    var api_host

    // IE9 and below...
    if (agent.family === 'IE' && parseInt(agent.major, 10) <= 9 && req.headers.referer) {
      // Rewrite host as CORS does not work; take it from referer.
      // append a trailing location to use the widget proxy path on the site
      var referer = req.headers.referer
      if (!referer.match(/^http/)) referer = 'http://' + referer // just so can parse as host

      api_host = URI(req.headers.referer).host() + config.fallback_proxy_path
    } else {

      if (req.headers['x-engine-path']) {
        // this is not being served from the widget server.
        // we are proxied being sitename.com/app (for now)
        api_host = req.headers.host + req.headers['x-engine-path']
      } else {
        // Use host from headers.
        api_host = req.headers.host
      }

    }

    Object.keys(urls).forEach(function (key) {
      var keypath = urls[key]
      if (keypath_strip_leading_slash && keypath[0] === '/') {
        keypath = keypath.substring(1)
      }
      rel[key] = '//' + api_host + widget_path + keypath
    })

    return rel
  }
}
