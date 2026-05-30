/*
向日葵 (Sunlogin / Oray) 去广告 —— Quantumult X 响应脚本

【作用】把 Oray 自家广告接口的返回内容清空：
  · client-api-v2.oray.com/materials/*   开屏 / 设备页 / 列表 / 插屏 / 信息流 / 推广位素材  ->  {"campaigns":[]}
  · api-std.sunlogin.oray.com/advertisement/frequency  插屏广告频次配置  ->  ad_keys 置空

【QX 配置】把下面三段分别填到 Quantumult X 配置对应位置（脚本路径换成你自己的）：

[rewrite_local]
^https?:\/\/client-api-v2\.oray\.com\/materials\/ url script-response-body sunlogin-deads.js
^https?:\/\/api-std\.sunlogin\.oray\.com\/advertisement\/frequency url script-response-body sunlogin-deads.js

[filter_local]
; 第三方广告 / 统计 SDK 直接拒绝
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
*/

const url = $request.url;
let body = $response.body;

try {
  if (/\/advertisement\/frequency/.test(url)) {
    // 清空插屏广告频次配置，使任何 ad_key 都拿不到下发参数
    let obj = body ? JSON.parse(body) : {};
    obj.ad_keys = {};
    obj.ad_sunlight_quantity = 0;
    body = JSON.stringify(obj);
  } else if (/\/materials\//.test(url)) {
    // 清空所有广告素材
    let obj = {};
    try { obj = body ? JSON.parse(body) : {}; } catch (e) { obj = {}; }
    obj.campaigns = [];
    body = JSON.stringify(obj);
  }
} catch (e) {
  // 解析失败时兜底返回空素材，保证不展示广告且不影响主功能
  if (/\/materials\//.test(url)) body = '{"campaigns":[]}';
}

$done({ body });
