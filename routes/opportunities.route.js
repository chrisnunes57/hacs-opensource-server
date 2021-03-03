// opportunities.route.js - Opportunities route module

const express = require("express");
const asyncHandler = require("express-async-handler");
const opportunitiesCtrl = require("../controllers/opportunities.controller");
// const config = require("../config/config");

const router = express.Router();
module.exports = router;

var bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.get("/", asyncHandler(getOpportunitiesData));
router.post("/", jsonParser, asyncHandler(insertOpportunitiesData));

async function getOpportunitiesData(req, res) {
  try {
    let opportunitiesData = await opportunitiesCtrl.read();
    console.log(opportunitiesData)
    res.json(opportunitiesData);
  } catch (e) {
    res.send({
      error: "Error reading opportunities from database. Please try again.",
    });
  }
}

async function insertOpportunitiesData(req, res) {
  try {
    console.log(req.body);
    let opportunitiesData = await opportunitiesCtrl.insert(req.body);
    res.json(opportunitiesData);
  } catch (e) {
    res.sendStatus(200);
  }
}
