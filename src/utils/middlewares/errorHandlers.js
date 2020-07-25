'use strict'

const boom = require('@hapi/boom');

const notFound = (req, res, next) => {
  const { output: { statusCode, payload } } = boom.notFound();
  res.status(statusCode).json(payload);
};

const logErrors = (err, req, res, next) => {
  process.stdout.write(err.message);
  next(err);
};

const wrapErrors = (err, req, res, next) => {
  !err.isBoom ? next(boom.badImplementation(err)) : next(err);
};

const errorHandler = (err, req, res, next) => {
  const { output: { statusCode, payload } } = err;
  res.status(statusCode).json(payload);
};

const handlerFatalError = (err) => {
  console.log(`Fatal Server Error: ${err.message}`);
  process.exit(1);
};

module.exports = {
  notFound,
  errorHandler,
  handlerFatalError,
  logErrors,
  wrapErrors
};