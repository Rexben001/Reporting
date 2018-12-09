import express from 'express';
import bodyParser from 'body-parser';
import users from './models/db';

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

router.get('/users', (req, res) => {
  return res.json({
    users
  });

});

app.use('/api/v1', router);

app.listen(3000, () => {
  console.log('Listening to PORT 3000');
});
