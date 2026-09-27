'use strict';

const pagination = require('hexo-pagination');

function pinValue(post) {
  return post.top || post.sticky || 0;
}

function topScript(cls) {
  return '<script>(function(){' +
    'document.addEventListener("DOMContentLoaded",function(){' +
    'var el=document.querySelector("article");' +
    'if(el){el.classList.add(' + JSON.stringify(cls) + ');}' +
    '});' +
    '})();</script>';
}

module.exports = function (locals) {
  const config = this.config;
  const posts = locals.posts.filter(post => !post.hidden).sort(config.index_generator.order_by);

  posts.data.sort((a, b) => pinValue(b) - pinValue(a));

  const topClass = config.index_generator.top_class;
  for (const post of posts.data) {
    delete post.top_class;
  }
  if (topClass && posts.data.length > 0 && pinValue(posts.data[0]) > 0) {
    posts.data[0].top_class = topClass;
    this.extend.injector.register('head_end', topScript(topClass), 'home');
  }

  const paginationDir = config.index_generator.pagination_dir || config.pagination_dir || 'page';
  const path = config.index_generator.path || '';

  return pagination(path, posts, {
    perPage: config.index_generator.per_page,
    layout: config.index_generator.layout || ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};
