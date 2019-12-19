const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const md5 = require("md5");
const { Pool } = require('pg');
// const dotenv = require('dotenv');

// dotenv.config();


const config = {
  host: '172.19.1.22',
  user: 'dev',     
  password: 'dev',
  database: 'dev',
  port: 5432,
  ssl: true
};


const connUrl = `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`


const pool = new Pool({
  connectionString: connUrl
})

pool.on(`connect`, () => {
  console.log(`connected to the db`);
});


/**
 * Create Tables
 */
// const createTables = () => {
//   const queryText =
//     `CREATE TABLE IF NOT EXISTS
//       reflections(
//         id UUID PRIMARY KEY,
//         success VARCHAR(128) NOT NULL,
//         low_point VARCHAR(128) NOT NULL,
//         take_away VARCHAR(128) NOT NULL,
//         created_date TIMESTAMP,
//         modified_date TIMESTAMP
//       )`;

//   pool.query(queryText)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// }

/**
 * Drop Tables
 */
// const dropTables = () => {
//   const queryText = 'DROP TABLE IF EXISTS reflections';
//   pool.query(queryText)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// }

// pool.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });

// module.exports = {
//   createTables
//   // ,dropTables
// };

// require('make-runnable');


app.get("/api/customers", (request, response) => {

  // response.send([
  //     {
  //         'id': 1,
  //         'image': 'https://placeimg.com/64/64/1',
  //         'name': '홍길동',
  //         'birthday': '961222',
  //         'gender': '남자',
  //         'job': '대학생'
  //     },
  //     {
  //         'id': 2,
  //         'image': 'https://placeimg.com/64/64/2',
  //         'name': '나동빈',
  //         'birthday': '960508',
  //         'gender': '남자',
  //         'job': '프로그래머'
  //     },
  //     {
  //         'id': 3,
  //         'image': 'https://placeimg.com/64/64/3',
  //         'name': '이순신',
  //         'birthday': '961127',
  //         'gender': '남자',
  //         'job': '디자이너'
  //     }
  // ]);

  const sql = "SELECT * FROM test_table"
  pool.query(sql, (error, results) => {
    if (error) {
      response.status(400).json({"error":error.message});
      return;
    }
    response.send(results);
    // response.send("ok");
  });
});

  //     {
  //         'id': 2,
  //         'image': 'https://placeimg.com/64/64/2',
  //         'name': '나동빈',
  //         'birthday': '960508',
  //         'gender': '남자',
  //         'job': '프로그래머'
  //     },
  //     {
  //         'id': 3,
  //         'image': 'https://placeimg.com/64/64/3',
  //         'name': '이순신',
  //         'birthday': '961127',
  //         'gender': '남자',
  //         'job': '디자이너'
  //     }

// insert into customer values('1', 'https://placeimg.com/64/64/1', '홍길동', '961222', '남자', '대학생');
// insert into customer values('2', 'https://placeimg.com/64/64/2', '나동빈', '960508', '남자', '프로그래머');
// insert into customer values('3', 'https://placeimg.com/64/64/3', '이순신', '961127', '남자', '디자이너');


app.listen(port, () => console.log(`Listening on port ${port}`));
// module.exports = db
