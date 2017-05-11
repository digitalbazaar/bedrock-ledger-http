/*
 * Ledger HTTP API module
 *
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var brPassport = require('bedrock-passport');
var brRest = require('bedrock-rest');
var cors = require('cors');
var docs = require('bedrock-docs');
var ledger = require('bedrock-ledger');

var BedrockError = bedrock.util.BedrockError;
var ensureAuthenticated = brPassport.ensureAuthenticated;
var validate = require('bedrock-validation').validate;

var logger = bedrock.loggers.get('app');

require('./config');

// add routes
bedrock.events.on('bedrock-express.configure.routes', addRoutes);

function addRoutes(app) {
  var basePath = bedrock.config.ledger.basePath;

  app.options(basePath, cors());

  // create a new ledger agent
  app.post(basePath,
    validate('services.ledger.postConfig'),
    function(req, res, next) {
      var ledgerConfigEvent = req.body;
      // FIXME: add permissions in real product
      ledger.createLedger(
        null, ledgerConfigEvent, {}, function(err, ledgerUrl) {
        if(err) {
          return next(err);
        }
        // return the saved config
        res.set('Location', ledgerUrl);
        res.status(201).end();
      });
  });
  docs.annotate.post(basePath, {
    description: 'Create a new ledger agent',
    schema: 'services.ledger.postConfig',
    securedBy: ['null'],
    responses: {
      201: 'Ledger agent creation was successful. HTTP Location header ' +
        'contains URL of newly created ledger agent.',
      400: 'Ledger agent creation failed due to malformed request.',
      403: 'Ledger agent creation failed due to invalid digital signature.',
      409: 'Ledger agent creation failed due to duplicate information.'
    }
  });

  // request that a ledger agent writes an event to the ledger
  app.post(basePath + '/:agent/events',
    validate('services.ledger.postLedgerEvent'),
    function(req, res, next) {
      var ledgerName = req.params.agent;
      var ledgerEvent = req.body;
      // FIXME: add permissions in real product
      ledger.writeLedgerEvent(
        null, ledgerName, ledgerEvent, {}, function(err, eventUrl) {
        if(err) {
          return next(err);
        }
        // return the saved config
        res.set('Location', eventUrl);
        res.status(201).end();
      });
  });
  docs.annotate.post(basePath + '/:agent/events', {
    description: 'Request that a Ledger Agent append a new event to a ledger',
    schema: 'services.ledger.postLedgerEvent',
    securedBy: ['null'],
    responses: {
      201: 'Ledger event was accepted for writing. HTTP Location header ' +
        'contains URL of accepted event.',
      400: 'Ledger append request failed due to malformed request.',
      403: 'Ledger append request failed due to invalid digital signature',
      409: 'Ledger append request failed due to duplicate information.'
    }
  });

  // get information on all ledger agents known to this system
  app.get(basePath,
    cors(),
    brRest.when.prefers.ld,
    brRest.linkedDataHandler({
      get: function(req, res, callback) {
        var actor = req.user ? req.user.identity : undefined;

        // TODO: Implement owner-based querying
        if(req.query.owner) {
          return callback(new BedrockError('Query by owner not implemented'));
        }

        ledger.getAllLedgerMetadata(actor, {}, function(err, ledgers) {
          if(err) {
            return callback(err);
          }
          callback(err, ledgers);
        });
      }
    })
  );
  docs.annotate.get(basePath, {
    description: 'Get information on all ledger agents known to this system.',
    securedBy: ['null'],
    responses: {
      200: {
        'application/ld+json': {
          example: 'examples/get.ledgers.jsonld'
        }
      }
    }
  });

  // get status information for a specific ledger agent on the system
  app.get(basePath + '/:agent',
    cors(),
    brRest.when.prefers.ld,
    brRest.linkedDataHandler({
      get: function(req, res, callback) {
        var actor = req.user ? req.user.identity : undefined;
        var ledgerName = req.params.agent;
        ledger.getLedgerMetadata(
          actor, ledgerName, {}, function(err, ledgerMetadata) {
          if(err) {
            return callback(err);
          }
          callback(err, ledgerMetadata);
        });
      }
    })
  );
  docs.annotate.get(basePath + '/:agent', {
    description:
      'Get status information for specific ledger agent known to this system.',
    securedBy: ['null'],
    responses: {
      200: {
        'application/ld+json': {
          example: 'examples/get.ledger.jsonld'
        }
      },
      404: 'Ledger not found.'
    }
  });

  // query the current state machine associated with a ledger
  app.get(basePath + '/:agent/query',
    cors(),
    brRest.when.prefers.ld,
    brRest.linkedDataHandler({
      get: function(req, res, callback) {
        if(!req.query.id) {
          return callback(new BedrockError(
            'Query missing \'id\' query parameter.',
            'BadRequest', {
              httpStatusCode: 400,
              public: true
            }
          ));
        }
        var actor = req.user ? req.user.identity : undefined;
        var ledgerName = req.params.agent;
        var objectId = req.query.id;
        ledger.getStateMachineObject(
          actor, ledgerName, objectId, {}, function(err, item) {
          if(err) {
            return callback(err);
          }
          callback(err, item);
        });
      }
    })
  );
  docs.annotate.get(basePath + '/:agent/query', {
    description: 'Query the current state machine associated with a ledger.',
    securedBy: ['null'],
    responses: {
      200: {
        'application/ld+json': {
          example: 'examples/get.ledger.state.jsonld'
        }
      },
      400: 'Request failed due to malformed query.',
      404: 'Query generated zero results; object not found.'
    }
  });

  // get a specific block in the system
  app.get(basePath + '/:agent/blocks',
    cors(),
    brRest.when.prefers.ld,
    brRest.linkedDataHandler({
      get: function(req, res, callback) {
        var actor = req.user ? req.user.identity : undefined;
        var ledgerName = req.params.agent;
        var eventId = req.query.id;
        ledger.getLedgerEvent(
          actor, ledgerName, eventId, {}, function(err, ledgerEventMetadata) {
          if(err) {
            return callback(err);
          }
          callback(err, ledgerEventMetadata);
        });
      }
    })
  );
  docs.annotate.get(basePath + '/:agent/blocks', {
    description: 'Get information about a specific block in the ledger.',
    securedBy: ['null'],
    responses: {
      200: {
        'application/ld+json': {
          example: 'examples/get.ledger.event.jsonld'
        }
      },
      404: 'Ledger block was not found.'
    }
  });
}
