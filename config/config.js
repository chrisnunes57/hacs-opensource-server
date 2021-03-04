// config.js - General config module

const Joi = require("joi");

// Require and configure dotenv, will load vars in .env in PROCESS.ENV
require("dotenv").config();

// Define validation for all the env vars
const envVarsSchema = Joi.object({
  // NODE
  NODE_ENV: Joi.string()
    .allow(["development", "production", "test", "provision"])
    .default("development")
    .description("Current environment for API"),
  SERVER_PORT: Joi.number().default(5000).description("API Server Port"),
  // FIREBASE
  FIREBASE_API_KEY: Joi.string()
    .required()
    .description("API key required to use HACS firebase tools"),
  FIREBASE_AUTH_DOMAIN: Joi.string()
    .required()
    .description("HACS firebase app"),
  FIREBASE_DATABASE_URL: Joi.string()
    .required()
    .description("HACS firebase database (firestore)"),
  FIREBASE_PROJECT_ID: Joi.string().required().description("HACS project ID"),
  FIREBASE_STORAGE_BUCKET: Joi.string()
    .required()
    .description("HACS firebase storage bucket"),
  FIREBASE_MESSAGING_SENDER_ID: Joi.number()
    .required()
    .description("HACS firebase storage bucket"),
  FIREBASE_APP_ID: Joi.string().required().description("HACS firebase app ID"),
  FIREBASE_MEASUREMENT_ID: Joi.string()
    .required()
    .description("HACS firebase measurement ID"),
})
  .unknown()
  .required();

// Validate env vars against schema
const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Define config for backend
const config = {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
  firebase: {
    apiKey: envVars.FIREBASE_API_KEY,
    authDomain: envVars.FIREBASE_AUTH_DOMAIN,
    databaseURL: envVars.FIREBASE_DATABASE_URL,
    projectId: envVars.FIREBASE_PROJECT_ID,
    storageBucket: envVars.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: envVars.FIREBASE_MESSAGING_SENDER_ID,
    appId: envVars.FIREBASE_APP_ID,
    measurementId: envVars.FIREBASE_MEASUREMENT_ID,
  },
};

module.exports = config;
