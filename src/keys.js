const isKeyFromGivenList = (keyCode, allowedKeys = []) => {
  if (allowedKeys === null || allowedKeys.includes(keyCode) || allowedKeys.length === 0) {
    return true;
  }
  return false;
};
const onKeyPress = (currentKeyCode, callback, allowedKeys) => {
  if (isKeyFromGivenList(currentKeyCode, allowedKeys)) {
    callback();
  }
};
module.exports = { isKeyFromGivenList, onKeyPress };
