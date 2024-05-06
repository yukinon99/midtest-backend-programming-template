const joi = require('joi');

module.exports = {
  // Create product
  createProduct: {
    body: {
      name: joi.string().min(1).max(50).required().label('Name'),
      desc: joi.string().required().label('Description'),
      harga: joi.number().required().label('Price'),
      quantity: joi.number().required().label('Quantity'),
    },
  },
  // Update product
  updateProduct: {
    body: {
      name: joi.string().min(1).max(50).required().label('Name'),
      desc: joi.string().required().label('Description'),
      harga: joi.number().required().label('Price'),
      quantity: joi.number().required().label('Quantity'),
    },
  },
};
