define([
    "../Core/defaultValue",
    "../Core/defineProperties"
], function (e, t) {
    "use strict";

    function i(e) {
        this._water = [];
        this._scene = e;
    }

     t(i.prototype, {
        length: {
            get: function () {
                return this._water.length;
            }
        }
    });
    i.prototype.add = function (e) {
        this._water.push(e);
        this._scene.primitives.add(e);
    };
    i.prototype.remove = function (e) {
        var t = this._water.indexOf(e);
        -1 !== t && this._water.splice(t, 1);
        this._scene.primitives.remove(e);
    };

    return i;
});