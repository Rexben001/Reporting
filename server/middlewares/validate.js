const { check, validateResult } = require('express-validator/check');
/**
 * @class Validator
 */
class Validator {
  /**
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {json} reports
   * @param {Function} next - next middleware
   */
  static checkUser(req, res, next) {
    check('firstname').isString().isLength({ min: 3 });

    const errors = validateResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    next();
  }
}

export default Validator;
