const mysql = require('koa-mysql');

function query(sql: string) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'caramella',
        database: 'donghun',
        port: 3306
    });

    try {
        const result = connection.query(sql);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function getBoard() {
    return await query("SELECT * FROM BlogContent");
}

module.exports = {
    getBoard
}