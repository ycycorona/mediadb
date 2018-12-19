module.exports = class extends think.Service {

  /**
   * 执行登录
   * @param identifier
   * @param token
   * @param authType
   * @returns {Promise<{flag: boolean, errorData: string}>}
   */
  async login({identifier, token, authType}) {
    const users = this.model('users');
    const loginRes = {
      flag: false,
      errorData: '',
    }
    const reqTokenMd5 = think.$helper.md5passwdSalt(token)
    const userAuthInfo = await users.getUserByAuthTypeAndIdentifier(authType, identifier)
    const dataBaseTokenMd5 = userAuthInfo.token

    if (!(userAuthInfo instanceof Object) || think.isEmpty(userAuthInfo)) {
      loginRes.errorData = '未找到该用户'
    } else if (userAuthInfo.status_user !== 1) {
      loginRes.errorData = '该用户已禁用'
    } else if (userAuthInfo.status_auth !== 1) {
      loginRes.errorData = '请更换登录账号类型重试'
    } else if (reqTokenMd5 !== dataBaseTokenMd5) {
      loginRes.errorData = '密码不正确'
    } else {
      loginRes.flag = true
      loginRes.data = {
        user_name: userAuthInfo.user_name,
        id_user: userAuthInfo.id_user
      }
    }

    think.logger.info('用户登录', {loginRes, userAuthInfo: userAuthInfo, path: __filename})

    return loginRes
  }

  /**
   * 根据user_name获取用户信息
   * @param userName
   * @returns {Promise<void>}
   */
  async getUserInfo(userName) {
    const users = this.model('users');
    const userInfo = await users.getUserInfoByUserName()
    return userInfo
  }
  async register(createUserInfo) {
    const users = this.model('users');
    const res = await users.createUser(createUserInfo)
    return res
  }
};
