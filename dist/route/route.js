"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users"));

var _reports = _interopRequireDefault(require("../controllers/reports"));

var _validate = _interopRequireDefault(require("../middlewares/validate"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get('/users', _users.default.getUsers);
router.post('/users', _validate.default.checkUser, _users.default.createUser);
router.post('/users/login', _users.default.loginUser);
router.get('/reports', _auth.default.verifyUser, _reports.default.getReport);
router.post('/reports', _validate.default.checkReports, _auth.default.verifyUser, _reports.default.createReport);
router.get('/reports/:report_id', _auth.default.verifyUser, _reports.default.getAReport);
router.patch('/reports/:report_id/edit', _validate.default.checkEdit, _auth.default.verifyUser, _reports.default.editLocation);
router.patch('/reports/:report_id/status', _validate.default.checkStatus, _auth.default.verifyUser, _reports.default.editStatus);
router.patch('/reports/:report_id/cancel', _auth.default.verifyUser, _reports.default.deleteReport);
var _default = router;
exports.default = _default;