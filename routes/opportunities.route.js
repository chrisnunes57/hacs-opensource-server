// opportunities.route.js - Opportunities route module

const express = require("express");
const asyncHandler = require("express-async-handler");
const opportunitiesCtrl = require("../controllers/opportunities.controller");
const config = require("../config/config");
const { CODES, RES } = require("../util/const");

const router = express.Router();
module.exports = router;

router.get("/", asyncHandler(getOpportunitiesData));
router.post("/", asyncHandler(insertOpportunitiesData));

async function getOpportunitiesData(req, res, next) {
  try {
    let opportunitiesData = await opportunitiesCtrl.read();
    console.info("Retrieved opportunities data...\n");
    res.json(opportunitiesData);
  } catch (e) {
    if (config.env !== "dev") {
      e.message =
        "Error retrieving opportunities from database. Please try again.";
    }
    next(e);
  }
}

async function insertOpportunitiesData(req, res) {
  try {
    await opportunitiesCtrl.insert(req.body);
    res.json({
      status: CODES.SUCESS.OK,
      data: req.body,
    });
  } catch (e) {
    if (config.env === "dev") {
      e.message =
        "Error inserting opportunities into database. Please try again.";
    }
    next(e);
  }
}
