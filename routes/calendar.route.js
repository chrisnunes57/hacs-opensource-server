// calendar.route.js - Calendar route module

const express = require("express");
const asyncHandler = require("express-async-handler");
const calendarCtrl = require("../controllers/calendar.controller");
const config = require("../config/config");

// var bodyParser = require("body-parser");
// const jsonParser = bodyParser.json();

const router = express.Router();
module.exports = router;

router.get("/", asyncHandler(getSiteContentData));
router.get("/*", /*jsonParser,*/ asyncHandler(insertSiteContentData));
