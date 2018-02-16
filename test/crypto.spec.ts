import cryptoUtil from '../src/util/cryptoUtil'
import mongo from '../src/db/mongoDb'
import * as crypto from 'crypto'
import * as path from 'path'
import * as fs from 'fs-extra'

let word = 'Sunshine'

describe('Mongodb', () => {
  test('sha256', () => {
    let sha = crypto.createHash('sha256')
    sha.update(word)
    let key = sha.digest('hex')
    console.log(key)
    expect(key).not.toBeNull()
  })

  /** 
   * @description 私钥加密公钥解密
   */
  test('public', async () => {
    const pulicKey = await fs.readFile(path.resolve(__dirname, '../public_key.pem'))
    const privateKey = await fs.readFile(path.resolve(__dirname, '../private_key.pem'))
    const key1 = crypto.privateEncrypt(privateKey.toString(), Buffer.from(word))
    const key2 = crypto.publicDecrypt(pulicKey.toString(), key1)
    expect(key2.toString()).toBe(word)
  })
})

