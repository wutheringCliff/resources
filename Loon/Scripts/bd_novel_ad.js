// 2024-06-03 19:00
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

console.log($response.body);
console.log("bd_novel_ad:" + url);

if (url.includes("/searchbox")) {
    const uri = new URL($request.url);
    // 使用URLSearchParams解析查询字符串
    const params = new URLSearchParams(uri.search);
    const $type = params.get("type");
    console.log("请求类型:"  + params.get("type"));
    //拦截推荐
    if ( $type === "recommend") {
        if (obj?.data?.novel?.recommend) {
            obj.data.novel.recommend = {};
            console.log("推荐广告:"  + JSON.stringify(obj));
        }
    } else if($type === "adword") {
        obj.data = {};
    } else if ($type === "piratedcontentextra") {
        if (obj?.data?.novel?.piratedcontentextra?.dataset) {
            obj.data.novel.piratedcontentextra.dataset.popup = {};
            obj.data.novel.piratedcontentextra.dataset.adbanner = {};
            obj.data.novel.piratedcontentextra.dataset.adAtmosphere = {};
            obj.data.novel.piratedcontentextra.dataset.rewardAdInfo = {};

            if (obj?.data?.novel?.piratedcontentextra?.dataset?.pass_back) {
                obj.data.novel.piratedcontentextra.dataset.pass_back.hijack_in_whitelist = 0;
            }
        }
    } else if ($type === "piratedad") {

    } else if($type === "piratedbaradbanner") {
        if (obj?.data?.novel?.piratedbaradbanner?.dataset) {
            obj.data.novel.piratedbaradbanner.dataset = {};
        }
    }
}


$done({ body: JSON.stringify(obj) });