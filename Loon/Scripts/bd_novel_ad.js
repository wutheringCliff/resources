// 2024-06-03 19:00
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

console.log("bd_novel_ad_body" + $response.body);
console.log("bd_novel_ad_url:" + url);

if (url.includes("/searchbox")) {
    //广告接口集合
    const ads = ["rewardad","piratedbaradbanner","piratedad","commonad","shelfad","floatad","ad","adword","piratedad","eva","goadttscontrolforcead","radioreservoirbubble"];
    const uri = new URL($request.url);
    // 使用URLSearchParams解析查询字符串
    const params = new URLSearchParams(uri.search);
    const $type = params.get("type");
    console.log("bd_novel_ad_type:"  + $type);

    if (ads.includes($type)) {
        //通用广告拦截
        obj.data = {};
    } else if ( $type === "recommend") {
        //拦截推荐
        if (obj?.data?.novel?.recommend) {
            obj.data.novel.recommend = {};
        }
    }  else if ($type === "piratedcontentextra") {
        if (obj?.data?.novel?.piratedcontentextra?.dataset) {
            obj.data.novel.piratedcontentextra.dataset.popup = {};
            obj.data.novel.piratedcontentextra.dataset.adbanner = {};
            obj.data.novel.piratedcontentextra.dataset.adAtmosphere = {};
            obj.data.novel.piratedcontentextra.dataset.rewardAdInfo = {};

            if (obj?.data?.novel?.piratedcontentextra?.dataset?.pass_back.hasOwnProperty("hijack_in_whitelist")) {
                obj.data.novel.piratedcontentextra.dataset.pass_back.hijack_in_whitelist = 0;
            }
        }
    } else if ($type === "bookfree") {
        //阅读器广告拦截
        if (obj?.data?.novel?.bookfree) {
            obj.data.novel.bookfree.is_free_for_now = true;
            obj.data.novel.bookfree.end_time = (Date.parse(new Date()) / 1000) + 1000000;
            obj.data.novel.bookfree.residentToast = {};
            obj.data.novel.bookfree.tts_info = {};
            obj.data.novel.bookfree.cloud_tts_on = 0;
            obj.data.novel.bookfree.speakers = {};
            obj.data.novel.bookfree.education_info = {};
            if ( obj.data.novel.bookfree?.interstitialAdsV2?.hasOwnProperty("switch")) {
                obj.data.novel.bookfree.interstitialAdsV2.switch = "off";
            }
            obj.data.novel.bookfree.noadauth = {};
            obj.data.novel.bookfree.listenControlForceAdInfo = {};
            obj.data.novel.bookfree.ladder_reward_info = {};
            obj.data.novel.bookfree.adVideoInfo = {};
            obj.data.novel.bookfree.barAdVideoInfo ={};
            obj.data.novel.bookfree.tts_ad_info  = {};
            obj.data.novel.bookfree.rewardAdInfo = {};
            obj.data.novel.bookfree.ladder_reward_switch = false;
            obj.data.novel.bookfree.ttscontrol_ad_switch = 0;
            obj.data.novel.bookfree.adAtmosphere = {};

            obj.data.novel.bookfree.retry_times_ad = 0;
            obj.data.novel.bookfree.hasBarAdBanner = 0;
            obj.data.novel.bookfree.hasChapterEndAd = 0
            obj.data.novel.bookfree.retry_times_chapter_end = 0;
            obj.data.novel.bookfree.page_turn_speed_save_switch = 0;
            obj.data.novel.bookfree.page_turn_speed_report_switch = 0;
            obj.data.novel.bookfree.readtime_total_save_switch = 0;
            obj.data.novel.bookfree.readtime_total_report_switch = 0;

            if ( obj?.data?.novel?.membershipplus) {
                obj.data.novel.membershipplus.isVip = 1;
                obj.data.novel.membershipplus.vipEndTime = (Date.parse(new Date()) / 1000) + 25920000;
                obj.data.novel.membershipplus.vipStartTime = (Date.parse(new Date()) / 1000)  - 10;

            }
        }
    } else if ($type === "baradbanner") {
        if (obj?.data?.novel?.baradbanner) {
            obj.data.novel.baradbanner.dataset = {};
        }
    } else if ($type === "content") {
        if  (obj?.data?.novel?.content?.dataset) {
            obj.data.novel.content.dataset.reward_info = {};

            if (obj.data.novel.content.dataset.hasOwnProperty("ad_freq")){
                obj.data.novel.content.dataset .ad_freq = "0";
            }
            if (obj.data.novel.content.dataset.hasOwnProperty("ad_freq_leftright")) {
                obj.data.novel.content.dataset.ad_freq_leftright = "0";
            }

            if (obj.data.novel.content.dataset.hasOwnProperty("status_code")) {
                //正常阅读
                obj.data.novel.content.dataset.status_code = 100;
            }
        }
    } else if ($type === "topnotice") {
        if  (obj?.data?.novel?.topnotice) {
            obj.data.novel.topnotice = {};
        }
    }

}


$done({ body: JSON.stringify(obj) });