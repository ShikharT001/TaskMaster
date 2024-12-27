const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
})

db.connect(e=>{
    if (e) throw e;
    console.log('Connected to the database')
});


module.exports = db;