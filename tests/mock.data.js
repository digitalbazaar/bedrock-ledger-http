/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
 /* jshint node: true */

'use strict';

var helpers = require('./helpers');

var data = {};
module.exports = data;

var identities = {};
data.identities = identities;

// FIXME: Create users
var userName = 'hhs';
identities[userName] = {};
