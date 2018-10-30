const { useEffect } = require('react');
const isKeyFromGivenList = require('./keys');
const _dependencies = [];
const useKey = (callback, { keys = [] } ={}, { dependencies = _dependencies } = {}) => {
  useEffect(() => {
    if (!window || !window.document || !callback) {
      throw new Error();
    }
    if (!Array.isArray(dependencies)) {
      throw new Error(typeof dependencies);
    }

    if(!Array.isArray(keys)) {
      keys = [];
      console.warn('Keys should be array!');
    }

    const onKeyPress = event => keysUtils.isKeyFromGivenList(event.keyCode, keys) && callback(event);
    window.document.addEventListener('keydown', onKeyPress);
    return () => {
      window.document.removeEventListener('keydown', onKeyPress);
    };
  }, dependencies);
};

module.exports = useKey;
