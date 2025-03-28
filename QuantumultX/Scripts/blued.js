const url = $request.url;
if (!$response.body) $done({});

let obj;
try {
    obj = JSON.parse($response.body);
} catch (e) {
    console.log(`JSON解析失败: ${e.message}`);
    $done({});
}

const RULES = [
    {
        pattern: /^https:\/\/social\.blued\.cn\/users\/\d+\/visitors\?/,
        handler: obj => {
            if (Array.isArray(obj?.data)) {
                obj.data = obj.data.reduce((result, item) => {
                    if (item?.is_ads === 1) return result;

                    if (item?.is_vip === 0 && Array.isArray(item?.profile_picture)) {
                        result.push(...item.profile_picture);
                    } else {
                        result.push(item);
                    }
                    return result;
                }, []);
            }

            if (obj?.extra) {
                if (obj.extra.hasmore === 0) obj.extra.hasmore = 1;
                if (obj.extra.is_show === 0) obj.extra.is_show = 1;
            }

            return obj;
        }
    },
    {
        pattern: /^https:\/\/social\.blued\.cn\/users\/\d+\/flash/,
        handler: obj => {
            if (Array.isArray(obj?.data)) {
                obj.data = obj.data.reduce((result, item) => {
                    if (typeof item?.flash_left_times === 'number') {
                        item.flash_left_times = 10;
                    }
                    if (typeof item?.free_times === 'number') {
                        item.free_times = 10;
                    }
                    if (item?.is_vip === 0) item.is_vip = 1

                    result.push(item);
                    return result;
                }, []);
            }

            return obj;
        }
    }
];

RULES.some(({pattern, handler}) => {
    if (pattern.test(url)) {
        handler(obj);
        return true;
    }
    return false;
});

$done({ body: JSON.stringify(obj) });
