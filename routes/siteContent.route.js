// siteContent.route.js - Site content route module

const express = require("express");
const asyncHandler = require("express-async-handler");
const siteContentCtrl = require("../controllers/siteContent.controller");
const config = require("../config/config");

// var bodyParser = require("body-parser");
// const jsonParser = bodyParser.json();

const router = express.Router();
module.exports = router;

router.get("/", asyncHandler(getSiteContentData));
router.post("/", /*jsonParser,*/ asyncHandler(insertSiteContentData));

async function getSiteContentData(req, res) {
  try {
    let siteContentData = await siteContentCtrl.read();
    console.log(siteContentData);
    res.json(siteContentData);
  } catch (e) {
    res.send({
      error: "Error reading site content from database. Please try again.",
    });
  }
}

async function insertSiteContentData(req, res) {
  try {
    console.log(req.body);
    await siteContentCtrl.insert(req.body);
    res.sendStatus(200);
  } catch (e) {
    res.send({
      error: "Error inserting site content into database. Please try again.",
    });
  }
}