const { isKeyFromGivenList, onKeyPress } = require('../keys');

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
});
