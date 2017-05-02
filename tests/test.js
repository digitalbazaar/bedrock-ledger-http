/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

var bedrock = require('bedrock');

require('bedrock-express');
require('bedrock-requirejs');
require('bedrock-validation');
require('bedrock-views');
require('bedrock-identity');
require('bedrock-identity-http');
require('bedrock-key');
require('bedrock-key-http');
require('bedrock-ledger-http');

require('bedrock-test');
bedrock.start();
