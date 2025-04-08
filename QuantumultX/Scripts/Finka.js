const url = $request.url;
if (!$response.body) $done({});

let obj;
try {
    obj = JSON.parse($response.body);
} catch (e) {
    console.log(`JSON 解析失败: ${e.message}`);
    $done({body: $response.body});
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

const RULES = [
    {
        match: (url) => new URL(url).pathname === '/vas/nearby/v2',
        handler: (data) => {
            // setBoolean(data, 'vipRequired', false);
            processArray(data.superboostList, i => setBoolean(i, 'hide', false));
            processArray(data.list, i => setBoolean(i, 'hide', false));
        }
    },
    {
        match: (url) => new URL(url).pathname === '/vas/visitor',
        handler: (data) => {
            clearArray(data.iosPublicOptions);
            setBoolean(data, 'visitorEnable', true);
        }
    },
    // {
    //     match: (url) => new URL(url).pathname === '/user/setting/filter',
    //     handler: (data) => {
    //         setBoolean(data, 'filterEnable', true);
    //         setBoolean(data, 'useFilter', true);
    //     }
    // },
    {
        match: (url) => /\/user\/profile\/view\/v3.*JbFgGDV3W00/.test(url),
        handler: (data) => {
            ['vip', 'svip', 'ssvip', 'pro'].forEach(p => setBoolean(data?.user, p, true));
        }
    },

    {
        match: (url) => new URL(url).pathname === '/inbox/session/get/v3',
        handler: (data) => {
            // setBoolean(data, 'hasPrivilege', true);
            // setBoolean(data, 'stealthMessage', true);
            processArray(data?.list, item => {
                // setBoolean(item, 'stealthMessage', true);
                if (item?.visitorInfo) setBoolean(item.visitorInfo, 'visitorEnable', true);
            });
        }
    },
    {
        match: (url) => new URL(url).pathname === '/group/session',
        handler: (data) => {
            processArray(data?.list, item => {
                // setBoolean(item, 'stealthMessage', true);
                if (item?.visitorInfo) setBoolean(item.visitorInfo, 'visitorEnable', true);
            });
        }
    }
];

RULES.some(({ match, handler }) => {
    try {
        if (match(url)) {
            handler(obj.data || {});
            return true;
        }
        return false;
    } catch (e) {
        console.log(`规则处理失败: ${e}`);
        return false;
    }
});

const finalResponse = JSON.stringify(obj);
// console.log(`Finka_Response_Revised_Body(${logID}): ${finalResponse}`);
$done({body: finalResponse});
