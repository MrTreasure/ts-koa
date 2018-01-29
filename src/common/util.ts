import * as crypto from "crypto";

function sha1(str: string): string {
  let sha1 = crypto.createHash('sha1');
  sha1.update(str);
  return sha1.digest('hex');
}

function sha1WithKey(str:string, key:string): string{
  let sha1 = crypto.createHmac('sha1', key);
  sha1.update(str);
  return sha1.digest('hex');
}

export default {
  sha1,
  sha1WithKey
}