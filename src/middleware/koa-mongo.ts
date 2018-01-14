import { getMongo } from '../db/dbMongo';

export function koaMongo () {
  return async (ctx, next) => {
    let mongo = await getMongo();
    ctx.mongo = mongo;
    await next();
  }
}