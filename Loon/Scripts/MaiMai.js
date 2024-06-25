// 2024-06-03 19:00
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

console.log("maimai_ad_url: " + url);
console.log("maimai_ad_body: " + $response.body);

if (url.includes("/maimai/pbs/can_guide_switcher")) {
    if (obj.hasOwnProperty("can_push")) {
        obj.can_push = false;
    }
    if (obj.hasOwnProperty("can_guide")) {
        obj.can_guide = false;
    }
}
if (url.includes("/maimai/adshow")) {
    obj = {"result":"ok"}
}
if (url.includes("/maimai/feed/v5/focus_feed")) {
    if (obj.hasOwnProperty("feeds")) {
        obj.feeds = obj.feeds.filter((i) => i?.hasOwnProperty("newAdStyle"));
    }
}

$done({ body: JSON.stringify(obj) });