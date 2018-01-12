import * as path from 'path';

import * as Koa from 'koa';
import * as bodyParser from 'koa-body-parser';
import * as responseTime from 'koa-response-time';
import * as helmet from 'koa-helmet';
import * as koaStatic from 'koa-static';
import * as logger from 'koa-logger';


const app: Koa = new Koa();

app.use(logger());
app.use(responseTime())
app.use(helmet());
app.use(bodyParser());
app.use(koaStatic(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));

const server = app.listen(1002, () => {
  let addr = server.address();
  console.log(`service running at ${addr.address}:${addr.port}`);
})