import pg from 'pg';
import 'make-runnable';
import dotenv from 'dotenv';


dotenv.config();



const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
// {
//   user: 'rex',
//   host: 'localhost',
//   database: 'report_db',
//   password: process.env.password,
//   port: 5432
// }

pool.on('connect', () => {
    // console.log('connected to the Database');
});

const reports = async () => {
    const reportTable = `
  CREATE TABLE IF NOT EXISTS 
  reports(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    status VARCHAR(128) NOT NULL,
    latitude VARCHAR(128) NOT NULL,
    longitude VARCHAR(128) NOT NULL,
    description VARCHAR(128) NOT NULL,
    time DATE NOT NULL DEFAULT CURRENT_DATE,
    placedby INTEGER REFERENCES users(user_id)
  );`;
    await pool.query(reportTable)
        .then((res) => {
            console.log('Report table created');
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

// pool.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });

export default { pool, reports };
