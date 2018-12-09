const { useEffect } = require('react');
const invariant = require('invariant');
const { onKeyPress, convertToAsciiEquivalent, getAsciiCode } = require('./keys.js');

const VALID_KEYEVENTS = ['keydown', 'keyup', 'keypress'];

const useKey = (callback, { detectKeys = [], keyevent = 'keydown' } = {}, { dependencies = [] } = {}) => {
  const isKeyeventValid = VALID_KEYEVENTS.indexOf(keyevent) > -1;

  invariant(isKeyeventValid, 'keyevent is not valid: ' + keyevent);

  let allowedKeys = detectKeys;
  if (!window || !window.document || !callback) {
    throw new Error();
  }

  if (!Array.isArray(dependencies)) {
    throw new Error(typeof dependencies);
  }

  if (!Array.isArray(detectKeys)) {
    allowedKeys = [];
    // eslint-disable-next-line no-console
    console.warn('Keys should be array!');
  }
  allowedKeys = convertToAsciiEquivalent(allowedKeys);

  const handleKeydown = event => {
    const asciiCode = getAsciiCode(event);
    return onKeyPress(asciiCode, callback, allowedKeys);
  };

  useEffect(() => {
    window.document.addEventListener(keyevent, handleKeydown);
    return () => {
      window.document.removeEventListener(keyevent, handleKeydown);
    };
  }, dependencies);
};

module.exports = useKey;
