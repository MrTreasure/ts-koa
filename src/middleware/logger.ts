import logUtil from '../util/logUtil';
import * as Koa from 'koa';

const logger = () => {
  return async (ctx: Koa.Context, next) => {
    let start = Date.now();
    try {
      await next();
      let diff = Date.now() - start;
      logUtil.logRes(logUtil.formatRes(ctx, diff));

    } catch (error) {
      let diff = Date.now() - start;
      logUtil.logError(logUtil.formatErr(ctx, error, diff));
      ctx.body = error;
    }
  }
}

export default logger;