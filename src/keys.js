const isKeyFromGivenList = (keyCode, allowedKeys = []) => {
  if (allowedKeys === null || allowedKeys.includes(keyCode) || allowedKeys.length === 0) {
    return true;
  }
  return false;
};
module.exports = isKeyFromGivenList;
