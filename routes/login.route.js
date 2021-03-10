// login.route.js - Login route module

const express = require("express");
const asyncHandler = require("express-async-handler");
const loginCtrl = require("../controllers/login.controller");
const config = require("../config/config");

const router = express.Router();
module.exports = router;

router.post("/", asyncHandler(performLogin));

async function performLogin(req, res) {
  try {
    const loginData = await loginCtrl.login(req.headers.authorization);
    console.info("Successfully logged in, welcome!");
    res.send({
      email: loginData.user.email,
      uid: loginData.user.uid
    });
  } catch (e) {
    console.error(e.code, e.message);
    res.send({
      error: "Unable to sign in with these credentials, please try again."
    });
  }
}
