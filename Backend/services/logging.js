const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), myFormat),
  exitOnError: true,
  transports: [
    new transports.File({ filename: "combined.log" }),
    new transports.File({ filename: "errors.log", level: "error" }),
    new transports.Console(),
  ],
  exceptionHandlers: [
    new transports.File({ filename: "errors.log" }),
    new transports.Console(),
  ],
  rejectionHandlers: [
    new transports.File({ filename: "errors.log" }),
    new transports.Console(),
  ],
});

module.exports = logger;
