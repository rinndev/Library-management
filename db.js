const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "perpustakaan"
});

db.connect(err=>{
    if(err){
        console.log(err);
    }else{
        console.log("Database Terhubung");
    }
});

module.exports = db;