/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

process.env['NODE_PATH'] = '../node_modules';
var bedrock = require('bedrock');
// NOTE: it is critical that bedrock-protractor be required first so that
// it can register a bedrock.cli event listener
// require('bedrock-protractor');
require('../lib');
require('./test.config');
require('bedrock-test');
bedrock.start();
