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
    port: 1002
  }
}