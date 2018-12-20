const _ = require('lodash');
const propList = ['user_name', 'avatar', 'nick_name', 'id_user_create_by', 'id_user_update_by, status']

module.exports = class User {
  constructor(obj) {
    _.assign(this, _.pick(obj, propList))
  }
}

