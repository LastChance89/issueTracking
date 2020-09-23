var express = require('express');
const Project = require('../models/project');
const cache = require('../util/cacheUtility')


module.exports.initalize = function(){


    Project.find((error, data) =>{
        if(error){
            logger.error(error);
        }
        else{
          //  console.log(data);
            let projects = []
            data.forEach(element=>{
                projects.push(new Project(element));
            })
            cache.setCacheObject("projects", projects);
     }
    });
   

    
}