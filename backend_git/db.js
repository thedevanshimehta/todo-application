import mysql from "mysql2/promise";
import dotenv from "dotenv";

// This line is the "key" that unlocks the .env file
dotenv.config(); 

const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

console.log('MySQL connected securely!');

export default db;