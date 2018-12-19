
module.exports = {
  rules: {
    equalValue(value, { argName, validName, validValue, parsedValidValue, rule, rules, currentQuery, ctx}) {
      return value === validValue;
    },
    isLogin(value, { argName, validName, validValue, parsedValidValue, rule, rules, currentQuery, ctx}) {
      isLogin.call(ctx)
    }
  },
  messages: {
    equalValue: '{name} is not true',
    isLogin: '未获取到登录信息'
  }
}
