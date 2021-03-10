// HTTP response status codes (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
const RES = {
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
  },
  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: 500, // Server cannot handle situation
    NOT_IMPLEMENTED: 501, // Request not supported (do not use with GET and HEAD)
    BAD_GATEWAY: 502, // Invalid response while handling request (with server as gateway to DB, outside source, etc.)
    SERVICE_UNAVAILABLE: 503, // Server not ready (should present 503 page to user with more info)
    GATEWAY_TIMEOUT: 504, // Response timed out (with server as gateway)
  },
};

module.exports = { RES };
