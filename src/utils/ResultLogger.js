import winston from "winston";
import path from "path";
import moment from "moment-timezone";

const CurrentDirectory = __dirname; // current directory of this file
const SrcDirectory = path.resolve(CurrentDirectory, ".."); // directory of the main folder
const LoggingDirectory = path.resolve(SrcDirectory, "logging"); // directory of logs

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
}); // custom log format

const timeZone = "Europe/Lithuania"; // set the wanted time zone Continent/Country

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: () => moment().tz(timeZone).format() }),
    customFormat
  ),
  transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({
      filename: path.join(LoggingDirectory, "test_info.log"),
      maxFiles: 5,
      maxsize: 300 * 1024,
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(LoggingDirectory, "test_error.log"),
      maxFiles: 5,
      maxsize: 10 * 1024,
      level: "error",
    }),
  ],
});

export default logger;
