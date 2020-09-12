var express = require('express');
let Card = require('../models/card');
let messageObj = require('../models/messages')
let result = require('../models/result');
const Result = require('../models/result');
const { json } = require('body-parser');
const Logger = require('../util/logging/loggerUtil');
const cache = require('../util/cacheUtility');
const projectService = require('../services/project-service');

const logger = new Logger();

module.exports.newIrq = (req, res) => {
    newRequest = projectService.generateIqrID(new Card(req.body['card']));

    Card.create(newRequest, (error, data) => {
        if (error) {
            logger.error(error);
            res.json(new Result(messageObj.messages.node, true));
        }
        else {
            logger.info(newRequest._id + " Successfully Created");
            res.json(new Result(messageObj.messages.CREATE_REQUEST_SUCCESS, false));
        }
    })
};

module.exports.getAllIrq = (req, res) => {
    Card.find((error, data) => {
        //@TODO: need to fix the error. 
        if (error) {
            logger.error(error);
        }
        else {
            res.json(projectService.setupAllIrqData(data));
        }
    })
}


module.exports.updateIssueRequestStatus = (req, res) => {
    Card.updateOne({ _id: req.body['id'] }, { status: req.body['status'] }, (error, result) => {
        if (error) {
            logger.error(error);
            let result = new Result(messageObj.messages.CREATE_REQUEST_FAIL, true);
            res.json(result);
        }
        else {
            logger.info("Successfully updated: " + req.body['id']);
            let result = new Result(messageObj.messages.CREATE_REQUEST_SUCCESS, false);
            res.json(result);
        }
    })
}

module.exports.deleteIssue = (req, res) => {
    let id = req.body['id'];
    Card.deleteOne({ _id: id }, (error, result) => {
        if (error) {
            console.log("ERROR", error);
        }
        else {
            logger.info("Successfully deleted: " + id);
            res.json(new Result(messageObj.messages.DELETE_REQUEST_SUCCESS + id, false));
        }
    })
}

module.exports.updateRequest = (req, res) => {
    let card = req.body['card'];
    Card.updateOne({ _id: card._id }, {
        priority: card.priority,
        assignedUser: card.assignedUser,
        status: card.status,
        title: card.title,
        project: card.project,
        summary: card.summary
    },
        (error, result) => {
            if (error) {
                logger.log(error);
            }
            else {
                logger.info("Successfully updated: " + card._id);
                res.json( new Result('update complete', false));
            }
        })
}
