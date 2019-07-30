define(["../Core/BoundingRectangle", "../Core/Color", "../Core/Cartographic", "../Core/Cartesian3", "../Core/defined", "../Core/destroyObject", "../Core/Matrix4", "../Core/OrthographicOffCenterFrustum", "../Core/PixelFormat", "../Renderer/ClearCommand", "../Renderer/Framebuffer", "../Renderer/PixelDatatype", "../Renderer/PassState", "../Renderer/RenderState", "../Renderer/Texture"], function (e, t, i, n, r, o, a, s, l, u, c, d, h, p, f) {
    "use strict";

    function m() {
        this._colorTexture = void 0, this._depthStencilTexture = void 0, this.framebuffer = void 0, this._viewport = new e, this._rs = void 0, this._useScissorTest = !1, this._scissorRectangle = void 0, this._flattenPolygonDrawCommonds = [], this._camera = new b, this._passState = void 0, this.canvas = void 0, this._clearCommand = new u({
            depth: 1,
            color: new t(0, 0, 0, 1)
        }), this._clearPassState = void 0, this._width = 4096, this._height = 4096
    }

    function _(e) {
        e._colorTexture = e._colorTexture && !e._colorTexture.isDestroyed() && e._colorTexture.destroy(), e._depthStencilTexture = e._depthStencilTexture && !e._depthStencilTexture.isDestroyed() && e._depthStencilTexture.destroy()
    }

    function g(e) {
        m.framebuffer = m.framebuffer && !m.framebuffer.isDestroyed() && m.framebuffer.destroy()
    }

    function v(e, t, i, n) {
        e._clearPassState = new h(t), e._colorTexture = new f({
            context: t,
            width: i,
            height: n,
            pixelFormat: l.RGBA,
            pixelDatatype: d.UNSIGNED_BYTE
        }), e._depthStencilTexture = new f({
            context: t,
            width: i,
            height: n,
            pixelFormat: l.DEPTH_STENCIL,
            pixelDatatype: d.UNSIGNED_INT_24_8
        })
    }

    function y(e, t) {
        e.framebuffer = new c({
            context: t,
            colorTextures: [e._colorTexture],
            depthStencilTexture: e._depthStencilTexture,
            destroyAttachments: !1
        })
    }

    function C(e, t, i, n) {
        i = parseInt(i), n = parseInt(n);
        var o = e._colorTexture, a = !r(o) || o.width !== i || o.height !== n;
        r(e.framebuffer) && !a || (_(e), g(e), v(e, t, i, n), y(e, t))
    }

    function b() {
        this.viewMatrix = a.IDENTITY, this.inverseViewMatrix = a.IDENTITY, this.frustum = new s, this.positionCartographic = new i, this.positionWC = new n, this.directionWC = n.clone(n.UNIT_Z), this.upWC = n.clone(n.UNIT_Y), this.rightWC = n.clone(n.UNIT_X), this.viewProjectionMatrix = a.IDENTITY
    }

    return b.prototype.clone = function (e) {
        a.clone(e.viewMatrix, this.viewMatrix), a.clone(e.inverseViewMatrix, this.inverseViewMatrix), this.frustum = e.frustum.clone(this.frustum), i.clone(e.positionCartographic, this.positionCartographic), n.clone(e.positionWC, this.positionWC), n.clone(e.directionWC, this.directionWC), n.clone(e.upWC, this.upWC), n.clone(e.rightWC, this.rightWC)
    }, m.prototype.updateFrustum = function (e, t, i, n) {
        this._camera.frustum.left = parseInt(e), this._camera.frustum.top = parseInt(t), this._camera.frustum.right = parseInt(i), this._camera.frustum.bottom = parseInt(n)
    }, m.prototype.update = function (t) {
        var i = this._width, n = this._height, o = t.context;
        C(this, o, i, n), r(this._passState) || (this._passState = new h(o), this._passState.framebuffer = this.framebuffer, this._passState.viewport = new e(0, 0, i, n));
        var a = o.uniformState;
        a.updateCamera(this._camera), this._clearCommand.framebuffer = this.framebuffer, this._clearCommand.execute(o, this._clearPassState);
        for (var s = 0; s < this._flattenPolygonDrawCommonds.length; s++) {
            var l = this._flattenPolygonDrawCommonds[s];
            a.updatePass(l.pass), l.framebuffer = this.framebuffer, l.execute(o, this._passState)
        }
    }, m.prototype.clear = function (e, i, n) {
        var o = this._clearColorCommand;
        r(o) && (t.clone(n, o.color), o.execute(e, i))
    }, m.prototype.isDestroyed = function () {
        return !1
    }, m.prototype.destroy = function () {
        return _(this), g(this), o(this)
    }, m
});