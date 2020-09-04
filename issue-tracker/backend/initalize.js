var express = require('express');
const Project = require('./models/project');
const cache = require('./util/cacheUtility')

module.exports.initalize = function(){
    let projectMeta = {};
    Project.find((error, data) =>{
       
        if(error){
            logger.error(error);
        }
        else{
            data.forEach(element=>{
                let meta = {};
                let columns = {};
                element.columns.forEach(column=>{
                    columns[column.position] = column.title;
                });
                meta['columns'] = columns;
                projectMeta[element.projectTitle] = meta;
            })
            cache.setCacheObject("projectMeta", projectMeta);
        }
    });
    
}