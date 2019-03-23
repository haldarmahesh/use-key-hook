'use strict';

var codeLowerCaseA = 65;
var codeUpperCaseZ = 122;

var isKeyFromGivenList = function isKeyFromGivenList(keyCode) {
  var allowedKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (allowedKeys === null || allowedKeys.includes(keyCode) || allowedKeys.length === 0) {
    return true;
  }

  return false;
};

var onKeyPress = function onKeyPress(currentKeyCode, callback, allowedKeys, event) {
  if (isKeyFromGivenList(currentKeyCode, allowedKeys)) {
    callback(currentKeyCode, event);
  }
};

function getAsciiCode(event) {
  var keyCode = event.which;

  if (keyCode >= codeLowerCaseA && keyCode <= codeUpperCaseZ) {
    keyCode = event.key.charCodeAt(0);
  }

  return keyCode;
}

function convertToAsciiEquivalent(inputArray) {
  return inputArray.map(function(item) {
    var finalVal = item;

    if (typeof item === 'string') {
      finalVal = finalVal.charCodeAt(0);
    }

    return finalVal;
  });
}

module.exports = {
  isKeyFromGivenList: isKeyFromGivenList,
  onKeyPress: onKeyPress,
  convertToAsciiEquivalent: convertToAsciiEquivalent,
  getAsciiCode: getAsciiCode
};
