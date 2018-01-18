import * as path from 'path';

export default {
  mongoConfig: {
    address: 'mongodb://localhost:27017/',
    dbName: 'treasure'
  },
  mysqlConfig: {
    host: 'localhost',
    user: 'root',
    password: 'Sunshine',
    database: 'treasure',
    connectionLimit : 10,
    debug: process.env.NODE_ENV == 'development' ? true : false
  },
  serverConfig: {
    port: 2001
  },
  joiOptions: {
    allowUnknown: true
  },
  logConfig: {
    level: process.env.NODE_ENV == 'development' ? 'info' : 'error',
    options: {
      appenders: {
        common: {
          type: 'console'
        },
        error: {
          type: 'dateFile',
          filename: path.resolve(__dirname, '../logs/error/error'),
          pattern: '-yyyy-MM-dd.log',
          alwaysIncludePattern: true,
          daysToKeep: 7,
          keepFileExt: true
        },
        request: {
          type: 'dateFile',
          filename: path.resolve(__dirname, '../logs/HTTP/request'),
          pattern: '-yyyy-MM-dd.log',
          alwaysIncludePattern: true,
          daysToKeep: 7,
          keepFileExt: true
        },
        response: {
          type: 'dateFile',
          filename: path.resolve(__dirname, '../logs/HTTP/response'),
          pattern: '-yyyy-MM-dd.log',
          alwaysIncludePattern: true,
          daysToKeep: 7,
          keepFileExt: true
        }
      },
      categories: {
        default: { appenders: ['common'], level: 'info'},
        error: { appenders: ['error'], level: 'error'},
        request: { appenders: ['request'], level: 'info'},
        response: { appenders: ['response'], level: 'info'}
      }
    }
  }
}