// const model = require("../models/opportunities.model");

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
const db = require("../index.js");

module.exports = {
  read,
  insert,
};

async function read() {
  const oppRef = db.collection("opportunities");
  let data = {};

  const snapshot = await oppRef.get();
  snapshot.forEach((doc) => {
    data[doc.id] = doc.data();
  });

  return data;
}

async function insert(body) {
  let props = Object.getOwnPropertyNames(body);
  props.forEach((docName) => {
    console.log(docName);
    db.collection("opportunities")
      .doc(docName)
      .set(body[docName], { merge: true });
  });
}
