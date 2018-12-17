module.exports = class extends think.Service {
  constructor() {
    super()
  }

  async doLogin({identifier, token, authType}) {
    const user = this.model('users');
    console.log(user.relation)
    const res = await user.getUserByAuthTypeAndIdentifier(authType, identifier)
/*    const list = await user.select()
    console.log(list)*/
    return res
  }
};
