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
      var ledgerConfig = req.body;
      ledger.createLedger(ledgerConfig, {}, function(err, savedConfig) {
        if(err) {
          return next(err);
        }
        // return the saved config
        res.set('Location', savedConfig.accessUrl);
        res.status(201).json(savedConfig);
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

  // get a list of ledgers on the system
  app.get(basePath,
    cors(),
    brRest.when.prefers.ld,
    brRest.linkedDataHandler({
      get: function(req, res, callback) {
        var actor = req.user ? req.user.identity : undefined;
        ledger.getLedgers(req.query.owner, actor, function(err, records) {
          if(err) {
            return callback(err);
          }
          callback(err, records ? _.map(records, 'ledger') : null);
        });
      }
    })
  );
  docs.annotate.get(basePath, {
    description: 'Get the list of all ledgers known to the system',
    securedBy: ['null'],
    responses: {
      200: 'Retrieval of ledgers successful.'
    }
  });
}