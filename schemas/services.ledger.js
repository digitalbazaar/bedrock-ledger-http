/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var constants = require('bedrock').config.constants;
var schemas = require('bedrock-validation').schemas;

var postConfig = {
  title: 'Ledger Configuration Event',
  description: 'An object that describes the configuration for a ledger.',
  type: 'object',
  properties: {
    '@context': schemas.jsonldContext(constants.FLEX_LEDGER_CONTEXT_V1_URL),
    id: schemas.identifier({required: false}),
    type: schemas.jsonldType('LedgerConfigurationEvent'),
    ledgerConfig: {
      type: 'object',
      properties: {
        id: schemas.identifier({required: false}),
        type: schemas.jsonldType('LedgerConfiguration'),
        name: {
          title: 'Ledger Name',
          description: 'A human-readable short name for a ledger.',
          required: true,
          type: 'string'
        },
        description: {
          title: 'Ledger Description',
          description: 'A human-readable description of the purpose of a ledger.',
          required: true,
          type: 'string'
        },
        storageMechanism: schemas.jsonldType('SequentialList'),
        consensusAlgorithm: {
          type: 'object',
          properties: {
            type: schemas.jsonldType('ProofOfSignature2016'),
            approvedSigner: {
              type: 'array',
              items: {
                type: schemas.url()
              }
            },
            minimumSignaturesRequired: {
              type: 'number',
              minimum: 1,
              maximum: 7
            }
          }
        },
      },
    },
    previousEvent: {
      type: 'object',
      properties: {
        hash: {
          title: 'Block hash',
          description: 'The hash value the previous event in the blockchain.',
          required: true,
          type: schemas.url()
        },
      },
    },
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
