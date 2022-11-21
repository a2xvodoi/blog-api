import constants from "../config/constants.mjs";

function response(code, msg = "", data = {}) {
    return {
        code,
        msg,
        data,
    };
}

export function responseSuccess(msg = "", data) {
    return response(constants.OK, msg, data);
}

export function responseFailure(msg = "", data) {
    return response(constants.ERROR, msg, data);
}

export function dataResponse(data, keys = []) {
    return data
        ? keys.reduce((prev, curr) => ((prev[curr] = data[curr]), prev), {})
        : {};
}

export function dataMapResponse(data, key) {
    return data && data.length
        ? data.map((item) => dataResponse(item, key))
        : [];
}
