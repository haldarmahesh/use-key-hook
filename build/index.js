"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKey = void 0;
const react_1 = require("react");
const invariant_1 = __importDefault(require("invariant"));
const keys_js_1 = require("./keys.js");
const VALID_KEY_EVENTS = ['keydown', 'keyup', 'keypress'];
const useKey = (callback, { detectKeys, keyevent } = { detectKeys: [], keyevent: 'keydown' }, { dependencies = [] } = {}) => {
    const isKeyeventValid = VALID_KEY_EVENTS.indexOf(keyevent) > -1;
    invariant_1.default(isKeyeventValid, 'keyevent is not valid: ' + keyevent);
    invariant_1.default(callback != null, 'callback needs to be defined');
    invariant_1.default(Array.isArray(dependencies), 'dependencies need to be an array');
    let allowedKeys = detectKeys;
    if (!Array.isArray(detectKeys)) {
        allowedKeys = [];
        // eslint-disable-next-line no-console
        console.warn('Keys should be array!');
    }
    allowedKeys = keys_js_1.convertToAsciiEquivalent(allowedKeys);
    const handleEvent = (event) => {
        const asciiCode = keys_js_1.getAsciiCode(event);
        return keys_js_1.onKeyPress(asciiCode, callback, allowedKeys, event);
    };
    react_1.useEffect(() => {
        const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
        if (!canUseDOM) {
            console.error('Window is not defined');
            return () => {
                // returning null
            };
        }
        window.document.addEventListener(keyevent, handleEvent);
        return () => {
            window.document.removeEventListener(keyevent, handleEvent);
        };
    }, dependencies);
};
exports.useKey = useKey;
