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
var jsigs = require('jsonld-signatures');
var mockData = require('./mock.data');
var request = require('request');
request = request.defaults({json: true});

// ignore invalid TLS certificates in test mode
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// use local JSON-LD processor for signatures
jsigs.use('jsonld', bedrock.jsonld);

// endpoints used by the tests
var ledgerEndpoint = config.server.baseUri + config.ledger.basePath;
var dhsLedgerEndpoint = ledgerEndpoint + '/dhs2016poc';

// authorized signer URL
var authorizedSignerUrl = config.server.baseUri + '/i/fema/keys/1';

// unauthorized signer URL
var unauthorizedSignerUrl = config.server.baseUri + '/i/isis/keys/1';

// base ledger configuration event
var ledgerConfigurationEvent = {
  '@context': 'https://w3id.org/flex/v1',
  id: 'did:c02915fc-672d-4568-8e6e-b12a0b35cbb3/events/1',
  type: 'LedgerConfigurationEvent',
  ledgerConfig: {
    id: 'did:c02915fc-672d-4568-8e6e-b12a0b35cbb3',
    type: 'LedgerConfiguration',
    name: 'dhs2016poc',
    description: 'A proof of concept for a Verifiable Claims ledger',
    storageMechanism: 'SequentialList',
    consensusAlgorithm: {
      type: 'ProofOfSignature2016',
      approvedSigner: authorizedSignerUrl,
      minimumSignaturesRequired: 1
    },
  },
  previousEvent: {
    hash: 'urn:sha256:0000000000000000000000000000000000000000000000000000000000000000'
  }
};

// ledger storage event - verifiable claim
var ledgerStorageEvent = {
  '@context': [
    'https://w3id.org/flex/v1'/*,
    'https://w3id.org/dhs/credentials/v1',*/
  ],
  id: 'did:c02915fc-672d-4568-8e6e-b12a0b35cbb3/events/2',
  type: 'LedgerStorageEvent',
  replacesObject: [{
    id: 'https://example.us.gov/credentials/234234542',
    type: ['Credential', 'EmergencyResponseCredential'],
    claim: {
      id: 'did:370d4e2c-8839-4588-9ff7-2fda89da341f',
      emsLicense: {
        id: 'ems:FF-37-48573',
        status: 'valid'
      }
    }
  }],
  previousEvent: {
    id: 'did:c02915fc-672d-4568-8e6e-b12a0b35cbb3/events/1',
    hash: 'urn:sha256:'
  }
};

describe('DHS 2016 Ledger HTTP API', function() {
  before(function(done) {
    helpers.prepareDatabase(mockData, done);
  });
  after(function(done) {
    //helpers.removeCollections(done);
    done();
  });
  describe('configuration', function() {
    it('should allow initial configuration', function(done) {
      jsigs.sign(ledgerConfigurationEvent, {
        algorithm: 'LinkedDataSignature2015',
        privateKeyPem: mockData.agencies.fema.privateKey,
        creator: authorizedSignerUrl
      }, function(err, signedConfigEvent) {
        if(err) {
          return done(err);
        }
        request.post({
          url: ledgerEndpoint,
          body: signedConfigEvent,
          json: true
        }, function(err, res, body) {
          should.not.exist(err);
          res.statusCode.should.equal(201);
          done();
        });
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
      done(); // FIXME: temporary
      jsigs.sign(ledgerStorageEvent, {
        algorithm: 'LinkedDataSignature2015',
        privateKeyPem: mockData.agencies.fema.privateKey,
        creator: authorizedSignerUrl
      }, function(err, signedStorageEvent) {
        if(err) {
          return done(err);
        }
        request.post({
          url: dhsLedgerEndpoint,
          body: signedStorageEvent,
          json: true
        }, function(err, res, body) {
          should.not.exist(err);
          res.statusCode.should.equal(201);
          done();
        });
      });
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
