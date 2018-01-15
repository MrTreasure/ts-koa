import { getMongo } from '../db/dbMongo';

let mongo = Object.create(null);

let symbol = Symbol('mongo');

// 这里不能return一个函数，避免每次都创建一个mongodb连接
export function koaMongo () {
    
    return async (ctx, next) => {
      if(!global[symbol]) {
        global[symbol] = await getMongo();
      }
      ctx.mongo= global[symbol];
      await next();
    }
}