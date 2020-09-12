var express = require('express');
const Project = require('../models/project');
const cache = require('../util/cacheUtility')


module.exports.initalize = function(){
    let projectMeta = {};

    Project.find((error, data) =>{
        if(error){
            logger.error(error);
        }
        else{
          //  console.log(data);
            data.forEach(element=>{

                projectMeta[element.projectTitle] = element.columns;
                //console.log(projectMeta);
            })
            cache.setCacheObject("projectMeta", projectMeta);
     }
    });
   

    
}