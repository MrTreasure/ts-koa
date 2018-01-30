import * as crypto from "crypto";
import config from '../config';
import { v4 } from 'uuid';

/**
 * sha1加密
 * @param {string} str 需要加密的字符串
 * @param {string?} key 加密的key 默认在config
 */
function sha1(str: string, key?:string): string {
  let sha1 = crypto.createHmac('sha1', key || config.keyword);
  sha1.update(str);
  return sha1.digest('hex');
}

/**
 * MD5加密
 * @param {string} str 需要加密的字符串
 * @param {string?} key 加密的key 默认在config
 */
function md5(str: string, key?:string): string {
  let sha1 = crypto.createHmac('sha1', key || config.keyword);
  sha1.update(str);
  return sha1.digest('hex');
}

/**
 * 返回UUID用于生成Token
 */
function uuid(): string {
  return v4();
}

export default {
  sha1,
  md5
}