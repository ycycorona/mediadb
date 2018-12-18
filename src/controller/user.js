const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    const {ctx} = this
    const loginRes = await this.service('userService').login(ctx.request.body.post)
    if (loginRes.flag) {
      this.session('user_name', loginRes.data.user_name)
      this.success('login success');
    } else {
      this.fail(2000, 'login fail', loginRes.errorData);
    }
  }
};
