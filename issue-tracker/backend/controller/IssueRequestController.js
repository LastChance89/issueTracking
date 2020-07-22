

var express = require('express');
let Card = require('../models/card');

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
            console.log('error');
            console.log(error);
        }
        else{
            res.json("{created:'yes'}")
        }
    })
};

module.exports.findAllIssues = (req, res)=>{
    Card.find((error,data)=>{
        if(error){
            console.log("error")
            console.log(error);
        }
        else{
            res.json(data);
        }
    })
}


module.exports.updateIssueRequest = (req,res) =>{
    Card.updateOne( {_id:req.body['id']}, {status:req.body['status']}, (error, result) =>{

        if(error){
            console.log("error" )
            console.log(error);
        }
        else{
            console.log(result);
            res.json('{test:"tes"')
        }
    })
}


