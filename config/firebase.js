// firebase.js - Firebase config module

const firebaseConfig = require("./config").firebase;
const firebase = require("firebase/app");

require("firebase/auth");
require("firebase/firestore");

// admin config
const firebaseAdmin = require("firebase-admin");
const firebaseServiceAccount = require("../hacs-firestore-service-account-key.private.json");
adminConfig = {
  ...firebaseConfig,
  credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
};
firebaseAdmin.initializeApp(adminConfig);
const adminDB = firebaseAdmin.firestore();

// regular config
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

console.info("Firebase app initialized...\n");

module.exports = {
  db,
  firebase,
  firebaseAdmin,
  adminDB,
};
