// index.js - Central logic for the HACS Node app

// Import config before any other module
const config = require("./config/config");
const app = require("./config/express");
const axios = require("axios");
const { setIntervalAsync } = require("set-interval-async/fixed");

// Make a request to our own server every 5 minutes to prevent heroku from putting the app to sleep
setIntervalAsync(() => {
  axios
    .get("https://enigmatic-shore-29691.herokuapp.com/")
    .then(console.info("Successfully pinged server to keep it awake...\n"))
    .catch((e) => {
      console.log(e);
    });
}, 600000);

app.listen(process.env.PORT || config.port, () => {
  console.info(
    `Starting our virtual familia home at http://localhost:${config.port} (${config.env})\n\n-----\n`
  );
});
