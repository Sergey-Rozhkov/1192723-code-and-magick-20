'use strict';

window.constants = (function () {
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
  var API_URL = 'https://javascript.pages.academy/code-and-magick';
  var XHR_TIMEOUT = 5000;
  var XHR_STATUS_SUCCESS = 200;

  return {
    WIZARD_NAMES: WIZARD_NAMES,
    WIZARD_SURNAMES: WIZARD_SURNAMES,
    WIZARD_COAT_COLORS: WIZARD_COAT_COLORS,
    WIZARD_EYES_COLORS: WIZARD_EYES_COLORS,
    WIZARD_FIREBALL_COLORS: WIZARD_FIREBALL_COLORS,
    WIZARD_SIMILAR_COUNT: WIZARD_SIMILAR_COUNT,
    API_URL: API_URL,
    XHR_TIMEOUT: XHR_TIMEOUT,
    XHR_STATUS_SUCCESS: XHR_STATUS_SUCCESS
  };
})();
