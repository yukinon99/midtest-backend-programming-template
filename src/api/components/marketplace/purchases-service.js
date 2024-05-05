const purchasesRepository = require('./purchases-repository');

/**
 * Get list of products
 * @returns {Array}
 */
async function getProducts() {
  const products = await purchasesRepository.getProducts();

  const results = [];
  for (let i = 0; i < products.length; i += 1) {
    const product = products[i];
    results.push({
      id: product.id,
      name: product.name,
      desc: product.desc,
      harga: product.harga,
      quantity: product.quantity,
    });
  }

  return results;
}

/**
 * Get product detail
 * @param {string} id - ID
 * @returns {Object}
 */
async function getProduct(id) {
  const product = await purchasesRepository.getProduct(id);

  // Product not found
  if (!product) {
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    desc: product.desc,
    harga: product.harga,
    quantity: product.quantity,
  };
}

/**
 * Create new product
 * @param {string} name - Name
 * @param {string} desc - Description
 * @param {number} harga - Price
 * @param {number} quantity - Quantity
 * @returns {boolean}
 */
async function createProduct(name, desc, harga, quantity) {
  try {
    await purchasesRepository.createProduct(name, desc, harga, quantity);
    return true;
  } catch (err) {
    return false;
  }
}
/**
 * Update existing product
 * @param {string} id - Product ID
 * @param {string} name - Name
 * @param {string} desc - Description
 * @param {number} harga - Price
 * @param {number} quantity - Quantity
 * @returns {boolean}
 */
async function updateProduct(id, name, desc, harga, quantity) {
  const product = await purchasesRepository.getProduct(id);

  // Product not found
  if (!product) {
    return null;
  }

  try {
    await purchasesRepository.updateProduct(id, name, desc, harga, quantity);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete product
 * @param {string} id - Product ID
 * @returns {boolean}
 */
async function deleteProduct(id) {
  const product = await purchasesRepository.getProduct(id);

  // Product not found
  if (!product) {
    return null;
  }

  try {
    await purchasesRepository.deleteProduct(id);
  } catch (err) {
    return null;
  }

  return true;
}
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
