// schemaValidator.js - Module for schema validation

const _ = require("lodash");
const Schemas = require("./index.schema");
const { CODES } = require("../util/const");
const { makeError } = require("../config/errors");
const { env } = require("../config/config");

module.exports = (useJoiError = false) => {
  // enabled HTTP methods for request data validation
  const _supportedMethods = ["post", "put"];

  // Joi validation options
  const _validationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true, // remove unknown keys from the validated data
  };

  // return the validation middleware
  return (req, res, next) => {
    const route = req.originalUrl;
    const method = req.method.toLowerCase();
    if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
      // get schema for the current route
      const _schema = _.get(Schemas, route);
      if (_schema) {
        // validate req.body using the schema and validation options
        const schemaValidation = _schema.validate(req.body, _validationOptions);
        if (schemaValidation.error) {
          // prod error
          const prodError = makeError(
            "Invalid request data. Please review request and try again.",
            CODES.CLIENT_ERROR.UNPROCESSABLE_ENTITY
          );

          // custom error for dev (improve in future)
          const devError = makeError(
            schemaValidation.error.details[0].message,
            CODES.CLIENT_ERROR.UNPROCESSABLE_ENTITY
          );
          next(env === "dev" ? devError : prodError);
        } else {
          // replace req.body with the data after Joi validation
          req.body = schemaValidation.value;
          next();
        }
      }
    }
  };
};
