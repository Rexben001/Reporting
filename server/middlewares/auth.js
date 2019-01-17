import jwt from 'jsonwebtoken';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// console.log(process.env.secretKey);


class Auth {
  static verifyUser(req, res, next) {
    // // Read from token.txt or added manually
    // const token =
    //   fs.readFileSync('token.txt', 'utf8') ||
    //   req.headers['x-access-token'];
    // // console.log(token);

    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
      const bearerArray = bearerHeader.split(" ")
      const bearerToken = bearerArray[1]
      req.token = bearerToken

      // if (!token || token === undefined) {
      //   return res.json({
      //     success: false,
      //     message: 'No token provided.'
      //   });
      // }
      jwt.verify(req.token, process.env.secretKey, (err, decode) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to provide token.' });
        }
        req.user = decode.id,
          req.adminStatus = decode.admin
        next();
      });
    }
  }
}

export default Auth;
