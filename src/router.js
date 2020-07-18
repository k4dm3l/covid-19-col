'use strict'

const mainRouter = require('express').Router();

mainRouter.use('/v1', require('./components/integrationINS/router'));

module.exports = mainRouter;