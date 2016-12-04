
var utils = {

    regs: {
        FULL_URL: /^(?:http|https|ftp):\/\/(?:[\w\.-]+)+\.[a-z]{2,6}(?:\:\d{1,5})?(?:\/[^\:\s\?\#]*)?(?:\?[\S]*)?(?:#[\S]*)?$/i,
        URL: /(?:http|https|ftp):\/\/(?:[\w\.-]+)+\.[a-z]{2,6}(?:\:\d{1,5})?(?:\/[^\:\s\?\#]*)?(?:\?[\S]*)?(?:#[\S]*)?/ig,
        TAG_A: /^<a .*?href=[\'\"]([^\'\"]*?)[\'\"].*?>.*?<\/a>$/
    }
};

utils.replaceURLToLink = function (text) {

    var reg = utils.regs.URL;

    return text.replace(reg, function (url) {
        try {
            url = encodeURI(decodeURI(url));
        }
        catch (e) {
            url = url;
        }

        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    });
};

export default utils;
