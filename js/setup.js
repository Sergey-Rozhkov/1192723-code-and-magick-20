'use strict';

window.setup = (function () {
  var wizards = [];
  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';
  var setupBlockElement = document.querySelector('.setup');
  var setupFormElement = setupBlockElement.querySelector('.setup-wizard-form');
  var setupSaveElement = setupBlockElement.querySelector('.setup-submit');
  var setupWizardCoatElement = setupBlockElement.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyesElement = setupBlockElement.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireballElement = setupBlockElement.querySelector('.setup-fireball-wrap');

  var setupCoatColorInputElement = setupBlockElement.querySelector('input[name="coat-color"]');
  var setupEyesColorInputElement = setupBlockElement.querySelector('input[name="eyes-color"]');
  var setupFireballColorInputElement = setupBlockElement.querySelector('input[name="fireball-color"]');

  var successHandler = function (response) {
    wizards = response;

    window.debounce(updateWizards);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    window.render.renderSimilarBlockContent(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  var changeWizardCoatColor = function () {
    setupWizardCoatElement.style.fill = window.utils.getRandomElement(window.constants.WIZARD_COAT_COLORS);
    setupCoatColorInputElement.value = setupWizardCoatElement.style.fill;
    coatColor = setupWizardCoatElement.style.fill;
    window.debounce(updateWizards);
  };

  var changeWizardEyesColor = function () {
    setupWizardEyesElement.style.fill = window.utils.getRandomElement(window.constants.WIZARD_EYES_COLORS);
    setupEyesColorInputElement.value = setupWizardEyesElement.style.fill;
    eyesColor = setupWizardEyesElement.style.fill;
    window.debounce(updateWizards);
  };

  var changeWizardFireballColor = function () {
    var fireballColor = window.utils.getRandomElement(window.constants.WIZARD_FIREBALL_COLORS);
    setupWizardFireballElement.style.backgroundColor = fireballColor;
    setupFireballColorInputElement.value = fireballColor;
  };

  var setupFormSubmit = function (evt) {
    evt.preventDefault();

    if (!setupFormElement.checkValidity()) {
      return;
    }

    window.backend.save(new FormData(setupFormElement), function () {
      setupBlockElement.classList.add('hidden');
    });
  };

  setupSaveElement.addEventListener('click', function (evt) {
    if (window.dialog.setupIsOpen()) {
      setupFormSubmit(evt);
    }
  });

  setupSaveElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && setupSaveElement !== document.activeElement && window.dialog.setupIsOpen()) {
      evt.preventDefault();
      setupFormSubmit(evt);
    }
  });

  window.backend.load(successHandler, errorHandler);

  return {
    addEvents: function () {
      setupWizardCoatElement.addEventListener('click', changeWizardCoatColor);
      setupWizardEyesElement.addEventListener('click', changeWizardEyesColor);
      setupWizardFireballElement.addEventListener('click', changeWizardFireballColor);
    },
    removeEvents: function () {
      setupWizardCoatElement.removeEventListener('click', changeWizardCoatColor);
      setupWizardEyesElement.removeEventListener('click', changeWizardEyesColor);
      setupWizardFireballElement.removeEventListener('click', changeWizardFireballColor);
    }
  };
})();

