/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var constants = require('bedrock').config.constants;
var schemas = require('bedrock-validation').schemas;

var postConfig = {
  type: 'object',
  properties: {
    '@context': schemas.jsonldContext(constants.FLEX_LEDGER_CONTEXT_V1_URL),
    type:  schemas.jsonldType('LedgerConfigurationEvent'),
    signature: schemas.linkedDataSignature()
  }
};

var postLedgerEvent = {
  type: 'object',
  properties: {
    '@context': schemas.jsonldContext(constants.FLEX_LEDGER_CONTEXT_V1_URL),
    type: schemas.jsonldType('LedgerStorageEvent'),
    signature: schemas.linkedDataSignature()
  }
};

module.exports.postConfig = function() {
  return postConfig;
};

module.exports.postLedgerEvent = function() {
  return postLedgerEvent;
};
