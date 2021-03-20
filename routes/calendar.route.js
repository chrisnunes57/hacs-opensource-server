// calendar.route.js - Calendar route module

const express = require("express");
const asyncHandler = require("express-async-handler");
const calendarCtrl = require("../controllers/calendar.controller");
const config = require("../config/config");
const { CODES, RES } = require("../util/const");

const router = express.Router();
module.exports = router;

router.get("/", asyncHandler(getCalendarData));
router.get("/*", asyncHandler(redirect));

async function getCalendarData(req, res, next) {
  try {
    let calendarData = await calendarCtrl.read(req.query.agenda);
    console.log("Retrieved calendar content...\n");
    res.send(calendarData);
  } catch (e) {
    if (config.env !== "dev") {
      e.message = "Error retrieving calendar content. Please try again.";
    }
    next(e);
  }
}

// Handle google calendar routing
async function redirect(req, res, next) {
  try {
    console.log(`Redirecting to https://calendar.google.com${req.path}`);
    res.redirect(
      CODES.REDIRECT.MOVED_PERMANENTLY,
      "https://calendar.google.com" + req.path
    );
  } catch (e) {
    if (config.env !== "dev") {
      e.message = "Error redirecting from calendar. Please try again.";
    }
    next(e);
  }
}
