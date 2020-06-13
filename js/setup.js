'use strict';

window.setup = (function () {
  var setupFormElement = document.querySelector('.setup-wizard-form');
  var setupSaveElement = document.querySelector('.setup-submit');
  var setupWizardCoatElement = document.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyesElement = document.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireballElement = document.querySelector('.setup-fireball-wrap');

  var setupCoatColorInputElement = document.querySelector('input[name="coat-color"]');
  var setupEyesColorInputElement = document.querySelector('input[name="eyes-color"]');
  var setupFireballColorInputElement = document.querySelector('input[name="fireball-color"]');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplateElement.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var generateWizards = function (limit) {
    var wizardsArr = [];
    for (var i = 0; i < limit; i++) {
      wizardsArr.push({
        name: window.utils.getRandomElement(window.constants.WIZARD_NAMES) + ' ' + window.utils.getRandomElement(window.constants.WIZARD_SURNAMES),
        coatColor: window.utils.getRandomElement(window.constants.WIZARD_COAT_COLORS),
        eyesColor: window.utils.getRandomElement(window.constants.WIZARD_EYES_COLORS),
      });
    }
    return wizardsArr;
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

  var setupFormSubmit = function () {
    if (!setupFormElement.checkValidity()) {
      return;
    }

    setupFormElement.submit();
  };

  setupSaveElement.addEventListener('click', function () {
    if (window.dialog.setupIsOpen()) {
      setupFormSubmit();
    }
  });

  setupSaveElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && setupSaveElement !== document.activeElement && window.dialog.setupIsOpen()) {
      evt.preventDefault();
      setupFormSubmit();
    }
  });

  var similarBlockElement = document.querySelector('.setup-similar');

  var similarBlockListElement = similarBlockElement.querySelector('.setup-similar-list');

  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var wizards = generateWizards(window.constants.WIZARD_SIMILAR_COUNT);

  renderSimilarBlockContent(wizards);

  similarBlockElement.classList.remove('hidden');

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

