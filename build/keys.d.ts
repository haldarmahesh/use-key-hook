import { EffectCallback } from 'react';
declare const isKeyFromGivenList: (keyCode: number, allowedKeys?: Array<string | number>) => boolean;
declare const onKeyPress: (currentKeyCode: number, callback: (currentKeyCode: number, event: Event) => unknown, allowedKeys: Array<string | number>, event: Event) => ReturnType<EffectCallback>;
declare function getAsciiCode(event: Event): number;
declare function convertToAsciiEquivalent(inputArray: Array<string | number>): Array<string | number>;
export { isKeyFromGivenList, onKeyPress, convertToAsciiEquivalent, getAsciiCode };
