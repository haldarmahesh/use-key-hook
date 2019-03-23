const { useEffect } = require('react');
const invariant = require('invariant');
const { onKeyPress, convertToAsciiEquivalent, getAsciiCode } = require('./keys.js');

const VALID_KEY_EVENTS = ['keydown', 'keyup', 'keypress'];

const useKey = (callback, { detectKeys = [], keyevent = 'keydown' } = {}, { dependencies = [] } = {}) => {
  const isKeyeventValid = VALID_KEY_EVENTS.indexOf(keyevent) > -1;

  invariant(isKeyeventValid, 'keyevent is not valid: ' + keyevent);
  invariant(callback != null, 'callback needs to be defined');
  invariant(Array.isArray(dependencies), 'dependencies need to be an array');

  let allowedKeys = detectKeys;

  if (!Array.isArray(detectKeys)) {
    allowedKeys = [];
    // eslint-disable-next-line no-console
    console.warn('Keys should be array!');
  }

  allowedKeys = convertToAsciiEquivalent(allowedKeys);

  const handleEvent = event => {
    const asciiCode = getAsciiCode(event);
    return onKeyPress(asciiCode, callback, allowedKeys, event);
  };

  useEffect(() => {
    const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
    if (!canUseDOM) {
      console.error('Window is not defined');
      return null;
    }
    window.document.addEventListener(keyevent, handleEvent);
    return () => {
      window.document.removeEventListener(keyevent, handleEvent);
    };
  }, dependencies);
};

module.exports = useKey;
