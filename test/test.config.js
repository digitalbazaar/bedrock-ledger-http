/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;
var fs = require('fs');
var path = require('path');

config.mocha.tests.push(path.join(__dirname, 'mocha'));

// MongoDB
config.mongodb.name = 'bedrock_ledger_http_test';
config.mongodb.local.collection = 'bedrock_ledger_http_test';
config.mongodb.dropCollections.onInit = true;
config.mongodb.dropCollections.collections = [];

// server info
config.server.port = 39443;
config.server.httpPort = 39080;
config.server.bindAddr = ['ledger.bedrock.dev'];
config.server.domain = 'ledger.bedrock.dev';

// ledger constants
var constants = config.constants;
// Web Ledger JSON-LD context URL and local copy
constants.WEB_LEDGER_CONTEXT_V1_URL = 'https://w3id.org/webledger/v1';
constants.CONTEXTS[constants.WEB_LEDGER_CONTEXT_V1_URL] = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../contexts/webledger-v1.jsonld'),
    {encoding: 'utf8'}));
constants.TEST_CONTEXT_V1_URL = 'https://w3id.org/test/v1';
constants.CONTEXTS[constants.TEST_CONTEXT_V1_URL] = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, './contexts/test-v1.jsonld'),
    {encoding: 'utf8'}));

// serve static contexts
config.express.static.push({
  route: '/contexts',
  path: path.join(__dirname, '..', 'contexts'),
  cors: true
});

// use local contexts
config.views.vars.contextMap[config.constants.SECURITY_CONTEXT_V1_URL] =
  config.server.baseUri + '/contexts/security-v1.jsonld';
config.views.vars.contextMap[config.constants.IDENTITY_CONTEXT_V1_URL] =
  config.server.baseUri + '/contexts/identity-v1.jsonld';
config.views.vars.contextMap[config.constants.WEB_LEDGER_CONTEXT_V1_URL] =
  config.server.baseUri + '/contexts/webledger-v1.jsonld';
config.views.vars.contextMap[config.constants.TEST_CONTEXT_V1_URL] =
  config.server.baseUri + '/contexts/test-v1.jsonld';
