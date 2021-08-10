// opportunities.route.js - Opportunities route module

const express = require("express");
const asyncHandler = require("express-async-handler");
const opportunitiesCtrl = require("../controllers/opportunities.controller");
const config = require("../config/config");
const { CODES, RES } = require("../util/const");
const SchemaValidator = require("../schemas/schemaValidator");
const { checkAuth } = require("../auth/auth");

const router = express.Router();
module.exports = router;

const validateRequest = SchemaValidator(config.env === "dev");

router.get("/", asyncHandler(getOpportunitiesData));

router.post(
  "/events",
  validateRequest,
  asyncHandler(insertOpportunitiesData)
);
router.post(
  "/jobs",
  validateRequest,
  asyncHandler(insertOpportunitiesData)
);
router.post(
  "/scholarships",
  validateRequest,
  asyncHandler(insertOpportunitiesData)
);

async function getOpportunitiesData(req, res, next) {
  try {
    let opportunitiesData = await opportunitiesCtrl.read(req.route.path);
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

async function insertOpportunitiesData(req, res, next) {
  try {
    await opportunitiesCtrl.insert(req.route.path, req.body);
    res.json({
      status: CODES.SUCCESS.OK,
      data: req.body,
    });
  } catch (e) {
    if (config.env !== "dev") {
      e.message =
        "Error inserting opportunities into database. Please try again.";
    }
    next(e);
  }
}
