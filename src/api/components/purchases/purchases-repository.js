const { Products } = require('../../../models');

/**
 * Get a list of products
 * @returns {Promise}
 */
async function getProducts() {
  return Products.find({});
}

/**
 * Get product detail
 * @param {string} id - Product ID
 * @returns {Promise}
 */
async function getProduct(id) {
  return Products.findById(id);
}

/**
 * Create products
 * @param {string} name - Name
 * @param {string} desc - Description
 * @param {string} harga - Harga
 * @param {string} quantity - Quantity
 * @returns {Promise}
 */
async function createProduct(name, desc, harga, quantity) {
  return Products.create({
    name,
    desc,
    harga,
    quantity,
  });
}
/**
 * Update existing product
 * @param {string} id - Product ID
 * @param {string} name - Name
 * @param {string} desc - Description
 * @param {string} harga - Harga
 * @param {string} quantity - Quantity
 * @returns {Promise}
 */
async function updateProduct(id, name, desc, harga, quantity) {
  return Products.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        desc,
        harga,
        quantity,
      },
    }
  );
}

/**
 * Delete a product
 * @param {string} id - Product ID
 * @returns {Promise}
 */
async function deleteProduct(id) {
  return Products.deleteOne({ _id: id });
}
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
