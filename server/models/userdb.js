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
// DROP TABLE IF EXISTS users CASCADE;

const users = async () => {
  const userTable = `
  CREATE TABLE IF NOT EXISTS 
  users(
    user_id SERIAL PRIMARY KEY,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    othernames VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    username VARCHAR(128) NOT NULL,
    phone VARCHAR(128) NOT NULL,
    registered DATE,
    is_admin BOOLEAN,
    UNIQUE(username, email)
  );`;
  await pool.query(userTable)
    .then((res) => {
      console.log('User table created');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
export default { pool, users };





// pool.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });



// const users = [
//   {
//     id: 1,
//     firstname: 'Ben',
//     lastname: 'Rex',
//     othernames: 'Seyi',
//     email: 'rex@gmail.com',
//     phonenumber: '234567890',
//     username: 'Rexben',
//     registered: '12-12-12',
//     is_admin: false,
//     report: []
//   }
// ];

// export default users;
