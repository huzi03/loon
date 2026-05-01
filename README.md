# Quantumult X JS Guide

This repo now uses the QX single-JS style as the primary format.

Current script:

- `pinduoduo.adblock.js`

Raw URL:

- `https://raw.githubusercontent.com/huzi03/loon/main/pinduoduo.adblock.js`

## Standard format

Each QX script should use this structure:

```js
/*************************************
App: AppName
URL: https://example.com
Updated: YYYY-MM-DD
Author: huzi

[rewrite_local]
^https?:\/\/example\.com\/path url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/example.js

[mitm]
hostname = example.com
*************************************/

const url = $request.url || "";
let body = $response.body;

try {
  const data = JSON.parse(body);
  body = JSON.stringify(data);
} catch (e) {}

$done({ body });
```

## Rules

1. Use one `.js` file as the main deliverable.
2. Put QX metadata and rule headers at the top comment block.
3. Keep `rewrite_local` and `mitm` inside the JS header.
4. Prefer `script-response-body` for JSON trimming and field deletion.
5. Use ASCII in comments when possible.
6. Match real request hosts from HAR captures, not only guessed hosts.
7. Publish by GitHub raw URL so QX can reference the script directly.

## This repo

- Main script: `pinduoduo.adblock.js`
- Optional legacy file: `PinDuoDuo.ADBlock.snippet`
- HAR files are for local analysis and should not be committed unless needed
