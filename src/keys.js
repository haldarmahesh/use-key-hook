const isKeyFromGivenList = (keyCode, allowedKeys = []) => {
  if (allowedKeys.includes(keyCode) || allowedKeys.length === 0 || allowedKeys === null) {
    return true;
  }
  return false;
};
module.exports = isKeyFromGivenList;
