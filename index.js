'use strict';

const url = require('url');
const validation = require('valido');

function absolutify(baseUrl, partialUrl) {
  if (!validation.isUrl(baseUrl)) {
    throw new TypeError('Invalid base URL');
  }

  if (!validation.isString(partialUrl)) {
    throw new TypeError('Invalid partial URL');
  }

  if (validation.isUrl(partialUrl)) {
    return partialUrl;
  }

  return url.resolve(baseUrl, partialUrl);
}

module.exports = absolutify;
