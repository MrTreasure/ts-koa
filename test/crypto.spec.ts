import cryptoUtil from '../src/util/cryptoUtil'
import mongo from '../src/db/mongoDb'
import * as crypto from 'crypto'
import * as path from 'path'
import * as fs from 'fs-extra'
import { Buffer } from 'buffer';

const secret = 'Sunshine'
const salt = 'Treasure'
const plainText = '始终相信美好的事情即将发生'
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7ikxFcifEdVZ7IxSvd65vUQKx
xvYZRx+qSz0Cl1Xj+PwyT9hnw4M6rglvbjgpQhQnnumY/KkmI7CCglXVNjOI9zRA
/IfSv3juPTEFItJUcnfOtgnzDgrzMvu9gP9nH45aD5mnZd+zWaK9BSJSuOk/D6rj
Lts8Iykv1jpQ/KYFPwIDAQAB
-----END PUBLIC KEY-----`
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQC7ikxFcifEdVZ7IxSvd65vUQKxxvYZRx+qSz0Cl1Xj+PwyT9hn
w4M6rglvbjgpQhQnnumY/KkmI7CCglXVNjOI9zRA/IfSv3juPTEFItJUcnfOtgnz
DgrzMvu9gP9nH45aD5mnZd+zWaK9BSJSuOk/D6rjLts8Iykv1jpQ/KYFPwIDAQAB
AoGAQdV0nNRL/X0rVKKl+krLIyyPA5VSguEizocG7cfuUM7wyUCaOSK7CHhbu5A3
itQ1ewsf+aKIRmk05zuVofka8ZkOxfdpMgNlP1nuYD6VQHbm6ssPiZP64EX1W64G
djNnOhZjP1dR/JhEMB8tWZDdQOhwHMiTCWGMZZYXtC7aUdECQQDz05OZM2eTZkeu
5srHLVDLWrNTn6yZCnD4PA7ltyuR2uF3K/dziWaCPT6J8dblOnBKJteU0fvMiDPx
iT8KyM7LAkEAxOdPHQ6+k9s/25tpmEXibJytJ8T1HsIxFAdvuHqurjMnb3yOg2F+
0s2fBnH42nvYnJmCA2TDv39G9EczHvKA3QJAAnaCqSuBwlVoJ/Yg2j408Ljr0s5s
GeenGHrS07Mz93c0i9Wf3ETpCivAM/iDaTFb7QPTbadpWbmOfMQcJOm+XQJAMKzh
wNQpRpHXqmkz5GG6RJFCuOcWlWD6EvJ3qsohLo0UvZmz/UR3vpL4MfawxwoAlU3Z
dw9M2KUVHEQRnh/ivQJAD+U1zCsmP6J3+gWZ/lzGE+8CrfxhjywSTtEAsC1GhAA8
BnaJUPhgGM9r9N52NWb/WuhT1PgLZSlW0OhBX1/xJg==
-----END RSA PRIVATE KEY-----`

describe('密码学术语', () => {

  test('对称密码', () => {
    //TODO 没有通过测试，报错 error:06065064:digital envelope routines:EVP_DecryptFinal_ex:bad decrypt 
    const cipher = crypto.createCipher('aes-256-cbc', Buffer.from(secret))
    cipher.update(plainText, 'utf8', 'hex')
    const cipherText = cipher.final('hex')
    const deCipher = crypto.createDecipher('aes-256-cbc', Buffer.from(secret))
    deCipher.update(cipherText, 'hex', 'utf8')
    const temp = deCipher.final('utf8')
    console.log(temp)
    expect(temp).toBe(Buffer.from(plainText))
  })

  test('公钥密码', () => {
    const publicText = crypto.publicEncrypt(publicKey, Buffer.from(plainText))
    const privateText = crypto.privateDecrypt(privateKey, publicText)
    expect(privateText.toString()).toBe(plainText)
  })

  test('单向散列函数', async () => {
    const hash = crypto.createHash('sha256')
    // 一般对公钥进行散列
    hash.update(publicKey)
    const hex = hash.digest('hex')
    expect(hex).not.toBeNull()
  })

  test('消息认证码', () => {
    const hmac = crypto.createHmac('sha256', salt)
    hmac.update(plainText)
    const msg = hmac.digest('hex')
    expect(msg).not.toBeNull()
  })

  test('数字签名', () => {
    const sign = crypto.createSign('RSA-SHA256')
    const signature = sign.sign(privateKey)
    const verify = crypto.createVerify('RSA-SHA256')
    expect(verify.verify(publicKey, signature)).toBeTruthy()
  })

  test('伪随机数生成器', () => {
    const random = crypto.randomBytes(256)
    expect(random.length).toBe(256)
  })
})

