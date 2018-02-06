import util from '../src/util/cryptoUtil';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as crypto from "crypto";

let keyword = '始终相信美好的事情即将发生';

describe.only('util test', () => {
  test('public', async () => {
    let key1 =  await fs.readFile(path.resolve(__dirname, '../public_key.pem'));
    let key2 = await fs.readFile(path.resolve(__dirname, '../private_key.pem'));
    expect(key1).not.toBeNull();
    expect(key2).not.toBeNull();
    let buffer = util.encrypt(keyword, key1.toString());
    let keyword2 = util.decrypt(buffer, key2.toString());
    expect(keyword2).toBe(keyword);
  })

  test('hash', () => {
    let keyword1 = util.sha1(keyword, '');
    let keyword3 = util.sha1(keyword, '');
    let sha1= crypto.createHash('sha1');
    let keyword2 = sha1.update(keyword).digest('hex');
    expect(keyword1).toBe(keyword3);
  })
})