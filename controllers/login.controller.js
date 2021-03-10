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

  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        if (data) {
          console.info("Successfully logged into firebase!");
          resolve({
            user: {
              email: data.user.email,
              uid: data.user.uid
            }
          })
        }
      }).catch((error) => {
        reject(error)
      });
  });
}
