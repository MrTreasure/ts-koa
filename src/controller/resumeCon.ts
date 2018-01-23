import * as Koa from 'koa';
import mongoDb from '../db/mongoDb';
import mysql from '../db/mysql';
import redis from '../db/RedisClient';

import logUtil from '../common/logUtil';

const getInfo = async (ctx: Koa.Context) => {
  let user = await mongoDb.findOne('user', { username: 'Treasure' });
  ctx.body = user;
}

const getMySql = async (ctx: Koa.Context) => {
  let data = await mysql.execteQuery('SELECT * FROM student', {});
  ctx.body = data;
}

const addScore = async (ctx: Koa.Context) => {
  let sql = 'INSERT INTO score (id, stu_id, c_name, grade) VALUES(NULL, @id, @name, @grade)';
  if(ctx.request['body']) {
    try {
      let result = await mysql.excuteInsert(sql, ctx.request['body']);
      ctx.body = result;
    } catch (error) {
      ctx.status = 500;
      ctx.body = error;
    }
    
  } else {
    ctx.status = 400;
    ctx.body = 'no data';
  }  
}

const addUser = async(ctx: Koa.Context) => {
  ctx.body = 'success';
}

const saveFile = async(ctx: Koa.Context) => {
  try {
    logUtil.logInfo(JSON.stringify(ctx.res))
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
    console.log(error);
  }
}

const setRedis = async(ctx: Koa.Context) => {
  redis.setex(ctx.request['body'].key, 600, ctx.request['body'].value);
  let result = await redis.get(ctx.request['body'].key);
  ctx.body = result;
}

const ResumeCon = {
  getInfo,
  getMySql,
  addScore,
  addUser,
  saveFile,
  setRedis
}

export default ResumeCon;