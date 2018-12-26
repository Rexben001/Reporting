import validate from 'node-input-validator';
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
    const validator = new validate(req.body, {
      firstname: 'required|minLength:3',
      lastname: 'required|minLength:3',
      othernames: 'required|minLength:3',
      email: 'required|email',
      username: 'required|minLength:3',
      password: 'required',
      phonenumber: 'required',
    });
    validator.check().then((matched) => {
      if (!matched) {
        return res.status(422).json(validator.errors);
      }
      next();
    });
  }


  static checkReports(req, res, next) {
    const validator = new validate(req.body, {
      name: 'required|string',
      latitude: 'required',
      longitude: 'required',
      description: 'required',
    });

    validator.check().then((matched) => {
      if (!matched) {
        return res.status(422).json(validator.errors);
      }
      next();
    });
  }

  static checkEdit(req, res, next) {
    const validator = new validate(req.body, {
      latitude: 'required',
      longitude: 'required',
    });

    validator.check().then((matched) => {
      if (!matched) {
        return res.status(422).json(validator.errors);
      }
      next();
    });
  }

  static checkStatus(req, res, next) {
    const validator = new validate(req.body, {
      status: 'required|string',
    });

    validator.check().then((matched) => {
      if (!matched) {
        return res.status(422).json(validator.errors);
      }
      next();
    });
  }
}

export default Validator;
