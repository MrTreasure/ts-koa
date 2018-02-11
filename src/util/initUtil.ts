import * as Koa from 'koa'
import * as fs from 'fs-extra'
import * as path from 'path'

export class Init {
  app: Koa
  classList: string[]
  constructor(app: Koa) {
    this.app = app
  }

  async init() {
    
  }
}