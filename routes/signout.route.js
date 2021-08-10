// login.route.js - Login route module

const express = require("express");
const asyncHandler = require("express-async-handler");
const signoutCtrl = require("../controllers/signout.controller");
const config = require("../config/config");
const { CODES, RES } = require("../util/const");

const router = express.Router();
module.exports = router;

router.post("/", asyncHandler(performSignout));

async function performSignout(req, res) {
  try {
    await signoutCtrl.signout();
    res.send({ message: "Successfully signed out, thanks!" });
  } catch (e) {
    console.error(e.code, e.message);
    res.send({
      error: "Unable to sign out... please try again.",
    });
  }
}
