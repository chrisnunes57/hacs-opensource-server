// opportunities.controller.js - Opportunities logic module

// const model = require("../models/opportunities.model");
const { makeError } = require("../config/errors");
const { adminDB, firebase, firebaseAdmin } = require("../config/firebase");
const { isEmpty } = require("../util/util");

module.exports = {
  read,
  insert,
};

async function read() {
  const snapshot = await adminDB.collection("opportunities").get();
  let data = {};

  snapshot.forEach((doc) => {
    data[doc.id] = doc.data();
  });

  if (isEmpty(data)) {
    throw makeError("Bad Request: The server returned no data.", 400);
  }

  return data;
}

// Set new data for db collection "opportunities"
async function insert(docName, data) {
  await adminDB
    .collection("opportunities")
    .doc(docName)
    .update({
      sponsors: firebaseAdmin.firestore.FieldValue.arrayUnion(data),
    });
}
