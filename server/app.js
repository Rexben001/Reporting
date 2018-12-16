import express from 'express';
import bodyParser from 'body-parser';
import router from './route/route';


const app = express();
// const router = express.Router();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

// router.get('/users', userss.getUsers());

app.get('/', (req, res) => res.status(200).json({
  success: true,
  message: 'Reporting Inc',
}));

app.use('/api/v1', router);

app.listen(process.env.PORT || 3000);


export default app;
