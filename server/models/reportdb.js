import pg from 'pg';
import 'make-runnable';
import dotenv from 'dotenv';


// const { Pool } = pg;
dotenv.config();
const pool = new pg.Pool({
  connectionString: process.env.dbKey
} || {
    user: 'rex',
    host: 'localhost',
    database: 'report_db',
    password: process.env.password,
    port: 5432
  }
);


pool.on('connect', () => {
  // console.log('connected to the Database');
});

const report = async () => {
  const reportTable = `
  DROP TABLE IF EXISTS reports;
  CREATE TABLE IF NOT EXISTS reports(
    id SERIAL PRIMARY KEY,
    status VARCHAR(128) NOT NULL,
    name VARCHAR(128) NOT NULL,
    longitude VARCHAR(128) NOT NULL,
    latitude VARCHAR(128) NOT NULL,
    description VARCHAR(128) NOT NULL,
    placedBy INTEGER REFERENCES users(user_id)

  );`;
  await pool.query(reportTable).catch(err => { return err });
  // .then((pool.query('SELECT * FROM reports', (err, res) => {
  //   console.log(res.rows);
  // })))
  //   .then((res) => {
  //     console.log(res);
  //     pool.end();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     pool.end();
  //   });
};

// pool.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });

export default { pool, report };
// const config = {
//   connectionString: 'postgres://localhost:5432/report'
// };

// const pool = new pg.Client(config);

// // pool.on('connect', () => {
// // });

// pool.connect();
// const query = pool.query(
//   // async () => {
//   // const report =
//   `CREATE TABLE IF NOT EXISTS
//   reports(
//     id SERIAL PRIMARY KEY,
//     status VARCHAR(128) NOT NULL,
//     name VARCHAR(128) NOT NULL,
//     longitude VARCHAR(128) NOT NULL,
//     latitude VARCHAR(128) NOT NULL,
//     description VARCHAR(128) NOT NULL
//   )`
// );
// query.on('end', () => { pool.end(); });

// // const result = await pool.query(report).catch(err =>{console.log(err)});

// // console.log(result);
// // };

// export default { query, pool };


// const report = [
//   {
//     id: 1,
//     name: 'Bad roads',
//     status: 'Drafted',
//     latitude: 123.3434,
//     longitude: 99.0987,
//     description: 'The bad road has moved from bad to worse',
//   },
//   {
//     id: 2,
//     name: 'Corrupt Govrnment Officials',
//     status: 'Resolved',
//     latitude: 20.098,
//     longitude: 44.567,
//     description: 'LASTMA officials are busy collecting bribes rather than doing their jobs',
//   }
// ];

// export default report;
