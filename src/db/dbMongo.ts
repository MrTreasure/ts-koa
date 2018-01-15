import * as Mongodb from "mongodb";
import { MongoClient, Db } from "mongodb";
import config from '../config';

const { mongoConfig } = config;

const _defaultConfig: Object = {
  native_parser: false,
  poolSize: 10,
  connectTimeoutMS: 1000
};

/**
 * @interface IMongoResult
 * @param {number} ok 错误码
 * @param {string} es 错误原因
 * @param {any} obj 单条结果
 * @param {any[]} list 多条结果集
 */
interface IMongoResult {
  ok: number;
  es?: string;
  obj?: any;
  list?: any[];
}

/**
 * @interface Options
 * @param {string} tbName 操作的表名
 * @param {Object} terms 查询的条件
 * @param {any} data 插入的数据
 */
interface IOptions {
  tbName: string;
  terms?: Object;
  data?: any;
}

class Mongo {
  db: any;

  constructor(config:any) {
    if(!config.address) {
      config.error("不能没有数据库地址");
    } else {
      config = Object.assign({}, _defaultConfig, config);
      MongoClient.connect(config.address, _defaultConfig, (err, db) => {
        err ? config.error(err) : (this.db = db.db(config.dbName), config.success(this));
      });
    }
  }

  find(options: IOptions, isOne:Boolean): Promise<IMongoResult> {
    let self:Mongo = this;
    return new Promise((resolve, reject) => {
      try {
        let  find: string = isOne ? "findOne" : "find";
        self.db.collection(options.tbName)[find](options.terms || {}, (err: any, docs: any) => {
          err ? reject({
            ok: -1,
            es: err
          }) : isOne ? resolve({
            ok:1,
            obj: docs
          }) : docs.toArray((er, reslut) => {
            er ? reject({
              ok: -1,
              es: er
            }) : resolve({
              ok: 1,
              list: reslut
            });
          });
        });
      } catch (e) {
        reject({
          ok: -1,
          es: e
        });
      }
    });
  }

  findOne(options: IOptions): Promise<IMongoResult> {
    return this.find(options, true);
  }

  insert(options: IOptions): Promise<IMongoResult> {
    let self:Mongo = this;
    return new Promise((resolve, reject) => {
      try {
        self.db.collection(options.tbName).insert(options.data, options || {}, (err, docs) => {
          err ? reject({
            ok: -1,
            es: err
          }) : resolve({
            ok: 1,
            es: docs.result,
            obj: docs
          });
        });
      } catch (e) {
        reject({
          ok: -1,
          es: e
        });
      }
    });
  }

  update(options: IOptions): Promise<IMongoResult> {
    let self: Mongo = this;
    return new Promise((resolve, reject) => {
      try {
        self.db.collection(options.tbName).updateMany(options.terms, {
          $set: options.data
        }, (err, docs) => {
          err ? reject({
            ok: -1,
            es: err
          }) : resolve({
            ok: 1,
            es: docs.result,
            obj: docs
          })
        })        
      } catch (e) {
        reject({
          ok: -1,
          es: e
        })
      }
    })
  }

  remove(options: IOptions): Promise<IMongoResult> {
    let self:Mongo = this;
    return new Promise((resolve, reject) => {
      try {
        self.db.collection(options.tbName).remove(options.terms, (err, docs) => {
          err ? reject({
            ok: -1,
            es: err
          }) : resolve({
            ok: 1,
            es: docs.result,
            list: docs
          })
        })       
      } catch (e) {
        reject({
          ok: -1,
          es: e
        })
      }
    })
  }
}

export function getMongo(options = mongoConfig): Promise<Mongo> {
  return new Promise((resolve, reject) => {
    try {
      new Mongo(Object.assign(options, {
        success: (mongo: Mongo) => {
          resolve(mongo)
        },
        error: err => {
          reject({
            ok: -1,
            es: err
          })
        }
      }));
    } catch (error) {
      reject({
        ok: -1,
        es: error
      })
    }
  })
}