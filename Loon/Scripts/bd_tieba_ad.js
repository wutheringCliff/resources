// 2024-06-03 19:00
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

console.log("bd_tieba_ad_url: " + url);
console.log("bd_tieba_ad_body: " + $response.body);





$done({ body: JSON.stringify(obj) });