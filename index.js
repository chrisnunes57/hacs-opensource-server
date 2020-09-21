const express = require('express')
const app = express()
var request = require("request");
var bodyParser = require("body-parser");
const cheerio = require("cheerio");
const cors = require("cors");
const port = process.env.PORT || 5000
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
const config = require( "./firebase_config.js").config;

firebase.initializeApp(config);
const db = firebase.firestore();

const jsonParser = bodyParser.json();

app.use(cors({ credentials: true, origin: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get("/siteContent", (req, res) => {
  db.collection("contentData").get().catch( error => {
    res.send({
      "error": "Error reading from database. Please try again."
    })
  }).then( (snapshot) => {
    if (snapshot) {
      let data = {}
      snapshot.forEach((doc) => {
        data[doc.id] = doc.data();
      });
      res.send(data);
    }
  })
});

app.post("/siteContent", jsonParser, (req, res) => {
  console.log(req.body);
  let props = Object.getOwnPropertyNames(req.body);
  props.forEach((docName) => {
    console.log(docName);
    db.collection("contentData").doc(docName).set(req.body[docName], { merge: true }).catch(error => {
      res.send({ error: "Error writing to database, please try again" });
    });
  })
  res.sendStatus(200);
})

app.post('/login', (req, res) => {
  let loginData = Buffer.from(
    req.headers.authorization.split(" ")[1],
    "base64"
  ).toString();

  loginData = loginData.split(":");

  let email = loginData[0];
  let password = loginData[1];

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode, errorMessage)
    res.send({
      "error": "Unable to sign in with these credentials, please try again."
    });
  }).then(data => {
    if (data) {
      console.log("successfully logged in!");
      res.send({
        "email": data.user.email,
        "uid": data.user.uid
      });
    }
  });
})

const styles = `<style type="text/css">
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto+Slab:wght@100;400;700&display=swap');

  #calendarTitle {
    display: none !important;
  }

  html, body {
    background: none !important;
  }

  .te-s, .te-t, .title {
    color: #27246A !important;
    font-family: Roboto slab, serif !important;
  }

  .detail-content {
    font-family: Open Sans, sans-serif !important;;
  }
</style>`;

const script = `<script type=\"text/javascript\">
  window.onload = () => {
    alert('hello');
    console.log(document.getElementsByTagName("a"))
  };
  </script>`

app.get("/calendar", (req, res) => {
  const iframeUrl = "https://calendar.google.com/calendar/embed?src=texashacs%40gmail.com&ctz=America%2FChicago";
  request(iframeUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(body);
      $("head").prepend(script);
      $("head").append(styles);

      // we need to update relative urls to point to "https://calendar.google.com"
      $("script").each((i, script) => {
        if(script.attribs.src && !script.attribs.src.startsWith("http")) {
          script.attribs.src = "https://calendar.google.com" + script.attribs.src;
        }
      });

      res.send($.html());
    } else {
      res.send({"Error": "Could not get calendar content"})
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
