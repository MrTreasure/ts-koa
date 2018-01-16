const Joi = require('joi');

const schema = {
  name: Joi.string().min(3).max(10),
  password: Joi.string().min(5).max(20).required(),
  age: Joi.number().min(0).max(100)
}

const test = {
  name: '1',
  password: '2',
  age: 22
}

const test2 = {
  name: 'Treasure',
  password: 'Sunshine',
  age: 22
}

const test3 = {
  password: 'Sunshine',
  age: 22
}

let result = Joi.validate(test, schema);
let result2 = Joi.validate(test2, schema);
let result3 =Joi.validate(test3, schema);

// result.then(res => {
//   console.log('success', res)
// }).catch(err => {
//   console.warn('error', err);
// })

// result2.then(res => {
//   console.log('success', res)
// }).catch(err => {
//   console.log('error', err)
// })

result3.then(res => {
  console.log('success', res);
}).catch(err => {
  console.warn('error', err);
})