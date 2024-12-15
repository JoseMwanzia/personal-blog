require('dotenv').config()

const winston = require('winston');

const { Logtail } = require('@logtail/node');
const { LogtailTransport } = require('@logtail/winston');
const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN);

const { combine, timestamp, json } = winston.format;

 const logger = winston.createLogger({
    level: 'http',
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
      }),
      json()
    ),
    transports: [new LogtailTransport(logtail)],
  })

  module.exports = logger