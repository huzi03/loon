/*************************************
App: Sunlogin (Oray) ADBlock
URL: https://client-api-v2.oray.com  https://api-std.sunlogin.oray.com
Updated: 2026-05-30
Author: huzi

说明：
- [filter_local] 直接按域名拒绝第三方广告/聚合 SDK，这是挡住开屏/插屏的关键（不需要 MITM）。
- [rewrite_local] + 脚本（需要 MITM 并信任证书）：
    · 清空 Oray 自家广告接口返回（materials / advertisement.frequency）
    · best-effort 把 /services 改成付费等级伪装会员
    · /client/free-tips：隐藏连通远程后的“免费版/升级”提示（保留安全提醒）
    · /remote-addr：移除控制工具栏的“游戏模式”画质项
- 伪会员/去游戏模式字段为推测值，若相关页面 UI 异常，删掉对应 [rewrite_local] 规则即可。

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
^https?:\/\/api-std\.sunlogin\.oray\.com\/services\/\d+ url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/sunlogin.adblock.js
^https?:\/\/slapi\.oray\.net\/client\/free-tips url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/sunlogin.adblock.js
^https?:\/\/api-std\.sunlogin\.oray\.com\/remote-addr url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/sunlogin.adblock.js

[mitm]
hostname = client-api-v2.oray.com, api-std.sunlogin.oray.com, slapi.oray.net
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
  } else if (/\/services\/\d+/.test(url)) {
    // best-effort 伪造会员：免费版(level 0/grade free)才有广告，这里抬成付费等级
    const data = body ? JSON.parse(body) : {};
    if (data && typeof data === "object" && "level" in data) {
      data.level = 5;
      if (data.serviceid === 0) data.serviceid = 999999;
      if (data.productid === 0) data.productid = 999999;
      data.quantity = 9999;
      data.expiredate = 4080621133; // ~2099
      data.expiredays = 99999;
      data.service_name = { cn: "专业版", tc: "專業版", en: "Pro." };
      data.product_group = "personal";
      data.extends = Object.assign({}, data.extends, {
        upgrade: false,
        grade_name: "professional",
        product_name: { zh_cn: "专业版", en: "Pro.", zh_tw: "專業版" }
      });
      body = JSON.stringify(data);
    }
  } else if (/\/client\/free-tips/.test(url)) {
    // 连通远程后的“当前使用免费服务/升级”提示，隐藏它（保留 security_tips 安全提醒）
    const data = body ? JSON.parse(body) : {};
    if (data && data.data) {
      data.data.isshow = false;
      data.data.info = "";
      data.data.paidinfo = "";
    }
    body = JSON.stringify(data);
  } else if (/\/remote-addr/.test(url)) {
    // 控制工具栏的“游戏模式”画质项，移除以使其不在界面显示
    const data = body ? JSON.parse(body) : {};
    if (data && data.server) {
      if (data.server.fps) delete data.server.fps.game;
      if (data.server.encode_config) delete data.server.encode_config.game;
    }
    body = JSON.stringify(data);
  }
} catch (e) {
  if (/\/materials\//.test(url)) body = '{"campaigns":[]}';
}

$done({ body });
