# ExJS

ExJS is a collection of small and harmless prototype extensions to make working with JavaScript more pleasant to write without losing readability.

By itself, ExJS adds nothing to your environment. You must first pick and choose the parts that you like!

## Goals

- ES5 compatible - don't require compilation.
- Browser-compatible - don't have node-specific stuff.
- Few-to-no dependencies - keep it simple.
- Cherry-picking - keep it small for the frontend.
- Broad utility - don't have an extension for every little thing.

## WARNING

This library should only ever be used in **end-user applications**. It should never be used in, for example, a library.

## How to Use

First install:

    $ npm install exjs  # OR: yarn add exjs

Then put this as early as you can in your project:

    require('exjs').install()

Lastly, add the `exjs` key to your `package.json` with an array as its value. Example:

```json
{
  "name": "my-awesome-project",
  ...,
  "exjs": [
    "function/papp",
    "function/throttle",
    "global/inspect",
  ]
}
```

Read on for documentation on each module.

### `function/papp` and `function/pappRight`

This function gives you quick and easy partial application. See [this repo](https://github.com/mindeavor/es-papp) for examples and documentaton.

### `function/throttle`

Use this to restrict how often you can call a function. Useful for throttling user input, such as mouse movement, scrolling, or keystrokes. It takes up to three arguments:

- `waittime` - The amount of time (ms) to wait before calling the function.
- `threshold` (default: `250`) - After making a call, the minimum amount of time (ms) to wait before making another one.
- `context` - What to use as the parameter `this`, if you need it.

Example:

```js
function ajaxSearch () {
  // Make an AJAX request, do something with response.
}

document.querySelector('.my-input')
  .addEventListener('input', ajaxSearch.throttle(500, 1000))
```

### `global/inspect`

A handy, opinionated, FP-friendly, globally-accessible console log function. It's behavior may seem strange at first, but once you get used to it you'll be able to debug quickly and efficiently.

In short:

- A **string label** is always required as a first argument. This is to ensure all console logs are easily decipherable.
- At least one **subject** is required after the string label. A subject can be any type.
- If no subject is given, a **function** is returned with the the string label partially applied.
- Calling `inspect` will always return the **first subject**.

Let's go through each of these cases.

#### 1. String Labels & Subjects

The string label is just that – a string. Use it to differentaiate your debug logs.

Once you have a string label, you can have as many subjects as you want.

```js
function doTask (x, y, z) {
  inspect('x', x)
  inspect('y and z', y, z)
  // ...
}
doTask(10, 20, 30)
doTask('a', 'b', 'c')
doTask({}, [], null)
```

#### 2. No Subject

If you don't provide a subject, nothing will be logged, and a **partially applied function** will be returned.

This is useful when you want a quick debug on callback, such as a promise:

```js
fetchItems().then( inspect('items') )
```