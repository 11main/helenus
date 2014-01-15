var time = {};

try {
  var microtime = require('microtime');
  time.microtime = microtime.now;
  throw new Error('');
} catch (e) {
  time.microtime = (function(startDate, startHr) {
    var startDateInMicroseconds = startDate * 1000;
    var startHrInMicroseconds = ((startHr[0] * 1000000) + (startHr[1] / 1000));
    var startMicrosecondOffset = startDateInMicroseconds - startHrInMicroseconds;
    return function() {
      var endHr = process.hrtime();
      var endHrInMicroseconds = ((endHr[0] * 1000000) + (endHr[1] / 1000));
      var timeInMicroseconds = startMicrosecondOffset + endHrInMicroseconds;
      return Math.floor(timeInMicroseconds + .5);
    };
  })(Date.now(), process.hrtime());
};

module.exports = time;
