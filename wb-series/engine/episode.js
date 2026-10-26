// Загружает серию (lib.js + episodes/<id>.js) в Node, чтобы получить тексты и параметры сцен.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

module.exports = function loadEpisode(id) {
  const ctx = vm.createContext({ console });
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'lib.js'), 'utf8'), ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'episodes', `${id}.js`), 'utf8') + '\nthis.EPISODE = EPISODE;', ctx);
  return ctx.EPISODE;
};
