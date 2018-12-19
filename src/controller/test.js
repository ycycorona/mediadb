const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const {ctx} = this
    //this.body = await this.session()
    //this.body = await this.cookie('__cookie__sessionStorage')
    const da = think.$helper.md5passwdSalt(think.md5('ycy6323892'))
    console.log(think.md5('ycy6323892'), da)
  }
  async rememberAction() {
    const {ctx} = this
    const cookie = this.cookie('__cookie__sessionStorage')
    this.cookie('__cookie__sessionStorage', cookie, { // 设定 cookie 时指定额外的配置, 可以借此给特定用户长期续期session-cookie的时间
      maxAge: 1000 * 60 * 60 * 24 * 30 * 6, // 半年有效期
    })
    this.body = cookie
  }
  async setcookieAction() {
    const {ctx} = this
    this.cookie('__cookie__sessionStorage', '25mhs0Eab7828aLFn+gvrGld+7b2067jYB6ZCN+OiHETDWZKZIqLmI9/L3yMdjr3WmYy7yq81g6x8f+d5u9+k0I7uJUM1L5uJLtAu47tgb8=')
    this.body = 'set cookie'
  }
};
