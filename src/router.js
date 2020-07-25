'use strict'

const mainRouter = require('express').Router();

mainRouter.use('/v1', require('./components/integrationINS/router'));
mainRouter.use('/v1', require('./components/api/router'));

module.exports = mainRouter;