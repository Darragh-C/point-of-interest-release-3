import Joi from "joi";

// user specs
export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("john.doe@mail.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
    firstName: Joi.string().example("John").required(),
    lastName: Joi.string().example("Doe").required(),
    isAdmin: Joi.boolean().allow("").example("True").optional(),
  })
  .label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number()
})
.label("UserDetails");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");



// pin specs
export const PinSpec = Joi.object()
  .keys({
    name: IdSpec,
    userid: IdSpec,
    description: Joi.string().allow("").example("A seaside town west of Cork").optional(),
    lattitude: Joi.string().allow("").example("51.71").optional(),
    longitude: Joi.string().allow("").example("8.5").optional(),
    county: Joi.string().allow("").example("Cork").optional(),
    category: Joi.string().allow("").example("Public parking").optional(),
    img: Joi.string().allow("").example("http://path/your-image.png").optional(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("PinDetails");

  export const PinSpecPlus = PinSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
  }).label("PinPlus");

  export const TagSpec = Joi.object()
  .keys({
    name: Joi.string().allow("").example("Kinsale").optional(),
    userid: IdSpec,
    description: Joi.string().allow("").example("A seaside town west of Cork").optional(),
    lattitude: Joi.string().allow("").example("51.71").optional(),
    longitude: Joi.string().allow("").example("8.5").optional(),
    county: Joi.string().allow("").example("Cork").optional(),
    category: Joi.string().allow("").example("Public parking").optional(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("TagDetails");

export const PinArray = Joi.array().items(PinSpec).label("PinArray");
