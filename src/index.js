const { useEffect } = require('react');
const isKeyFromGivenList = require('./keys');

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

    const onKeyPress = event => {
      if (isKeyFromGivenList.isKeyFromGivenList(event.keyCode, allowedKeys)) {
        callback(event);
      }
    };
    window.document.addEventListener('keydown', onKeyPress);
    return () => {
      window.document.removeEventListener('keydown', onKeyPress);
    };
  }, dependencies);
};

module.exports = useKey;
