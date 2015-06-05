var cache = require('../cache');
var Node = require('./dataStructures').Node;

var PV_KEY = "pageViews";

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
  var pvObj = {
    minutesTracked: n,
    firstMin: firstMin,
    lastMin: lastMin,
    total: total,
    startLast: startLast
  };
  cache.set(PV_KEY, JSON.stringify(pvObj));
  getPV(function(pvObj){
    console.log(pvObj);
  })
}

function getPV(callback){
  cache.get(PV_KEY, function(pvObj){
    pvObj = JSON.parse(pvObj);
    callback({total: pvObj.total});
  });
}

function updatePV(){
  cache.get(PV_KEY, function(pvObj){
    pvObj = JSON.parse(pvObj);
    pvObj.startLast = new Date(pvObj.startLast);
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
    cache.set(PV_KEY, JSON.stringify(pvObj));
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