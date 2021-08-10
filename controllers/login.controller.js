// login.controller.js - Login logic module

const { ValidationError } = require("joi");
const { firebase, firebaseAuthWrap } = require("../config/firebase");

module.exports = {
  login,
};

async function login(authorization) {
  let loginData = Buffer.from(authorization.split(" ")[1], "base64").toString();
  loginData = loginData.split(":");

  let email = loginData[0];
  let password = loginData[1];

  // use firebase workaround for auth call
  let user = await firebaseAuthWrap(
    firebase.auth().signInWithEmailAndPassword(email, password)
  );

  return {
    token: onLogin(user)
  };
}

function onLogin(user) {
  const token = user.getIdToken;
  storeUserToken(token);
  return token;
}

function storeUserToken(token) {
  throw new ValidationError;
}
