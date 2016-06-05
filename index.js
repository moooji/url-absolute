'use strict';

const url = require('url');
const validation = require('valido');
const createError = require('custom-error-generator');
const InvalidArgumentError = createError('InvalidArgumentError');

function absolutify(baseUrl, partialUrl) {
  if (!validation.isUrl(baseUrl)) {
    throw new InvalidArgumentError('Invalid base URL');
  }

  if (!validation.isString(partialUrl)) {
    throw new InvalidArgumentError('Invalid partial URL');
  }

  return url.resolve(baseUrl, partialUrl);
}

module.exports = absolutify;
module.exports.InvalidArgumentError = InvalidArgumentError;
