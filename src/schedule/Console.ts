import { Schedule } from './Schedule';
import * as Koa from 'koa'


export class Console extends Schedule {
  constructor(app: Koa, name = 'Console') {
    super(app, name)
  }

  init(): NodeJS.Timer {
    return global.setInterval(() => {
      console.log(new Date())
    }, 20000)
  }
}