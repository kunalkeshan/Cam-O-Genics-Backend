/**
 * App Cache
 */

// Dependencies
const NodeCache = require('node-cache');

const cogcCache = new NodeCache({ checkperiod: 36000 });

module.exports = cogcCache;
