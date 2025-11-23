const validator = require('validator');

function isValidUrl(url) {
    if (!url || typeof url !== 'string') return false;
    // validator accepts protocol; add http if missing for convenience
    const prefixed = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    return validator.isURL(prefixed, { require_protocol: true });
}

module.exports = { isValidUrl };
