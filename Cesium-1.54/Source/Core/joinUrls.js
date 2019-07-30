define(["../ThirdParty/Uri", "./defaultValue", "./defined", "./DeveloperError"], function (e, t, i, n) {
    "use strict";

    function r(n, r, o) {
        if (o = t(o, !0), n instanceof e || (n = new e(n)), r instanceof e || (r = new e(r)), "data" === n.scheme) return n.toString();
        if ("data" === r.scheme) return r.toString();
        i(r.authority) && !i(r.scheme) && ("undefined" != typeof document && i(document.location) && i(document.location.href) ? r.scheme = new e(document.location.href).scheme : r.scheme = n.scheme);
        var a = n;
        r.isAbsolute() && (a = r);
        var s = "";
        i(a.scheme) && (s += a.scheme + ":"), i(a.authority) && (s += "//" + a.authority, "" !== a.path && "/" !== a.path && (s = s.replace(/\/?$/, "/"), a.path = a.path.replace(/^\/?/g, ""))), s += a === n ? o ? n.path.replace(/\/?$/, "/") + r.path.replace(/^\/?/g, "") : n.path + r.path : r.path;
        var l = i(n.query), u = i(r.query);
        l && u ? s += "?" + n.query + "&" + r.query : l && !u ? s += "?" + n.query : !l && u && (s += "?" + r.query);
        var c = i(r.fragment);
        return i(n.fragment) && !c ? s += "#" + n.fragment : c && (s += "#" + r.fragment), s
    }

    return r
});