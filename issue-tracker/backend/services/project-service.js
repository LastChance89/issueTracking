var express = require('express');
const cache = require('../util/cacheUtility');


module.exports.setupAllIrqData = function (data) {
    //Make Me Dynamic. Test will be replaced by the project name of the board. 
    let selectedProject = cache.getCachedObject("projects")[0];
    data.forEach(element => {
        for(let column of selectedProject.columns){
            /*
            Break out of loop because once we know the status is equal to the column position, 
            we have no need to check the additional columns.   
            */
            if(column.position == element.status){
                column.iq.push(element);
                break;
            }
        }
    });
    return selectedProject;
}

module.exports.generateIqrID = function(newRequest){
    //Get current time in milliseconds. 
    let idTime = Date.now();
    //Generate ID's
    switch (newRequest.type) {
        case 'Enhancement':
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
    return newRequest;

}