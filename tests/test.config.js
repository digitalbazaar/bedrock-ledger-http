/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
const config = require('bedrock').config;
const os = require('os');
const path = require('path');

const permissions = config.permission.permissions;
const roles = config.permission.roles;

config.mocha.tests.push(path.join(__dirname, 'mocha'));

// common paths
config.paths.cache = path.join(__dirname, '..', '.cache');
config.paths.log = path.join(os.tmpdir(), 'test.ledger.veres.dev');

// server info
config.server.port = 23443;
config.server.httpPort = 22080;
config.server.domain = 'test.ledger.veres.dev';

// mongodb config
config.mongodb.name = 'ledger_veres_test';
config.mongodb.local.collection = 'ledger_veres_test';
config.mongodb.dropCollections = {};
config.mongodb.dropCollections.onInit = true;
config.mongodb.dropCollections.collections = [];
