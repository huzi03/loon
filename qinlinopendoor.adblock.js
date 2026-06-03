/*************************************
App: QinLinOpenDoor ADBlock
URL: https://qadx.qinlinad.com
Updated: 2026-06-03
Author: huzi

[rewrite_local]
^https?:\/\/qadx\.qinlinad\.com\/ad\/ url script-response-body https://raw.githubusercontent.com/huzi03/loon/main/qinlinopendoor.adblock.js

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
