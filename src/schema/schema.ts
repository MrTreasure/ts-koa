import * as joi from 'joi'
export const USER = {
  username: joi.string().min(6).max(14).required(),
  password: joi.string().regex(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/, 'password').required(),
  email: joi.string().min(2)
}