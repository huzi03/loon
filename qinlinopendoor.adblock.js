/*************************************
App: 亲邻开门 QinLinOpenDoor ADBlock
URL: https://qadx.qinlinad.com  https://mobileapi3.qinlinkeji.com
Updated: 2026-06-03
Author: huzi

说明：
- [filter_local] 从源头拒绝亲邻自家广告平台 + 翼帆/adxtop + 第三方 SDK。
- 亲邻开门广告核心链路：qinlinad.com(自家ADX) → yfanads.com(翼帆聚合) → 各 SDK，拦掉前两个即可阻止大部分广告。
- 如某处功能异常，删掉对应规则即可。

[filter_local]
; —— 亲邻自家广告平台 ——
host-suffix, qinlinad.com, reject
; —— 翼帆广告聚合 ——
host-suffix, yfanads.com, reject
; —— adxtop 曝光追踪 ——
host-suffix, adxtop.cn, reject
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
host-suffix, ibytedapm.com, reject
; —— 广点通 GDT ——
host-suffix, gdt.qq.com, reject
host, sdk.e.qq.com, reject
; —— 百度 ——
host, mobads.baidu.com, reject
host, mobads-logs.baidu.com, reject
host, hm.baidu.com, reject
host, h2tcbox.baidu.com, reject
; —— 快手广告 ——
host, open.e.kuaishou.com, reject
host, open.e.kuaishou.cn, reject
host-suffix, adkwai.com, reject
host-suffix, adukwai.com, reject
host, gdfp.gifshow.com, reject
host-suffix, yximgs.com, reject
; —— 京东广告 ——
host, janapi.jd.com, reject
host, xlog.jd.com, reject
host, dsp-x.jd.com, reject
host, kepler.jd.com, reject
host, knicks.jd.com, reject
; —— 七牛统计 ——
host-suffix, ums-api.qiniu.com, reject
; —— 统计 / 埋点 ——
host-suffix, umeng.com, reject
host, snowflake.qq.com, reject

[mitm]
hostname = qadx.qinlinad.com
*************************************/

$done({ body: $response.body });
