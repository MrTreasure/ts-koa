import * as Koa from 'koa';
import mongoDb from '../db/mongoDb';
import redis from '../db/RedisClient';

const EXPIRE_TIME = 120; // 秒

const addUser = async (ctx: Koa.Context) => {
  console.log('go here');
  try {
    let result = await mongoDb.insertOne('user', ctx.request['body']);
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
}

const login = async (ctx: Koa.Context) => {
  let user = ctx.request['body'];
  try {
    let redisRes = await redis.get(user.username);
    if(redisRes) {
      let data = {
        message: 'login success',
        from: 'redis',
        data: JSON.parse(redisRes)
      }
<<<<<<< HEAD
      return ctx.body = data; 
    } 
=======
      ctx.body = data;
      return; 
    }
>>>>>>> ff94b1c6ec96f4e8480cb8f6c0e9b5c0e34bc4ad
    let mongoRes = await mongoDb.findOne('user',{username: user.username});
    if(mongoRes) {
      let data = {
        message: 'login success',
        from: 'mongodb',
        data: mongoRes.result
      }
      redis.setex(user.username, EXPIRE_TIME, JSON.stringify(user));
<<<<<<< HEAD
      return ctx.body = data; 
    }
    let data = {
      message: 'login faild'
    };
    ctx.body = data;

=======
      ctx.body = data;
      return; 
    }
    ctx.body = { message: 'login faild' };
>>>>>>> ff94b1c6ec96f4e8480cb8f6c0e9b5c0e34bc4ad
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
}

export default {
  addUser,
  login
}