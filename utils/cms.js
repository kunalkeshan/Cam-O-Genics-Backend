/**
 * Custom Content Management System (CMS)
 */

// Dependencies
const ImageKit = require('imagekit');
// const { } = require('../config');

const imageKit = new ImageKit({
    publicKey: 'your_public_api_key',
    privateKey: 'your_private_api_key',
    urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id/',
});

// CMS Util Container
const cmsUtil = {};

// Export Util
module.exports = cmsUtil;
