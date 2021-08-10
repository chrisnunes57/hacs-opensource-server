// firebase.js - Firebase config module

const firebaseConfig = require("./config").firebase;
const firebase = require("firebase/app");

require("firebase/auth");
require("firebase/database");

// admin config
const firebaseAdmin = require("firebase-admin");
const firebaseServiceAccount = require("../hacs-firestore-service-account-key.private.json");
adminConfig = {
  ...firebaseConfig,
  credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
};
firebaseAdmin.initializeApp(adminConfig);
const adminDB = firebaseAdmin.database();

// regular config
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

console.info("Firebase app initialized...\n");

// workaround wrapper for all firebase auth() calls
const firebaseAuthWrap = async (promise) => {
  let rejected = Symbol();
  let valueOrError = await promise.catch((error) => {
    return { [rejected]: true, error: error };
  });

  if (valueOrError[rejected]) {
    throw valueOrError.error;
  } else {
    return valueOrError;
  }
};

module.exports = {
  db,
  firebase,
  firebaseAdmin,
  firebaseAuthWrap,
  adminDB,
};
