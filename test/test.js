/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const brServer = require('bedrock-server');

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

// only run application on HTTP port
bedrock.events.on('bedrock-express.ready', function(app) {
  // attach express to regular http
  brServer.servers.http.on('request', app);
  // cancel default behavior of attaching to HTTPS
  return false;
});

bedrock.start();
