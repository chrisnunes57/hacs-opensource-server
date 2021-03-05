// index.js - Central logic for the HACS Node app

// Import config before any other module
const config = require("./config/config");

const app = require("./config/express");

// Make a request to our own server every 5 minutes to prevent heroku from putting the app to sleep
setInterval(() => {
  request("https://enigmatic-shore-29691.herokuapp.com/");
}, 600000);

app.listen(config.port, () => {
  console.info(
    `Starting our virtual familia home at http://localhost:${config.port} (${config.env})\n\n-----\n`
  );
});
