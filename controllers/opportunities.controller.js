// opportunities.controller.js - Opportunities logic module

// const model = require("../models/opportunities.model");
const { makeError } = require("../config/errors");
const { db } = require("../config/firebase");
const { isEmpty } = require("../util/util");

const oppSchema = Joi.object({

})

module.exports = {
  read,
  insert,
};

async function read() {
  const snapshot = await db.collection("opportunities").get();
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
async function insert(body) {
  let props = Object.getOwnPropertyNames(body);
  props
    .forEach((docName) => {
      console.log(docName);
      db.collection("opportunities")
        .doc(docName)
        .set(body[docName], { merge: true });
    })
    .catch((err) => {
      console.info(err);
    });
}
