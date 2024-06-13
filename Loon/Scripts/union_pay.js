// 2024-06-13 19:00
console.log("union_pay_url: " + $request.url);
console.log("union_pay_body: " + $response.body);

const url = $request.url;
if (!$response.body) $done({});
//let obj = JSON.parse($response.body);




// $done({ body: JSON.stringify(obj) });

$done({ body: $response.body});