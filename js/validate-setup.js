'use strict';

(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  var setupUserNameElement = document.querySelector('.setup-user-name');

  setupUserNameElement.addEventListener('invalid', function () {
    if (setupUserNameElement.validity.tooShort) {
      setupUserNameElement.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (setupUserNameElement.validity.tooLong) {
      setupUserNameElement.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (setupUserNameElement.validity.valueMissing) {
      setupUserNameElement.setCustomValidity('Обязательное поле');
    } else {
      setupUserNameElement.setCustomValidity('');
    }
  });

  setupUserNameElement.addEventListener('input', function () {
    var valueLength = setupUserNameElement.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      setupUserNameElement.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_NAME_LENGTH) {
      setupUserNameElement.setCustomValidity('Удалите лишние ' + (valueLength - MIN_NAME_LENGTH) + ' симв.');
    } else {
      setupUserNameElement.setCustomValidity('');
    }
  });
})();
