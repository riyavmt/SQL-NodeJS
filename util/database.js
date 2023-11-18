const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'sql-nodejs',
    password: process.env.PASSWORD
});

module.exports=pool.promise();