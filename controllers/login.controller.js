// login.controller.js - Login logic module

const { firebase } = require("../config/firebase");

module.exports = {
  login,
};

async function login(authorization) {
  console.log(authorization)
  let loginData = Buffer.from(authorization.split(" ")[1], "base64").toString();
  console.log(loginData);
  loginData = loginData.split(":");

  let email = loginData[0];
  let password = loginData[1];

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      if (data) {
        console.log("Successfully logged into firebase!");
        return {
          email: data.user.email,
          uid: data.user.uid,
        };
      }
    });
}
