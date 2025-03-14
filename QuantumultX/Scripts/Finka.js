const url = $request.url;
if (!$response.body) $done({});

let obj;
try {
    obj = JSON.parse($response.body);
} catch (e) {
    console.log(`JSON 解析失败: ${e.message}`);
    $done({});
}

// const logID = "ID_" + Math.random().toString(36).slice(2, 10).toUpperCase();

// console.log(`Finka_Request_URL(${logID}): ${url}`);
// console.log(`Finka_Response_Body(${logID}): ${$response.body}`);

const setBoolean = (target, prop, value) => {
    if (target !== null && typeof target === 'object' && target?.[prop] === !value) {
        target[prop] = value;
    }
};

const processArray = (arr, processor) => {
    if (Array.isArray(arr)) arr.forEach(processor);
};

const clearArray = (arr) => {
    if (Array.isArray(arr)) arr.length = 0;
};

const RULES = {
    "/vas/nearby/v2": (data) => {
        setBoolean(data, 'vipRequired', false);
        processArray(data.superboostList, item => setBoolean(item, 'hide', false));
        processArray(data.list, item => setBoolean(item, 'hide', false));
    },
    "/vas/visitor": (data) => {
        clearArray(data.iosPublicOptions);
        setBoolean(data, 'visitorEnable', true);
    },
    "/user/setting/filter": (data) => {
        setBoolean(data, 'filterEnable', true);
        setBoolean(data, 'useFilter', true);
    },
    "/user/profile/view/v3": (data) => {
        const user = data?.user;
        if (user) {
            ['vip', 'svip', 'ssvip', 'pro'].forEach(prop => setBoolean(user, prop, true));
        }
    },
    "/inbox/session/get/v3": (data) => {
        setBoolean(data, 'hasPrivilege', true);
        setBoolean(data, 'stealthMessage', true);
        processArray(data?.list, item => {
            setBoolean(item, 'stealthMessage', true);
            if (item?.visitorInfo) setBoolean(item.visitorInfo, 'visitorEnable', true);
        });
    },
    "/group/session": (data) => {
        processArray(data?.list, item => {
            setBoolean(item, 'stealthMessage', true);
            if (item?.visitorInfo) setBoolean(item.visitorInfo, 'visitorEnable', true);
        });
    }
};

Object.entries(RULES).forEach(([key, handler]) => {
    if (url.includes(key)) {
        const data = obj?.data;
        if (data) handler(data);
    }
});

const finalResponse = JSON.stringify(obj);
// console.log(`Finka_Response_Revised_Body(${logID}): ${finalResponse}`);
$done({body: finalResponse});
