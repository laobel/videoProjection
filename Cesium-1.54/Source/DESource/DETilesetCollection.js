define( [
    "../Core/BoundingSphere",
    "../Core/createGuid",
    "../Core/defaultValue",
    "../Core/defined",
    "../Core/defineProperties",
    "../Core/destroyObject",
    "../Core/DeveloperError",
    "../Core/JulianDate",
    "../Scene/Cesium3DTileset",
    "./DEELoadStatus",
    "./DE3DTileset"
], function (e, t, i, n, r, o, a, s, l, u, c) {
    "use strict";

    function d(e) {
        e = i(e, i.EMPTY_OBJECT), this._tilesetLayers = [], this._hash = {}, this._guid = t(), this.show = i(e.show, !0), this.destroyPrimitives = i(e.destroyPrimitives, !0)
    }

    function h(e, t) {
        return e._tilesetLayers.indexOf(t)
    }

    function p(e, t) {
        return 0 === t._distanceToCamera && 0 === e._distanceToCamera ? 0 : e._distanceToCamera - t._distanceToCamera
    }

    r(d.prototype, {
        length: {
            get: function () {
                return this._tilesetLayers.length
            }
        }
    });
    d.prototype.add = function (e) {
        var i = e._external = e._external || {};
        (i._composites = i._composites || {})[this._guid] = {collection: this}, this._tilesetLayers.push(e), n(e.id) || (e.id = t());
        var r = e.id;
        return this._hash[r] = e, e
    };
    d.prototype.remove = function (e) {
        if (this.contains(e)) {
            var t = this._tilesetLayers.indexOf(e);
            if (-1 !== t) {
                this._tilesetLayers.splice(t, 1), delete e._external._composites[this._guid];
                var i = e.id;
                return delete this._hash[i], this.destroyPrimitives && e.destroy(), !0
            }
        }
        return !1
    };
    d.prototype.containsByid = function (e) {
        return n(this._hash[e])
    };
    d.prototype.getById = function (e) {
        return this._hash[e]
    };
    d.prototype.removeAndDestroy = function (e) {
        var t = this.remove(e);
        return t && !this.destroyPrimitives && e.destroy(), t
    };
    d.prototype.removeAll = function () {
        if (this.destroyPrimitives) for (var e = this._tilesetLayers, t = e.length, i = 0; i < t; ++i) e[i].destroy();
        this._tilesetLayers = [], this._hash = {}
    };
    d.prototype.contains = function (e) {
        return !!(n(e) && e._external && e._external._composites && e._external._composites[this._guid])
    };
    d.prototype.raise = function (e) {
        if (n(e)) {
            var t = h(this, e), i = this._tilesetLayers;
            if (t !== i.length - 1) {
                var r = i[t];
                i[t] = i[t + 1], i[t + 1] = r
            }
        }
    };
    d.prototype.raiseToTop = function (e) {
        if (n(e)) {
            var t = h(this, e), i = this._tilesetLayers;
            t !== i.length - 1 && (i.splice(t, 1), i.push(e))
        }
    };
    d.prototype.lower = function (e) {
        if (n(e)) {
            var t = h(this, e), i = this._tilesetLayers;
            if (0 !== t) {
                var r = i[t];
                i[t] = i[t - 1], i[t - 1] = r
            }
        }
    };
    d.prototype.lowerToBottom = function (e) {
        if (n(e)) {
            var t = h(this, e), i = this._tilesetLayers;
            0 !== t && (i.splice(t, 1),
                i.unshift(e))
        }
    };
    d.prototype.get = function (e) {
        return this._tilesetLayers[e]
    };
    var f = new e;
     d.prototype.update = function (t) {
        if (this.show) {
            t.totalMemoryUsageInBytes = 0;
            for (var i = [], n = this._tilesetLayers, r = 0; r < n.length; ++r) {
                var o = n[r];
                o instanceof c ? i.push(n[r]) : o instanceof l && o.update(t)
            }
            for (var a = i.length, r = 0; r < a; r++) {
                var s = i[r];
                s.show && s.ready ? (s.updateMatrix(t), e.transform(s._boundingSphere, s._modelMatrix, f), i[r]._distanceToCamera = s.distanceToCamera(f, t)) : i[r]._distanceToCamera = 6378137
            }
            i.sort(p), t._selectedTiles = [];
            for (var r = 0; r < a && r < 10; r++) i[r].update(t);
            t._selectedTiles.sort(p);
            for (var r = 0, d = t._selectedTiles.length; r < d; r++) t._selectedTiles[r].getLoadStatus() == u.UNLOAD && t._selectedTiles[r].netLoad(t);
            for (var r = 0, d = t._selectedTiles.length; r < d && r < 200; r++) t._selectedTiles[r].update(t);
            if (!t.passes.pick) {
                t.unloadTimestamp = 0;
                for (var r = 0, d = i.length; r < d && (!(t.totalMemoryUsageInBytes > t.maximumMemoryUsage) || i[d - r - 1].release(t)); r++) ;
            }
        }
    };
     d.prototype.isDestroyed = function () {
        return !1
    };
     d.prototype.destroy = function () {
        return this.removeAll(), o(this)
    };

    return d;
});