/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');

require('bedrock-express');
require('bedrock-identity-http');
require('bedrock-key-http');
require('bedrock-ledger-http');

require('bedrock-test');

bedrock.start();
