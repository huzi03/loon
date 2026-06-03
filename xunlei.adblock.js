/*************************************
App: Xunlei 迅雷 ADBlock
URL: https://api-shoulei-ssl.xunlei.com  https://api-gateway-pan.xunlei.com  https://admark-x.xunlei.com
Updated: 2026-06-03
Author: huzi

说明：
- [filter_local] 按域名拒绝第三方广告/聚合 SDK 与广告埋点（开屏/插屏/信息流的关键，不需要 MITM）。
- [rewrite_local] + 脚本（需要 MITM 并信任证书）：
    · flowhub/v1/slots：清空广告位
    · aggregate/info：移除"近期必看"(recent_recommend)和首页广告卡片(ads)模块
- 如某处功能异常，删掉对应规则即可。

[filter_local]
; —— 迅雷自家广告/埋点域名 ——
host, admark-x.xunlei.com, reject
host, analysis-acc-ssl.xunlei.com, reject
host, etl-xlmc-ssl.sandai.net, reject
; —— 穿山甲 / CSJ ——
host-suffix, pangolin-sdk-toutiao.com, reject
host-suffix, pangolin-sdk-toutiao1.com, reject
host-suffix, pangolin-sdk-toutiao-b.com, reject
host-suffix, pglstatp-toutiao.com, reject
host-suffix, csjdeveloper.com, reject
host-suffix, csjplatform.com, reject
host-suffix, ctobsnssdk.com, reject
; —— 广点通 GDT（含素材域 + 直连 IP）——
host-suffix, gdt.qq.com, reject
host-suffix, ugdtimg.com, reject
host, tangram.e.qq.com, reject
host, sdk.e.qq.com, reject
ip-cidr, 120.233.51.144/32, reject, no-resolve
ip-cidr, 36.155.213.182/32, reject, no-resolve
; —— 最右 zuiyou ——
host, adapi.izuiyou.com, reject
host-suffix, ixiaochuan.cn, reject
; —— VLion / 1rtb ——
host-suffix, 1rtb.cn, reject
host-suffix, 1rtb.com, reject
host-suffix, 1rtb.net, reject
; —— Ubix ——
host-suffix, ubixioe.com, reject
; —— 倍孜 Beizi ——
host-suffix, beizi.biz, reject
; —— Fancy DSP ——
host-suffix, fancydsp.com, reject
host-suffix, fancyapi.com, reject
; —— adn-plus / feedcoop / hubcloud ——
host-suffix, adn-plus.com.cn, reject
host-suffix, feedcoopapi.com, reject
host-suffix, hubcloud.com.cn, reject
; —— 快手广告 ——
host, open.e.kuaishou.com, reject
host-suffix, adkwai.com, reject
host-suffix, adukwai.com, reject
host, gdfp.gifshow.com, reject
host-suffix, yximgs.com, reject
; —— 抖音/字节广告 ——
host, p3-sign.douyinpic.com, reject
host, webcast-open.douyin.com, reject
host-suffix, volces.com, reject
host-suffix, volceapplog.com, reject
host-suffix, volccdn.com, reject
host-suffix, volcvod.com, reject
; —— 美团 DSP ——
host, impdsp.meituan.com, reject
host, dspadlogger.waimai.meituan.com, reject
host, s3plus.meituan.net, reject
host, p0.meituan.net, reject
; —— 京东广告 ——
host, janapi.jd.com, reject
host, xlog.jd.com, reject
host, dsp-x.jd.com, reject
; —— 百度 ——
host, feed-image.baidu.com, reject
; —— 淘宝广告素材 ——
host, qh-material.taobao.com, reject
; —— 贝叶斯 Bayescom ——
host-suffix, bayescom.com, reject
; —— 乐播投屏 SDK ——
host-suffix, hpplay.cn, reject
; —— 数美风控指纹 ——
host-suffix, fengkongcloud.com, reject
; —— 统计 / 埋点 ——
host-suffix, umeng.com, reject
host, rmonitor.qq.com, reject
host-suffix, tpstelemetry.tencent.com, reject
host, h.trace.qq.com, reject
host, snowflake.qq.com, reject
host, tdid.m.qq.com, reject

[rewrite_local]
^https?:\/\/api-shoulei-ssl\.xunlei\.com\/flowhub\/v1\/slots url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/xunlei.adblock.js
^https?:\/\/api-gateway-pan\.xunlei\.com\/content\/v1\/aggregate\/info url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/xunlei.adblock.js

[mitm]
hostname = api-shoulei-ssl.xunlei.com, api-gateway-pan.xunlei.com
*************************************/

const url = $request.url || "";
let body = $response.body;

const REMOVE_MODULES = new Set(["recent_recommend", "ads"]);

try {
  if (/\/flowhub\/v1\/slots/.test(url)) {
    const data = body ? JSON.parse(body) : {};
    if (data && typeof data === "object") data.slots = [];
    body = JSON.stringify(data);
  } else if (/\/aggregate\/info/.test(url)) {
    const data = body ? JSON.parse(body) : {};
    if (data && data.data && Array.isArray(data.data.modules)) {
      data.data.modules = data.data.modules.filter(
        (m) => !REMOVE_MODULES.has(m.module_id)
      );
    }
    body = JSON.stringify(data);
  }
} catch (e) {
  if (/\/flowhub\/v1\/slots/.test(url)) body = '{"slots":[]}';
}

$done({ body });
