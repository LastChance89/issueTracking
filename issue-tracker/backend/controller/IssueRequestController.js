

var express = require('express');
let Card = require('../models/card');
let messageObj = require('../models/messages')
let result = require('../models/result');
const Result = require('../models/result');
const { json } = require('body-parser');
const Logger = require('../util/logging/loggerUtil');

const logger = new Logger();


/*
@TODO: Move alot of this logic into a service. 
*/

module.exports.newIssueRequest = (req, res) =>{
    //Get current time in milliseconds. 
   let idTime =  Date.now();
   let newRequest =new Card(req.body['card']);
   switch(newRequest.type){
       case 'Enhancement' :
            newRequest._id = 'E' + idTime;
            break;
        case 'Defect':
            newRequest._id = 'D' + idTime;
            break;
        case 'Generic Request':
            newRequest._id = 'G' + idTime;
            break;
        //default is New Functionality
        default:
            newRequest._id = 'N' + idTime;
            break;
   }
 
    Card.create(newRequest,(error, data)=>{
        if(error){
            let result = new Result(messageObj.messages.node,true);
            logger.error(error);
            res.json(result);
        }
        else{
            let result = new Result(messageObj.messages.CREATE_REQUEST_SUCCESS,false);
            logger.info(newRequest._id + " Successfully Created");
            res.json(result);
        }
    })
};

module.exports.findAllIssues = (req, res)=>{
    let newCard = [];
    let inProgress= [];
    let testing =[];
    let approval =[];
    let completed=[];

    let statusList = {'new':newCard, 'inProgress': inProgress,
    'testing':testing, "approval": approval,'completed': completed } 

    Card.find((error,data)=>{
        //@TODO: need to fix the error. 
        if(error){
            logger.error(error);
        }
        else{
            //Move these options to metadata?
            data.forEach(element=>{
                switch(element.status){    
                    case 1:
                      inProgress.push(element);
                      break;
                    case 2:
                      testing.push(element);
                      break;
                    case 3:
                      approval.push(element);
                      break;
                    case 4:
                      completed.push(element);
                      break;
                    default: 
                      newCard.push(element);
                      break;
                  }
            })
            res.json(statusList);
        }
    })
}


module.exports.updateIssueRequestStatus = (req,res) =>{
    Card.updateOne( {_id:req.body['id']}, {status:req.body['status']}, (error, result) =>{
        if(error){
            logger.error(error);
            let result = new Result(messageObj.messages.CREATE_REQUEST_FAIL,true);
            res.json(result);
        }
        else{
            logger.info("Successfully updated: " + req.body['id']);
            let result = new Result(messageObj.messages.CREATE_REQUEST_SUCCESS,false);
            res.json(result);
        }
    })
}

module.exports.deleteIssue = (req,res) =>{
    let id = req.body['id'];
    Card.deleteOne({_id: id}, (error, result)=>{
        if(error){
            console.log("BANG", error);
        }
        else{
            logger.info("Successfully deleted: " + id);
            let result = new Result(messageObj.messages.DELETE_REQUEST_SUCCESS + id, false);
            res.json(result);
        }
    })
}

module.exports.updateRequest = (req,res)=>{
    let card = req.body['card'];
    Card.updateOne({_id:card._id},{
        priority: card.priority,
        assignedUser: card.assignedUser,
        status: card.status,
        title: card.title,
        project: card.project,
        summary: card.summary},
        (error,result)=>{
            if(error){
                logger.log(error);
            }
            else{
                logger.info("Successfully updated: " + card._id);
                let resulta = new Result('update complete', false);
                res.json(resulta);
            }
    }) 
}
