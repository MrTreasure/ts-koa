import * as log4js from 'log4js';
import * as Koa from 'koa';
import config from '../config';
const { logConfig }  = config;

log4js.configure(logConfig.options);

let reqLogger = log4js.getLogger('request');
reqLogger.level = logConfig.level;

let resLogger = log4js.getLogger('response');
resLogger.level = logConfig.level;

let errLogger = log4js.getLogger('error');
errLogger.level = logConfig.level;

let infoLogger = log4js.getLogger('info');
infoLogger.level = logConfig.level;

class LogUtil {
  private reqLogger: log4js.Logger;
  private resLogger: log4js.Logger;
  private errLogger: log4js.Logger;
  private infoLogger: log4js.Logger;

  constructor(req, res, err, info) {
    this.reqLogger = req;
    this.resLogger = res;
    this.errLogger = err;
    this.infoLogger = info;
  }

  /**
   * 打印错误日志
   * @param {Koa.Context} ctx 请求的上下文实例
   * @param {Error} err 报错信息
   * @param {number} timeDiff 接收请求到出错的时间
   */
  formatErr (ctx: Koa.Context, err: Error, timeDiff: number): string {
    let logText = `
      err request: \n${this.formatReq(ctx)}
      err name: ${err.name}
      err message: ${err.message}
      err stack: ${err.stack}
      *************** error log end ***************\n
    `;
    return logText;
  }

  formatSystemErr (err: Error): string {
    let logText = `
      \n*************** SystemError log start ***************"\n
      err name: ${err.name} \n
      err message: ${err.message} \n
      err stack: ${err.stack} \n
      *************** SystemError log end ***************\n
    `;
    return logText;
  }

  /**
   * 
   * @param {Koa.Context} ctx 
   */
  formatReq (ctx: Koa.Context): string {
    let date = new Date();
    let flag =ctx.request.headers['Content-type'] &&　ctx.request.headers['Content-type'].indexOf('json') > 0;
    let logText = `
    request method: ${ctx.request.method}
    request originaUrl: ${ctx.request.originalUrl}
    request client ip: ${ctx.request.ip}
    request query: ${ctx.querystring}
    requset body: ${flag ? ctx.request['body'] : null}
    requset time: ${date.toUTCString()}
    `;
    return logText;
  }

  /**
   * 
   * @param {Koa.Context} ctx 
   * @param {number} timeDiff 
   */
  formatRes (ctx: Koa.Context, timeDiff:number): string {
    let logText = `
    ${this.formatReq(ctx)}
    response status: ${ctx.status}
    response body: ${ctx.body ? JSON.stringify(ctx.body) : null}
    response time: ${timeDiff}ms
    `;
    return logText;
  }

  /**
   * 
   * @param {string} log 
   */
  logError(log: string): void {
    this.errLogger.error(log);
  }

  /**
   * 
   * @param {string} log 
   */
  logRes(log: string): void {
    console.log('log response');
    this.resLogger.info(log);
  }

  logInfo(log: string): void {
    this.infoLogger.info(log);
  }
}

export default new LogUtil(reqLogger, resLogger, errLogger, infoLogger);