import * as path from 'path';

import * as Koa from 'koa';
import * as bodyParser from 'koa-body-parser';
import * as responseTime from 'koa-response-time';
import * as helmet from 'koa-helmet';
import * as koaStatic from 'koa-static';
import * as logger from 'koa-logger';

import config from './config';
import router from './routes/resume';

const { serverConfig } = config;

const app = new Koa();

if(process.env.NODE_ENV == 'development') {
  app.use(logger());
  console.log(process.env.NODE_ENV);
}
app.use(responseTime());
app.use(helmet());
app.use(bodyParser());
app.use(koaStatic(path.join(__dirname, 'public')));
app.use(router.routes())
const server = app.listen(serverConfig.port, () => {
  let addr = server.address();
  console.log(`service running at ${addr.address}:${addr.port}`);
})