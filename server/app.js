import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import reportdb from './model/reportdb';
import userdb from './model/userdb';
import cors from 'cors';
import path from 'path';
import router from './route/route';

const users = userdb.users();
const reports = reportdb.reports();

const app = express();
// const router = express.Router();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/../ui')));

// router.get('/users', userss.getUsers());

app.get('/', (req, res) => {
  // console.log(__dirname);
  res.sendFile(path.join(__dirname, 'index.html'));
});

// db.authenticate()
//   .then(() => console.log('Database connected'))
//   .catch(e => (console.log(e)));

// const migrate = async () => {
//   await createUser();
//   await createReport();
// };
// migrate();


const createTable = async () => {
  await users;
  await reports;
};

createTable();
app.use('/api/v1', router);

app.listen(process.env.PORT || 3001, () => {
  console.log('Started');
});

export default app;
