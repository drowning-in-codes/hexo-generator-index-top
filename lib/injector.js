'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function(hexo) {
  const topCss = hexo.config.index_generator.top_css;
  if (!topCss) return;

  let css = topCss;
  const candidates = [hexo.source_dir, hexo.base_dir].map(dir => path.resolve(dir, topCss));
  const file = candidates.find(f => fs.existsSync(f) && fs.statSync(f).isFile());
  if (file) {
    css = fs.readFileSync(file, 'utf8');
  }

  hexo.extend.injector.register('head_end', '<style>' + css + '</style>', 'home');
};
