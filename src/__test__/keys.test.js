const {
  isKeyFromGivenList, onKeyPress, convertToAsciiEquivalent, getAsciiCode
} = require('../keys');

describe('keys utils', () => {
  test('isKeyFromGivenList returns true when current key belong to allowed list', () => {
    const allowed = isKeyFromGivenList(12, [34, 12]);
    expect(allowed).toBeTruthy();
  });
  test('isKeyFromGivenList returns false when current key belong to allowed list', () => {
    const allowed = isKeyFromGivenList(13, [34, 12]);
    expect(allowed).toBeFalsy();
  });
  test('isKeyFromGivenList returns true whenallowed list is null', () => {
    const allowed = isKeyFromGivenList(13, null);
    expect(allowed).toBeTruthy();
  });
});
describe('onKeyPress', () => {
  test('should call the cb when currentKey is in allowed', () => {
    const callback = jest.fn();
    const event = {
      keyCode: 12
    };
    onKeyPress(event.keyCode, callback, [12, 34]);
    expect(callback).toHaveBeenCalledTimes(1);
  });
  test('should not call the cb when currentKey is not in allowed', () => {
    const callback = jest.fn();
    const event = {
      keyCode: 15
    };
    onKeyPress(event.keyCode, callback, [12, 34]);
    expect(callback).not.toHaveBeenCalled();
  });
  test('should call the cb when currentKey matches with character', () => {
    const callback = jest.fn();
    const event = {
      keyCode: 65
    };
    onKeyPress(event.keyCode, callback, [65, 34]);
    expect(callback).toHaveBeenCalled();
  });
});

describe('convertToAsciiEquivalent', () => {
  test('should return ascii equivalent array', () => {
    const input = ['A'];
    const input2 = ['a', ' '];
    const input3 = ['B', 21];
    const input4 = ['Z', 'z', '=', '1', 21];
    const input5 = ['a', 'A'];
    expect(convertToAsciiEquivalent(input)[0]).toEqual(65);
    expect(convertToAsciiEquivalent(input2)[0]).toEqual(97);
    expect(convertToAsciiEquivalent(input2)[1]).toEqual(32);

    expect(convertToAsciiEquivalent(input3)[0]).toEqual(66);
    expect(convertToAsciiEquivalent(input3)[1]).toEqual(21);

    expect(convertToAsciiEquivalent(input4)[0]).toEqual(90);
    expect(convertToAsciiEquivalent(input4)[1]).toEqual(122);
    expect(convertToAsciiEquivalent(input4)[2]).toEqual(61);
    expect(convertToAsciiEquivalent(input4)[3]).toEqual(49);

    expect(convertToAsciiEquivalent(input5)[0]).toEqual(97);
    expect(convertToAsciiEquivalent(input5)[1]).toEqual(65);
  });
});

describe('getAsciiCode', () => {
  test('should return the ascii code', () => {
    const event1 = {
      which: 65,
      key: 'A'
    };
    const event2 = {
      which: 65,
      key: 'a'
    };
    const event3 = {
      which: 90,
      key: 'Z'
    };
    const event4 = {
      which: 90,
      key: 'z'
    };
    const event5 = {
      which: 123,
      key: '{'
    };
    expect(getAsciiCode(event1)).toEqual(65);
    expect(getAsciiCode(event2)).toEqual(97);
    expect(getAsciiCode(event3)).toEqual(90);
    expect(getAsciiCode(event4)).toEqual(122);
    expect(getAsciiCode(event5)).toEqual(123);
  });
});
