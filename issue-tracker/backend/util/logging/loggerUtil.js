var express = require('express');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

/*
const logFormat = winston.format.combine(
    winston.format.timestamp(), 
    winston.format.printf(loged => '${timestamp} ${level}: ${message}')
);
*/


const logFormat = winston.format.printf(({level, message, timestamp})=>{
    return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MM-DD-YYYY'
        }),
        logFormat 
         ),
         
    transports: [
        new DailyRotateFile({
            datePattern: 'MM-DD-YYYY',
            filename: './logs/outputError.log',
            level: 'error'
        }),
        new DailyRotateFile({
            datePattern: 'MM-DD-YYYY',
            filename: './logs/outputLog',
            level: 'info'
        }),
    ] 
})

class Logger {
    info(data){
        logger.info(data);
    }
    warn(data){
        logger.warn(data);
    }
    error(data){
        logger.error(data);
    }
}

module.exports = Logger;

