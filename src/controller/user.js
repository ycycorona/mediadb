const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    const {ctx} = this
    const res = await this.service('Login').doLogin(ctx.request.body.post)
    this.success('', res);
  }
};
