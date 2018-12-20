const defaultOptions = {
  breakRequest: true // 是否打印执行时间的配置
}

module.exports = (options = {}, app) => {
  // 合并传递进来的配置
  options = Object.assign({}, defaultOptions, options);
  return async (ctx, next) => {
    if(!options.breakRequest) {
      return next();
    }
    await next()
    //ctx.body = 'break'
  }
}
