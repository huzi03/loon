/*************************************
App: QinLinOpenDoor ADBlock
URL: https://qadx.qinlinad.com
Updated: 2026-06-03
Author: huzi

[rewrite_local]
^https?:\/\/qadx\.qinlinad\.com\/ad\/ url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/qinlinopendoor.adblock.js
^https?:\/\/(api|adx-data|tracker)\.yfanads\.com\/ url reject
^https?:\/\/file\.qinlinad\.com\/ url reject
^https?:\/\/wiretap\.adxtop\.cn\/ url reject
^https?:\/\/.*\.pangolin-sdk-toutiao\.com url reject
^https?:\/\/.*\.pangolin-sdk-toutiao1\.com url reject
^https?:\/\/.*\.pangolin-sdk-toutiao-b\.com url reject
^https?:\/\/.*\.pglstatp-toutiao\.com url reject
^https?:\/\/.*\.ctobsnssdk\.com url reject
^https?:\/\/.*\.zijieapi\.com url reject
^https?:\/\/.*\.volces\.com url reject
^https?:\/\/.*\.douyinpic\.com url reject
^https?:\/\/.*\.ibytedapm\.com url reject
^https?:\/\/(mi|a|v2mi)\.gdt\.qq\.com\/ url reject
^https?:\/\/sdk\.e\.qq\.com\/ url reject
^https?:\/\/mobads(-logs)?\.baidu\.com\/ url reject
^https?:\/\/(hm|h2tcbox)\.baidu\.com\/ url reject
^https?:\/\/open\.e\.kuaishou\.(com|cn)\/ url reject
^https?:\/\/.*\.adkwai\.com url reject
^https?:\/\/.*\.adukwai\.com url reject
^https?:\/\/gdfp\.gifshow\.com\/ url reject
^https?:\/\/(janapi|xlog|dsp-x|kepler|knicks)\.jd\.com\/ url reject
^https?:\/\/.*\.umeng\.com url reject
^https?:\/\/snowflake\.qq\.com\/ url reject

[mitm]
hostname = qadx.qinlinad.com, *.yfanads.com, file.qinlinad.com, wiretap.adxtop.cn, *.pangolin-sdk-toutiao.com, mi.gdt.qq.com, a.gdt.qq.com, v2mi.gdt.qq.com, sdk.e.qq.com, mobads.baidu.com, mobads-logs.baidu.com, hm.baidu.com, h2tcbox.baidu.com, open.e.kuaishou.com, open.e.kuaishou.cn, gdfp.gifshow.com, janapi.jd.com, xlog.jd.com, dsp-x.jd.com, snowflake.qq.com
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
