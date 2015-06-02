var cache = require('../cache');
var Node = require('./dataStructures').Node;

function init(n, isUpdate){
  /**
   * Default to track last 5 minutes
   */
  n = n || 5;
  var c = n;
  var firstMin = lastMin = new Node();
  while (--c > 0){
    lastMin.next = new Node();
    lastMin = lastMin.next;
  }
  var total = 0;
  var startLast = new Date();
  if(isUpdate){
    lastMin.count++;
    total++;
  }
  cache.set('pageViews', {
    minutesTracked: n,
    firstMin: firstMin,
    lastMin: lastMin,
    total: total,
    startLast: startLast
  });
}

function getPV(callback){
  cache.get('pageViews', function(pvObj){
    callback(pvObj.total);
  });
}

function updatePV(){
  cache.get('pageViews', function(pvObj){
    var now = new Date();
    var elapsed = now - pvObj.startLast;
    var minPassed = Math.floor(elapsed / getMSPerMin());
    if (minPassed > pvObj.minutesTracked){
      return init(pvObj.minutesTracked, true);
    }
    var i = 0;
    while(i++ < minPassed){
      var next = pvObj.firstMin.next;
      pvObj.firstMin.next = null;
      pvObj.firstMin = next;
      pvObj.lastMin.next = new Node();
      pvObj.lastMin = pvObj.lastMin.next;
    }
    pvObj.lastMin.count++;
    pvObj.total++;
    pvObj.startLast += minPassed * getMSPerMin();
    cache.set('pageViews', pvObj);
  });
}

function getMSPerMin(){
  return 60000;
}

module.exports = {
  init: init,
  getPV: getPV,
  updatePV: updatePV
};