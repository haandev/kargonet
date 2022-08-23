export const clone = function (obj:any) {
    let newObj:any = {};
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            newObj[prop] = obj[prop];
        }
    }
    return newObj;
};

export const decodePath = function (encoded:string, is3D:boolean) {
    let len = encoded.length;
    let index = 0;
    let array = [];
    let lat = 0;
    let lng = 0;
    let ele = 0;

    while (index < len) {
        let b;
        let shift = 0;
        let result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += deltaLat;

        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let deltaLon = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += deltaLon;

        if (is3D) {
            // elevation
            shift = 0;
            result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let deltaEle = ((result & 1) ? ~(result >> 1) : (result >> 1));
            ele += deltaEle;
            array.push([lng * 1e-5, lat * 1e-5, ele / 100]);
        } else
            array.push([lng * 1e-5, lat * 1e-5]);
    }
    // let end = new Date().getTime();
    // console.log("decoded " + len + " coordinates in " + ((end - start) / 1000) + "s");
    return array;
};

export const extractError = function (res:any, url:string) {
    let msg;

    if (res && res.data) {
        msg = res.data;
        if (msg.hints && msg.hints[0] && msg.hints[0].message)
            msg = msg.hints[0].message;
        else if (msg.message)
            msg = msg.message;
    } else {
        msg = res;
    }

    return new Error(msg + " - for url " + url);
};

export const isArray = function (value:any) {
    let stringValue = Object.prototype.toString.call(value);
    return (stringValue.toLowerCase() === "[object array]");
};

export const isObject = function (value:any) {
    let stringValue = Object.prototype.toString.call(value);
    return (stringValue.toLowerCase() === "[object object]");
};

export const isString = function (value:any) {
    return (typeof value === 'string');
};
