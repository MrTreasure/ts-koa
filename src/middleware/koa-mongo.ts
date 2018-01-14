import { getMongo } from '../db/dbMongo';

let mongo = Object.create(null);

// 这里不能return一个函数，避免每次都创建一个mongodb连接
export async function koaMongo (ctx, next) {
    mongo = await getMongo();
    ctx.mongo = mongo;
    await next();
}