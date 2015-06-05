var redis = require('redis');
var client = redis.createClient();

client.on('connect', function(){
  console.log('Connected to REDIS');
  // console.log(client.flushdb());
});
client.on('error', function(err){
  console.log('Error:',err);
});

/** 
 * Cache methods
 */ 
function set(key, val){
  return client.set(key, val);
}
function get(key, callback){
  return client.get(key, function(err, reply){
    callback(reply);
  });
}
function contains(key, callback){
  return client.exists(key, function(err, reply){
    callback(reply);
  });
}

module.exports = {
  set: set,
  get: get,
  contains: contains
};