/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
 /* globals describe, before, after, it, should, beforeEach, afterEach */
 /* jshint node: true */

'use strict';

var _ = require('lodash');
var async = require('async');
var bedrock = require('bedrock');
var config = bedrock.config;
var helpers = require('./helpers');
var mockData = require('./mock.data');

describe('DHS 2016 Ledger HTTP API', function() {
  before(function(done) {
    helpers.prepareDatabase(mockData, done);
  });
  after(function(done) {
    helpers.removeCollections(done);
  });
  describe('configuration', function() {
    it('should allow initial configuration', function(done) {
      done();
    });
    it('should not allow unsigned configuration', function(done) {
      done();
    });
    it('should not allow unauthorized configuration', function(done) {
      done();
    });
    it('should not allow malformed configuration', function(done) {
      done();
    });
  });
  describe('ledger writing', function() {
    it('should allow signed write', function(done) {
      done();
    });
    it('should allow signed update', function(done) {
      done();
    });
    it('should not allow unsigned write', function(done) {
      done();
    });
    it('should not allow out-of-order write', function(done) {
      done();
    });
    it('should not allow unauthorized write', function(done) {
      done();
    });
    it('should not allow malformed writes', function(done) {
      done();
    });
  });
  describe('ledger reading', function() {
    it('should provide public access to ledger metadata', function(done) {
      done();
    });
    it('should provide public access to ledger contents', function(done) {
      done();
    });
  });
  describe('ledger querying', function() {
    it('should provide latest state for ledger entry', function(done) {
      done();
    });
  });
});
