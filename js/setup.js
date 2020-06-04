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

var WIZARD_SIMILAR_COUNT = 4;

var randomPositiveInt = function (max) {
  return Math.floor(max * Math.random());
};

var getRandomElement = function (arr) {
  return arr[randomPositiveInt(arr.length)];
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

var setupBlockElement = document.querySelector('.setup');
setupBlockElement.classList.remove('hidden');

var similarBlockElement = document.querySelector('.setup-similar');

var similarBlockListElement = similarBlockElement.querySelector('.setup-similar-list');

var similarWizardTemplateElement = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var wizards = generateWizards(WIZARD_SIMILAR_COUNT);

renderSimilarBlockContent(wizards);

similarBlockElement.classList.remove('hidden');

