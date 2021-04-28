import { EffectCallback, useEffect } from 'react';

import invariant from 'invariant';
import { onKeyPress, convertToAsciiEquivalent, getAsciiCode } from './keys.js';

const VALID_KEY_EVENTS = ['keydown', 'keyup', 'keypress'];
interface IParamType {
  detectKeys: Array<string | number>;
  keyevent: string;
}
const useKey = (
  callback: (currentKeyCode: number, event: Event) => unknown,
  { detectKeys, keyevent }: IParamType = { detectKeys: [], keyevent: 'keydown' },
  { dependencies = [] } = {}
): any => {
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

  const handleEvent = (event: Event) => {
    const asciiCode = getAsciiCode(event);
    return onKeyPress(asciiCode, callback, allowedKeys, event);
  };

  useEffect((): ReturnType<EffectCallback> => {
    const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
    if (!canUseDOM) {
      console.error('Window is not defined');
      return (): void => {
        // returning null
      };
    }
    window.document.addEventListener(keyevent, handleEvent);
    return () => {
      window.document.removeEventListener(keyevent, handleEvent);
    };
  }, dependencies);
};

export { useKey };
