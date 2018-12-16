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
      return res.json({
        success: true,
        message: _reportdb.default
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
          id = _req$body.id,
          name = _req$body.name,
          status = _req$body.status,
          latitude = _req$body.latitude,
          longitude = _req$body.longitude,
          description = _req$body.description;
      var report = {
        id: id,
        name: name,
        status: status,
        latitude: latitude,
        longitude: longitude,
        description: description
      };

      _reportdb.default.push(report);

      return res.json({
        message: report
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

      _reportdb.default.forEach(function (report) {
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

  }, {
    key: "editLocation",
    value: function editLocation(req, res) {
      var id = parseInt(req.params.report_id, 10);
      var _req$body2 = req.body,
          latitude = _req$body2.latitude,
          longitude = _req$body2.longitude;

      _reportdb.default.forEach(function (report) {
        if (report.id === id) {
          report.latitude = latitude || report.latitude;
          report.longitude = longitude || report.longitude;
          return res.json({
            success: 'Updated successfully',
            message: report
          });
        }
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

      _reportdb.default.forEach(function (report) {
        if (report.id === id) {
          report.status = status || report.status;
          return res.json({
            success: 'Updated successfully',
            message: report
          });
        }
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

      _reportdb.default.forEach(function (report) {
        if (report.id === id) {
          report.status = 'Rejected';
          return res.json({
            success: 'Updated successfully',
            message: report
          });
        }
      });
    }
  }]);

  return ReporterControllers;
}();

var _default = ReporterControllers;
exports.default = _default;