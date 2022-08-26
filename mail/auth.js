/**
 * Auth Mailer
 */

// Dependencies
const { transporter } = require('./index');
const fs = require('fs');
const path = require('path');

// Auth Mailer Container
const authMailer = {};

// Export mailer
module.exports = authMailer;