const NodeCache = require('node-cache');
let cache= new NodeCache();

module.exports.setCacheObject = function(key, cacheObject){
    cache.set(key, cacheObject);
}
module.exports.getCachedObject = function(key){
    return cache.get(key);
}