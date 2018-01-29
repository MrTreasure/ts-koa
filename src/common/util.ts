import * as crypto from "crypto";
import config from '../config';
import { uuidV4 } from 'uuid';

function sha1(str: string, key?:string): string {
  let sha1 = crypto.createHmac('sha1', key || config.keyword);
  sha1.update(str);
  return sha1.digest('hex');
}

function md5(str: string, key?:string): string {
  let sha1 = crypto.createHmac('sha1', key || config.keyword);
  sha1.update(str);
  return sha1.digest('hex');
}

function uuid(): string {
  return uuidV4();
}

export default {
  sha1,
  md5
}