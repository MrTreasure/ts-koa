const mysql = require('../dist/db/mysql');

console.log(mysql);

async function start() {
  let sql = 'INSERT INTO @score VALUES(NULL, @id, @name, @grade)';
  let params = {score: 'score', id: 1001, name: '前端', grade: 100};
  let result = await mysql.excuteInsert(sql, params);
  console.log(result);
}

start();