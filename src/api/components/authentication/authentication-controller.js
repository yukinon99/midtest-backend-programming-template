const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}
// Objek untuk menyimpan counter login yang gagal
const loginAttempts = {};

async function login(request, response, next) {
  const { email, password } = request.body;

  if (!loginAttempts[email]) {
    loginAttempts[email] = { count: 0, timestamp: Date.now() };
  }

  const currentTime = Date.now();
  const diffTime = (currentTime - loginAttempts[email].timestamp) / 1000;

  // Reset counter jika sudah lebih dari 30 menit
  if (diffTime > 1800) {
    loginAttempts[email] = { count: 0, timestamp: currentTime };
  }

  // Cek apakah sudah mencapai batas maksimum percobaan
  if (loginAttempts[email].count >= 5) {
    return response.status(403).json({
      message: 'Forbidden: Too many failed login attempts',
    });
  }

  try {
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      loginAttempts[email].count++;
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    // Reset counter jika login berhasil
    loginAttempts[email] = { count: 0, timestamp: Date.now() };

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}
module.exports = {
  login,
};
