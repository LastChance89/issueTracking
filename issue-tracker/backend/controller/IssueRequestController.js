

var express = require('express');
let Card = require('../models/card');

module.exports.newIssueRequest = (req, res) =>{
   // console.log(req.body['card'])
    Card.create(req.body['card'],(error, data)=>{
        console.log("HIT")
        if(error){
            console.log('error');
        }
        else{
            console.log(data);
            console.log("BANG!")
            res.send("bleh");
        }
    })

};



module.exports.findAllIssues = (req, res)=>{
    console.log("Fired");
    Card.find((error,data)=>{
        if(error){
            console.log("error")
        }
        else{
            console.log(data);
            res.json(data);
        }
    })
}

