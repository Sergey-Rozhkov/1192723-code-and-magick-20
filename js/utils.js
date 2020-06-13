'use strict';

window.utils = (function () {
  var getRandomInt = function (max) {
    return Math.floor(max * Math.random());
  };

  return {
    getRandomElement: function (arr) {
      return arr[getRandomInt(arr.length)];
    }
  };
})();
