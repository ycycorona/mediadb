const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const {ctx} = this
    this.body = await this.session()
  }
  async rememberAction() {
    const {ctx} = this
    const cookie = this.cookie('_sessionStorage')
    this.cookie('_sessionStorage', cookie, { // 设定 cookie 时指定额外的配置, 可以借此续期session-cookie的时间
      maxAge: 100 * 1000,
    })
    this.body = cookie
  }
  async setcookieAction() {
    const {ctx} = this
    this.cookie('_sessionStorage', '25mhs0Eab7828aLFn+gvrGld+7b2067jYB6ZCN+OiHETDWZKZIqLmI9/L3yMdjr3WmYy7yq81g6x8f+d5u9+k0I7uJUM1L5uJLtAu47tgb8=')
    this.body = 'set cookie'
  }
};
