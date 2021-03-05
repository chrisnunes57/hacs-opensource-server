// routes.js - Central module for all routes

const express = require("express");
const {
  makeError,
  error404,
  handleRouteErrors,
} = require("../config/errors.js");

const siteContentRoutes = require("./siteContent.route");
const calendarRoutes = require("./calendar.route");
const loginRoutes = require("./login.route");

const router = express.Router();

router.use("/siteContent", siteContentRoutes);
router.use("/calendar", calendarRoutes);
router.use("/login", loginRoutes);

router.get("/health-check", (req, res) => {
  res.send("OK");
});

router.get("/", (req, res) => {
  res.send("Welcome to the HACS API!");
});

router.use(error404);

module.exports = router;
