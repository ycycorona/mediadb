const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    this.assign('msg', 'hello');
    return this.display('index');
  }
};
