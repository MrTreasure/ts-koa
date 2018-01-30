
function timerGame(callback) {
  console.log('Ready go');
  setTimeout(() => {
    console.log('Times up -- stop!');
    callback && callback();
  }, 1000)
}

jest.useFakeTimers();

test('wait 1 second before ending the game', () => {
  timerGame();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
})