// utils/schema.js
const Joi = require("joi");

// Allow amenities as an array of strings. `.single()` lets one checkbox submit work too.
const amenityItem = Joi.string().trim().max(50);

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().trim().min(2).required(),
    description: Joi.string().trim().min(10).required(),
    location: Joi.string().trim().required(),
    country: Joi.string().trim().required(),
    price: Joi.number().min(0).required(),
    amenities: Joi.array().items(amenityItem).single().default([]),

   
  })
  .unknown(true)   // tolerate extra fields (e.g., if you add more later)
  .required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().trim().required(),
  }).required(),
});
