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
var request = require('request');
request = request.defaults({json: true});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// endpoints used by the tests
var ledgerEndpoint = config.ledger.basePath;

describe('DHS 2016 Ledger HTTP API', function() {
  before(function(done) {
    helpers.prepareDatabase(mockData, done);
  });
  after(function(done) {
    helpers.removeCollections(done);
  });
  describe('configuration', function() {
    it('should allow initial configuration', function(done) {
      var ledgerConfigurationEvent = {
        '@context': 'https://w3id.org/flex/v1',
        id: 'did:c02915fc-672d-4568-8e6e-b12a0b35cbb3',
        name: 'dhs2016poc',
        description: 'A proof of concept for a Verifiable Claims ledger',
        type: 'LedgerConfigurationEvent',
        storageMechanism: 'SequentialList',
        consensusAlgorithm: {
          type: 'ProofOfSignature2016',
          approvedSigner: 'https://webville.va.us.gov/i/planning-department',
          minimumSignaturesRequired: 1
        },
        previousEvent: 'urn:sha256:0000000000000000000000000000000000000000000000000000000000000000',
        signature: {
          type: 'LinkedDataSignature2016',
          created: '2016-02-21T02:10:21Z',
          creator: 'https://webville.va.us.gov/i/planning-department/keys/1',
          signatureValue: 'cNJGLFqT/d/90D4GFzv...yKPiw=='
        }
      };

      request.post({
        url: ledgerEndpoint,
        body: ledgerConfigurationEvent,
        json: true
      }, function(err, res, body) {
        should.not.exist(err);
        res.statusCode.should.equal(201);
        should.exist(body);
        done();
      });
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
    it('should allow public access to ledger metadata', function(done) {
      done();
    });
    it('should allow crawling from latest block to genesis block', function(done) {
      done();
    });
  });
  describe('ledger querying', function() {
    it('should provide latest state for ledger entry', function(done) {
      done();
    });
  });
});
