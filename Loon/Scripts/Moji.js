// 2024-06-03 19:00
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

console.log("moji_ad_url: " + url);
console.log("moji_ad_body: " + $response.body);

if (url.includes("/data/detail")) {
    
}


$done({ body: JSON.stringify(obj) });
