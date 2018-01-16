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

const ResumeCon = {
  getInfo,
  getMySql,
  addScore
}

export default ResumeCon;