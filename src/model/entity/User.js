const BaseEntity = require('./BaseEntity')
module.exports = class User extends BaseEntity{
  get propList() {
    return ['user_name', 'avatar', 'nick_name', 'id_user_create_by', 'id_user_update_by', 'status']
  }
  constructor(...args) {
    super(...args)
  }
}

/*const per = new module.exports({user_name: 'ycy', age: 123})
console.log(per)*/
