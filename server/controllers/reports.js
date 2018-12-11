import reports from '../models/reportdb';

/**
 * @class ReporterControllers
 * @description Specifies which method handles a given request for a specific endpoint
 * @exports PostController
 * @param {req} : The request object sent in the body
 * @param {res} : The reponse object sent by the server to the user
 */
class ReporterControllers {
  /**
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {json} reports
   */
  static getReport(req, res) {
    return res.json({
      messsage: reports
    });
  }

  /**
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {json} reports
   */
  static createReport(req, res) {
    const {
      id, name, status, latitude, longitude, description
    } = req.body;

    const report = {
      id,
      name,
      status,
      latitude,
      longitude,
      description
    };
    reports.push(report);

    return res.json({
      message: report
    });
  }

  /**
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static getAReport(req, res) {
    const id = parseInt(req.params.report_id, 10);
    reports.forEach((report) => {
      if (report.id === id) {
        return res.json({
          message: report
        });
      }
    });
  }

  /**
  * @param {Object} req - Request
  * @param {Object} res - Response
  */
  static editLocation(req, res) {
    const id = parseInt(req.params.report_id, 10);
    const { latitude, longitude } = req.body;
    reports.forEach((report) => {
      if (report.id === id) {
        report.latitude = latitude || report.latitude;
        report.longitude = longitude || report.longitude;

        return res.json({
          message: 'Updated successfully',
          data: report
        });
      }
    });
  }

  /**
  * @param {Object} req - Request
  * @param {Object} res - Response
  */
  static editStatus(req, res) {
    const id = parseInt(req.params.report_id, 10);
    const { status } = req.body;
    reports.forEach((report) => {
      if (report.id === id) {
        report.status = status || report.status;
        return res.json({
          message: 'Updated successfully',
          data: report
        });
      }
    });
  }

  /**
  * @param {string} req - The title of the book.
  * @param {string} res - The author of the book.
  */
  static deleteReport(req, res) {
    const id = parseInt(req.params.report_id, 10);
    reports.forEach((report) => {
      if (report.id === id) {
        report.status = 'Rejected';
        return res.json({
          message: 'Updated successfully',
          data: report
        });
      }
    });
  }
}

export default ReporterControllers;
