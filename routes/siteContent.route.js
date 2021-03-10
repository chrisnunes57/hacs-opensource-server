// siteContent.route.js - Site content route module

const express = require("express");
const asyncHandler = require("express-async-handler");
const siteContentCtrl = require("../controllers/siteContent.controller");
const config = require("../config/config");
const RES = require("../util/const");

const router = express.Router();
module.exports = router;

router.get("/", asyncHandler(getSiteContentData));
router.post("/", asyncHandler(insertSiteContentData));

async function getSiteContentData(req, res, next) {
  try {
    let siteContentData = await siteContentCtrl.read();
    console.info("Retrieved site content data...\n");
    res.json(siteContentData);
  } catch (e) {
    if (config.env !== "dev") {
      e.message =
        "Error retrieving site content from database. Please try again.";
    }
    next(e);
  }
}

async function insertSiteContentData(req, res, next) {
  try {
    await siteContentCtrl.insert(req.body);
    res.sendStatus(RES.SUCESS.OK);
  } catch (e) {
    if (config.env === "dev") {
      e.message =
        "Error inserting site content into database. Please try again.";
    }
    next(e);
  }
}
