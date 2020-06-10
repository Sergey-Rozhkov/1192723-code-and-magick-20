'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'];

var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZARD_FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var WIZARD_SIMILAR_COUNT = 4;
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var setupBlockElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = document.querySelector('.setup-close');
var setupUserNameElement = document.querySelector('.setup-user-name');
var setupFormElement = document.querySelector('.setup-wizard-form');
var setupSaveBtn = document.querySelector('.setup-submit');
var setupWizardCoatElement = document.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyesElement = document.querySelector('.setup-wizard .wizard-eyes');
var setupWizardFireballElement = document.querySelector('.setup-fireball-wrap');

var setupCoatColorInputElement = document.querySelector('input[name="coat-color"]');
var setupEyesColorInputElement = document.querySelector('input[name="eyes-color"]');
var setupFireballColorInputElement = document.querySelector('input[name="fireball-color"]');

var getRandomInt = function (max) {
  return Math.floor(max * Math.random());
};

var getRandomElement = function (arr) {
  return arr[getRandomInt(arr.length)];
};

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
      name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
      coatColor: getRandomElement(WIZARD_COAT_COLORS),
      eyesColor: getRandomElement(WIZARD_EYES_COLORS),
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

var setupIsOpen = function () {
  return !setupBlockElement.classList.contains('hidden');
};

var changeWizardCoatColor = function () {
  setupWizardCoatElement.style.fill = getRandomElement(WIZARD_COAT_COLORS);
  setupCoatColorInputElement.value = setupWizardCoatElement.style.fill;
};

var changeWizardEyesColor = function () {
  setupWizardEyesElement.style.fill = getRandomElement(WIZARD_EYES_COLORS);
  setupEyesColorInputElement.value = setupWizardEyesElement.style.fill;
};

var changeWizardFireballColor = function () {
  var fireballColor = getRandomElement(WIZARD_FIREBALL_COLORS);
  setupWizardFireballElement.style.backgroundColor = fireballColor;
  setupFireballColorInputElement.value = fireballColor;
};

var setupOpen = function () {
  setupBlockElement.classList.remove('hidden');

  document.addEventListener('keydown', setupEscPress);
  setupWizardCoatElement.addEventListener('click', changeWizardCoatColor);
  setupWizardEyesElement.addEventListener('click', changeWizardEyesColor);
  setupWizardFireballElement.addEventListener('click', changeWizardFireballColor);
};

var setupClose = function () {
  setupBlockElement.classList.add('hidden');

  document.removeEventListener('keydown', setupEscPress);
  setupWizardCoatElement.removeEventListener('click', changeWizardCoatColor);
  setupWizardEyesElement.removeEventListener('click', changeWizardEyesColor);
  setupWizardFireballElement.removeEventListener('click', changeWizardFireballColor);
};

var setupEscPress = function (evt) {
  if (evt.key === 'Escape' && setupUserNameElement !== document.activeElement) {
    evt.preventDefault();
    setupClose();
  }
};

var setupFormSubmit = function () {
  if (!setupFormElement.checkValidity()) {
    return;
  }

  setupFormElement.submit();
};

setupOpenElement.addEventListener('click', function () {
  setupOpen();
});

setupOpenElement.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    setupOpen();
  }
});

setupCloseElement.addEventListener('click', function () {
  setupClose();
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter' && setupIsOpen()) {
    setupClose();
  }
});

setupSaveBtn.addEventListener('click', function () {
  if (setupIsOpen()) {
    setupFormSubmit();
  }
});

setupSaveBtn.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter' && setupSaveBtn !== document.activeElement && setupIsOpen()) {
    evt.preventDefault();
    setupFormSubmit();
  }
});

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

var similarBlockElement = document.querySelector('.setup-similar');

var similarBlockListElement = similarBlockElement.querySelector('.setup-similar-list');

var similarWizardTemplateElement = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var wizards = generateWizards(WIZARD_SIMILAR_COUNT);

renderSimilarBlockContent(wizards);

similarBlockElement.classList.remove('hidden');

