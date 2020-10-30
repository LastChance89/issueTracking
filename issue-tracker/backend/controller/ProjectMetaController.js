var express = require('express');
const cache = require('../util/cacheUtility');


module.exports.getProjectMeta = (req,res)=>{
    return res.json(cache.getCachedObject("projects")[0]);
}