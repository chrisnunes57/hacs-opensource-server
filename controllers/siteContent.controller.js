// siteContent.controller.js - Site content logic module

// const model = require("../models/opportunities.model");
const { makeError } = require("../config/errors");
const { db } = require("../config/firebase");
const { isEmpty } = require("../util/util");

module.exports = {
  read,
  insert,
};

async function read() {
  const snapshot = await db.collection("contentData").get();
  let data = {};

  // const snapshot = await siteContentRef.get();
  snapshot.forEach((doc) => {
    data[doc.id] = doc.data();
  });

  if (isEmpty(data)) {
    throw makeError("Bad Request: The server returned no data.", 400);
  }

  return data;
}

// Set new data for db collection "siteContent"
async function insert(body) {
  let props = Object.getOwnPropertyNames(body);
  props.forEach((docName) => {
    console.log(docName);
    db.collection("contentData")
      .doc(docName)
      .set(body[docName], { merge: true });
  });
}
