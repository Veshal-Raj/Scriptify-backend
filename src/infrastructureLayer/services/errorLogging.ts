import winston from 'winston';
import moment from 'moment';
import path from 'path'; 

class CustomLogger {
  logger: winston.Logger;
  constructor() {
    // Define Winston logger configuration
    this.logger = winston.createLogger({
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.printf(info => {
          const formattedTimestamp = moment(info.timestamp).format('YYYY-MM-DD HH:mm:ss');
          return `Time: ${formattedTimestamp},\ninfo level: ${info.level},\ninfo message: ${info.message},\ninfo stack: ${info.stack || 'undefined'}\n`;
        })
      ),
      transports: [
        new winston.transports.File({ 
          filename: path.join(__dirname, './../../log', 'error.log'), 
          level: 'error'
        }), 
        new winston.transports.Console() // Log errors to console 
      ]
    });
  }

  logError(message: string, stack: any) {
    this.logger.error(message, { stack });
  }

  logInfo(message: any) {
    this.logger.info(message);
  }

  logWarning(message: any) {
    this.logger.warn(message);
  }
}

export default CustomLogger;
