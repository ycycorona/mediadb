// default config
module.exports = {
  port: 8005,
  workers: 1,
  //  onUnhandledRejection:   unhandledRejection handle
  // onUncaughtException:  uncaughtException handle
  errnoField: 'errno', // errno field
  errmsgField: 'errmsg', // errmsg field
  defaultErrno: 1000, // default errno
  validateDefaultErrno: 1001, // validate default errno
  Errnos: {
    noLogin: 1020, // 未获取到登录状态
    loginFail: 1010, // 登录失败
    registerFail: 1030 // 用户注册失败
  },
  Errmsgs: {
    noLogin: '未获取到登录状态' // 未获取到登录状态
  }
};
