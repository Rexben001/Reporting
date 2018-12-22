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
    pool.connect((err, client) => {
      const query = 'SELECT * FROM reports';
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
            message: result.rows
          });
        }
      });
    });
  }

  /**
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {json} reports
   */
  static createReport(req, res) {
    const {
      name, status, latitude, longitude, description, placedBy
    } = req.body;

    pool.connect((err, client) => {
      const query = 'INSERT INTO reports(name, status, latitude, longitude, description, placedBy) VALUES($1,$2,$3,$4,$5,$6) RETURNING *';
      const value = [name, status, latitude, longitude, description, placedBy];
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
            message: result.rows
          });
        }
      });
    });
  }

  /**
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static getAReport(req, res) {
    const id = parseInt(req.params.report_id, 10);
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

  /**
  * @param {Object} req - Request
  * @param {Object} res - Response
  */
  static editLocation(req, res) {
    const id = parseInt(req.params.report_id, 10);
    const { latitude, longitude } = req.body;
    // report.latitude = latitude || report.latitude;
    // report.longitude = longitude || report.longitude;

    pool.connect((err, client) => {
      const query = 'UPDATE reports SET latitude=$1, longitude=$2 WHERE id=$3';
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
  }

  /**
  * @param {Object} req - Request
  * @param {Object} res - Response
  */
  static editStatus(req, res) {
    const id = parseInt(req.params.report_id, 10);
    const { status } = req.body;
    pool.connect((err, client) => {
      const query = 'UPDATE reports SET status=$1 WHERE id=$2';
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
  }


  /**
  * @param {string} req - The title of the book.
  * @param {string} res - The author of the book.
  */
  static deleteReport(req, res) {
    const id = parseInt(req.params.report_id, 10);
    const status = 'Rejected';
    pool.connect((err, client) => {
      const query = 'UPDATE reports SET status=$1 WHERE id=$2';
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
  }
}

export default ReporterControllers;
