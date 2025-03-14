// 2025-03-14 19:00
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

console.log("Finka_Request_URL: " + url);
console.log("Finka_Response_Body: " + $response.body);

if (url.includes("/feed/v5")) {
    if (obj.hasOwnProperty("data")) {
        if (obj.data.hasOwnProperty("list")) {
            obj.data.list = obj.data.list.filter((feed) => feed.hasOwnProperty("type") && feed.type !== "ShowCase")
        }
    }
}
if (url.includes("/user/profile/view/v3")) {
    if (obj.data?.hasOwnProperty("user")) {
        const user = obj.data.user;
        if (user.hasOwnProperty("vip")) user.vip = true;
        if (user.hasOwnProperty("ssvip")) user.ssvip = true;
        if (user.hasOwnProperty("svip")) user.svip = true;
    }
}

if (url.includes("/user/profile/info/v2")) {
    let data = obj.data;
    if (data) {
        if (data.hasOwnProperty("ad")) data.ad = [];
        if (data.hasOwnProperty("profilePasterAd")) data.profilePasterAd = {};
        if (data.hasOwnProperty("featuredServicesList")) data.featuredServicesList = [];
    }
}

$done({body: JSON.stringify(obj)});
