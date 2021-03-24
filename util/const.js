// const.js - Constants to be used across the app

// HTTP response status codes (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
const CODES = {
  INFO: {
    CONTINUE: 100, // Everything OK, continue request
  },
  SUCCESS: {
    OK: 200, // Request succeeded
  },
  REDIRECT: {
    MULTIPLE_CHOICE: 300, // Options for response (present in UI)
    MOVED_PERMANENTLY: 301, // URL has been moved (provide URL)
    FOUND: 302, // Correct URI, but URI temporarily changed
    SEE_OTHER: 303, // Redirect to another URI
    NOT_MODIFIED: 304, // Response cached, no change, same version used
  },
  CLIENT_ERROR: {
    BAD_REQUEST: 400, // Invalid syntax, server could not understand
    UNAUTHORIZED: 401, // Unauthenticated, must authenticate for response
    FORBIDDEN: 403, // Identity known, unauthorized access
    NOT_FOUND: 404, // URL not recognized or resource DNE
    REQUEST_TIMEOUT: 408, // Idle connection, shut down service
    UNPROCESSABLE_ENTITY: 422, // Well formed request with semantic errors (or invalid schema)
  },
  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: 500, // Server cannot handle situation
    NOT_IMPLEMENTED: 501, // Request not supported (do not use with GET and HEAD)
    BAD_GATEWAY: 502, // Invalid response while handling request (with server as gateway to DB, outside source, etc.)
    SERVICE_UNAVAILABLE: 503, // Server not ready (should present 503 page to user with more info)
    GATEWAY_TIMEOUT: 504, // Response timed out (with server as gateway)
  },
};

// HTTP responses (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
const RES = {
  INFO: {
    CONTINUE: "continue", // Everything OK, continue request
  },
  SUCCESS: {
    OK: "ok", // Request succeeded
  },
  REDIRECT: {
    MULTIPLE_CHOICE: "multiple choice", // Options for response (present in UI)
    MOVED_PERMANENTLY: "moved permanently", // URL has been moved (provide URL)
    FOUND: "found", // Correct URI, but URI temporarily changed
    SEE_OTHER: "see other", // Redirect to another URI
    NOT_MODIFIED: "not modified", // Response cached, no change, same version used
  },
  CLIENT_ERROR: {
    BAD_REQUEST: "bad request", // Invalid syntax, server could not understand
    UNAUTHORIZED: "unauthorized", // Unauthenticated, must authenticate for response
    FORBIDDEN: "forbidden", // Identity known, unauthorized access
    NOT_FOUND: "not found", // URL not recognized or resource DNE
    REQUEST_TIMEOUT: "request timeout", // Idle connection, shut down service
    UNPROCESSABLE_ENTITY: "invalid request data", // Well formed request with semantic errors (or invalid schema)
  },
  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: "internal server error", // Server cannot handle situation
    NOT_IMPLEMENTED: "not implemented", // Request not supported (do not use with GET and HEAD)
    BAD_GATEWAY: "bad gateway", // Invalid response while handling request (with server as gateway to DB, outside source, etc.)
    SERVICE_UNAVAILABLE: "service unavailable", // Server not ready (should present 503 page to user with more info)
    GATEWAY_TIMEOUT: "gateway timeout", // Response timed out (with server as gateway)
  },
};

module.exports = { CODES, RES };
