import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import router from './route/route';
import userdb from './models/userdb';
import reportsdb from './models/reportdb';

const { users } = userdb;
const { reports } = reportsdb;

const app = express();
// const router = express.Router();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../ui')));

// router.get('/users', userss.getUsers());

app.get('/', (req, res) => {
  // console.log(__dirname);
  res.sendFile(path.join(__dirname, 'index.html'));
});

// app.use('*', (req, res) => {
//   // console.log(__dirname);
//   res.status(404).json({
//     error: 'Error 404 \nPage not found'
//   });
// });
// res.status(200).json({
// success: true,
// message: 'Reporting Inc',


// const migrate = async () => {
//   await createUser();
//   await createReport();
// };
// migrate();
const createTable = async () => {
  await users();
  await reports();
};

createTable();
app.use('/api/v1', router);

app.listen(process.env.PORT || 3000, () => {
  console.log('Started');
});


export default app;
