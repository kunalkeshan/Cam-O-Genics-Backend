/**
 * App Cache
 */

// Dependencies
const NodeCache = require('node-cache');

const cogcCache = new NodeCache();

module.exports = cogcCache;
