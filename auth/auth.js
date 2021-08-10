// auth.js - Authentication logic module
const { firebaseAdmin } = require("../config/firebase");

module.exports = { checkAuth };

function checkAuth(req, res, next) {
  if (req.headers.authorization) {
    firebaseAdmin
      .auth()
      .verifyIdToken(req.headers.authorization)
      .then(() => {
        next();
      })
      .catch((err) => {
        res.status(403).send("Unauthorized");
      });
  } else {
    res.status(403).send("No auth found!");
  }
}
