'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var BAR_MARGIN = 50;
var startLeft = CLOUD_X + GAP * 3;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, x, y, text) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  text.toString().split('\n').forEach(function (line, i) {
    ctx.fillText(line, x, y + FONT_GAP * i);
  });
};

var randomInt = function (min, max) {
  return min + Math.floor((max - min) * Math.random());
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx, startLeft + GAP * 3, CLOUD_Y + GAP, 'Ура вы победили!\nСписок результатов:');

  for (var i = 0; i < players.length; i++) {
    var startX = startLeft + (BAR_WIDTH + BAR_MARGIN) * i;
    renderText(ctx, startX, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP, players[i]);

    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + randomInt(0, 100) + '%, 50%)';

    var maxTime = getMaxElement(times);
    var barHeight = MAX_BAR_HEIGHT * times[i] / maxTime;

    ctx.fillRect(startX, CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - FONT_GAP - barHeight, BAR_WIDTH, barHeight);
    renderText(ctx, startX, CLOUD_Y + CLOUD_HEIGHT - GAP * 4 - FONT_GAP - barHeight, Math.round(times[i]));
  }
};
