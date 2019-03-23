[![Build Status](https://travis-ci.org/haldarmahesh/use-key-hook.svg?branch=master)](https://travis-ci.org/haldarmahesh/use-key-hook)
[![npm version](https://badge.fury.io/js/use-key-hook.svg)](https://badge.fury.io/js/use-key-hook)

# use-key-hook

This is a React hook that detects all or some keys from keyboard.

If you want to detect few keys and execute function, you can provide a list of ASCII codes or keys in an array.

Few examples of use cases:

- Add keyboard shortcuts in your app
- Close modal on press of escape key
- If it is react music player, control volume and seek video
- Implement next or back on slide show

## Installing

```bash
npm install use-key-hook
```

```bash
yarn add use-key-hook
```

## Demo

[Demo](http://www.maheshhaldar.com/demo-use-key/)

## Usage

The following defination will only detect and execute provided callback **only** when `A`, `+` or `z` is pressed from keyboard.

```javascript
import useKey from 'use-key-hook';

function MyComponent  = (props) => {
  useKey((pressedKey, event) => {
    console.log('Detected Key press', pressedKey);
    console.log('Get event, if you want more details and preventDefault', event)
  }, {
    detectKeys: ['A', '+', 122]
  });
};
```

## Arguments in useKey

### 1) callback _(required)_

> type: function
>
> The first argument is callback function which gets executed whenever the keys are pressed.

### 2) detectKeys _(optional)_

> type: array
> array item type: string | number
>
> The second argument is an object and should contain one key in name of **detectKeys**.
> This has to be an array.

**When array is empty or not passed** All the keys will be detected and callback will be executed.

The items in arrays can be **ASCII code** of keys or **characters itself**.

#### Example values of detectKeys array

```js
{
  detectKeys: ['A', 69, 27];
}
```

The above will detect and execute callback only the following keys

- <kbd>A</kbd> maps with item 0 `A`
- <kbd>Enter</kbd> key maps with ASCII code is 69
- <kbd>Escape</kbd> key maps with numeric ASCII code 27.

Pressing any other key will not be detected.

```js
{
  detectKeys: [1, '2'];
}
```

The above will detect when number <kbd>2</kbd> is pressed only.
Pressing <kbd>1</kbd>, it will not be detected as we passed ASCII code numeric `1` and this is not number `1`.

Pressing any other key will not be detected.

### 3) keyevent _(optional)_

> type: string
>
> default: `keydown`
>
> Defines the type of event this hook should capture.

This parameter is passed in the config object along with `detectKeys`.

There are 3 type of events options [`keydown`, `keyup`, `keypress`].

Example config object:

```js
{
  detectKeys: [1, '2'],
  keyevent: 'keyup'
}
```

## Contributing

If you have any new suggestions, new features, bug fixes, etc. please contribute by raising pull request on the [repository](https://github.com/haldarmahesh/use-key-hook).

If you have any issue with the `use-key-hook`, open an issue on [Github](https://github.com/haldarmahesh/use-key-hook).
