const log4js = require('log4js');
const path = require('path');

let defaultConfig = {
  appenders: {
    example: { type: 'console' },
    file: { type: 'file', filename: 'file.log'},
    dateFile: { type: 'dateFile', filename: path.resolve(__dirname, './logs/date'), alwaysIncludePattern: true, keepFileExt: true, pattern: '-yyyy-MM-dd.log'}
  },
  categories: {
    example: { appenders: ['dateFile', 'example', 'file'], level: 'info'},
    default: { appenders: ['example'], level: 'info'}
  }
}

log4js.configure(defaultConfig);

const logger = log4js.getLogger('example');
logger.level = 'error';



logger.info(`\n----------------log start------------------\nsomething\n----------------log end-----------------`);

let str = '[1,2,3]';
console.log(str.replace(/[\[\]]/g, '').split(','));