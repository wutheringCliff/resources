// 2024-06-03 19:00
const url = $request.url;
console.log("moji_ad_url: " + url);
if (!$response.body) $done({});
let obj = JSON.parse($response.body);


console.log("moji_ad_body: " + $response.body);

if (url.includes("/json/upgrade")) {
    if (obj.hasOwnProperty("basic_config")) {
        obj.basic_config.member_short_raintype_vip =["0"];
        obj.basic_config.day_15_ad_inventory_heightfloor = ["1","100"]
        obj.basic_config.vipFrame = ["0"];
        obj.basic_config.ad_scheme_sniffer = [];
        obj.basic_config.member_short_temp_vip = ["0"];
        obj.basic_config.member_short_pr_vip = ["0"];
        obj.basic_config.member_short_vip = ["0"];
        obj.basic_config.command = [];
        obj.basic_config.adLocalSDKStat = [];
        obj.basic_config.day_40_ad_inventory_heightfloor = ["0","100"];
        if (obj.basic_config.hasOwnProperty("member_weather40day_vip")) {
            obj.basic_config.member_weather40day_vip[0] = "0";
        }
    }
}
if (url.includes("/user-conf-server/diamondConf")) {
    if (obj.hasOwnProperty("defaultData")) {
        obj.defaultData = [];
    }
    if (obj.hasOwnProperty("recData")) {
        obj.recData = [];
    }
}

$done({ body: JSON.stringify(obj) });
