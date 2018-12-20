const User = require('./entity/User')
const Auth = require('./entity/Auth')
module.exports = class extends think.Model {
  /*  get relation() {
      return {
        auths: {
          type: think.Model.HAS_MANY,
          model: 'user_auths',
          fKey: 'id_user',
          relation: false
        }
      }
    }*/

  async getUserByAuthTypeAndIdentifier(authType, identifier) {
    const auth_sql = await this.model('user_auths')
      .where({
        auth_type: authType,
        identifier: identifier
      }).buildSelectSql();

    return this.alias('u')
      .field('u.user_name, u.avatar, u.nick_name, u.status AS status_user, a.id_user, a.auth_type, a.identifier, a.token, a.status AS status_auth')
      .join({
        table: auth_sql,
        join: 'inner',
        as: 'a',
        on: {
          'id': 'id_user',
        }
      })
      .find()
  }

  getUserInfoByUserName(user_name = '') {
    return this.alias('u')
      .where({user_name})
      .find()
  }

  async createUser(createUserInfo, createAuthInfo) {
    const userAuths = this.model('user_auths').db(this.db());
    const res = {
      flag: false,
      id_user: 0,
      id_auth: 0,
      errmsg: ''
    }
    createAuthInfo = {authType: 'passwd', identifier: 'whh', token: 'ed36a6de9a770e96c2e6abc1715365e2'}
    const insertUserObj = new User(think.$helper.objSnakeCase(createUserInfo))
    const insertAuthObj = new Auth(think.$helper.objSnakeCase(createAuthInfo))

    const result = await this.transaction(async () => {
      let userInsertRes = await this.thenAdd(insertUserObj, {user_name: insertUserObj.user_name})
        .catch(error => {
          throw error
        })
      if (userInsertRes.type === 'exist') {
        throw Error('插入失败：用户名已存在，无法重复创建')
      }
      res.id_user = userInsertRes.id // 创建的用户的id
      insertAuthObj.id_user = userInsertRes.id // users_auth表中的id_user
      let authInsertRes = await userAuths.thenUpdate(insertAuthObj, {id_user: insertAuthObj.id_user})
        .catch(error => {
          throw error
        })
      res.id_auth = authInsertRes
    })
      .catch(err => {
        res.errmsg = err.message
      })

    if (!res.errmsg) {
      res.flag = true
    }
    return res
  }
};
