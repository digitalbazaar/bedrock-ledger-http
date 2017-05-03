/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;
var path = require('path');

// ledger validation schemas
config.validation.schema.paths.push(path.join(__dirname, '..', 'schemas'));

// ledger configuration
config.ledger = {};
config.ledger.basePath = '/ledgers';
