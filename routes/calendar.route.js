// calendar.route.js - Calendar route module

const express = require("express");
const asyncHandler = require("express-async-handler");
const calendarCtrl = require("../controllers/calendar.controller");
const config = require("../config/config");

// var bodyParser = require("body-parser");
// const jsonParser = bodyParser.json();

const router = express.Router();
module.exports = router;

router.get("/", asyncHandler(getCalendarData));
router.get("/*", /*jsonParser,*/ asyncHandler(redirect));

async function getCalendarData(req, res) {
  try {
    let calendarData = await calendarCtrl.read(req.query.agenda);
    console.log("Retrieved calendar content...\n");
    res.send({ calendarData });
  } catch (e) {
    res.send({
      error: "Error retrieving calendar content. Please try again.",
      e: e.message,
    });
  }
}

// Handle google calendar routing
async function redirect(req, res) {
  try {
    console.log(`Redirecting to https://calendar.google.com${req.path}`);
    res.redirect(301, "https://calendar.google.com" + req.path);
  } catch (e) {
    res.send({
      error: "Error redirecting from calendar. Please try again.",
    });
  }
}
