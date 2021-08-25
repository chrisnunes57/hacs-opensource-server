// login.controller.js - Login logic module

const { firebase } = require("../config/firebase");

module.exports = {
  signout,
};

async function signout(authorization) {
  await firebaseAuthWrap(firebase.auth.signout);

  let loginData = Buffer.from(authorization.split(" ")[1], "base64").toString();
  loginData = loginData.split(":");

  let email = loginData[0];
  let password = loginData[1];

  // use firebase workaround for auth call
  let user = await firebaseAuthWrap(
    firebase.auth().signInWithEmailAndPassword(email, password)
  );

  return {
    token: onLogin(user),
  };
}
