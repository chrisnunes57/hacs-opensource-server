// firebase.js - Firebase config module

const firebaseConfig = require("./config").firebase;
const firebase = require("firebase/app");

require("firebase/auth");
require("firebase/firestore");

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

console.info("Firebase app initialized...\n");

module.exports = {
  db,
  firebase,
};
