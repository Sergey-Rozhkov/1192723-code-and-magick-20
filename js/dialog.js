'use strict';

window.dialog = (function () {
  var setupBlockElement = document.querySelector('.setup');
  var setupUserNameElement = setupBlockElement.querySelector('.setup-user-name');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupBlockElement.querySelector('.setup-close');

  var startDialogPosition = {
    x: 0,
    y: 0
  };
  var needReset = false;

  if (setupOpenElement) {
    setupOpenElement.addEventListener('click', function () {
      setupOpen();
    });

    setupOpenElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        setupOpen();
      }
    });
  }

  if (setupCloseElement) {
    setupCloseElement.addEventListener('click', function () {
      setupClose();
    });

    setupCloseElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter' && setupIsOpen()) {
        setupClose();
      }
    });
  }

  var setupIsOpen = function () {
    if (!setupBlockElement) {
      return false;
    }

    return !setupBlockElement.classList.contains('hidden');
  };

  var setupEscPress = function (evt) {
    if (evt.key === 'Escape' && setupUserNameElement && setupUserNameElement !== document.activeElement) {
      evt.preventDefault();
      setupClose();
    }
  };

  var setupOpen = function () {
    if (setupBlockElement) {
      setupBlockElement.classList.remove('hidden');
    }

    if (needReset) {
      setupBlockElement.style.top = startDialogPosition.x + 'px';
      setupBlockElement.style.left = startDialogPosition.y + 'px';
    }
    needReset = true;

    startDialogPosition.x = setupBlockElement.offsetTop;
    startDialogPosition.y = setupBlockElement.offsetLeft;

    document.addEventListener('keydown', setupEscPress);
    if (window.setup && window.setup.addEvents) {
      window.setup.addEvents();
    }
  };

  var setupClose = function () {
    if (setupBlockElement) {
      setupBlockElement.classList.add('hidden');
    }

    document.removeEventListener('keydown', setupEscPress);
    if (window.setup && window.setup.removeEvents) {
      window.setup.removeEvents();
    }
  };

  return {
    setupIsOpen: setupIsOpen
  };
})();
