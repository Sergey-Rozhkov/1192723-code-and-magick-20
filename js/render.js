'use strict';

window.render = (function () {
  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var similarBlockElement = document.querySelector('.setup-similar');
  var similarBlockListElement = similarBlockElement.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplateElement.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderSimilarBlockContent = function (wizards) {
    var wizardsToRender = wizards.slice(0, window.constants.WIZARD_SIMILAR_COUNT);
    similarBlockListElement.innerHTML = '';
    var fragment = document.createDocumentFragment();
    wizardsToRender.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });
    similarBlockListElement.appendChild(fragment);
    similarBlockElement.classList.remove('hidden');
  };

  return {
    renderSimilarBlockContent: renderSimilarBlockContent
  };
})();
