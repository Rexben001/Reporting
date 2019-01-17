import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
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

// app.use(
//   cors({
//     origin: '*',
//     methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
//     preflightContinue: false,
//     optionsSuccessStatus: 204
//   })
// );

app.use(express.static(path.join(__dirname, '/../ui')));

// router.get('/users', userss.getUsers());

app.get('/', (req, res) => {
  // console.log(__dirname);
  res.sendFile(path.join(__dirname, 'index.html'));
});

// app.all('/*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

const createTable = async () => {
  await users();
  await reports();
};

createTable();
app.use('/api/v1', router);

app.use((err, req, res, next) => {
  res.status(500).send('Something broke!')
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Started');
});

process.on('exit', () => server.close())
process.on('SIGTERM', () => server.close())
process.on('uncaughtException', () => server.close())


export default app;
