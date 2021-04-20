const mysql = require('koa-mysql');

async function query(sql: string) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'caramella',
        database: 'donghun',
        port: 3306
    });

    try {
        let result = connection.query(sql);
        console.log(`SUCCESS : ${result}`);
        return result;
    } catch (error) {
        console.log(`ERROR : ${error}`);
        throw error;
    }
}


async function getBoard() {
    return await query("SELECT * FROM BlogContent");
}

module.exports = {
    getBoard
}