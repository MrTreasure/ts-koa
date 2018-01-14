import * as Koa from 'koa';

const getInfo = async (ctx: Koa.Context) =>{
  let user = await ctx.mongo.find({tbName: 'user', terms: {name: 'Treasure'}}, true);
  ctx.body = user;
}

const ResumeCon = {
  getInfo
}

export default ResumeCon;