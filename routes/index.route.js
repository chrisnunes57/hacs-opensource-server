// routes.js - Central module for all routes

const express = require("express");

const siteContentRoutes = require("./siteContent.route");
const calendarRoutes = require("./calendar.route");
const loginRoutes = require("./login.route");

const router = express.Router();

router.get('/health-check', (req, res) => {
  res.send('OK')
})

router.get("/", (req, res) => {
  res.send("Welcome to the HACS backend!");
});

router.use("/siteContent", siteContentRoutes);
router.use("/calendar", calendarRoutes);
router.use("/login", loginRoutes);

module.exports = router;
