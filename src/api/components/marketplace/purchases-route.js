const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const purchasesControllers = require('./purchases-controller');
const purchasesValidator = require('./purchases-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/marketplace', route);

  // Get list of products
  route.get('/', authenticationMiddleware, purchasesControllers.getProducts);

  // Create products
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(purchasesValidator.createProduct),
    purchasesControllers.createProduct
  );

  // Get products detail
  route.get('/:id', authenticationMiddleware, purchasesControllers.getProduct);

  // Update product
  route.put(
    '/:id',
    authenticationMiddleware,
    purchasesControllers.updateProduct
  );

  // Delete product
  route.delete(
    '/:id',
    authenticationMiddleware,
    purchasesControllers.deleteProduct
  );
};
