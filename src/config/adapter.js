const fileCache = require('think-cache-file');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const cookie = require('think-session-cookie');
const mysql = require('think-model-mysql');
const {Console, File, DateFile} = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'mysql',
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    handle: mysql,
    database: 'media_db',
    prefix: '',
    encoding: 'utf8',
    host: '47.105.46.120',
    port: '',
    user: 'root',
    password: 'ycy6323892',
    dateStrings: true
  }
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
  type: 'cookie',
  common: {
/*    cookie: {
      name: 'sessionID',
      keys: ['spider', 'web'],
      signed: true
    },*/
    cookie: { //session关联cookie设置
      name: '_sessionStorage',
      //maxAge: '',
      //expires: '',
      path: '/',  //a string indicating the path of the cookie
      keys: ['spider', 'web'], // 签名时用到的key
      httpOnly: true,
      //signed: true, 签名，防篡改 加密时会自动禁止签名
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  },
  /**
   *
   */
  cookie: {
    handle: cookie,
    cookie: {
      encrypt: true //encrypt cookie data
    }
  }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks
  }
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? 'console' : 'dateFile',
  console: {
    handle: Console,
    //logSql: isDev,
    layout: {
      type: 'pattern',
      pattern: '%[[%d] [%z] [%p]%] - %m',
    }
  },
  file: {
    handle: File,
    backups: 10, // max chunk number
    absolute: true,
    maxLogSize: 50 * 1024, // 50M
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  },
  dateFile: {
    handle: DateFile,
    level: 'ALL',
    absolute: true,
    pattern: '-yyyy-MM-dd',
    alwaysIncludePattern: true,
    filename: path.join(think.ROOT_PATH, 'logs/app.log'),
    layout: {
      type: 'pattern',
      pattern: '%[[%d] [%z] [%p]%] - %m',
    }
  }
};
