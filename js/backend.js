'use strict';

window.backend = (function () {
  var prepareXRHRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.constants.XHR_STATUS_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = window.constants.XHR_TIMEOUT;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = prepareXRHRequest(onLoad, onError);

    xhr.open('GET', window.constants.API_URL + '/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = prepareXRHRequest(onLoad, onError);

    xhr.open('POST', window.constants.API_URL);
    xhr.send(data);
  };

  return {
    load: load,
    save: save
  };
})();
