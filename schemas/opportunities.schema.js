// opportunities.schema.js - Opportunities data schemas module

const Joi = require("joi");

const eventDataSchema = Joi.array().items(Joi.object({
  title: Joi.string().required(),
  startTime: Joi.string().isoDate().allow(null),
  endTime: Joi.string().isoDate().allow(null),
  img: Joi.string().allow(null),
  meetingLink: Joi.string().allow(null),
  rsvpLink: Joi.string().allow(null),
  location: Joi.string().allow(null),
  description: Joi.string().allow(null),
  otherLinks: Joi.object({
    flyerLink: Joi.string().allow(null),
    jobListing: Joi.string().allow(null),
  }).unknown(),
}));

const jobListingDataSchema = Joi.array().items(Joi.object({
  title: Joi.string().required(),
  timeline: Joi.object({
    openDate: Joi.string().isoDate().allow(null),
    closeDate: Joi.string().isoDate().allow(null),
  }),
  img: Joi.string().allow(null),
  link: Joi.string().allow(null),
  description: Joi.string().allow(null),
  otherLinks: Joi.object({
    flyerLink: Joi.string().allow(null),
  }).unknown(),
}));

const scholarshipDataSchema = Joi.array().items(Joi.object({
  title: Joi.string().required(),
  timeline: Joi.object({
    openDate: Joi.string().isoDate().allow(null),
    closeDate: Joi.string().isoDate().allow(null),
  }),
  img: Joi.string().allow(null),
  link: Joi.string().allow(null),
  description: Joi.string().allow(null),
  otherLinks: Joi.object().unknown(),
}));

module.exports = {
  "/opportunities/events": eventDataSchema,
  "/opportunities/jobs": jobListingDataSchema,
  "/opportunities/scholarships": scholarshipDataSchema,
};
