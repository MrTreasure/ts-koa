import * as Redis from 'ioredis';
import { Store } from 'koa-session2';

import config from '../config';

const { redisConfig } = config;

let opt = Object.assign({}, redisConfig, {db: 1});

export class SessionStore extends Store {
  redis: Redis.Redis;

  constructor() {
    super();
    this.redis = new Redis(opt);
  }

  async get(sid, ctx) {
    let data = await this.redis.get(`SESSION:${sid}`);
    return JSON.parse(data);
  }

  async set(session, { sid = '', maxAge = 30 * 60 } = {}, ctx) {
    try {
      // Use redis set EX to automatically drop expired sessions
      await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
  } catch (e) {}
      return sid;
  }

  async destroy(sid, ctx) {
    return await this.redis.del(`SESSION:${sid}`);
  }
}