import local from 'passport-local';
import bcrypt from 'bcryptjs';
import users from '../models/userdb';

const localStrategy = local.Strategy;

const { pool } = users;


class Passport {
    static checkAuth() {
        passport.use(new localStrategy((username, password, done) => {
            pool.connect((err, client, done) => {
                const query = 'SELECT * FROM users WHERE username=$1';
                const values = [username];
                client.query(query, values, (error, result) => {
                    done();
                    if (result.rowCount === 0 || err) {
                        return res.json({
                            message: 'Pls, enter a valid username'
                        });
                    }
                    bcrypt.compare(password, result.rows[0].password).then(isMatch => {
                        if (isMatch) {
                            const admin = result.rows[0].is_admin;
                            if (admin === true) {
                                jwt.sign({ username, password, admin }, process.env.secretKey, (err, token) => res.json({
                                    greeting: 'Welcome, Admin',
                                    // Wrote the token to file so that it can be fetched from it
                                    token: fs.writeFile('token.txt', token, (err) => {
                                        if (err) throw err;
                                    })
                                }));
                            }

                            jwt.sign({ username, password, admin }, process.env.secretKey, (err, token) => res.json({
                                greeting: 'Welcome, User',
                                // Wrote the token to file so that it can be fetched from it
                                token: fs.writeFile('token.txt', token, (err) => {
                                    if (err) throw err;
                                })
                            }));
                        } else {
                            res.status(400).json({
                                err: 'password is not correct'
                            })
                        }
                    });
                });
            });

        }));
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {

            pool.connect((err, client, done) => {
                const query = 'SELECT * FROM users WHERE username=$1';
                const values = [username];
                client.query(query, values, (error, result) => {
                    done();
                    if (result.rowCount === 0 || err) {
                        return res.json({
                            message: 'Pls, enter a valid username'
                        });
                    }
                    bcrypt.compare(password, result.rows[0].password).then(isMatch => {
                        if (isMatch) {
                            const admin = result.rows[0].is_admin;
                            if (admin === true) {
                                jwt.sign({ username, password, admin }, process.env.secretKey, (err, token) => res.json({
                                    greeting: 'Welcome, Admin',
                                    // Wrote the token to file so that it can be fetched from it
                                    token: fs.writeFile('token.txt', token, (err) => {
                                        if (err) throw err;
                                    })
                                }));
                            }

                            jwt.sign({ username, password, admin }, process.env.secretKey, (err, token) => res.json({
                                greeting: 'Welcome, User',
                                // Wrote the token to file so that it can be fetched from it
                                token: fs.writeFile('token.txt', token, (err) => {
                                    if (err) throw err;
                                })
                            }));
                        } else {
                            res.status(400).json({
                                err: 'password is not correct'
                            })
                        }
                    });
                });
            });

        })
    }
}