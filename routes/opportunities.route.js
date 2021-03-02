const express = require("express");
const router = express.Router();

const firebase = require("firebase/app");
const db = firebase.firestore();

var bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.get("/", (req, res) => {
  db.collection("opportunities")
    .get()
    .catch((error) => {
      res.send({
        error: "Error reading opportunities from database. Please try again.",
      });
    })
    .then((snapshot) => {
      if (snapshot) {
        let data = {};
        snapshot.forEach((doc) => {
          data[doc.id] = doc.data();
        });
        res.send(data);
      }
    });
});

router.post("/", jsonParser, (req, res) => {
  console.log(req.body);
  let props = Object.getOwnPropertyNames(req.body);
  props.forEach((docName) => {
    console.log(docName);
    db.collection("opportunities")
      .doc(docName)
      .set(req.body[docName], { merge: true })
      .catch((error) => {
        res.send({ error: "Error writing opportunities to database, please try again" });
      });
  });
  res.sendStatus(200);
});

module.exports = router;
