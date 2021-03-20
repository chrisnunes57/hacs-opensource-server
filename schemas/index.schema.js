const Joi = require("joi");

const opportunitiesDataSchema = Joi.object({
  studentId: personID.required(),
  amount: Joi.number().positive().greater(1).precision(2).required(),
  cardNumber: Joi.string().creditCard().required(),
  completedAt: Joi.date().timestamp().required(),
});

module.exports = {
  "/opportunities": opportunitiesDataSchema,
};
