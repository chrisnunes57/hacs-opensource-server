// firebase.js - Firebase config module

const config = require("./config");
const firebase = require("firebase/app");

require("firebase/auth");
require("firebase/firestore");
const config = require("./config.js").firebase;

firebase.initializeApp(config);
const db = firebase.firestore();

module.exports = {
  db,
  firebase
}
