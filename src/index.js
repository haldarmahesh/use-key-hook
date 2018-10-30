const { useEffect } = require('react');
const { onKeyPress } = require('./keys');

const useKey = (callback, { keys = [] } = {}, { dependencies = [] } = {}) => {
  let allowedKeys = keys;
  useEffect(() => {
    if (!window || !window.document || !callback) {
      throw new Error();
    }
    if (!Array.isArray(dependencies)) {
      throw new Error(typeof dependencies);
    }

    if (!Array.isArray(keys)) {
      allowedKeys = [];
      console.warn('Keys should be array!');
    }

    window.document.addEventListener('keydown', event => onKeyPress(event.keyCode, callback, allowedKeys));
    return () => {
      window.document.removeEventListener('keydown', onKeyPress);
    };
  }, dependencies);
};

module.exports = useKey;
