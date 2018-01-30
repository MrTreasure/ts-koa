import add from './sum';

describe('first test', () => {
  test('add operation', () => {
    expect(add(1, 2)).toBe(3);
  })
});