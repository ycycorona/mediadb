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

  async createUser(createUserInfo) {
    const res = {
      flag: false,
      id_create: '',
      errmsg: ''
    }
    const obj = Object.assign({}, createUserInfo)
    const newObj = {}
    Object.keys(obj).forEach((key, index) => {
      if (!obj[key]) {
        delete obj[key]
      } else {
        newObj[think.snakeCase(key)] = obj[key]
      }
    })

    let insertRes = await this.thenAdd(newObj, {user_name: newObj.user_name})
      .catch(error => {
        res.errmsg = error.message || '数据库插入用户失败'
      })

    if (!res.errmsg) {
      if (insertRes.type === 'exist') {
        res.errmsg = '插入失败：用户名已存在，无法重复创建'
      } else {
        res.flag = true
        res.id_create = insertRes
      }
    }

    return res
  }
};
