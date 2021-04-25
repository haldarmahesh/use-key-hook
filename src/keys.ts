const codeLowerCaseA = 65;
const codeUpperCaseZ = 122;
const isKeyFromGivenList = (keyCode: never, allowedKeys = []) => {
  if (allowedKeys === null || allowedKeys.includes(keyCode) || allowedKeys.length === 0) {
    return true;
  }
  return false;
};
const onKeyPress = (currentKeyCode: never, callback: Function, allowedKeys: any, event: any) => {
  if (isKeyFromGivenList(currentKeyCode, allowedKeys)) {
    callback(currentKeyCode, event);
  }
};

function getAsciiCode(event) {
  let keyCode = event.which;
  if (keyCode >= codeLowerCaseA && keyCode <= codeUpperCaseZ) {
    keyCode = event.key.charCodeAt(0);
  }
  return keyCode;
}

function convertToAsciiEquivalent(inputArray) {
  return inputArray.map(item => {
    let finalVal = item;
    if (typeof item === 'string') {
      finalVal = finalVal.charCodeAt(0);
    }
    return finalVal;
  });
}

module.exports = {
  isKeyFromGivenList,
  onKeyPress,
  convertToAsciiEquivalent,
  getAsciiCode
};
