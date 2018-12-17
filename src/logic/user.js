module.exports = class extends think.Logic {
  loginAction() {
    this.allowMethods = 'post';

    let rules = {
      userName: {
        string: true,
        required: true,
        trim: true,
        method: 'POST'
      },
      token: {
        string: true,
        required: true,
        method: 'POST'
      }
    }
    this.ctx.fail
    this.validate(rules)
    console.log(this.validateErrors)
  }
};
