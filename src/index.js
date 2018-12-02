const { useEffect } = require('react');
const { onKeyPress, convertToAsciiEquivalent, getAsciiCode } = require('./keys.js');

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
    // eslint-disable-next-line no-console
    console.warn('Keys should be array!');
  }
  allowedKeys = convertToAsciiEquivalent(allowedKeys);

  const handleKeydown = event => {
    const asciiCode = getAsciiCode(event);
    return onKeyPress(asciiCode, callback, allowedKeys);
  };

  useEffect(() => {
    window.document.addEventListener('keydown', handleKeydown);
    return () => {
      window.document.removeEventListener('keydown', handleKeydown);
    };
  }, dependencies);
};

module.exports = useKey;
