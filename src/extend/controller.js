module.exports = {
  async getLoginStatus() {
    const cookieSessionStorage = await this.session()
    const validSign = think.$helper.md5passwdSalt(cookieSessionStorage.user_name || '')
    const user_sign = cookieSessionStorage.user_sign
    return validSign === user_sign
  }
}
