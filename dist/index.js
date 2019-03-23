'use strict';

var _require = require('react'),
  useEffect = _require.useEffect;

var invariant = require('invariant');

var _require2 = require('./keys.js'),
  onKeyPress = _require2.onKeyPress,
  convertToAsciiEquivalent = _require2.convertToAsciiEquivalent,
  getAsciiCode = _require2.getAsciiCode;

var VALID_KEY_EVENTS = ['keydown', 'keyup', 'keypress'];

var useKey = function useKey(callback) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$detectKeys = _ref.detectKeys,
    detectKeys = _ref$detectKeys === void 0 ? [] : _ref$detectKeys,
    _ref$keyevent = _ref.keyevent,
    keyevent = _ref$keyevent === void 0 ? 'keydown' : _ref$keyevent;

  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref2$dependencies = _ref2.dependencies,
    dependencies = _ref2$dependencies === void 0 ? [] : _ref2$dependencies;

  var isKeyeventValid = VALID_KEY_EVENTS.indexOf(keyevent) > -1;
  invariant(isKeyeventValid, 'keyevent is not valid: ' + keyevent);
  invariant(callback != null, 'callback needs to be defined');
  invariant(Array.isArray(dependencies), 'dependencies need to be an array');
  var allowedKeys = detectKeys;

  if (!Array.isArray(detectKeys)) {
    allowedKeys = []; // eslint-disable-next-line no-console

    console.warn('Keys should be array!');
  }

  allowedKeys = convertToAsciiEquivalent(allowedKeys);

  var handleEvent = function handleEvent(event) {
    var asciiCode = getAsciiCode(event);
    return onKeyPress(asciiCode, callback, allowedKeys, event);
  };

  useEffect(function() {
    var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

    if (!canUseDOM) {
      console.error('Window is not defined');
      return null;
    }

    window.document.addEventListener(keyevent, handleEvent);
    return function() {
      window.document.removeEventListener(keyevent, handleEvent);
    };
  }, dependencies);
};

module.exports = useKey;
