/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */

var config = require('bedrock').config;
var path = require('path');

config.mocha.tests.push(path.join(__dirname, '..', 'tests'));

// MongoDB
config.mongodb.name = 'dhs2016ledger_test';
config.mongodb.host = 'localhost';
config.mongodb.port = 27017;
config.mongodb.local.collection = 'dhs2016ledger_test';
config.mongodb.username = 'admin';
config.mongodb.password = 'password';
config.mongodb.adminPrompt = true;
config.mongodb.dropCollections.onInit = true;
config.mongodb.dropCollections.collections = [];

// server info
config.server.port = 39443;
config.server.httpPort = 39080;
config.server.bindAddr = ['dhs2016ledger.dev'];
config.server.domain = 'dhs2016ledger.dev';
config.server.host = 'dhs2016ledger.dev:39080';
config.server.baseUri = 'http://' + config.server.host;

//only run the local package tests
config.mocha.tests = ['tests/01-http-api.js'];