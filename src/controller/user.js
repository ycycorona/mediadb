const Base = require('./base.js');

module.exports = class extends Base {
  loginAction() {
    this.body = 'hello world!';
  }
};
