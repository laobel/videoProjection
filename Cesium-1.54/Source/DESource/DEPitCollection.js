define([
    "../Core/defaultValue",
    "../Core/defineProperties"
], function (e, t) {
    "use strict";

    function i(e) {
        this._pit = [];
        this._scene = e;
    }

    t(i.prototype, {
        length: {
            get: function () {
                return this._pit.length
            }
        }
    });
    i.prototype.add = function (e) {
        this._pit.push(e);
        this._scene.primitives.add(e);
    };
    i.prototype.remove = function (e) {
        var t = this._pit.indexOf(e);
        -1 !== t && this._pit.splice(t, 1);
        this._scene.primitives.remove(e);
    };
    return i;
});