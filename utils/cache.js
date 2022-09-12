/**
 * App Cache
 */

// Dependencies
const NodeCache = require('node-cache');

const cogcCache = new NodeCache({ checkperiod: 120, stdTTL: 10000000 });

module.exports = cogcCache;
