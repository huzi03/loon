/*************************************
App: QinLinOpenDoor ADBlock
URL: https://qadx.qinlinad.com
Updated: 2026-06-03
Author: huzi

[rewrite_local]
^https?:\/\/qadx\.qinlinad\.com\/ad\/ url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/qinlinopendoor.adblock.js

[filter_local]
host-suffix, qinlinad.com, reject
host-suffix, yfanads.com, reject
host-suffix, adxtop.cn, reject
host-suffix, pangolin-sdk-toutiao.com, reject
host-suffix, pangolin-sdk-toutiao1.com, reject
host-suffix, pangolin-sdk-toutiao-b.com, reject
host-suffix, pglstatp-toutiao.com, reject
host-suffix, ctobsnssdk.com, reject
host-suffix, zijieapi.com, reject
host-suffix, volces.com, reject
host-suffix, bytescm.com, reject
host-suffix, douyinpic.com, reject
host-suffix, ibytedapm.com, reject
host-suffix, gdt.qq.com, reject
host, sdk.e.qq.com, reject
host, mobads.baidu.com, reject
host, mobads-logs.baidu.com, reject
host, hm.baidu.com, reject
host, h2tcbox.baidu.com, reject
host, open.e.kuaishou.com, reject
host, open.e.kuaishou.cn, reject
host-suffix, adkwai.com, reject
host-suffix, adukwai.com, reject
host, gdfp.gifshow.com, reject
host-suffix, yximgs.com, reject
host, janapi.jd.com, reject
host, xlog.jd.com, reject
host, dsp-x.jd.com, reject
host, kepler.jd.com, reject
host, knicks.jd.com, reject
host-suffix, ums-api.qiniu.com, reject
host-suffix, umeng.com, reject
host, snowflake.qq.com, reject

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
