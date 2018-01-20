import * as path from 'path';

import * as Koa from 'koa';
import * as bodyParser from 'koa-body-parser';
import * as responseTime from 'koa-response-time';
import * as helmet from 'koa-helmet';
import * as koaStatic from 'koa-static';
import * as logger from 'koa-logger';

import myLogger from './middleware/logger';
import logUtil from './common/logUtil';

import config from './config';
import router from './routes/resume';

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
app.use(bodyParser());
app.use(koaStatic(path.join(__dirname, 'public')));
app.use(router.routes())
const server = app.listen(serverConfig.port, () => {
  let addr = server.address();
  console.log(`service running at ${addr.address}:${addr.port}`);
})