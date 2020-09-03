var express = require('express');
const Project = require('./models/project');
const NodeCache = require('node-cache');
let cache = new NodeCache();

module.exports.initalize = function(){
    let projectMeta = {};
    //{Project = {Position: columnName}};
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
            cache.set("projectMeta", projectMeta);
        }
    });
    
}