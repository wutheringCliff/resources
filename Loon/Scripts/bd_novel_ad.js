// 2024-06-03 19:00

const url = $request.url;
const isQuanX = typeof $task !== "undefined";
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

console.log($response.body);
console.log("bd_novel_ad" + url);

if (url.includes("/searchbox")) {
    // 使用URLSearchParams解析查询字符串
    const params = new URLSearchParams(url.search);
    console.log("请求类型:"  + params.get("type"));
    //拦截推荐
    if (params.get("type") === "recommend") {
        console.log(JSON.stringify(obj?.data?.novel?.recommend))
        if (obj?.data?.length > 0 && obj?.data?.novel?.recommend) {
            obj.data.novel.recommend = {};
        }
    }
}


$done({ body: JSON.stringify(obj) });