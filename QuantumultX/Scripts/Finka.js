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

if (url.includes("/inbox/session/get/v3")) {
    if (obj.data?.hasOwnProperty("hasPrivilege")) {
        obj.data.hasPrivilege = true;
    }

    if (obj.data?.hasOwnProperty("list")) {
        const list = obj.data.list;
        if (list) {
            for (const item of list) {
                if (item?.visitorInfo?.visitorEnable === false) {
                    item.visitorInfo.visitorEnable === true
                }
            }
        }
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

console.log("Finka_Response_Revised_Body: " + JSON.stringify(obj));

$done({body: JSON.stringify(obj)});
