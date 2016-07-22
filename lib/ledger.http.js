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
var ledger = require('./ledger.storage');
var util = require('util');

var BedrockError = bedrock.util.BedrockError;
var ensureAuthenticated = brPassport.ensureAuthenticated;
var validate = require('bedrock-validation').validate;

var logger = bedrock.loggers.get('app');

// add routes
bedrock.events.on('bedrock-express.configure.routes', addRoutes);

function addRoutes(app) {
  var basePath = bedrock.config.ledger.basePath;

  app.options(basePath, cors());

  // create new ledger
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
    description: 'Create a new ledger',
    schema: 'services.ledger.postConfig',
    securedBy: ['null'],
    responses: {
      201: 'Ledger creation was successful.',
      400: 'Ledger creation failed.',
      409: 'The ledger is a duplicate and was not created.'
    }
  });

  // write information to a ledger
  app.post(basePath + '/:ledger',
    validate('services.ledger.postLedgerEvent'),
    function(req, res, next) {
      var ledgerName = req.params.ledger;
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
  docs.annotate.post(basePath + '/:ledger', {
    description: 'Add a new event to a ledger',
    schema: 'services.ledger.postLedgerEvent',
    securedBy: ['null'],
    responses: {
      201: 'Ledger event was added successfully.',
      400: 'Ledger event failed to be added.',
      409: 'The ledger event with the given ID already exists.'
    }
  });

  // get metadata for all ledgers in the system
  app.get(basePath,
    cors(),
    brRest.when.prefers.ld,
    brRest.linkedDataHandler({
      get: function(req, res, callback) {
        var actor = req.user ? req.user.identity : undefined;
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
      200: 'Retrieval of ledgers successful.'
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
      200: 'Retrieval of ledger metadata successful.'
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
  docs.annotate.get(basePath, {
    description: 'Get metadata for specific ledger event.',
    securedBy: ['null'],
    responses: {
      200: 'Retrieval of ledger event metadata successful.'
    }
  });
}
