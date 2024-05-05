const mongoose = require('mongoose');

const failedLoginAttemptSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  count: { type: Number, required: true, default: 0 },
  timestamp: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('FailedLoginAttempt', failedLoginAttemptSchema);
