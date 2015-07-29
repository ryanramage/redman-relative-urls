# redman-relative-urls

IMPORTANT - PLEASE FOLLOW:

https://wiki.redmantech.ca/Development_Department/npm/New_node_module_project_checklist

WIP - nothing to see here

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
