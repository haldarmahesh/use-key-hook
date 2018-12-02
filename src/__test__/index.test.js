import React from 'react';
import { render, flushEffects, cleanup, fireEvent } from 'react-testing-library';

const useKey = require('../');

// eslint-disable-next-line react/prop-types
const TestComponent = ({ callback, detectKeys }) => {
  useKey(callback, { detectKeys });
  return <div />;
};

afterEach(cleanup);

describe('useKey setup', () => {
  test('throws error when callback is not defined', () => {
    try {
      render(<TestComponent detectKeys={[12]} />);
    } catch (e) {
      // success
    }
  });

  test('when keys is not array it passes with warns', () => {
    // eslint-disable-next-line no-console
    console.warn = jest.fn();
    render(<TestComponent callback={jest.fn()} detectKeys="someKey" />);
    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalledWith('Keys should be array!');
  });
});

describe('events', () => {
  test('it calls the callback with the correct value when the right event is fired', async () => {
    const callback = jest.fn();
    const { container } = render(<TestComponent callback={callback} detectKeys={[38]} />);
    flushEffects();
    const keyDownEvent = new KeyboardEvent('keydown', {
      key: 'ArrowUp',
      bubbles: true,
      which: 38,
      code: 'ArrowUp'
    });
    fireEvent(container, keyDownEvent);
    expect(callback).toHaveBeenCalledWith(38);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('it does not call the callback when the event is not allowed', async () => {
    const callback = jest.fn();
    const { container } = render(<TestComponent callback={callback} detectKeys={[12]} />);
    flushEffects();
    const keyDownEvent = new KeyboardEvent('keydown', {
      key: 'ArrowUp',
      bubbles: true,
      which: 38,
      code: 'ArrowUp'
    });
    fireEvent(container, keyDownEvent);
    expect(callback).not.toHaveBeenCalledWith(38);
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
