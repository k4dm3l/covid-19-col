'use strict'

/** Package Requirements */
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

/** File Requirements */
const config = require('./config/config');
const { corsValidations } = require('./config/corsConfig');
const { databaseConnection } = require('./config/database');
const { notFound, errorHandler, handlerFatalError, wrapErrors, logErrors } = require('./utils/middlewares/errorHandlers');
const mainRouter = require('./router');

/** Inits */
const server = express();

/** View Engine */
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'pug');

/** Static public files */
server.use(express.static(path.join(__dirname, 'public')));

/** Middlewares */
server.use(morgan('dev'));
server.use(cors(corsValidations));
server.use(express.json());
server.use(compression());
server.use(helmet());

/** Routes */
//server.use('/', (req, res) => res.status(200).send('Welcome to my Server'));
server.use('/api', mainRouter);

/** Error Handlers */
server.use(notFound);

server.use(logErrors);
server.use(wrapErrors);
server.use(errorHandler);

/** Functions */
const startServer = async () => {
  try {
    await databaseConnection();
    console.log(`Environment: ${config.environment}`);
    server.listen(config.port, () => console.log(`Server start successfully on port ${config.port}!`));
  } catch (error) {
    process.on('uncaughtException', handlerFatalError(error));
    process.on('unhandledRejection', handlerFatalError(error));
  }
};

module.exports = { startServer };