"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAsciiCode = exports.convertToAsciiEquivalent = exports.onKeyPress = exports.isKeyFromGivenList = void 0;
const codeLowerCaseA = 65;
const codeUpperCaseZ = 122;
const isKeyFromGivenList = (keyCode, allowedKeys = []) => {
    if (allowedKeys === null || allowedKeys.includes(keyCode) || allowedKeys.length === 0) {
        return true;
    }
    return false;
};
exports.isKeyFromGivenList = isKeyFromGivenList;
const onKeyPress = (currentKeyCode, callback, allowedKeys, event) => {
    if (isKeyFromGivenList(currentKeyCode, allowedKeys)) {
        callback(currentKeyCode, event);
    }
};
exports.onKeyPress = onKeyPress;
function getAsciiCode(event) {
    let keyCode = event.which;
    if (keyCode >= codeLowerCaseA && keyCode <= codeUpperCaseZ) {
        keyCode = event.key.charCodeAt(0);
    }
    return keyCode;
}
exports.getAsciiCode = getAsciiCode;
function convertToAsciiEquivalent(inputArray) {
    return inputArray.map((item) => {
        const finalVal = item;
        if (typeof finalVal === 'string') {
            return finalVal.charCodeAt(0);
        }
        return finalVal;
    });
}
exports.convertToAsciiEquivalent = convertToAsciiEquivalent;
