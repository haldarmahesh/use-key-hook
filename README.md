# use-key-hook

This is a React hook that detects all or some keys from keyboard.
If you want to detect few keys and execute function, you can provide a list of ASCII codes or keys in an array.

## Installing

```
npm install use-key-hook
```

```
yarn add use-key-hook
```

## Demo

Follow [this link](http://www.maheshhaldar.com/demo-use-key/) to check the demo

## Usage

The following defination will only detect and execute provided callback **only** when `A`, `+` or `z` is pressed from keyboard.

```js
import useKey from 'use-key-hook';

function MyComponent  = (props) => {
	useKey((pressedKey) => {
		console.log('Detected Key press', pressedKey);
	}, {
		detectKeys: ['A', '+', 122]
	});
};
```

## Arguments in useKey

### callback _(required)_

> type: function
>
> The first argument is callback function which gets executed whenever the keys are pressed.

### detectKeys _(optional)_

> type: array
> array item type: string | number
>
> The second argument is an object and should contain one key in name of **detectKeys**.
> This has to be an array.

**When array is empty or not passed** All the keys will be detected and callback will be executed.

The items in arrays can be **ASCII code** of keys or **characters itself**.

#### Example values of detectKeys array

```
{
	detectKeys: ['A', 69, 27]
}
```

The above will detect and execute callback only the following keys

- `A` maps with item 0 `A`
- `Enter key` maps with ASCII code is 69
- `Escape key` maps with numeric ASCII code 27.

Pressing any other key will not be detected.

```
{
	detectKeys: [1, '2']
}
```

The above will detect when number `2` is pressed only.
Pressing 1, it will not be detected as we passed ASCII code numeric 1 and this is not number 1.

Pressing any other key will not be detected.
