jest.mock('react', () => ({
  useEffect: jest.fn(cb => cb()())
}));

const { useEffect } = require('react');
const useKey = require('../');

describe('useKey setup', () => {
  test('throws error when callback is not defined', () => {
    expect(() => useKey()).toThrowError();
  });
  // test('when dependency is not array it defines it as blank array', () => {
  //   useKey(() => jest.fn(), [], { dependencies });
  //   expect(() => useKey(() => jest.fn(), { keys: [1] }, 'as')).toThrowError();
  // });
  test('when keys is not array it passes with warns', () => {
    console.warn = jest.fn();
    useKey(() => jest.fn(), { keys: 'someKey' });
    expect(console.warn).toHaveBeenCalledWith('Keys should be array!');
    expect(useEffect).toHaveBeenCalledWith(expect.any(Function), []);
  });
  test('it setup the events', () => {
    window.document.addEventListener = jest.fn();
    window.document.removeEventListener = jest.fn();
    useKey(() => jest.fn(), { keys: [12, 88] });
    expect(window.document.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(window.document.addEventListener).toHaveBeenCalledTimes(1);
    expect(window.document.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(window.document.removeEventListener).toHaveBeenCalledTimes(1);
  });
});
describe('keys array', () => {
  test('should call the useEffect method, when the keys is not given', () => {
    window.document.addEventListener = jest.fn();
    window.document.removeEventListener = jest.fn();
    useKey(() => jest.fn());
    expect(window.document.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(window.document.addEventListener).toHaveBeenCalledTimes(1);
    expect(window.document.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(window.document.removeEventListener).toHaveBeenCalledTimes(1);
  });
});
