import * as Koa from 'koa';
import mongoDb from '../db/mongoDb';

const getInfo = async (ctx: Koa.Context) =>{
  let user = await mongoDb.findOne('user', { name: 'Treasure' });
  ctx.body = user;
}

const ResumeCon = {
  getInfo
}

export default ResumeCon;