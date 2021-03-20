// express.js - Express config module

// const path = require("path");
const express = require("express");
const { makeError, error404, handleRouteErrors } = require("./errors");
const { logger } = require("./logging");
// const cookieParser = require("cookie-parser");
// const compress = require("compression");
// const methodOverride = require("method-override");
const cors = require("cors");
// const helmet = require("helmet");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");
const routes = require("../routes/index.route");
const config = require("./config");
const { CODES, RES } = require("../util/const");
// const passport = require("./passport");

const app = express();

// Set logger to dev mode
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());
// app.use(compress());
// app.use(methodOverride());

// Secure apps by setting various HTTP headers
// app.use(helmet());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

// app.use(passport.initialize());

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API router (routes beginning with "/api")
app.use("/", routes);

// Base backend route response
app.get("/", (req, res) => {
  res.send("Welcome to the HACS backend!");
});

// Catch 404 and create error
app.use(error404);

// Error handler, send stacktrace only during development
app.use(handleRouteErrors);

module.exports = app;
