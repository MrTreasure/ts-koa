import * as joi from 'joi';
import * as Koa from 'koa';

export const validator = (schema: joi.SchemaLike, options: joi.ValidationOptions = {}) => {
  return async (ctx: Koa.Context, next) => {
    try {
      await joi.validate(ctx.request['body'], schema, options);
      await next();
    } catch (error) {
      ctx.throw(400, error);
    }
  }
}