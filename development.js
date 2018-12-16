const path = require('path');
const Application = require('thinkjs');
const watcher = require('think-watcher');
// const babel = require('think-babel');
// const notifier = require('node-notifier');

const instance = new Application({
  ROOT_PATH: __dirname,
  APP_PATH: path.join(__dirname, 'src'), // 配置项目运行的路径，开启babel转译时，应为/app
  watcher: watcher,
  /* transpiler: [babel, {
    presets: ['think-node']
  }], */
  /* notifier: notifier.notify.bind(notifier), */
  env: 'development'
});

instance.run();
