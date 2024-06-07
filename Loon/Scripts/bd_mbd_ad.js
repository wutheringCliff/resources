// 2024-06-03 19:00
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

console.log("bd_mbd_ad_body: " + $response.body);
console.log("bd_mbd_ad_url: " + url);

if (url.includes("/searchbox")) {
    const uri = new URL($request.url);
    // 使用URLSearchParams解析查询字符串
    const params = new URLSearchParams(uri.search);
    const $action = params.get("action");
    console.log("bd_mbd_ad_action: "  + $action);

    if ($action === 'update') {
        if (obj?.data?.splash?.splash?.data.hasOwnProperty("conf")) {
             obj.data.splash.splash.data.conf.day_show_count_max = 0;
             obj.data.splash.splash.data.conf.hot_background_time = 0;
             obj.data.splash.splash.data.conf.hot_boot_opt = 0;
        }
        if (obj?.data?.splash?.splash?.data.hasOwnProperty("list")) {
            obj.data.splash.splash.data.list = [];
        }
        if (obj?.data?.splash?.splash?.data.hasOwnProperty("policy")) {
            obj.data.splash.splash.data.policy.rt_load_info = {};
        }
    } else if ($action === 'feed') {
        for (const key in obj.data) {
            if (obj.data.hasOwnProperty(key) ) {
                const childNode = obj.data[key];
                if (childNode.hasOwnProperty("itemlist")){
                    const itemList = childNode.itemlist;
                    if (itemList.hasOwnProperty("policies")) {
                        const policies = itemList.policies;
                        if (policies.hasOwnProperty("ad_policy")){
                            policies.ad_policy = {};
                        }
                        if (policies.hasOwnProperty("ad_min_limit")){
                            policies.ad_min_limit = "0";
                        }
                        if (policies.hasOwnProperty("ad_min_pos_limit")) {
                            policies.ad_min_pos_limit = "0";
                        }
                        if (policies.hasOwnProperty("auto_play_switch_ad")) {
                            policies.auto_play_switch_ad = "0";
                        }
                    }

                    if (itemList.hasOwnProperty("items")) {
                        //过滤feed流中存在的广告
                        let newItems = [];
                        for (let item of itemList.items) {
                            if ( item.data?.mode === "ad") {
                                //feed流广告
                                console.log("bd_mbd_ad_feed: "+ JSON.stringify(item));
                            } else if (item.data?.mode === "video"){
                                //过滤视频
                            } else {
                                newItems.push(item)
                            }
                        }
                        itemList.items = newItems;
                    }
                }
                if (key === "301" && childNode.hasOwnProperty("id")) {
                    if (childNode.id.startsWith("ad")) {
                        console.log("bd_mbd_ad_feed_301: " + childNode.id);
                        childNode.data = {};
                    }
                }
            }

        }
    }
}


$done({ body: JSON.stringify(obj) });