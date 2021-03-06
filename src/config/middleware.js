const path = require('path');
const isDev = think.env === 'development';
const testMiddleware = require('../middleware/test-middleware')
module.exports = [
  {
    handle: testMiddleware,
    options: {
      breakRequest: true
    }
  },
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {
      enableDefaultRouter: true // 是否启用默认路由解析规则
    }
  },
  'logic',
  'controller'
];
