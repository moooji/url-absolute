'use strict';

const url = require('url');
const is = require('valido');

function absolutify(baseUrl, partialUrl) {
  if (!is.uri(baseUrl)) {
    throw new TypeError('Invalid base URL');
  }

  if (!is.string(partialUrl)) {
    throw new TypeError('Invalid partial URL');
  }

  if (is.uri(partialUrl)) {
    return partialUrl;
  }

  return url.resolve(baseUrl, partialUrl);
}

module.exports = absolutify;
