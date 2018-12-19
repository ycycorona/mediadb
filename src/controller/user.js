const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    const {ctx} = this
    const loginRes = await this.service('userService').login(ctx.request.body.post)
    const rememberMe = ctx.request.body.post.rememberMe === '1'
    if (loginRes.flag) {
      // 登陆成功 设置session
      await this.session('user_name', loginRes.data.user_name)
      await this.session('id_user', loginRes.data.id_user)
      await this.session('user_sign', think.$helper.md5passwdSalt(loginRes.data.user_name)) // 添加user_sign 用来验证用户登录状态

      if (rememberMe) {
        const cookie = this.cookie('__cookie__sessionStorage')
        this.cookie('__cookie__sessionStorage', cookie, {
          maxAge: 1000 * 60 * 60 * 24 * 30 * 6, // 半年有效期
        })
      }

      this.success('登陆成功');
    } else {
      this.fail(this.config('Errnos').loginFail, '登录失败', loginRes.errorData);
    }
  }
  async getuserinfoAction() {
    const {ctx} = this
    this.success('user info')
  }
  async registerAction() {
    const {ctx} = this
    // this.body = ctx.request.body.post
    const postData = ctx.request.body.post
    postData.idUserCreateBy = await this.session('id_user')
    postData.idUserUpdateBy = await this.session('id_user')
    const res = await this.service('userService').register(postData)
    if (res.flag) {
      this.success({msg:'用户创建成功', id_create: res.id_create})
    } else {
      this.fail(this.config('Errnos').registerFail, '用户创建失败', res.errmsg)
    }

  }
};
