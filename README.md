# redman-relative-urls

A way of rewriting urls relative to where the request was served from. Make apps more portable 
to different paths, and testing configurations.

```
npm install redman-relative-urls
```

## Usage

``` js
var config = {
  widget_path: 'login'
  proxy_path: '/widget_proxy',
  app_path: '/app'
}
var relative = require('redman-relative-urls')(config)
relative(req, {
   asset_url: '/static'
})
```

## License

MIT
