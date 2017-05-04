/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;
var path = require('path');

// ledger configuration
config.ledger = {};
config.ledger.basePath = '/ledgers';

// ledger validation schemas
config.validation.schema.paths.push(path.join(__dirname, '..', 'schemas'));

// docs configuration
config.docs.categories[config.ledger.basePath] = 'Ledger Services';
config.docs.paths.push(path.join(__dirname, '..', 'docs'));
