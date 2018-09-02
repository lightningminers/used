"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = __importStar(require("./querystring"));
function format(url, query) {
    var search = querystring.stringify(query);
    return url + "?" + search;
}
exports.format = format;
function parse(url, parseQueryString) {
    var wlocation = {
        hash: "",
        search: "",
    };
    if (!url) {
        return '';
    }
    var searchIndex = url.indexOf('?');
    if (searchIndex === -1) {
        return '';
    }
    var hashIndex = url.indexOf('#');
    if (hashIndex > -1) {
        wlocation.hash = url.slice(hashIndex);
        wlocation.search = url.slice(searchIndex, hashIndex);
    }
    else {
        wlocation.search = url.slice(searchIndex);
    }
    var searchString = wlocation.search.slice(1);
    var query = querystring.parse(searchString);
    if (typeof parseQueryString === 'string' && parseQueryString.length > 0) {
        return query[parseQueryString];
    }
    else {
        return query;
    }
}
exports.parse = parse;
