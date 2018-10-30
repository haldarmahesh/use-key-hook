const isKeyFromGivenList = require('../keys');

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
