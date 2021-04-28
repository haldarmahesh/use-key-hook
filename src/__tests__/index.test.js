import React from 'react';

// eslint-disable-next-line object-curly-newline
import { render, cleanup, fireEvent } from 'react-testing-library';

import { useKey } from '../../build/index';

const TestComponent = ({ callback, detectKeys, keyevent }) => {
  useKey(callback, { detectKeys, keyevent });
  return <div />;
};

afterEach(cleanup);

describe('useKey setup', () => {
  test('throws error when callback is not defined', () => {
    expect(() => render(<TestComponent detectKeys={[12]} />)).toThrowError();
  });

  test('when keys is not an array it passes with warns', () => {
    console.warn = jest.fn();
    render(<TestComponent callback={jest.fn()} detectKeys="someKey" />);
    expect(console.warn).toHaveBeenCalledWith('Keys should be array!');
  });

  test('when the passed keyevent is an invalid event, an error is thrown', () => {
    console.warn = jest.fn();
    expect(() => render(<TestComponent callback={jest.fn()} detectKeys="someKey" keyevent="click" />)).toThrowError();
  });
});

describe('events', () => {
  test('it calls the callback with the correct value when the keydown event is fired with the right key', async () => {
    const callback = jest.fn();
    const { container } = render(<TestComponent callback={callback} detectKeys={[38]} />);
    const keyDownEvent = new KeyboardEvent('keydown', {
      key: 'ArrowUp',
      bubbles: true,
      which: 38,
      code: 'ArrowUp',
    });
    fireEvent(container, keyDownEvent);
    expect(callback).toHaveBeenCalledWith(38, keyDownEvent);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('it calls the callback with the correct value when the keyup event is fired with the right key', async () => {
    const callback = jest.fn();
    const { container } = render(<TestComponent callback={callback} keyevent="keyup" detectKeys={[38]} />);
    const keyUpEvent = new KeyboardEvent('keyup', {
      key: 'ArrowUp',
      bubbles: true,
      which: 38,
      code: 'ArrowUp',
    });
    fireEvent(container, keyUpEvent);
    expect(callback).toHaveBeenCalledWith(38, keyUpEvent);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('it calls the callback with the correct value when the keyup event is fired with the right key', async () => {
    const callback = jest.fn();
    const { container } = render(<TestComponent callback={callback} keyevent="keypress" detectKeys={[38]} />);
    const keyPressEvent = new KeyboardEvent('keypress', {
      key: 'ArrowUp',
      bubbles: true,
      which: 38,
      code: 'ArrowUp',
    });
    fireEvent(container, keyPressEvent);
    expect(callback).toHaveBeenCalledWith(38, keyPressEvent);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('it does not call the callback when the key is not in detectKeys', async () => {
    const callback = jest.fn();
    const { container } = render(<TestComponent callback={callback} detectKeys={[12]} />);
    const keyDownEvent = new KeyboardEvent('keydown', {
      key: 'ArrowUp',
      bubbles: true,
      which: 38,
      code: 'ArrowUp',
    });
    fireEvent(container, keyDownEvent);
    expect(callback).not.toHaveBeenCalledWith(38, keyDownEvent);
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
