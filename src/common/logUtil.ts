import * as log4js from 'log4js';
import * as Koa from 'koa';
import config from '../config';
const { logConfig }  = config;

class logUtil {
  reqLogger: log4js.Logger;
  resLogger: log4js.Logger;
  errLogger: log4js.Logger;

  constructor(req, res, err) {
    this.reqLogger = req;
    this.resLogger = res;
    this.errLogger = err;
  }

  /**
   * 打印错误日志
   * @param {Koa.Context} ctx 请求的上下文实例
   * @param {Error} err 报错信息
   * @param {number} timeDiff 接收请求到出错的时间
   */
  formatErr (ctx: Koa.Context, err: Error, timeDiff: number): string {
    let logText = `
      \n*************** error log start ***************"\n
      // todo
      
      err name: ${err.name} \n
      err message: ${err.message} \n
      err stack: ${err.stack} \n
      *************** error log end ***************\n
    `;
    return logText;
  }

  formatReq (ctx: Koa.Context, err: Error, timeDiff: number): string {
    let bodyInfo = '';
    if(ctx.request.method === 'GET') {
      bodyInfo = ctx.request.querystring;
    } else if(ctx.request.headers['Content-type'].indexOf('json') > 0) {
      bodyInfo = JSON.stringify(ctx.request['body']);
    } else {
      bodyInfo = '';
    }
    let logText = `
    request method: ${ctx.request.method} \n
    request originaUrl: ${ctx.request.originalUrl} \n
    request client ip: ${ctx.request.ip} \n
    req
    `;
    return logText;
  }
}