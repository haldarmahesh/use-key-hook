const { useEffect } = require('react');
const invariant = require('invariant');
const { onKeyPress, convertToAsciiEquivalent, getAsciiCode } = require('./keys.js');

const VALID_KEY_EVENTS = ['keydown', 'keyup', 'keypress'];

const useKey = (callback, { detectKeys = [], keyevent = 'keydown' } = {}, { dependencies = [] } = {}) => {
  const isKeyeventValid = VALID_KEY_EVENTS.indexOf(keyevent) > -1;

  invariant(isKeyeventValid, 'keyevent is not valid: ' + keyevent);
  invariant(callback != null, 'callback needs to be defined');
  invariant(window != null, 'window needs to be defined');
  invariant(window.document != null, 'window.document needs to be defined');
  invariant(Array.isArray(dependencies), 'dependencies need to be an array');
  invariant(Array.isArray(dependencies), 'dependencies need to be an array');

  let allowedKeys = detectKeys;

  if (!Array.isArray(detectKeys)) {
    allowedKeys = [];
    console.warn('Keys should be array!');
  }

  allowedKeys = convertToAsciiEquivalent(allowedKeys);

  const handleEvent = event => {
    const asciiCode = getAsciiCode(event);
    return onKeyPress(asciiCode, callback, allowedKeys);
  };

  useEffect(() => {
    window.document.addEventListener(keyevent, handleEvent);
    return () => {
      window.document.removeEventListener(keyevent, handleEvent);
    };
  }, dependencies);
};

module.exports = useKey;
