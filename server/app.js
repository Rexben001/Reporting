import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

router.get('/ben', (req, res) => {
  res.json('Hello World!'); 
});

app.use('/api', router);

app.listen(3000, () => {
  console.log('Listening to PORT 3000');
});
