import cryptoUtil from '../src/util/cryptoUtil'
import mongo from '../src/db/mongoDb'
import * as crypto from 'crypto'
import * as path from 'path'
import * as fs from 'fs-extra'

const code = 'Sunshine'
const pub = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7ikxFcifEdVZ7IxSvd65vUQKx
xvYZRx+qSz0Cl1Xj+PwyT9hnw4M6rglvbjgpQhQnnumY/KkmI7CCglXVNjOI9zRA
/IfSv3juPTEFItJUcnfOtgnzDgrzMvu9gP9nH45aD5mnZd+zWaK9BSJSuOk/D6rj
Lts8Iykv1jpQ/KYFPwIDAQAB
-----END PUBLIC KEY-----`
const pri = `-----BEGIN RSA PRIVATE KEY-----
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

  })

  test('公钥密码', () => {

  })

  test('单向散列函数', () => {

  })

  test('消息认证码', () => {

  })

  test('数字签名', () => {

  })

  test('伪随机数生成器', () => {
    
  })
})

