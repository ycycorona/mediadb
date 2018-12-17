module.exports = class extends think.Model {
  constructor(...args){
    super(...args);
    this.relation = {
      auths: {
        type: think.Model.HAS_MANY,
        model: 'user_auths',
        fKey: 'id_user',
        relation: false
      }
    }
  }

  get relation() {
    return {
      auths: {
        type: think.Model.HAS_MANY,
        model: 'user_auths',
        fKey: 'id_user',
        relation: false
      }
    }
  }
  async getUserByAuthTypeAndIdentifier(authType, identifier) {
    const auth_sql = await this.model('user_auths').setRelation(true).where({auth_type: authType, identifier: identifier}).buildSelectSql();
    return this.alias('u').join({
      table: auth_sql,
      join: 'inner',
      as: 'a',
      on: {
        'id': 'id_user',
      }
    }).find();
  }
};
