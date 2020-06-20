'use strict';

window.utils = (function () {
  var getRandomInt = function (max) {
    return Math.floor(max * Math.random());
  };

  var getRandomElement = function (arr) {
    return arr[getRandomInt(arr.length)];
  };

  var getRandomElements = function (arr, count) {
    var tmp = JSON.parse(JSON.stringify(arr));
    var result = [];
    for (var i = 0; i < count; i++) {
      var elementInd = getRandomInt(tmp.length - 1);
      result = result.concat(tmp.splice(elementInd, 1));
    }
    return result;
  };

  return {
    getRandomElement: getRandomElement,
    getRandomElements: getRandomElements
  };
})();
