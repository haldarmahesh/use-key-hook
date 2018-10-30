const { useEffect } = require('react');
const { onKeyPress, convertToAsciiEquivalent } = require('./keys');

const useKey = (callback, { detectKeys = [] } = {}, { dependencies = [] } = {}) => {
  let allowedKeys = detectKeys;
  if (!window || !window.document || !callback) {
    throw new Error();
  }

  if (!Array.isArray(dependencies)) {
    throw new Error(typeof dependencies);
  }

  if (!Array.isArray(detectKeys)) {
    allowedKeys = [];
    console.warn('Keys should be array!');
  }
  allowedKeys = convertToAsciiEquivalent(allowedKeys);
  useEffect(() => {
    window.document.addEventListener('keydown', event => onKeyPress(event.key.charCodeAt(0), callback, allowedKeys));
    return () => {
      window.document.removeEventListener('keydown', onKeyPress);
    };
  }, dependencies);
};

module.exports = useKey;
