import * as joi from 'joi';
import * as Koa from 'koa';
import config from '../config';


/**
 * 
 * @param {joi.Schema} schema 
 * @param {joi.ValidationOptions} opt
 * @returns {async function} 
 */
export const validator = (schema: joi.SchemaLike, opt: joi.ValidationOptions = {}) => {
  return async (ctx: Koa.Context, next) => {
    try {
      console.log('here', ctx.request['body']);
      let options = Object.assign({}, config.joiOptions, opt)
      await joi.validate(ctx.request['body'], schema, options);
      await next();
    } catch (error) {
      // ctx.throw(400, {code: 400, status: 'error', message: error});
      ctx.status = 400;
      ctx.body = {code: 400, status: 'error', message: error};
    }
  }
}