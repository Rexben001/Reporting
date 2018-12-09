import express from 'express';
import bodyParser from 'body-parser';
import users from './models/db';
import userss from './controllers/users';

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

router.get('/users', userss.getUsers());


router.post('/users', (req, res) => {
  const {
     id, firstname, lastname, othernames, email, phonenumber, username, registered, is_admin 
  } = req.body;
  const user = {
    id,
    firstname,
    lastname,
    othernames,
    email,
    phonenumber,
    username,
    registered,
    is_admin
  };
  users.push(user);
  return res.json({
    user,
    users
});
});


app.use('/api/v1', router);

app.listen(3000, () => {
  console.log('Listening to PORT 3000');
});


export default app;