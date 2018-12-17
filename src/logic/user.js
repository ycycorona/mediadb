module.exports = class extends think.Logic {
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
};
