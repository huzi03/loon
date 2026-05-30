/*************************************
App: Sunlogin (Oray) ADBlock
URL: https://client-api-v2.oray.com  https://api-std.sunlogin.oray.com
Updated: 2026-05-30
Author: huzi

[rewrite_local]
^https?:\/\/client-api-v2\.oray\.com\/materials\/ url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/sunlogin.adblock.js
^https?:\/\/api-std\.sunlogin\.oray\.com\/advertisement\/frequency(\?|$) url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/sunlogin.adblock.js

[filter_local]
host-suffix, pangolin-sdk-toutiao.com, reject
host-suffix, pangolin-sdk-toutiao1.com, reject
host-suffix, pangolin-sdk-toutiao-b.com, reject
host-suffix, pglstatp-toutiao.com, reject
host-suffix, ctobsnssdk.com, reject
host-suffix, zijieapi.com, reject
host-suffix, volces.com, reject
host-suffix, bytescm.com, reject
host-suffix, anythinktech.com, reject
host, sdk.1rtb.net, reject
host-suffix, gdt.qq.com, reject
host, sdk.e.qq.com, reject
host-suffix, gdtimg.com, reject
host-suffix, ugdtimg.com, reject
host, mobads.baidu.com, reject
host, bgg.baidu.com, reject
host-suffix, mobads-pre-config.cdn.bcebos.com, reject
host-suffix, doubleclick-cn.net, reject
host-suffix, app-analytics-services.com, reject
host-suffix, motowoo.com, reject
host-suffix, umeng.com, reject
host-suffix, umengcloud.com, reject
host, slapp-tk.oray.com, reject
host, sl-tk.oray.com, reject

[mitm]
hostname = client-api-v2.oray.com, api-std.sunlogin.oray.com
*************************************/

const url = $request.url || "";
let body = $response.body;

try {
  if (/\/advertisement\/frequency/.test(url)) {
    const data = body ? JSON.parse(body) : {};
    data.ad_keys = {};
    data.ad_sunlight_quantity = 0;
    body = JSON.stringify(data);
  } else if (/\/materials\//.test(url)) {
    let data = {};
    try { data = body ? JSON.parse(body) : {}; } catch (e) { data = {}; }
    data.campaigns = [];
    body = JSON.stringify(data);
  }
} catch (e) {
  if (/\/materials\//.test(url)) body = '{"campaigns":[]}';
}

$done({ body });
