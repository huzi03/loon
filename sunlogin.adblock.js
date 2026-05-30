/*************************************
App: Sunlogin (Oray) ADBlock
URL: https://client-api-v2.oray.com  https://api-std.sunlogin.oray.com
Updated: 2026-05-30
Author: huzi

说明：
- [filter_local] 直接按域名拒绝第三方广告/聚合 SDK，这是挡住开屏/插屏的关键（不需要 MITM）。
- [rewrite_local] + 脚本把 Oray 自家广告接口返回内容清空（这部分需要 MITM 并信任证书）。

[filter_local]
; —— 穿山甲 / GroMore ——
host-suffix, pangolin-sdk-toutiao.com, reject
host-suffix, pangolin-sdk-toutiao1.com, reject
host-suffix, pangolin-sdk-toutiao-b.com, reject
host-suffix, pglstatp-toutiao.com, reject
host-suffix, ctobsnssdk.com, reject
host-suffix, zijieapi.com, reject
host-suffix, volces.com, reject
host-suffix, bytescm.com, reject
host-suffix, douyinpic.com, reject
host, aweme.snssdk.com, reject
; —— Sigmob ——
host-suffix, sigmob.com, reject
host-suffix, sigmob.cn, reject
; —— VLion / 1rtb ——
host-suffix, 1rtb.net, reject
host-suffix, 1rtb.com, reject
; —— TopOn / AnyThink ——
host-suffix, anythinktech.com, reject
; —— 广点通 GDT ——
host-suffix, gdt.qq.com, reject
host, sdk.e.qq.com, reject
host-suffix, gdtimg.com, reject
host-suffix, ugdtimg.com, reject
; —— 百度 ——
host, mobads.baidu.com, reject
host, mobads-logs.baidu.com, reject
host, bgg.baidu.com, reject
host-suffix, mobads-pre-config.cdn.bcebos.com, reject
; —— 美团 DSP（广告创意源）——
host, impdsp.meituan.com, reject
host, s3plus.meituan.net, reject
; —— Google ——
host-suffix, doubleclick-cn.net, reject
host-suffix, app-analytics-services.com, reject
; —— 其它广告 ——
host-suffix, motowoo.com, reject
; —— 统计 / 埋点 ——
host-suffix, umeng.com, reject
host-suffix, umengcloud.com, reject
host, slapp-tk.oray.com, reject
host, sl-tk.oray.com, reject

[rewrite_local]
^https?:\/\/client-api-v2\.oray\.com\/materials\/ url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/sunlogin.adblock.js
^https?:\/\/api-std\.sunlogin\.oray\.com\/advertisement\/frequency(\?|$) url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/sunlogin.adblock.js

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
