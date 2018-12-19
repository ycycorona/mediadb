const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    const {ctx} = this
    const loginRes = await this.service('userService').login(ctx.request.body.post)
    const rememberMe = ctx.request.body.post.rememberMe === '1'
    if (loginRes.flag) {
      await this.session('user_name', loginRes.data.user_name)
      await this.session('user_sign', think.$helper.md5passwdSalt(loginRes.data.user_name))

      if (rememberMe) {
        const cookie = this.cookie('__cookie__sessionStorage')
        this.cookie('__cookie__sessionStorage', cookie, {
          maxAge: 1000 * 60 * 60 * 24 * 30 * 6, // 半年有效期
        })
      }

      this.success('login success');
    } else {
      this.fail(2000, 'login fail', loginRes.errorData);
    }
  }
  async getuserinfoAction() {
    const {ctx} = this
    this.success('user info')
  }
};
