'use strict';

window.setup = (function () {
  var setupBlockElement = document.querySelector('.setup');
  var setupFormElement = setupBlockElement.querySelector('.setup-wizard-form');
  var setupSaveElement = setupBlockElement.querySelector('.setup-submit');
  var setupWizardCoatElement = setupBlockElement.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyesElement = setupBlockElement.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireballElement = setupBlockElement.querySelector('.setup-fireball-wrap');

  var setupCoatColorInputElement = setupBlockElement.querySelector('input[name="coat-color"]');
  var setupEyesColorInputElement = setupBlockElement.querySelector('input[name="eyes-color"]');
  var setupFireballColorInputElement = setupBlockElement.querySelector('input[name="fireball-color"]');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplateElement.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var successHandler = function (response) {
    var wizardsArr = window.utils.getRandomElements(response, window.constants.WIZARD_SIMILAR_COUNT);

    renderSimilarBlockContent(wizardsArr);

    similarBlockElement.classList.remove('hidden');
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

  var renderSimilarBlockContent = function (wizards) {
    var fragment = document.createDocumentFragment();
    wizards.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });
    similarBlockListElement.appendChild(fragment);
  };

  var changeWizardCoatColor = function () {
    setupWizardCoatElement.style.fill = window.utils.getRandomElement(window.constants.WIZARD_COAT_COLORS);
    setupCoatColorInputElement.value = setupWizardCoatElement.style.fill;
  };

  var changeWizardEyesColor = function () {
    setupWizardEyesElement.style.fill = window.utils.getRandomElement(window.constants.WIZARD_EYES_COLORS);
    setupEyesColorInputElement.value = setupWizardEyesElement.style.fill;
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

  var similarBlockElement = document.querySelector('.setup-similar');

  var similarBlockListElement = similarBlockElement.querySelector('.setup-similar-list');

  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

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

