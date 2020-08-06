

var express = require('express');
let Card = require('../models/card');
let messageObj = require('../models/messages')
let result = require('../models/result');
const Result = require('../models/result');
const { json } = require('body-parser');

module.exports.newIssueRequest = (req, res) =>{
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
            let result = new Result(messageObj.messages.CREATE_REQUEST_FAIL,true);
            res.json(result);
        }
        else{
            let result = new Result(messageObj.messages.CREATE_REQUEST_SUCCESS,false);
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
        if(error){
            console.log("error")
            console.log(error);
        }
        else{
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


module.exports.updateIssueRequest = (req,res) =>{
    Card.updateOne( {_id:req.body['id']}, {status:req.body['status']}, (error, result) =>{
        if(error){
            //need to change console to a log file. 
            console.log("error" )
            console.log(error);
            let result = new Result(messageObj.messages.CREATE_REQUEST_FAIL,true);
            res.json(result);
        }
        else{
            let result = new Result(messageObj.CREATE_REQUEST_SUCCESS,false);
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
            let result = new Result(messageObj.DELETE_REQUEST_SUCCESS +id, false);
            res.json(result);
        }
    })
}
