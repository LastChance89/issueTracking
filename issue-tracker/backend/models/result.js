var express = require('express');

class Result {
    constructor(message,isError ){
        this.message = message;
        this.isError = isError;
    }

    getMessage(){
        return this.message;
    }
    getisError(){
        return this.isError;
    }

    
}

module.exports = Result;