import reports from '../models/reportdb';

const { pool } = reports;


/**
 * @class ReporterControllers
 * @description Specifies which method handles a given request for a specific endpoint
 * @exports ReporterControllers
 */
class ReporterControllers {
  /**
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {json} reports
   */
  static getReport(req, res) {
    if (req.adminStatus) {
      try {
        pool.connect((err, client) => {
          const query = 'SELECT * FROM reports';
          client.query(query, (err, result) => {
            // done();
            if (err) {
              res.status(422).json({ error: 'Unable to retrieve reports' });
            }
            if (result.rows < 1) {
              res.status(404).send({
                status: 'Failed',
                message: 'No reports information found',
              });
            } else {
              return res.json({
                message: result.rows
              });
            }
          });
        });
      } catch (err) {
        throw err;
      }
    } else {
      try {
        pool.connect((err, client) => {
          const query = `SELECT * FROM reports WHERE placedby=${req.user}`;
          client.query(query, (err, result) => {
            // done();
            if (err) {
              res.status(422).json({ error: 'Unable to retrieve reports' });
            }
            if (result.rows < 1) {
              res.status(404).send({
                status: 'Failed',
                message: 'No users information found',
              });
            } else {
              return res.json({
                message: result.rows
              });
            }
          });
        });
      } catch (err) {
        throw err;
      }
    }
  }

  /**
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {json} reports
   */
  static createReport(req, res) {
    const {
      name, latitude, longitude, description
    } = req.body;
    try {
      pool.connect((err, client) => {
        const query = 'INSERT INTO reports(name, latitude, longitude, description, placedby, status) VALUES($1,$2,$3,$4,$5,\'Pending\') RETURNING *';
        const value = [name, latitude, longitude, description, req.user];
        client.query(query, value, (err, result) => {
          // done();
          if (err) {
            res.status(422).json({ error: 'Unable to retrieve user' });
          }
          if (result.rows < 1) {
            res.status(404).send({
              status: 'Failed',
              message: 'No users information found',
            });
          } else {
            return res.json({
              message: result.rows,
            });
          }
        });
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static getAReport(req, res) {
    const id = parseInt(req.params.report_id, 10);
    try {
      if (!req.adminStatus) {
        pool.connect((err, client) => {
          const query = `SELECT * FROM reports where id=${id} and placedby=${req.user};`;
          client.query(query, (err, result) => {
            // done();
            if (err) {
              res.status(422).json({ error: 'Unable to retrieve user' });
            }
            if (result.rows < 1) {
              res.status(404).send({
                status: 'Failed',
                message: 'No users information found',
              });
            } else {
              return res.json({
                success: 'True',
                message: result.rows
              });
            }
          });
        });
      } else {
        pool.connect((err, client) => {
          const query = `SELECT * FROM reports where id=${id};`;
          client.query(query, (err, result) => {
            // done();
            if (err) {
              res.status(422).json({ error: 'Unable to retrieve user' });
            }
            if (result.rows < 1) {
              res.status(404).send({
                status: 'Failed',
                message: 'No users information found',
              });
            } else {
              return res.json({
                success: 'True',
                message: result.rows
              });
            }
          });
        });
      }
    } catch (err) {
      throw err;
    }
  }

  /**
  * @param {Object} req - Request
  * @param {Object} res - Response
  */
  static editLocation(req, res) {
    const id = parseInt(req.params.report_id, 10);
    const { latitude, longitude } = req.body;

    try {
      pool.connect((err, client) => {
        const query = `UPDATE reports SET latitude=$1, longitude=$2 WHERE id=$3 AND placedby=${req.user}`;
        const value = [latitude, longitude, id];
        client.query(query, value, (err) => {
          if (err) {
            res.status(422).json({ error: 'Unable to retrieve user' });
          } else {
            client.query(`SELECT * FROM reports WHERE id=${id}`, (err, results) => res.json({
              message: results.rows
            }));
          }
        });
      });
    } catch (err) {
      throw err;
    }
  }

  /**
  * @param {Object} req - Request
  * @param {Object} res - Response
  */
  static editStatus(req, res) {
    const id = parseInt(req.params.report_id, 10);
    const { status } = req.body;
    try {
      pool.connect((err, client) => {
        const query = `UPDATE reports SET status=$1 WHERE id=$2 AND placedby=${req.user}`;
        const value = [status, id];
        client.query(query, value, (err) => {
          if (err) {
            res.status(422).json({ error: 'Unable to retrieve user' });
          } else {
            client.query(`SELECT * FROM reports WHERE id=${id}`, (err, results) => res.json({
              message: results.rows
            }));
          }
        });
      });
    } catch (err) {
      throw err;
    }
  }


  /**
  * @param {string} req - The title of the book.
  * @param {string} res - The author of the book.
  */
  static deleteReport(req, res) {
    const id = parseInt(req.params.report_id, 10);
    const status = 'Rejected';
    try {
      pool.connect((err, client) => {
        const query = `UPDATE reports SET status=$1 WHERE id=$2 AND placedby=${req.user}`;
        const value = [status, id];
        client.query(query, value, (err) => {
          if (err) {
            res.status(422).json({ error: 'Unable to retrieve user' });
          } else {
            res.json({ message: 'Successfully added as Admin' });
          }
        });
      });
    } catch (err) {
      throw err;
    }
  }
  static editAll(req, res) {
    const id = parseInt(req.params.report_id, 10);
    const { latitude, longitude, status, description } = req.params;
    try {
      if (!req.adminStatus) {
        pool.connect((err, client) => {
          const query = `SELECT * FROM reports where id=${id} and placedby=${req.user};`;
          console.log(req.user);
          client.query(query, (err, result) => {
            // done();
            if (err) {
              res.status(422).json({ error: 'Unable to retrieve user' });
            }
            if (result.rows < 1) {
              res.status(404).send({
                status: 'Failed',
                message: 'No users information found',
              });
            } else {
              // return res.json({
              //   success: 'True',
              //   message: result.rows
              // });
              const query2 = `UPDATE reports SET latitude=$1, longitude=$2, status=$3, description=$4 WHERE id=$5 AND placedby=${req.user}`;
              const results = result.rows;
              const values = [latitude || results.latitude, longitude || results.longitude, status || results.status, description || results.description, id];
              client.query(query2, values, (err, response) => {
                if (err) {
                  res.status(422).json({ error: 'Unable to edit reports' });
                }
                if (result.rows < 1) {
                  res.status(404).send({
                    status: 'Failed',
                    message: 'No users information found',
                  });
                } else {
                  return res.json({
                    success: 'True',
                    message: response.rows
                  });
                }
              })
            }
          });
        });
      } else {
        pool.connect((err, client) => {
          const query = `SELECT * FROM reports where id=${id};`;
          client.query(query, (err, result) => {
            // done();
            if (err) {
              res.status(422).json({ error: 'Unable to retrieve user' });
            }
            if (result.rows < 1) {
              res.status(404).send({
                status: 'Failed',
                message: 'No users information found',
              });
            } else {
              const query2 = `UPDATE reports SET latitude=$1, longitude=$2, status=$3, description=$4 WHERE id=$5`;
              const results = result.rows;
              const values = [latitude || results.latitude, longitude || results.longitude, status || results.status, description || results.description, id];
              client.query(query2, values, (err, response) => {
                if (err) {
                  res.status(422).json({ error: 'Unable to edit reports' });
                }
                if (result.rows < 1) {
                  res.status(404).send({
                    status: 'Failed',
                    message: 'No users information found',
                  });
                } else {
                  return res.json({
                    success: 'True',
                    message: response.rows
                  });
                }
              });
            }
          });
        });
      }
    } catch (err) {
      throw err;
    }
  }


}

export default ReporterControllers;
