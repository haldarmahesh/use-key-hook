const { useEffect } = require('react');


const _dependencies = [];

const useKey = (callback, { keys = [] } ={}, { dependencies = _dependencies } = {}) => {
  function isKeyFromTheList(keyCode) {
    if (keysToTrack.includes(keyCode)) {
      return true;
    }
  }
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
    
    const onKeyPress = event => isKeyFromTheList(event.keyCode) && callback(event);
    window.document.addEventListener('keydown', onKeyPress);
    return () => {
      window.document.removeEventListener('keydown', onKeyPress);
    };
  }, dependencies);
};

module.exports = useKey;
