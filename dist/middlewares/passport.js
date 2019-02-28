"use strict";

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _userdb = _interopRequireDefault(require("../models/userdb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var localStrategy = _passportLocal.default.Strategy;
var pool = _userdb.default.pool;

var Passport =
/*#__PURE__*/
function () {
  function Passport() {
    _classCallCheck(this, Passport);
  }

  _createClass(Passport, null, [{
    key: "checkAuth",
    value: function checkAuth() {
      passport.use(new localStrategy(function (username, password, done) {
        pool.connect(function (err, client, done) {
          var query = 'SELECT * FROM users WHERE username=$1';
          var values = [username];
          client.query(query, values, function (error, result) {
            done();

            if (result.rowCount === 0 || err) {
              return res.json({
                message: 'Pls, enter a valid username'
              });
            }

            _bcryptjs.default.compare(password, result.rows[0].password).then(function (isMatch) {
              if (isMatch) {
                var admin = result.rows[0].is_admin;

                if (admin === true) {
                  jwt.sign({
                    username: username,
                    password: password,
                    admin: admin
                  }, process.env.secretKey, function (err, token) {
                    return res.json({
                      greeting: 'Welcome, Admin',
                      // Wrote the token to file so that it can be fetched from it
                      token: fs.writeFile('token.txt', token, function (err) {
                        if (err) throw err;
                      })
                    });
                  });
                }

                jwt.sign({
                  username: username,
                  password: password,
                  admin: admin
                }, process.env.secretKey, function (err, token) {
                  return res.json({
                    greeting: 'Welcome, User',
                    // Wrote the token to file so that it can be fetched from it
                    token: fs.writeFile('token.txt', token, function (err) {
                      if (err) throw err;
                    })
                  });
                });
              } else {
                res.status(400).json({
                  err: 'password is not correct'
                });
              }
            });
          });
        });
      }));
      passport.serializeUser(function (user, done) {
        done(null, user.id);
      });
      passport.deserializeUser(function (id, done) {
        pool.connect(function (err, client, done) {
          var query = 'SELECT * FROM users WHERE username=$1';
          var values = [username];
          client.query(query, values, function (error, result) {
            done();

            if (result.rowCount === 0 || err) {
              return res.json({
                message: 'Pls, enter a valid username'
              });
            }

            _bcryptjs.default.compare(password, result.rows[0].password).then(function (isMatch) {
              if (isMatch) {
                var admin = result.rows[0].is_admin;

                if (admin === true) {
                  jwt.sign({
                    username: username,
                    password: password,
                    admin: admin
                  }, process.env.secretKey, function (err, token) {
                    return res.json({
                      greeting: 'Welcome, Admin',
                      // Wrote the token to file so that it can be fetched from it
                      token: fs.writeFile('token.txt', token, function (err) {
                        if (err) throw err;
                      })
                    });
                  });
                }

                jwt.sign({
                  username: username,
                  password: password,
                  admin: admin
                }, process.env.secretKey, function (err, token) {
                  return res.json({
                    greeting: 'Welcome, User',
                    // Wrote the token to file so that it can be fetched from it
                    token: fs.writeFile('token.txt', token, function (err) {
                      if (err) throw err;
                    })
                  });
                });
              } else {
                res.status(400).json({
                  err: 'password is not correct'
                });
              }
            });
          });
        });
      });
    }
  }]);

  return Passport;
}();