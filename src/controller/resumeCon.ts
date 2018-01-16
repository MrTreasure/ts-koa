import * as Koa from 'koa';
import mongoDb from '../db/mongoDb';
import mysql from '../db/mysql';

const getInfo = async (ctx: Koa.Context) => {
  let user = await mongoDb.findOne('user', { name: 'Treasure' });
  ctx.body = user;
}

const getMySql = async (ctx: Koa.Context) => {
  let data = await mysql.execteQuery('SELECT * FROM student', {});
  ctx.body = data;
}

const ResumeCon = {
  getInfo,
  getMySql
}

export default ResumeCon;