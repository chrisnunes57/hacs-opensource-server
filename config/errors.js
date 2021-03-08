const config = require("./config");

// Make error from message or throw passed-in err
function makeError(message, status) {
  let err = message instanceof Error ? message : new Error(message);
  err.status = status;
  return err;
}

// Handle general 404 error
function error404(req, res, next) {
  let err = makeError("Not Found", 404);
  // Pass error to the next piece of middleware (error handler)
  return next(err);
}

// Handle general routing errors
function handleRouteErrors(error, req, res, next) {
  // Customize Joi validation error formatting (i.e. db schema validation)
  if (error.isJoi) {
    error.message = error.details.map((e) => e.message).join("; ");
    error.status = 400;
  }

  res
    .status(error.status || 500)
    .json({ error: { message: error.message, status: error.status } });

  if (config.env == "dev") {
    next(error);
  }
}

module.exports = {
  makeError,
  error404,
  handleRouteErrors,
};
