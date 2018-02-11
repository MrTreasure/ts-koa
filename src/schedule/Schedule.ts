import * as Koa from 'koa'

const schedules = 'schedules'

export abstract class Schedule {
  private app: Koa
  name: string
  constructor(app: Koa, name: string) {
    this.app = app
    this.name = name
  }
  abstract init(): NodeJS.Timer

  start(): void {
    let timer = this.init()
    this.app[schedules].push({ name: this.name, id: timer })
  }
}