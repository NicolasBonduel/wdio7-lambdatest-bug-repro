## Issue description
[WebDriver.io](https://github.com/webdriverio/webdriverio) recently had a major upgrade to it's 7th version.
Amongst others, one major change is a stricter compliance to protocols. You can read more on WDIO's blog, here: https://webdriver.io/blog/2021/02/09/webdriverio-v7-released/#stricter-protocol-compliance

Here is the gist of it:

```
The WebDriver protocol has been upgraded to a W3C recommended standard since 2018. A lot of cloud vendors and tools have been able to update their implementation making all artifacts of the JSONWireProtocol obsolete. The WebdriverIO projects wants to support this transition by adding additional checks to its capability configuration to ensure users don't accidentally send a mixture of both protocols resulting in an unexpected behavior. With the new version your session request will automatically fail if you send incompatible capabilities along.
```

## Current Behavior
Currently, with previously supported capabilities, WDIO fails on start:

```js
[...]
capabilities: [{
  browserName: 'Chrome',
  platformName: 'Windows 10',
  browserVersion: 86,
  console: true,
  video: true,
  network: true,
  'goog:chromeOptions': {
      args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  },
}],
[...]
```

```
@wdio/runner: Error: Invalid or unsupported WebDriver capabilities found ("console", "video", "network"). Ensure to only use valid W3C WebDriver capabilities (see https://w3c.github.io/webdriver/#capabilities).
```

This is because the `goog:chromeOptions` feature is following the W3C capability standard while the `console`, `video` and `network` features are not.

## Possible Solution
As the (W3C documentation)[https://w3c.github.io/webdriver/#capabilities] underlines, it is possible to define "extension capabilities" which must contain a colon character.
This is what Google and Mozilla use with the custom `goog:chromeOptions` and `moz:experimental-webdriver` capabilities. This is also what SauceLabs use with the `sauce:options` capability.

## Steps to Reproduce

1. `npm i`
2. Set up a `.env` file containing your lambdatest credentials with the variables `LAMBDATEST_USER` and `LAMBDATEST_KEY` (see `.env.example`)
3. `npx wdio wdio.conf.js`