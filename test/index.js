'use strict';

const expect = require('chai').expect;
const absolutify = require('../index');
const InvalidArgumentError = absolutify.InvalidArgumentError;

describe('Join', () => {
  it('should throw InvalidArgumentError if url is a number', () => {
    expect(() => absolutify('http://www.google.com', 123))
      .to.throw(InvalidArgumentError);
  });

  it('should throw InvalidArgumentError if url is an array', () => {
    expect(() => absolutify('http://www.google.com', []))
      .to.throw(InvalidArgumentError);
  });

  it('should throw InvalidArgumentError if url is null', () => {
    expect(() => absolutify('http://www.google.com', null))
      .to.throw(InvalidArgumentError);
  });

  it('should throw InvalidArgumentError if url is undefined', () => {
    expect(() => absolutify('http://www.google.com', undefined))
      .to.throw(InvalidArgumentError);
  });

  it('should throw InvalidArgumentError if baseUrl is a number', () => {
    expect(() => absolutify(123, '/index.html'))
      .to.throw(InvalidArgumentError);
  });

  it('should throw InvalidArgumentError if baseUrl is an array', () => {
    expect(() => absolutify([], '/index.html'))
      .to.throw(InvalidArgumentError);
  });

  it('should throw InvalidArgumentError if baseUrl is null', () => {
    expect(() => absolutify(null, '/index.html'))
      .to.throw(InvalidArgumentError);
  });

  it('should throw InvalidArgumentError if baseUrl is undefined', () => {
    expect(() => absolutify(undefined, '/index.html'))
      .to.throw(InvalidArgumentError);
  });

  it('should throw InvalidArgumentError if baseUrl is not absolutify', () => {
    expect(() => absolutify('/index.html', '/index.html'))
      .to.throw(InvalidArgumentError);
  });

  it('should return an absolutify url for HTTP', () => {
    const urlString = '/visit_blogg_rss.ashx?id=1009218&yes=true#top';
    const baseUrlString = 'http://user:pass@nouw.com:8080';
    const result = absolutify(baseUrlString, urlString);

    expect(result)
      .to.equal('http://user:pass@nouw.com:8080/visit_blogg_rss.ashx?id=1009218&yes=true#top');
  });

  it('should return an absolutify url for non HTTP', () => {
    const urlString = '/index.html';
    const baseUrlString = 'ftp://user:pass@google.com:21';
    const result = absolutify(baseUrlString, urlString);
    expect(result).to.equal('ftp://user:pass@google.com:21/index.html');
  });

  it('should return an absolutify url if input url does not have leading slash', () => {
    const urlString = 'index.php?id=1009218&yes=true#top';
    const baseUrlString = 'http://user:pass@www.google.com:80';
    const result = absolutify(baseUrlString, urlString);

    expect(result)
      .to.equal('http://user:pass@www.google.com:80/index.php?id=1009218&yes=true#top');
  });

  it('should return an absolutify url if input url was already absolutify', () => {
    const urlString = 'http://user:pass@nouw.com:8080/visit_blogg_rss.ashx?id=1009218&yes=true#top';
    const baseUrlString = 'https://peter:paul@www.google.com:80';
    const result = absolutify(baseUrlString, urlString);

    expect(result)
      .to.equal('http://user:pass@nouw.com:8080/visit_blogg_rss.ashx?id=1009218&yes=true#top');
  });

  it('should return http:// url if input starts with // and base is http://', () => {
    const urlString = '//user:pass@www.facebook.com:8080/allow.html';
    const baseUrlString = 'http://peter:paul@www.google.com:80';
    const result = absolutify(baseUrlString, urlString);

    expect(result).to.equal('http://user:pass@www.facebook.com:8080/allow.html');
  });

  it('should return https:// url if input starts with // and base is https://', () => {
    const urlString = '//user:pass@www.facebook.com:8080/allow.html';
    const baseUrlString = 'https://peter:paul@www.google.com:80';
    const result = absolutify(baseUrlString, urlString);

    expect(result).to.equal('https://user:pass@www.facebook.com:8080/allow.html');
  });
});
