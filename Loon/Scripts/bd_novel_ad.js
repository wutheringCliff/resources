// 2024-06-03 19:00

console.log("bd_novel_ad");
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

console.log($response.body);
console.log("bd_novel_ad" + url);

if (url.includes("/searchbox")) {
    // 使用URLSearchParams解析查询字符串
    const params = new URLSearchParams(url.search);
    const $type = params.get("type");
    console.log("请求类型:"  + params.get("type"));
    //拦截推荐
    if ( $type === "recommend") {
        console.log(JSON.stringify(obj?.data?.novel?.recommend))
        if (obj?.data?.length > 0 && obj?.data?.novel?.recommend) {
            obj.data.novel.recommend = {};
        }
    } else if($type === "adword") {
        obj.data = {};
    }
}


$done({ body: JSON.stringify(obj) });