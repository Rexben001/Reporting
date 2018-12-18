import pg from 'pg';

const config = {
  connectionString: 'postgres://localhost:5432/report'
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
});

const createUser = async () => {
  const user = `CREATE TABLE IF NOT EXISTS 
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
    is_admin BOOLEAN
    UNIQUE(username, email)
  )`;

  const result = await pool.query(user);

  console.log(result);
};

export default { createUser, pool };


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
