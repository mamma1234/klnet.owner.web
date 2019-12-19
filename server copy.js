const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const md5 = require("md5");
const pg = require('pg');

const config = {
    host: '172.19.1.22',
    user: 'dev',     
    password: 'DEV',
    database: 'postgres',
    port: 5432,
    ssl: true
};

const client = new pg.Client(config);

client.connect(err => {
    if (err) throw err;
    else {
        queryDatabase();
    }
});

function queryDatabase() {
    const query = `
        DROP TABLE IF EXISTS inventory;
        CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
        INSERT INTO inventory (name, quantity) VALUES ('banana', 150);
        INSERT INTO inventory (name, quantity) VALUES ('orange', 154);
        INSERT INTO inventory (name, quantity) VALUES ('apple', 100);
    `;

    client
        .query(query)
        .then(() => {
            console.log('Table created successfully!');
            client.end(console.log('Closed client connection'));
        })
        .catch(err => console.log(err))
        .then(() => {
            console.log('Finished execution, exiting now');
            process.exit();
        });
}




// const db = new sqlite3.Database(DBSOURCE, err => {
//   if (err) {
//     // Cannot open database
//     console.error(err.message);
//     throw err;
//   } else {
//     console.log("Connected to the SQLite database.");
//     db.run(
//       `CREATE TABLE user (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name text, 
//             email text UNIQUE, 
//             password text, 
//             CONSTRAINT email_unique UNIQUE (email)
//             )`,
//       err => {
//         if (err) {
//           // Table already created
//         } else {
//           // Table just created, creating some rows
//           var insert =
//             "INSERT INTO user (name, email, password) VALUES (?,?,?)";
//           db.run(insert, ["admin", "admin@example.com", md5("admin123456")]);
//           db.run(insert, ["user", "user@example.com", md5("user123456")]);
//         }
//       }
//     );
//   }
// });

app.get("/api/customers", (req, res) => {
    var sql = "SELECT * FROM CUSTOMER"
    var params = []    
    client.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.send(rows);
        // res.json({
        //     "message":"success",
        //     "data":rows
        // })
      });

  // res.send([
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
});

app.listen(port, () => console.log(`Listening on port ${port}`));
// module.exports = db
