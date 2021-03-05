// express.js - Express config module

// const path = require("path");
const express = require("express");
const { makeError, error404, handleRouteErrors } = require("./errors.js");
// const logger = require("morgan");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const compress = require("compression");
// const methodOverride = require("method-override");
const cors = require("cors");
// const helmet = require("helmet");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");
const routes = require("../routes/index.route");
const config = require("./config");
// const passport = require("./passport");

const app = express();

// Set logger to dev mode
if (config.env === "dev") {
  app.use(logger("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use("/api", routes);

// Base backend route response
app.get("/", (req, res) => {
  res.send("Welcome to the HACS backend!");
});

// Catch 404 and create error
app.use(error404);

// Error handler, send stacktrace only during development
app.use(handleRouteErrors);

module.exports = app;
