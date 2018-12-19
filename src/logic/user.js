const NeedLogin = [
  'getuserinfo',
]
module.exports = class extends think.Logic {
  async __before() {
    const isNeedLogin = NeedLogin.find((item) => {return item === this.ctx.action})

    if (isNeedLogin) {
      let islogin = this.ctx.state.islogin =  await this.getLoginStatus()
      if (!islogin) {
        this.fail(this.config('Errnos').noLogin , this.config('Errmsgs').noLogin);
        return false
      }
    }

  }

  loginAction() {
    this.allowMethods = 'post';
    this.rules = {
      identifier: {
        string: true,
        required: true,
        trim: true,
      },
      token: {
        string: true,
        required: true,
      },
      authType: {
        string: true,
        required: true,
      }
    }
  }
  async getuserinfoAction() {
    this.allowMethods = 'get';
    this.rules = {

    }
/*    let msgs = {
      isLogin: function({name, validName, rule, args, pargs}) {
        return '未获取到登录信息';
      }
    }
    let flag = this.validate(rules, msgs)
    if (!flag) {
      return false
    }*/
  }
};
