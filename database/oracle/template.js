'use strict';

const oraclePool = require("../pool.js").oraclePool

const getTestSimple = (request, response) => {
    response.send([    
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '홍길동',
            'birthday': '961222',
            'gender': '남자',
            'job': '대학생'
        },
        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '나동빈',
            'birthday': '960508',
            'gender': '남자',
            'job': '프로그래머'
        },
        {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '이순신',
            'birthday': '961127',
            'gender': '남자',
            'job': '디자이너'
        }
    ]);
}



const getTestQuerySample = (request, response) => {
    const sql = "SELECT * FROM customer order by id asc limit 100";
    oraclePool.connect(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.query(sql, function(err,result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            // response.status(200).send(result.rows);
            response.status(200).json(result.rows);
        });

        // conn.release();
    });
}


module.exports = {
    getTestSimple,
    getTestQuerySample,
}