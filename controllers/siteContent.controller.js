// siteContent.controller.js - Site content logic module

// const model = require("../models/opportunities.model");
const { db } = require("../config/firebase");

module.exports = {
  read,
  insert,
};

async function read() {
  const siteContentRef = db.collection("siteContent");
  let data = {};

  const snapshot = await siteContentRef.get();
  snapshot.forEach((doc) => {
    data[doc.id] = doc.data();
  });

  return data;
}

async function insert(body) {
  let props = Object.getOwnPropertyNames(body);
  props.forEach((docName) => {
    console.log(docName);
    db.collection("contentData")
      .doc(docName)
      .set(body[docName], { merge: true });
  });
}
