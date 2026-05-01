# QX JS Spec

This document defines the preferred Quantumult X script style for this repository.

## Goal

Use a single `.js` file as the primary published artifact.

The file should:

- contain a header block with QX rules
- expose a stable raw GitHub URL
- handle response-body rewriting in script code

## Header template

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
```

## Body script template

```js
const url = $request.url || "";
let body = $response.body;

try {
  const data = JSON.parse(body);

  if (/\/some\/path/.test(url)) {
    delete data.example;
  }

  body = JSON.stringify(data);
} catch (e) {}

$done({ body });
```

## Writing rules

1. Match real hosts from packet capture or HAR.
2. Prefer broad-enough host regex only when the app uses rotating API hosts.
3. Keep destructive deletes targeted to known fields.
4. When bottom tabs must be simplified, filter by stable identifiers such as `link`.
5. If QUIC-specific behavior is needed in QX, prefer practical mitigation such as removing `Alt-Svc` rather than pretending QX has an exact Loon-equivalent protocol rule.

## Publishing rules

1. Commit the `.js` file to the repository.
2. Use GitHub raw as the distribution URL.
3. Keep author and updated date current.
4. Treat `.snippet` files as optional compatibility artifacts, not the primary format.

## Current example

- Script: `pinduoduo.adblock.js`
- Raw URL: `https://raw.githubusercontent.com/huzi03/loon/main/pinduoduo.adblock.js`
