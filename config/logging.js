const config = require("./config");
const morgan = require("morgan");
const chalk = require("chalk");
const { CODES, RES } = require("../util/const");
const { objContainsVal } = require("../util/util");

// Simple logging structure for production:
// <method> <url> <status> <res[content-length]> - <response-time> ms
const prodLogger = morgan("tiny");

// Custom logging structure for development:
/*
  Request:
    Type: <method>
    URL:  <url>
    Status: <status>
    Length: <res[content-length]>
    Response Time: <response-time> ms
*/
const devLogger = morgan(function (tokens, req, res) {
  return [
    "Request:\n",
    `Type: ${tokens.method(req, res)}\n`,
    `URL: ${tokens.url(req, res)}\n`,
    `Status: ${colorResponse(tokens.status(req, res))}\n`,
    `Length: ${tokens.res(req, res, "content-length")}\n`,
    `Response Time: ${tokens["response-time"](req, res)} ms\n`,
  ].join(" ");
});

// Return logger for current environment
logger = config.env === "dev" ? devLogger : prodLogger;

module.exports = { logger };

// Return colored status code
function colorResponse(status) {
  status = Number(status);
  if (objContainsVal(CODES.SUCCESS, status)) {
    return chalk.green(status);
  } else if (objContainsVal(CODES.CLIENT_ERROR, status)) {
    return chalk.yellow(status);
  } else if (objContainsVal(CODES.SERVER_ERROR, status)) {
    return chalk.red(status);
  }
  return status;
}
