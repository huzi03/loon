/*************************************
App: YangJiBao ADBlock
URL: https://app-api.yangjibao.com
Updated: 2026-05-08
Author: huzi

[rewrite_local]
^https?:\/\/app-api\.yangjibao\.com\/inner_notice(\?|$) url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/yangjibao.adblock.js
^https?:\/\/app-api\.yangjibao\.com\/unify_ad(\?|$) url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/yangjibao.adblock.js
^https?:\/\/app-api\.yangjibao\.com\/app_config(\?|$) url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/yangjibao.adblock.js

[mitm]
hostname = app-api.yangjibao.com
*************************************/

const url = $request.url || "";
let body = $response.body;

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function includesAny(text, keywords) {
  const source = String(text || "");
  return keywords.some((keyword) => source.includes(keyword));
}

try {
  const data = JSON.parse(body);

  if (/\/inner_notice(\?|$)/.test(url)) {
    const keywords = [
      "\u573a\u5185\u4f4e\u4f63\u5f00\u6237",
      "\u4f4e\u4f63\u5f00\u6237",
      "\u65b0\u5ba2\u798f\u5229",
      "\u5f00\u6237"
    ];
    if (data?.data) {
      data.data.top_inner_notice = null;
      data.data.inner_notices = safeArray(data.data.inner_notices).filter((item) => {
        const content = item?.content || "";
        const otherUrl = item?.other_wx_app_url || "";
        return !includesAny(content, keywords) && !includesAny(otherUrl, ["openWx", "mp.weixin.qq.com"]);
      });
    }
  }

  if (/\/unify_ad(\?|$)/.test(url)) {
    if (data?.data) {
      data.data.normal_option = null;
      data.data.bubble_notice = null;
    }
  }

  if (/\/app_config(\?|$)/.test(url)) {
    if (data?.data?.function_config) {
      data.data.function_config.open_account = false;
      data.data.function_config.business = "";
    }
  }

  body = JSON.stringify(data);
} catch (e) {}

$done({ body });
