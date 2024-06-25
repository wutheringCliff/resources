// 2024-06-03 19:00
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

console.log("maimai_ad_url: " + url);
console.log("maimai_ad_body: " + $response.body);

if (url.includes("/feed/v5")) {
    if (obj.hasOwnProperty("data")) {
        if (obj.data.hasOwnProperty("list")) {
            obj.data.list = obj.data.list.filter((feed) => feed.hasOwnProperty("type") && feed.type !== "ShowCase")
        }
    }
}
if (url.includes("/usr/profile/view/v3")) {
    if (obj.data?.hasOwnProperty("user")){
        if (obj.data.user.hasOwnProperty("vip")) {
            obj.data.user.vip = true;
        }
        if (obj.data.user.hasOwnProperty("ssvip")) {
            obj.data.user.vip = true;
        }
        if (obj.data.user.hasOwnProperty("svip")) {
            obj.data.user.svip = true;
        }
    }
}


$done({ body: JSON.stringify(obj) });