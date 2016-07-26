/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
 /* jshint node: true */
'use strict';

var _ = require('lodash');
var async = require('async');
var brKey = require('bedrock-key');
var brIdentity = require('bedrock-identity');
var config = require('bedrock').config;
var uuid = require('node-uuid').v4;
var database = require('bedrock-mongodb');

var api = {};
module.exports = api;

api.createIdentity = function(userName) {
  var userId = config.server.baseUri + config['identity-rest'].basePath + '/' +
    userName;
  var newIdentity = {
    id: userId,
    type: 'Identity',
    sysSlug: userName,
    label: userName,
    email: userName + '@dhs2016ledger.dev',
    sysPassword: 'password',
    sysPublic: ['label', 'url', 'description'],
    sysResourceRole: [],
    url: config.server.baseUri,
    description: userName
  };
  return newIdentity;
};

api.createKeyPair = function(options) {
  var userName = options.userName;
  var publicKey = options.publicKey;
  var privateKey = options.privateKey;
  var keyId = config.server.baseUri + config.key.basePath + '/' +
    userName + '-key-1';
  var ownerId = null;
  if(userName === 'userUnknown') {
    ownerId = '';
  } else {
    ownerId = options.userId;
  }
  var newKeyPair = {
    publicKey: {
      '@context': 'https://w3id.org/identity/v1',
      id: keyId,
      type: 'CryptographicKey',
      owner: ownerId,
      label: userName + ' signing key',
      publicKeyPem: publicKey
    },
    privateKey: {
      type: 'CryptographicKey',
      owner: ownerId,
      label: userName + ' signing key',
      publicKey: keyId,
      privateKeyPem: privateKey
    }
  };
  return newKeyPair;
};

api.prepareDatabase = function(mockData, callback) {
  async.series([
    function(callback) {
      api.removeCollections(callback);
    },
    function(callback) {
      insertTestData(mockData, callback);
    }
  ], callback);
};

api.removeCollections = function(callback) {
  var collectionNames =
    ['ledger', 'dhs2016poc_ledger'];
  database.openCollections(collectionNames, function(err) {
    async.each(collectionNames, function(collectionName, callback) {
      database.collections[collectionName].remove({}, callback);
    }, function(err) {
      callback(err);
    });
  });
};

api.removeCollection = function(collection, callback) {
  var collectionNames = [collection];
  database.openCollections(collectionNames, function(err) {
    async.each(collectionNames, function(collectionName, callback) {
      database.collections[collectionName].remove({}, callback);
    }, function(err) {
      callback(err);
    });
  });
};

// Insert identities and public keys used for testing into database
function insertTestData(mockData, callback) {
  // add to view variables
  config.views.vars['dhs2016poc'] = {
    identity: {},
    authorizedSigners: []
  };
  async.forEachOf(mockData.identities, function(identity, key, callback) {
    async.parallel([
      function(callback) {
        brIdentity.insert(null, identity.identity, callback);
        var viewsIdentity = identity.identity;
        viewsIdentity.publicKey = identity.keys.publicKey;
        viewsIdentity.privateKey = identity.keys.privateKey;
        config.views.vars['dhs2016poc'].identity[viewsIdentity.sysSlug] =
          viewsIdentity;
        if(viewsIdentity.sysSlug != 'isis') {
          config.views.vars['dhs2016poc'].authorizedSigners.push(
            viewsIdentity.publicKey.id);
        }
      },
      function(callback) {
        brKey.addPublicKey(null, identity.keys.publicKey, callback);
      }
    ], callback);
  }, function(err) {
    if(err) {
      if(!database.isDuplicateError(err)) {
        // duplicate error means test data is already loaded
        return callback(err);
      }
    }
    callback();
  }, callback);
}
