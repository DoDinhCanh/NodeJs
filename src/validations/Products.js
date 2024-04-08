import Joi from "joi";

const createValidation = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().required(),
  rate: Joi.number().required().min(1).max(5),
});

export { productValidation };
