var express = require('express');
let cors = require('cors');
const routing = express();
const whiteList = ["http://localhost:4200"];
var issueRequestController = require('../controller/IssueRequestController')

let corsOptions = {
    origin: function(origin, callback){
        if(whiteList.indexOf(origin) !== -1){
            callback(null, true);
        }
        else{
            callback (new Error('CORS Policy Error'));
        }
    }
}
//set  cors options here.
routing.use(cors(corsOptions)) 
routing.use(express.json());

routing.route('/newCard').post(issueRequestController.newIrq);
routing.route('/getAllCards').post(issueRequestController.getAllIrq);
routing.route('/updateIssueRequestStatus').post(issueRequestController.updateIssueRequestStatus);
routing.route('/deleteIssue').post(issueRequestController.deleteIssue);
routing.route('/updateIssueRequest').post(issueRequestController.updateRequest);


module.exports = routing;
