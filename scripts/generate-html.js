const path = require('path');
const fs = require('fs');
const template = require('art-template');

const paths = {
  cwd: path.resolve(__dirname, '../'),
  build: path.resolve(__dirname, '../lib'),
  tpl: path.resolve(__dirname, './template.art'),
  html: path.resolve(__dirname, '../index.html')
};

const walk = dir => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const finalFile = dir + path.sep + file;
    const stat = fs.statSync(finalFile);
    if (stat && stat.isDirectory()) results = results.concat(walk(finalFile));
    else results.push(path.relative(paths.cwd, finalFile));
  });
  return results;
};

const scripts = walk(paths.build);
const html = template(paths.tpl, {
  scripts: scripts
});

fs.writeFile(paths.html, html, function(err) {
  if (err) throw err;
});
