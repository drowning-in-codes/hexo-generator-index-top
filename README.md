# hexo-generator-index

[![Build Status](https://github.com/hexojs/hexo-generator-index/workflows/Tester/badge.svg?branch=master)](https://github.com/hexojs/hexo-generator-index/actions?query=workflow%3ATester)
[![NPM version](https://badge.fury.io/js/hexo-generator-index.svg)](https://www.npmjs.com/package/hexo-generator-index)
[![Coverage Status](https://img.shields.io/coveralls/hexojs/hexo-generator-index.svg)](https://coveralls.io/r/hexojs/hexo-generator-index?branch=master)

Index generator for [Hexo].

It generates an archive of posts on your homepage, according to the `index` or `archive` layout of your theme.

## Installation

```bash
npm install hexo-generator-index --save
```

## Options

Add or modify the following section to your root `_config.yml` file.

```yaml
index_generator:
  path: ""
  per_page: 10
  order_by: -date
  pagination_dir: page
  layout: ["index", "archive"]
  top_class: top
  top_css: ""
```

- **path**: Root path for your blog's index page.
  - default: `""`
- **per_page**: Posts displayed per page.
  - default: [`config.per_page`](https://hexo.io/docs/configuration.html#Pagination) as specified in the official Hexo docs (if present), otherwise `10`
  - `0` disables pagination.
- **order_by**: Posts order.
  - default: `-date` (date descending)
- **pagination_dir**: URL format.
  - default: `page`
  - e.g. set `awesome-page` makes the URL ends with `awesome-page/<page number>` for second page and beyond.
- **layout**: custom layout.
  - defalut: `["index", "archive"]`
- **top_class**: CSS class applied to the highest-pinned post.
  - default: `top`
  - set to `""` to disable.
- **top_css**: CSS rules injected into the home page `<head>` (via [hexo injector](https://hexo.io/api/injector)) to style the highest-pinned post.
  - default: `""` (disabled)
  - accepts either an inline CSS string, or a path to a CSS file whose contents are injected. A relative path is resolved against your `source/` directory first, then your site root.

## Usage

The `top` parameter in the post [Front-matter](https://hexo.io/docs/front-matter) will be used to pin the post to the top of the index page. Higher `top` means that it will be ranked first. `sticky` is also supported as a fallback (`top` takes precedence when both are set).

```yml
---
title: Hello World
date: 2013/7/13 20:46:25
top: 100
---
```

The post with the greatest pin value gets the class configured by `top_class` (default `top`) written to its `top_class` property. To style it, set `top_css` — the plugin injects those CSS rules into the home page `<head>` via the [injector](https://hexo.io/api/injector):

```yaml
index_generator:
  top_css: ".top { border-left: 4px solid #f0c040; }"
```

`top_css` can also point to a CSS file; its contents are injected instead. A relative path is resolved against `source/` first, then the site root, so both of these work:

```yaml
index_generator:
  top_css: "css/top.css"        # resolves to source/css/top.css
  # top_css: "source/css/top.css" # or explicit, relative to the site root
```

Your theme also needs to render the class onto the post element:

```ejs
<article class="post <%= post.top_class %>">…</article>
```

Set `top_css` to `""` (the default) to inject nothing and style the class yourself in your theme.

The `hidden` parameter can be used to hide a post from the index page. When `hidden: true` is set, the post will not appear in the index but will still be accessible in other ways (e.g., the archive page or via a direct link).

```yml
---  
title: Secret Post  
date: 2024/11/11 11:11:11  
hidden: true  
---  
```

## Note

If your theme define a non-archive `index` layout (e.g. About Me page), this plugin would follow that layout instead and not generate an archive. In that case, use [hexo-generator-archive](https://github.com/hexojs/hexo-generator-archive) to generate an archive according to the `archive` layout.

## License

MIT

[Hexo]: https://hexo.io/
