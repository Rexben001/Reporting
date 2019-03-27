import reports from '../model/reportdb';

const { pool } = reports;
// import models from '../models';


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
    try {
      const query = 'SELECT * FROM reports';
      pool.query(query, (err, result) => {
        if (err) {
          res.status(422).json({ error: 'Unable to retrieve user' });
        }
        if (result.rowCount === 0) {
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
      // models.Report.findAll()
      //   .then((user) => {
      //     res.status(200).json({
      //       status: 200,
      //       data: user
      //     });
      //   })
      //   .catch((e) => {
      //     // res.status(404).json({
      //     //   status: 404,
      //     //   message: e
      //     // });
      //     console.log(e)
      //   });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {json} reports
   */
  static createReport(req, res) {
    const {
      name, latitude, longitude, description, placedby
    } = req.body;
    try {
      const query = 'INSERT INTO reports(name, latitude, longitude, description, placedby, status) VALUES($1,$2,$3,$4,$5,\'Pending\') RETURNING *';
      const value = [name, latitude, longitude, description, placedby];
      pool.query(query, value, (err, result) => {
        if (err) {
          res.status(422).json({ error: 'Unable to retrieve user' });
        }
        if (result.rowCount === 0) {
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
      const query = `SELECT * FROM reports where id=${id};`;
      pool.query(query, (err, result) => {
        if (err) {
          res.status(422).json({ error: 'Unable to retrieve user' });
        }
        if (result.rowCount === 0) {
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
      const query = 'UPDATE reports SET latitude=$1, longitude=$2 WHERE id=$3';
      const value = [latitude, longitude, id];
      pool.query(query, value, (err) => {
        if (err) {
          res.status(422).json({ error: 'Unable to retrieve user' });
        } else {
          pool.query(`SELECT * FROM reports WHERE id=${id}`, (err, results) => res.json({
            message: results.rows
          }));
        }
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
      const query = 'UPDATE reports SET status=$1 WHERE id=$2';
      const value = [status, id];
      pool.query(query, value, (err) => {
        if (err) {
          res.status(422).json({ error: 'Unable to retrieve user' });
        } else {
          pool.query(`SELECT * FROM reports WHERE id=${id}`, (err, results) => res.json({
            message: results.rows
          }));
        }
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
      const query = 'UPDATE reports SET status=$1 WHERE id=$2';
      const value = [status, id];
      pool.query(query, value, (err) => {
        if (err) {
          res.status(422).json({ error: 'Unable to retrieve user' });
        } else {
          pool.query(`SELECT * FROM reports WHERE id=${id}`, (err, results) => res.json({
            message: results.rows
          }));
        }
      });
    } catch (err) {
      throw err;
    }
  }
}

export default ReporterControllers;
