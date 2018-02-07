import * as path from 'path';

import * as Koa from 'koa';
// import * as bodyParser from 'koa-body-parser';
import * as bodyParser from 'koa-body';
import * as responseTime from 'koa-response-time';
import * as helmet from 'koa-helmet';
import * as koaStatic from 'koa-static';
import * as logger from 'koa-logger';
import * as nunjucks from 'koa-nunjucks-2';

import myLogger from './middleware/logger';
import logUtil from './util/logUtil';

import config from './config';
import ResumeRouter from './routes/resume';
import UserRouter from './routes/users';

const { serverConfig } = config;

const app = new Koa();

app.on('error', err => {
  logUtil.logError(logUtil.formatSystemErr(err));
})

if(process.env.NODE_ENV == 'development') {
  app.use(logger());
  console.log(process.env.NODE_ENV);
}
app.use(myLogger());
app.use(responseTime());
app.use(helmet());
app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, './views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}));
app.use(bodyParser({
  multipart: true,
  formLimit: '1mb',
  formidable: {
    maxFieldsSize: 2 * 1024 * 1024
  }
}));
app.use(koaStatic(path.join(__dirname, 'public')));

app.use(ResumeRouter.routes());
app.use(UserRouter.routes());

const server = app.listen(serverConfig.port, () => {
  let addr = server.address();
  console.log(`service running at ${addr.address}:${addr.port}`);
})
export default server;

