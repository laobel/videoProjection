define( ["../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4"], function (e, t, i, n) {
    "use strict";

    function r() {
    }

    return r.expandSphere = function (t, n) {
        if (!n.empty()) {
            if (t.empty()) return void e.clone(n, t);
            var r = new i;
            i.subtract(t.center, n.center, r);
            var o = i.magnitude(r);
            if (!(o + n.radius <= t.radius)) {
                if (o + t.radius <= n.radius) return void e.clone(n, t);
                var a = .5 * (t.radius + o + n.radius), s = (a - t.radius) / o,
                    l = new i(t.center.x, t.center.y, t.center.z);
                l.x += (n.center.x - t.center.x) * s, l.y += (n.center.y - t.center.y) * s, l.x += (n.center.z - t.center.z) * s, t.center = l, t.radius = a
            }
        }
    }, r.expandBoundingBox = function (e, t) {
        var n = e.minimum, r = e.maximum, o = t.minimum, a = t.maximum;
        if (i.equals(n, i.ZERO) && i.equals(r, i.ZERO)) e.minimum = o.clone(), e.maximum = a.clone(), e.center = t.clone(); else {
            var s = Math.min(n.x, o.x), l = Math.max(r.x, a.x), u = Math.min(n.y, o.y), c = Math.max(r.y, a.y),
                d = Math.min(n.z, o.z), h = Math.max(r.z, a.z);
            n.x = s, n.y = u, n.z = d, r.x = l, r.y = c, r.z = h;
            var p = i.add(n, r, e.center);
            i.multiplyByScalar(p, .5, p), e.center = p
        }
    }, r.computeTowVecDist = function (e, t) {
        var i = e.x - t.x, n = e.y - t.y, r = e.z - t.z;
        return Math.sqrt(i * i + n * n + r * r)
    }, r.computeTowVecDistSquare = function (e, t) {
        var i = e.x - t.x, n = e.y - t.y, r = e.z - t.z;
        return i * i + n * n + r * r
    }, r.computeDistFromEye = function (e, t) {
        return e.applyMatrix4(t).length()
    }, r.mulVec3Vec4 = function (e, t) {
        return e.x * t.x + e.y * t.y + e.z * t.z + t.w
    }, r.computeSpherePixelSize = function (e, t) {
        return Math.abs(e.radius / r.mulVec3Vec4(e.center, t))
    }, r.computePixelSizeVector = function (e, t, r) {
        var o = e.z, a = e.w, s = t, l = r, u = s[0] * o * .5, c = s[8] * o * .5 + s[11] * o * .5,
            d = new i(l[0] * u + l[2] * c, l[4] * u + l[6] * c, l[8] * u + l[10] * c), h = s[5] * a * .5,
            p = s[9] * a * .5 + s[11] * a * .5,
            f = new i(l[1] * h + l[2] * p, l[5] * h + l[6] * p, l[9] * h + l[10] * p), m = s[11], _ = s[15],
            g = new n(l[2] * m, l[6] * m, l[10] * m, l[14] * m + l[15] * _), v = d.x * d.x + d.y * d.y + d.z * d.z,
            y = f.x * f.x + f.y * f.y + f.z * f.z, C = .7071067811 / Math.sqrt(v + y);
        return n.multiplyByScalar(g, C, g), g
    }, r
});