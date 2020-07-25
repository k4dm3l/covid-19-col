'use strict'

const router = require('express').Router();

const { getDataCovid19 } = require('./controller');
const { catchErrors } = require('../../utils/catchError');

router.get('/covid-19', catchErrors(getDataCovid19));

module.exports = router;