var cache = require('../cache');
var dataStructures.js

function init(n){
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
  cache.set('pageViews', {
    n: n,
    firstMin: firstMin,
    lastMin: lastMin,
    total: total,
    startLast: startLast
  });
}
