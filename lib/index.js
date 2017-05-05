/*
 * Ledger HTTP API module
 *
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var _ = require('lodash');
var async = require('async');
var bedrock = require('bedrock');
var brPassport = require('bedrock-passport');
var brRest = require('bedrock-rest');
var config = require('bedrock').config;
var database = require('bedrock-mongodb');
var cors = require('cors');
var docs = require('bedrock-docs');
var ledger = require('bedrock-ledger');
var util = require('util');

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

  // get metadata for all ledgers in the system
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
    description: 'Get metadata for all ledgers known to the system.',
    securedBy: ['null'],
    responses: {
      200: {
        'application/ld+json': {
          example: 'examples/get.ledgers.jsonld'
        }
      }
    }
  });

  // get metadata for specific ledger on the system
  app.get(basePath + '/:ledger',
    cors(),
    brRest.when.prefers.ld,
    brRest.linkedDataHandler({
      get: function(req, res, callback) {
        var actor = req.user ? req.user.identity : undefined;
        var ledgerName = req.params.ledger;
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
  docs.annotate.get(basePath + '/:ledger', {
    description: 'Get metadata for specific ledger known to the system.',
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

  // get state machine information for a particular object
  app.get(basePath + '/:ledger/state',
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
        var ledgerName = req.params.ledger;
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
  docs.annotate.get(basePath + '/:ledger/state', {
    description: 'Get state machine information for a particular object.',
    securedBy: ['null'],
    responses: {
      200: {
        'application/ld+json': {
          example: 'examples/get.ledger.state.jsonld'
        }
      },
      400: 'Retrieval failed due to malformed query.',
      404: 'Query generated zero results; object not found.'
    }
  });

  // get metadata for specific ledger on the system
  app.get(basePath + '/:ledger/:ledgerId/events/:eventNumber',
    cors(),
    brRest.when.prefers.ld,
    brRest.linkedDataHandler({
      get: function(req, res, callback) {
        var actor = req.user ? req.user.identity : undefined;
        var ledgerName = req.params.ledger;
        var eventId = req.params.ledgerId + '/events/' + req.params.eventNumber;
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
  docs.annotate.get(basePath + '/:ledger/:ledgerId/events/:eventNumber', {
    description: 'Get metadata for specific ledger event.',
    securedBy: ['null'],
    responses: {
      200: {
        'application/ld+json': {
          example: 'examples/get.ledger.event.jsonld'
        }
      },
      404: 'Ledger event was not found.'
    }
  });
}
