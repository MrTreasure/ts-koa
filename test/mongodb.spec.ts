import mongoDb from '../src/db/mongoDb';
afterAll(() => {
  return mongoDb.getCollenction('user').then(collection => collection.drop());
})

describe.only('Mongodb', () => {
  test('find', async () => {
    let res = await mongoDb.findOne('user', { username: 'Treasure' });
    console.log(res);
    expect(res).toBeNull();
  });

  test('insert many', async () => {
    let people = [
      {
        name: '徐菡'
      },
      {
        name: '张宇翔'
      },
      {
        name: '牟月章'
      },
      {
        name: '董浩然'
      }
    ];
    let res = await mongoDb.insertMany('user', people);
    console.log(res);
    expect(res.insertedCount).toBe(4);
  })
})