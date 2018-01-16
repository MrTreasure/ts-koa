import { createPool } from 'mysql2';
import { Pool } from '../../node_modules/_@types_mysql@2.15.2@@types/mysql';
import config from '../config';
import { MysqlClient } from './MysqlClient';

const { mysqlConfig } = config;

const pool: Pool = createPool({
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  debug: false,
  database: mysqlConfig.database,
  connectionLimit : mysqlConfig.connectionLimit
})

const mysql = new MysqlClient(pool);

export default mysql;