const _ = require('lodash');

module.exports = class BaseEntity {
  get propList() {
    return []
  }
  constructor(obj, option) {
    BaseEntity._.assign(this, BaseEntity._.pick(obj, this.propList))
  }
  static get _() {
    return _
  }
}

