/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var constants = require('bedrock').config.constants;
var schemas = require('bedrock-validation').schemas;

var postConfig = {
  type: 'object',
  properties: {
    '@context': schemas.jsonldContext(constants.FLEX_LEDGER_CONTEXT_V1_URL),
    type: {
      type: 'string',
      enum: ['LedgerConfigurationEvent']
    }
  }
};

module.exports.postConfig = function() {
  return postConfig;
};
