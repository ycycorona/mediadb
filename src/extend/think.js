const passwdSalt = 'cyberpunk'
function getHelper(think) {
  return {
    think,
    md5passwdSalt(val) {
      if (!val) {return ''}
      const saltPasswd = `${val}:${passwdSalt}`
      return this.think.md5(saltPasswd)
    }
  }
}

module.exports = {
  get $helper(){
    const _this_1 = this
    return getHelper(_this_1)
  }
}
