const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
//const HOST = '10.10.0.52';
const HOST = 'localhost';
let count = 1;

app.use(express.json());
app.use(cors());

const Database = require('better-sqlite3');
const e = require('express');
const db = new Database('temperature.db');

let sql;

sql = "DROP TABLE t_data";
//  db.exec(sql);

sql = `CREATE TABLE IF NOT EXISTs t_data(point INTEGER, datatime INTEGER, value REAL)`;
db.exec(sql);


app.get('/', (req, res) => {
  console.log(' / request GET');
  console.log('request', req);
  res.send('123');
});

app.get('/temperature', (req, res) => {
  console.log(' /temperature request GET', req);
  res.send('Hello World!');
});

app.get('/temperature/current', (req, res) => {
  const row = db.prepare('SELECT MAX(datatime), value FROM t_data').get();
  if (row) {
    const currentTemperature = {"point": 1, "temperature": row.value};
    res.status(200).send(JSON.stringify(currentTemperature));
  }
  else {
    res.status(400).send("Error");
  }
  console.log(' /temperature request GET', req);
  res.send('Hello World!');
});



app.post('/temperature', (req, res) => {
  count = count + 1;
  console.log(` /temperature request POST ${count}`);
  const rBody = req.body;
  console.log(rBody);
  if ("point" in rBody && "datatime" in rBody && "value" in rBody) {
    const insert = db.prepare(`INSERT INTO t_data(point, datatime, value) VALUES (?, ?, ?)`);
    const {point, datatime, value} = rBody;
    console.log(point, datatime, value);
    const now = Date.now();
    console.log(now);
    const resInsert = insert.run(point, now, value);
    console.log(resInsert);
    res.send('Inserted !');
  } else {
    res.status(400).send("Error");
  }
  
  
});


app.listen(port, HOST, () => {
  console.log(`Example app listening at http://${HOST}:${port}`);
});