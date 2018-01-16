import { Connection, Pool, ConnectionConfig, PoolConnection } from 'mysql'
import { read } from 'fs';
export class MysqlClient {
  pool: Pool;

  constructor(pool: Pool) {
   this.pool = pool;
  }

  /**
   * Get db connection
   * @returns {Promise<PoolConnection>} Return connection;
   */
  getConnection(): Promise<PoolConnection> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, conn) => {
        if(err) {
          return reject(err);
        }
        resolve(conn);
      }); 
    })
  }

  /**
   * Release connection
   * @param {PoolConnection} conn 
   * @param {boolean} closeTran 
   */
  private releaseConnection(conn: PoolConnection, closeTran = false): void {
    if(closeTran) {
      conn['inTransation'] = false;
    }
    conn.release();
  }

  /**
   * Begin database transaction
   */
  beginTransaction(): Promise<any> {
    return this.getConnection().then((conn: PoolConnection) => {
      return new Promise((resolve, reject) => {
        conn.beginTransaction(err => {
          if(err) {
            return reject(err);
          }
          conn['inTransaction'] = true;
          resolve(conn);
        })
      })
    })
  }

  commitTransaction(conn: PoolConnection): Promise<void> {
    return new Promise((resolve, reject) => {
      conn.commit(err => {
        if(err) {
          conn.rollback(() => {
            this.releaseConnection(conn, true);
            resolve();
          })
        }
      })
    })
  }

  private execute(sqlString, values, conn: PoolConnection) {

  }

  execteQuery(sqlString: string, values, conn: PoolConnection = null) {

  }

  /**
   * Format params
   * @param {string} sqlString 
   * @param {Array<any> | object} params 
   */
  private processSqlAndParameter(sqlString: string, params: Array<any> | object): {sql: string, params:Array<any>} {
    let result;
    if(Array.isArray(params)) {
      result = {
        sql: sqlString,
        params: params.slice()
      };
    } else {
      let paramArr = [];
      if(params) {
        let paramKeys = Object.keys(params);
        sqlString = sqlString.replace(/@[a-zA-Z0-9_]+/g, (match, offset, str) => {
          let matchKey = match.replace('@', '');
          if (paramKeys.indexOf(matchKey) >= 0) {
            paramArr.push(params[matchKey]);
            return '?';
          }
          return match;
        });
      }
      result = {
        sql: sqlString,
        params: paramArr
      }
    }
    return result;
  }


}