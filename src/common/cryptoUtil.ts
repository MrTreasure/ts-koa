import * as crypto from "crypto";
import { v4 } from 'uuid';
import { Buffer } from "buffer";

/**
 * sha1加密
 * @param {string} str 需要加密的字符串
 * @param {string?} key 加密的key 默认在config
 */
function sha1(str: string, key?:string): string {
  let sha1 = crypto.createHmac('sha1', key);
  sha1.update(str);
  return sha1.digest('hex');
}

/**
 * MD5加密
 * @param {string} str 需要加密的字符串
 * @param {string?} key 加密的key 默认在config
 */
function md5(str: string, key?:string): string {
  let sha1 = crypto.createHmac('sha1', key);
  sha1.update(str);
  return sha1.digest('hex');
}

/**
 * 返回UUID用于生成Token
 */
function uuid(): string {
  return v4();
}

/**
 * 公钥加密
 * @param {string} plainText 待加密的密文
 * @param {string} pubkey 公钥
 * @returns {Buffer} 加密后的Buffer
 */
function encrypt(plainText: string, pubkey: string): Buffer {
  return crypto.publicEncrypt(pubkey, Buffer.from(plainText));
}

/**
 * 
 * @param {Buffer} encrypted 待解密的密文
 * @param {string} privateKey 私钥
 * @returns 明文
 */
function decrypt(encrypted: Buffer, privateKey: string): string {
  return crypto.privateDecrypt(privateKey, encrypted).toString();
}

export default {
  sha1,
  md5,
  uuid,
  encrypt,
  decrypt
}