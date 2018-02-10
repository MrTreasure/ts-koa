import cryptoUtil from '../src/util/cryptoUtil'
import mongo from '../src/db/mongoDb'
import * as crypto from 'crypto'

let word = 'Sunshine'

describe('Mongodb', () => {
  test('sha256', () => {
    let sha = crypto.createHash('sha256')
    sha.update(word)
    let key = sha.digest('hex')
    console.log(key)
    expect(key).not.toBeNull()
  })

  test('public', () => {
    
  })
})

