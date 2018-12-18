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
      .find();
  }
};
