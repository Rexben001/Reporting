"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reportdb = _interopRequireDefault(require("../models/reportdb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = _reportdb.default.pool;
/**
 * @class ReporterControllers
 * @description Specifies which method handles a given request for a specific endpoint
 * @exports ReporterControllers
 */

var ReporterControllers =
/*#__PURE__*/
function () {
  function ReporterControllers() {
    _classCallCheck(this, ReporterControllers);
  }

  _createClass(ReporterControllers, null, [{
    key: "getReport",

    /**
     * @param {Object} req - Request
     * @param {Object} res - Response
     * @returns {json} reports
     */
    value: function getReport(req, res) {
      pool.connect(function (err, client) {
        var query = 'SELECT * FROM reports';
        client.query(query, function (err, result) {
          // done();
          if (err) {
            res.status(422).json({
              error: 'Unable to retrieve user'
            });
          }

          if (result.rows < 1) {
            res.status(404).send({
              status: 'Failed',
              message: 'No users information found'
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

  }, {
    key: "createReport",
    value: function createReport(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          status = _req$body.status,
          latitude = _req$body.latitude,
          longitude = _req$body.longitude,
          description = _req$body.description,
          placedBy = _req$body.placedBy;
      pool.connect(function (err, client) {
        var query = 'INSERT INTO reports(name, status, latitude, longitude, description, placedBy) VALUES($1,$2,$3,$4,$5,$6) RETURNING *';
        var value = [name, status, latitude, longitude, description, placedBy];
        client.query(query, value, function (err, result) {
          // done();
          if (err) {
            res.status(422).json({
              error: 'Unable to retrieve user'
            });
          }

          if (result.rows < 1) {
            res.status(404).send({
              status: 'Failed',
              message: 'No users information found'
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

  }, {
    key: "getAReport",
    value: function getAReport(req, res) {
      var id = parseInt(req.params.report_id, 10);
      pool.connect(function (err, client) {
        var query = "SELECT * FROM reports where id=".concat(id, ";");
        client.query(query, function (err, result) {
          // done();
          if (err) {
            res.status(422).json({
              error: 'Unable to retrieve user'
            });
          }

          if (result.rows < 1) {
            res.status(404).send({
              status: 'Failed',
              message: 'No users information found'
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

  }, {
    key: "editLocation",
    value: function editLocation(req, res) {
      var id = parseInt(req.params.report_id, 10);
      var _req$body2 = req.body,
          latitude = _req$body2.latitude,
          longitude = _req$body2.longitude; // report.latitude = latitude || report.latitude;
      // report.longitude = longitude || report.longitude;

      pool.connect(function (err, client) {
        var query = 'UPDATE reports SET latitude=$1, longitude=$2 WHERE id=$3';
        var value = [latitude, longitude, id];
        client.query(query, value, function (err) {
          if (err) {
            res.status(422).json({
              error: 'Unable to retrieve user'
            });
          } else {
            client.query("SELECT * FROM reports WHERE id=".concat(id), function (err, results) {
              return res.json({
                message: results.rows
              });
            });
          }
        });
      });
    }
    /**
    * @param {Object} req - Request
    * @param {Object} res - Response
    */

  }, {
    key: "editStatus",
    value: function editStatus(req, res) {
      var id = parseInt(req.params.report_id, 10);
      var status = req.body.status;
      pool.connect(function (err, client) {
        var query = 'UPDATE reports SET status=$1 WHERE id=$2';
        var value = [status, id];
        client.query(query, value, function (err) {
          if (err) {
            res.status(422).json({
              error: 'Unable to retrieve user'
            });
          } else {
            client.query("SELECT * FROM reports WHERE id=".concat(id), function (err, results) {
              return res.json({
                message: results.rows
              });
            });
          }
        });
      });
    }
    /**
    * @param {string} req - The title of the book.
    * @param {string} res - The author of the book.
    */

  }, {
    key: "deleteReport",
    value: function deleteReport(req, res) {
      var id = parseInt(req.params.report_id, 10);
      var status = 'Rejected';
      pool.connect(function (err, client) {
        var query = 'UPDATE reports SET status=$1 WHERE id=$2';
        var value = [status, id];
        client.query(query, value, function (err) {
          if (err) {
            res.status(422).json({
              error: 'Unable to retrieve user'
            });
          } else {
            client.query("SELECT * FROM reports WHERE id=".concat(id), function (err, results) {
              return res.json({
                message: results.rows
              });
            });
          }
        });
      });
    }
  }]);

  return ReporterControllers;
}();

var _default = ReporterControllers;
exports.default = _default;