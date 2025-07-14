const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    
    console.log('MySQL connected!');
    await connection.end();
  } catch (err) {
    console.error('MySQL connection failed:', err);
  }
}

testConnection();