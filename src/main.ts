import * as path from 'path';

import * as Koa from 'koa';
import * as bodyParser from 'koa-body-parser';
import * as responseTime from 'koa-response-time';
import * as helmet from 'koa-helmet';
import * as koaStatic from 'koa-static';
import * as logger from 'koa-logger';


import { koaMongo } from './middleware/koa-mongo';
import { getMongo } from './db/dbMongo';

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
// app.use(async (ctx, next) => {
//   ctx.mongo = mongo;
//   await next();
// });
app.use(koaMongo)
app.use(koaStatic(path.join(__dirname, 'public')));
app.use(router.routes())
const server = app.listen(serverConfig.port, () => {
  let addr = server.address();
  console.log(`service running at ${addr.address}:${addr.port}`);
})