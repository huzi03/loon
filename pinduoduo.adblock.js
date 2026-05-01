const url = $request.url || "";

function delPath(obj, path) {
  if (!obj) return;
  let cur = obj;
  for (let i = 0; i < path.length - 1; i += 1) {
    cur = cur?.[path[i]];
    if (cur == null) return;
  }
  if (cur && Object.prototype.hasOwnProperty.call(cur, path[path.length - 1])) {
    delete cur[path[path.length - 1]];
  }
}

function keepBottomTabs(list) {
  if (!Array.isArray(list)) return list;
  const keep = new Set(["index.html", "chat_list.html", "personal.html"]);
  return list.filter((item) => keep.has(item?.link));
}

function simplifyTopOpts(list) {
  if (!Array.isArray(list)) return list;
  return list.map((item) => {
    if (!item || typeof item !== "object") return item;
    delete item.selected_image;
    delete item.image;
    delete item.height;
    delete item.width;
    return item;
  });
}

let body = $response.body;

try {
  const data = JSON.parse(body);

  if (/\/api\/alexa\/homepage\/hub\?/.test(url)) {
    delPath(data, ["result", "dy_module", "irregular_banner_dy"]);
    delPath(data, ["result", "icon_set"]);
    delPath(data, ["result", "search_bar_hot_query"]);

    if (data?.result) {
      data.result.bottom_tabs = keepBottomTabs(data.result.bottom_tabs);
      data.result.buffer_bottom_tabs = keepBottomTabs(data.result.buffer_bottom_tabs);
      data.result.all_top_opts = simplifyTopOpts(data.result.all_top_opts);
    }
  }

  if (/\/search\?/.test(url)) {
    delPath(data, ["expansion"]);
  }

  if (/\/api\/philo\/personal\/hub\?/.test(url)) {
    delPath(data, ["monthly_card_entrance"]);
    delPath(data, ["personal_center_style_v2_vo"]);
    delPath(data, ["icon_set", "icons"]);
    delPath(data, ["icon_set", "top_personal_icons"]);
  }

  body = JSON.stringify(data);
} catch (e) {}

$done({ body });
