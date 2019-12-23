const oracledb = require('oracledb');

async function init() {
    try {
        await oracledb.createPool({
            user          : "nplism",
            password      : "wjrgkahrfhr_1",
            // connectString : "172.21.1.202:7527/ORAKLDB",
            connectString : "172.19.1.103:7527/ORAKLDB",
            poolMax: 30,
            poolMin: 10,
            poolIncrement: 5,
            poolTimeout: 4
        });
        console.log('connection pool started');
        await dostuff();
    } catch (err) {
        console.error(err.message);
    } finally {
        // await closePoolAndExit();
    }
}

let pool;
async function dostuff(){
    let connection;
    try{
        connection = await oracledb.getConnection();
        // console.log(connection);
        const sql = 'SELECT sysdate FROM dual WHERE :1 = 1';
        const binds = [1];
        const options = {outFormat:oracledb.OUT_FORMAT_OBJECT};
        const result = await connection.execute(sql, binds, options);
        // console.log(connection);
        pool = await oracledb.getConnection();
        console.log(result);
    } catch(err) {
        console.error(err);
    } finally {
        console.log(connection)
        if (connection) {
            try {
                await connnection.close();
            } catch(err) {
                console.error(err);
            }
        }
    }
}

async function closePoolAndExit() {
    console.log('termination');
    try {
        await oracledb.getPool().close(10);
        console.log('Pool closed');
        process.exit(0);

        
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

// process.once('SIGTERM', closePoolAndExit).once('SIGINT', closePoolAndExit);

init();

// module.exports = pool;