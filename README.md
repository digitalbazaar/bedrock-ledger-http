[![Build Status](http://ci.digitalbazaar.com/buildStatus/icon?job=bedrock-ledger-http)](http://ci.digitalbazaar.com/job/bedrock-ledger-http)

# Bedrock Ledger HTTP API

A [bedrock][] module to control the creation and management of decentralized
ledgers via an HTTP API.

## Requirements

- npm v3+

## Quick Examples

```
npm install bedrock-ledger-http
```

```js
var actor = 'admin';

var ledgerEndpoint = 'https://example.org/ledgers/';

var ledgerConfigEvent = {
  '@context': 'https://w3id.org/flex/v1',
  id: 'did:c02915fc-672d-4568-8e6e-b12a0b35cbb3/events/1',
  type: 'LedgerConfigurationEvent',
  ledgerConfig: {
    id: 'did:c02915fc-672d-4568-8e6e-b12a0b35cbb3',
    type: 'LedgerConfiguration',
    name: 'test-ledger',
    description: 'A test ledger',
    storageMechanism: 'SequentialList',
    consensusAlgorithm: {
      type: 'ProofOfSignature2016',
      approvedSigner: [ 'https://example.org/keys/authorized-1' ],
      minimumSignaturesRequired: 1
    },
  },
  previousEvent: {
    hash: 'urn:sha256:0000000000000000000000000000000000000000000000000000000000000000';
  }
};

jsigs.sign(ledgerConfigurationEvent, {
    algorithm: 'LinkedDataSignature2015',
    privateKeyPem: myPrivateKey,
    creator: 'https://example.org/keys/authorized-1'
  }, function(err, signedConfigEvent) {
    if(err) {
      return console.log('Signature failed:', err);
    }
    request.post({
      url: ledgerEndpoint,
      body: signedConfigEvent,
      json: true
    }, function(err, res, body) {
      if(err) {
        console.log('Ledger creation failed!');
      } else if(res.statusCode === 201) {
        console.log('Ledger created!')
      }
    });
  });
```

## Configuration

For documentation on configuration, see [config.js](./lib/config.js).

## API

### POST /ledgers

Create a new ledger

Schema: [services.ledger.postConfig](./schemas/services.ledger.js)

 * Response codes:
    * 201: Ledger creation was successful. HTTP Location header contains URL of newly created ledger.
    * 400: Ledger creation failed due to malformed request.
    * 403: Ledger creation failed due to invalid digital signature.
    * 409: Ledger creation failed due to duplicate information.

### POST /ledgers/{ledger}

Append a new event to a ledger.

Schema: [services.ledger.postLedgerEvent](./schemas/services.ledger.js)

  * Response Codes:
    * 201: Ledger was appended successfully. HTTP Location header contains URL of newly appended event.
    * 400: Ledger append failed due to malformed request.
    * 403: Ledger append failed due to invalid digital signature
    * 409: Ledger append failed due to duplicate information.

### GET /ledgers

Get metadata for all ledgers known to the system.

  * Response Codes:
    * 200: [Successful response](./docs/examples/get.ledgers.jsonld)

### GET /ledgers/{ledger}

Get metadata for specific ledger known to the system.

  * Response Codes:
    * 200: [Successful response](./docs/examples/get.ledger.jsonld)
    * 404: Ledger not found.

### GET /ledgers/{ledger}/state

Get state machine information for a particular object.

  * Response Codes:
    * 200: [Successful response](./docs/examples/get.ledger.state.jsonld)
    * 400: Retrieval failed due to malformed query.
    * 404: Query generated zero results; object not found.

### GET /ledgers/{ledger}/{ledgerId}/events/{eventNumber}

Get metadata for specific ledger event.

  * Response Codes:
    * 200: [Successful response](./docs/examples/get.ledger.event.jsonld)
    * 404: Ledger event was not found.

[bedrock]: https://github.com/digitalbazaar/bedrock
