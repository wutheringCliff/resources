// 2024-06-03 19:00
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

console.log("bd_tieba_ad_url: " + url);
console.log("bd_tieba_ad_body: " + $response.body);

if (url.includes("/c/s/sync")) {
    if (obj.hasOwnProperty("ad_num_competition_frs")) {
        obj.ad_num_competition_frs = "0";
    }
    if (obj.hasOwnProperty("config")) {
       if (obj.config.hasOwnProperty("switch")) {
           const names = ["ad_baichuan_open","ad_log_open","ad_stlog_switch","ad_sale_spread_icon","ad_screen_delay_switch","ad_to_maintabactivity_12_21"];
           for (const item of obj.config.switch){
               if (item.hasOwnProperty("name") && item.hasOwnProperty("type")) {
                   if (names.includes(item.name)){
                       item.type = "0";
                   }
               }
           }
       }
       if (obj.hasOwnProperty("ad_config")){
           obj.ad_config = "";
       }
       if (obj.hasOwnProperty("ad_adsense")){
           obj.ad_adsense = {};
       }
        if (obj.hasOwnProperty("ad_origin_config_switch")) {
            obj.ad_origin_config_switch = "0";
        }
        if (obj.hasOwnProperty("home_screen_ad")) {
            obj.home_screen_ad = {};
        }
        if (obj.hasOwnProperty("ad_stlog_switch")) {
            obj.ad_stlog_switch = "0";
        }
        if (obj.hasOwnProperty("advertisement_config")) {
            obj.advertisement_config = {};
        }
        if (obj.hasOwnProperty("yy_live_config")) {
            obj.yy_live_config = {};
        }
        if (obj.hasOwnProperty("yy_live_tab")) {
            obj.yy_live_tab = {};
        }
        if (obj.hasOwnProperty("user_growth_task_list")) {
            obj.user_growth_task_list.switch = "0";
        }
    }

}



$done({ body: JSON.stringify(obj) });