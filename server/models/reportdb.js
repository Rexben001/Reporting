import pg from 'pg';
import 'make-runnable';
import dotenv from 'dotenv';


// const { Pool } = pg;
dotenv.config();
// const { Pool } = pg;

const pool = new pg.Pool({
  connectionString: process.env.dbKey
} || {
  user: 'rex',
  host: 'localhost',
  database: 'report_db',
  password: process.env.password,
  port: 5432
});

pool.on('connect', () => {
  // console.log('connected to the Database');
});
