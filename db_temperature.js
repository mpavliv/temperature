const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./temperature.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error(err);
});

let sql;

db.run("DROP TABLE t_data");

sql = `CREATE TABLE IF NOT EXISTs t_data(point INTEGER, datatime INTEGER, value INTEGER)`;
db.run(sql);

sql = `INSERT INTO t_data(point, datatime, value) VALUES (?, ?, ?)`;
for (let i = 0; i < 1000; i++){
  const point = Math.round(Math.random() * 5 + 1);
  const datatime = new Date();
  const value = Math.random() * 30;
  db.run(sql, [point, datatime, value], (err) => {
    if (err) return console.error(err);
  })
}
