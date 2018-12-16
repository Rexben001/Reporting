"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _route = _interopRequireDefault(require("./route/route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)(); // const router = express.Router();

app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json()); // router.get('/users', userss.getUsers());

app.get('/', function (req, res) {
  return res.status(200).json({
    success: true,
    message: 'Reporting Inc'
  });
});
app.use('/api/v1', _route.default);
app.listen(3000, function () {
  console.log('Listening to PORT 3000');
});
var _default = app;
exports.default = _default;