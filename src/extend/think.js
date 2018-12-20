const passwdSalt = 'cyberpunk'
function getHelper(think) {
  return {
    think,
    md5passwdSalt(val) {
      if (!val) {return ''}
      const saltPasswd = `${val}:${passwdSalt}`
      return this.think.md5(saltPasswd)
    },
    /**
     * 驼峰转蛇形命名
     * @param obj
     * @constructor
     */
    objSnakeCase(obj) {
      const newObj = {}
      Object.keys(obj).forEach((key, index) => {
        newObj[think.snakeCase(key)] = obj[key]
      })
      return newObj
    },
    /**
     * 蛇形转驼峰命名
     * @param obj
     * @constructor
     */
    objCamelCase(obj) {
      const newObj = {}
      Object.keys(obj).forEach((key, index) => {
        newObj[think.camelCase(key)] = obj[key]
      })
      return newObj
    }
  }
}

module.exports = {
  get $helper(){
    const _this_1 = this
    return getHelper(_this_1)
  }
}
