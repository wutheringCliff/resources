// 2024-06-13 19:00
const url = $request.url;
if (!$response.body) $done({});
//let obj = JSON.parse($response.body);

console.log("union_pay_url: " + url);
console.log("union_pay_body: " + $response.body);



$done({ body: JSON.stringify(obj) });