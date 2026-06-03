/*************************************
App: QinLinOpenDoor ADBlock
URL: https://qadx.qinlinad.com
Updated: 2026-06-03
Author: huzi

[rewrite_local]
^https?:\/\/qadx\.qinlinad\.com\/ad\/ url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/qinlinopendoor.adblock.js
^https?:\/\/(api|adx-data|tracker)\.yfanads\.com url reject
^https?:\/\/file\.qinlinad\.com url reject
^https?:\/\/wiretap\.adxtop\.cn url reject
^https?:\/\/mobads(-logs)?\.baidu\.com url reject
^https?:\/\/(hm|h2tcbox)\.baidu\.com url reject
^https?:\/\/(janapi|xlog|dsp-x|kepler|knicks)\.jd\.com url reject
^https?:\/\/open\.e\.kuaishou\.(com|cn) url reject
^https?:\/\/gdfp\.gifshow\.com url reject
^https?:\/\/(mi|a|v2mi)\.gdt\.qq\.com url reject
^https?:\/\/sdk\.e\.qq\.com url reject
^https?:\/\/snowflake\.qq\.com url reject
^https?:\/\/.*\.(pangolin-sdk-toutiao|pangolin-sdk-toutiao1|pangolin-sdk-toutiao-b|pglstatp-toutiao|ctobsnssdk|zijieapi|volces|douyinpic|ibytedapm|bytescm)\.com url reject
^https?:\/\/.*\.(adkwai|adukwai|yximgs)\.com url reject
^https?:\/\/.*\.umeng\.com url reject

[mitm]
hostname = qadx.qinlinad.com
*************************************/

const url = $request.url || "";
let body = $response.body;

try {
  if (/qinlinad\.com\/ad\//.test(url)) {
    body = '{"code":0,"data":{}}';
  }
} catch (e) {
  body = '{"code":0,"data":{}}';
}

$done({ body });
