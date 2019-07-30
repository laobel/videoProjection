define(["./Check", "./defined", "./deprecationWarning", "./Resource"], function (e, t, i, n) {
    "use strict";

    function r(e, t, r) {
        return i("loadArrayBuffer", "loadArrayBuffer is deprecated and will be removed in Cesium 1.44. Please use Resource.fetchArrayBuffer instead."), n.createIfNeeded(e, {
            headers: t,
            request: r
        }).fetchArrayBuffer()
    }

    return r
});