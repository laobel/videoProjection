define( ["../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Color", "../Core/clone", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/getMagic", "../Core/getTimestamp", "../Core/Intersect", "../Core/JulianDate", "../Core/loadArrayBuffer", "../Core/loadCRN", "../Core/Matrix3", "../Core/Matrix4", "../Core/Rectangle", "../Core/Request", "../Core/RequestState", "../Core/RequestType", "../Core/Resource", "../Core/PixelFormat", "../Core/PrimitiveType", "../Core/IndexDatatype", "../Core/ComponentDatatype", "../Renderer/Buffer", "../Renderer/BufferUsage", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/RenderState", "../Renderer/VertexArray", "../Renderer/ShaderProgram", "../Renderer/Texture", "../Scene/BlendingState", "../Scene/Material", "../Scene/ShadowMode", "../Scene/StencilConstants", "../Scene/CullFace", "../Shaders/DETileFS", "../Shaders/DETileVS", "../ThirdParty/when", "./DEELoadStatus", "./DEERangeMode", "./DENodeMaterial", "./DEMath", "../Core/TaskProcessor"], function (e, t, i, n, r, o, a, s, l, u, c, d, h, p, f, m, _, g, v, y, C, b, T, S, w, x, E, A, P, D, I, M, R, O, L, N, F, B, z, k, V, U, G, H, W, q, j, Y) {
    "use strict";

    function X(t, i, n, r) {
        this.type = "DE3DTILE", this.children = [], this.childRanges = [], this.tileset = null, this.parent = null, this.root = null, this.contentUrl = "", this.rendered = !1, this.bInFrustumTestOk = !1, this._boundingSphere = new e, this.loadStatus = H.UNLOAD, this.rangeMode = 0, this.frameSinceLast = 0, this.meshLoaded = !1, this.arryMaterials = [], this.arryMaterialUsed = [], this.dataBuffer = null, this.statistics = 0, this.frameState = void 0, this._tileCommands = [], this._distanceToCamera = 0
    }

    function Q(e, t) {
        return function () {
            return i.distanceSquared(e._boundingSphere.center, t.camera.positionWC)
        }
    }

    function K(e, t) {
        return 0 === t._distanceToCamera && 0 === e._distanceToCamera ? 0 : e._distanceToCamera - t._distanceToCamera
    }

    function Z(e) {
        var t = D.shallowClone(e);
        return t.renderState = J(e.renderState), t
    }

    function J(e) {
        var t = o(e, !0);
        return t.stencilTest = z.setCesium3DTileBit(), t.stencilMask = z.CESIUM_3D_TILE_MASK, M.fromCache(t)
    }

    function $(e) {
        var t = D.shallowClone(e), i = t.pass === I.TRANSLUCENT;
        return t.uniformMap = s(t.uniformMap) ? t.uniformMap : {}, t.uniformMap.tile_translucentCommand = function () {
            return i
        }, t
    }

    var ee = {
        MODELVIEW: function (e) {
            return function () {
                return e.modelView
            }
        }
    };
    l(X.prototype, {
        boundingSphere: {
            get: function () {
                return this._boundingSphere
            }
        }, tileCommands: {
            get: function () {
                return this._tileCommands
            }
        }
    });
    var te = new Y("createDE3DTiles");
    X.prototype.setInFrustumTestOk = function (e) {
        this.bInFrustumTestOk = e
    }, X.prototype.isInFrustumTestOk = function () {
        return this.bInFrustumTestOk
    }, X.prototype.setLoadStatus = function (e) {
        this.loadStatus = e
    }, X.prototype.getLoadStatus = function () {
        return this.loadStatus
    }, X.prototype.addTile = function (e) {
        this.children.push(e), e.tileset = this.tileset, e.root = this.root, e.parent = this, e.frameState = this.frameState
    }, X.prototype.loadTexture = function (e, t, i) {
        e.status = H.LOADING;
        var n = this;
        if (s(e.imgBlob)) if (".crn" === e.ext) m(e.imgBlob).then(function (t) {
            var i = t.width, r = t.height, o = t.internalFormat, a = t.bufferView, s = {};
            s.arrayBufferView = a, e.texture = new L({
                context: n.frameState.context,
                width: i,
                height: r,
                source: s,
                pixelFormat: o,
                flipY: !1
            }), n.tileset._texturesByteLength += e.texture.sizeInBytes, e.imgBlob = null, e.status = H.LOADED
        }).otherwise(function (e) {
        }); else {
            var r = {};
            r.arrayBufferView = E.createArrayBufferView(E.BYTE, e.imgBlob, 0, e.imgBlob.length), e.texture = new L({
                context: this.frameState.context,
                width: e.width,
                height: e.height,
                source: r,
                pixelFormat: e.pixelFormat
            }), this.tileset._texturesByteLength += e.texture.sizeInBytes, e.imgBlob = null, e.status = H.LOADED
        } else {
            t.curTexRequestNum++;
            var o = new Image;
            o.src = e.imgUrl;
            o.onerror = function (i, n) {
                e.bImgBlobUrl && window.URL.revokeObjectURL(e.imgUrl), e.status = H.LOADED, t.curTexRequestNum--
            };
            var a = this;
            o.onload = function (i, n) {
                window.URL.revokeObjectURL(o.src), e.texture = new L({
                    context: a.frameState.context,
                    width: o.width,
                    height: o.height,
                    source: o
                }), a.tileset._texturesByteLength += e.texture.sizeInBytes, e.bImgBlobUrl && window.URL.revokeObjectURL(e.imgUrl), e.imgUrl = "", e.status = H.LOADED, t.curTexRequestNum--, o = void 0
            }
        }
    }, X.prototype.netLoad = function (e) {
        var t = new y({throttle: !0, throttleByServer: !0, type: b.OTHER, priorityFunction: Q(this, e)}),
            i = this.contentUrl;
        i = i.replace(/\+/g, "%2B");
        var n = this.tileset._resource.getDerivedResource({url: i, request: t});
        if (s(this.tileset._dstoken) && n.setQueryParameters({dstoken: this.tileset._dstoken}), this.tileset._subdomains.length > 0) {
            var r = {s: this.tileset._subdomains[parseInt(Math.random() * this.tileset._subdomains.length)]};
            n.setTemplateValues(r)
        }
        var o = n.fetchArrayBuffer();
        if (s(o)) {
            this.setLoadStatus(H.NET_LOADING);
            var a = this;
            G(o, function (e) {
                a.dataBuffer = e, a.setLoadStatus(H.NET_LOADED)
            }, function () {
                if (t.state === C.CANCELLED) return a.dataBuffer = void 0, void a.setLoadStatus(H.UNLOAD);
                a.setLoadStatus(H.FAILED)
            })
        } else this.setLoadStatus(H.UNLOAD)
    }, X.prototype.load = function (e) {
        if (e.curNodeParseThreadNum > e.maxNodeParseThreadNum) {
            return void (d() - e._lastNodeParseTime > 5e3 && (e.curNodeParseThreadNum = 0))
        }
        if (e._lastNodeParseTime = d(), null == this.dataBuffer) return void this.setLoadStatus(H.LOADED);
        var t = this.contentUrl.substring(this.contentUrl.lastIndexOf("."), this.contentUrl.length).toLowerCase(),
            i = !1;
        ".a3mz" == t && (i = !0);
        var n = te.scheduleTask({dataBuffer: this.dataBuffer, isLobz: i});
        if (s(n)) {
            this.setLoadStatus(H.LOADING);
            var o = this;
            o.frameState = e, e.curNodeParseThreadNum++;
            return G(n, function (e) {
                var t = e.data;
                if (null != t && void 0 != t) {
                    var i, n = o.contentUrl;
                    i = n.substr(0, n.lastIndexOf("/") + 1);
                    for (var a = t.arryMaterials.length, l = 0; l < a; l++) {
                        var u = t.arryMaterials[l], c = new q;
                        "" != u.imgUrl ? u.bUrl ? c.imgUrl = i + u.imgUrl : c.imgUrl = u.imgUrl : null != u.imgBlob && ("compressed" == u.eftype ? (c.imgBlob = u.imgBlob, c.width = u.width, c.height = u.height, c.pixelFormat = u.pixelFormat, c.ext = u.ext, c.imgUrl = "compressed") : (c.imgUrl = window.URL.createObjectURL(u.imgBlob), u.imgBlob = null, c.bImgBlobUrl = !0)), c.color = new r(u.diffuseR, u.diffuseG, u.diffuseB), "" == c.imgUrl && (c.status = H.LOADED), o.arryMaterials.push(c)
                    }
                    if (t.arryMaterials = null, o.parse(t, o.arryMaterials, i), !s(o.parent) && o._boundingSphere.radius <= 0) for (var a = o.children.length, l = 0; l < a; l++) {
                        var d = o.children[l];
                        j.expandSphere(o._boundingSphere, d._boundingSphere)
                    }
                }
                t = null, e.data = null, o.dataBuffer = null, o.setLoadStatus(H.LOADED), o.frameState.curNodeParseThreadNum--
            })
        }
    }, X.prototype.parse = function (n, r, o) {
        if (null != n && void 0 !== n) {
            var a = 0, s = n.children.length;
            for (a = 0; a < s; a++) {
                var l = new X;
                this.addTile(l), l.parse(n.children[a], r, o)
            }
            if (n.children = null, this.rangeMode = n.enRangeMode, n.childRanges.length > 0) {
                for (s = n.childRanges.length / 2, a = 0; a < s; a++) {
                    var u = new t;
                    u.x = n.childRanges[2 * a], u.y = n.childRanges[2 * a + 1], this.childRanges.push(u)
                }
                n.childRanges = null
            }
            if ("" == this.contentUrl && "" != n.strDataPath && (this.contentUrl = o + n.strDataPath), n.bdSphere.length > 0) {
                var c = new i(n.bdSphere[0], n.bdSphere[1], n.bdSphere[2]);
                this._boundingSphere = new e(c, n.bdSphere[3]), n.bdSphere = null, j.expandSphere(this.tileset._boundingSphere, this._boundingSphere)
            }
            this.statistics = 0;
            for (var d = n.nodeMeshes.length, h = 0; h < d; h++) {
                var p = n.nodeMeshes[h], f = this.createCommand(p, r);
                this.tileCommands.push(f)
            }
            n.nodeMeshes = null, this.tileset._geometryByteLength += this.statistics, "" == this.contentUrl && (this.loadStatus = H.LOADED)
        }
    }, X.prototype.createCommand = function (t, i) {
        var o, a = this.frameState.context, l = this.createVertexArray(t, i), u = this.tileset.modelMatrix;
        o = e.transform(this._boundingSphere, u, o);
        var c = O.fromCache({context: a, vertexShaderSource: U, fragmentShaderSource: V}), d = M.fromCache({
            depthTest: {enabled: !0},
            cull: {enabled: !0, face: k.BACK},
            blending: N.PRE_MULTIPLIED_ALPHA_BLEND
        }), h = B.castShadows(this.tileset.shadows), p = B.receiveShadows(this.tileset.shadows), f = i[t.matIndex];
        f.color = new r(1, 1, 1);
        var m = this, _ = {
            u_texture: function () {
                return void 0 == f.texture ? m.tileset._defautTexture : f.texture
            }, u_bgColor: function () {
                return f.color
            }, u_polygonTexture: function () {
                return void 0 == m.tileset._polygonDepth ? m.tileset._defautTexture : m.tileset._polygonDepth._colorTexture
            }, u_polygonBounds: function () {
                return m.tileset._heightLimitBounds
            }, u_bFlatten: function () {
                return void 0 != m.tileset._polygonDepth
            }, u_useClip: function () {
                return m.tileset._clipPolygons.length > 0
            }, u_clipTexture: function () {
                return s(m.tileset._clipFramebuffer) ? m.tileset._clipFramebuffer.getColorTexture(0) : m.tileset._defautTexture
            }, u_clipBounds: function () {
                return s(m.tileset._clipBounds) ? m.tileset._clipBounds : n.ZERO
            }, u_usePit: function () {
                return m.tileset._pitPolygons.length > 0
            }, u_pitTexture: function () {
                return s(m.tileset._pitFramebuffer) ? m.tileset._pitFramebuffer.getColorTexture(0) : m.tileset._defautTexture
            }, u_pitBounds: function () {
                return s(m.tileset._pitBounds) ? m.tileset._pitBounds : n.ZERO
            }, u_useColorTable: function () {
                return s(m.tileset._colorTexture)
            }, u_colorTexture: function () {
                return s(m.tileset._colorTexture) ? m.tileset._colorTexture : m.tileset._defautTexture
            }, u_colorRange: function () {
                return m.tileset._colorRange
            }, u_displayMode: function () {
                return m.tileset._displayMode
            }, u_transparency: function () {
                return m.tileset._transparency
            }, u_useOverlay: function () {
                return s(m.tileset._overlayImageLayer) && m.tileset._overlayImageLayer.show
            }, u_overlayBounds: function () {
                return s(m.tileset._overlayBounds) ? m.tileset._overlayBounds : n.ZERO
            }, u_overlayTexture: function () {
                return s(m.tileset._overlayFramebuffer) ? m.tileset._overlayFramebuffer.getColorTexture(0) : m.tileset._defautTexture
            }
        };
        return _.u_modelViewMatrix = ee.MODELVIEW(a.uniformState), new D({
            boundingVolume: o,
            modelMatrix: u,
            primitiveType: w.TRIANGLES,
            vertexArray: l,
            shaderProgram: c,
            castShadows: h,
            receiveShadows: p,
            uniformMap: _,
            renderState: d,
            pass: I.CESIUM_3D_TILE
        })
    }, X.prototype.createVertexArray = function (e, t) {
        var i, n = this.frameState.context, r = [];
        if (null != e.verts && e.matIndex >= 0 && e.matIndex < t.length) {
            if (null != e.indices) {
                var o = e.indices, a = new Uint32Array(o);
                i = A.createIndexBuffer({
                    context: n,
                    typedArray: a,
                    usage: P.STATIC_DRAW,
                    indexDatatype: x.UNSIGNED_INT
                }), this.statistics += 2 * e.indices.length, e.indices = null, o = null, a = null
            }
            var s = E.FLOAT, l = E.createTypedArray(s, e.verts),
                u = A.createVertexBuffer({context: n, typedArray: l, usage: P.STATIC_DRAW});
            l = null, this.statistics += 4 * e.verts.length, e.verts = null, r.push({
                index: 0,
                vertexBuffer: u,
                componentDatatype: s,
                componentsPerAttribute: 3,
                normalize: !1
            });
            for (var c = e.uvs.length, d = 0; d < c; d++) if (null != e.uvs[d] && void 0 != e.uvs[d]) {
                var h = E.createTypedArray(s, e.uvs[d]),
                    u = A.createVertexBuffer({context: n, typedArray: h, usage: P.STATIC_DRAW});
                h = null, r.push({
                    index: 1,
                    vertexBuffer: u,
                    componentDatatype: s,
                    componentsPerAttribute: 2,
                    normalize: !1
                }), this.statistics += 4 * e.uvs[d].length, e.uvs[d] = null
            }
            var p = t[e.matIndex];
            this.arryMaterialUsed.push(p), this.meshLoaded = !0
        }
        return new R({context: n, attributes: r, indexBuffer: i})
    }, X.prototype.distanceToCamera = function (e, t) {
        return Math.max(0, i.distance(e.center, t.camera.positionWC) - e.radius)
    };
    var ie = new e;
    return X.prototype.checkInFrustum = function (t) {
        if (this.setInFrustumTestOk(!1), this._boundingSphere.radius > 0) {
            var i = this.tileset.modelMatrix;
            if (e.transform(this._boundingSphere, i, ie), this._distanceToCamera = this.distanceToCamera(ie, t), t.cullingVolume.computeVisibility(ie) == h.OUTSIDE) return !1
        }
        return this.setInFrustumTestOk(!0), !0
    }, X.prototype.isGrandchildrenSafeDel = function () {
        return (this.getLoadStatus() == H.UNLOAD || this.getLoadStatus() == H.NET_LOADED || this.getLoadStatus() == H.LOADED) && (!this.hasLoadingMaterial() && !(this.frameState.frameNumber - this._visitedFrame < 1))
    }, X.prototype.isAllMaterialLoaded = function () {
        for (var e = 0, t = this.arryMaterialUsed.length; e < t; e++) if (this.arryMaterialUsed[e].status != H.LOADED) return !1;
        return !0
    }, X.prototype.hasLoadingMaterial = function () {
        for (var e = 0, t = this.arryMaterialUsed.length; e < t; e++) if (this.arryMaterialUsed[e].status != H.UNLOAD && this.arryMaterialUsed[e].status != H.LOADED) return !0;
        return !1
    }, X.prototype.unloadChildren = function (e) {
        if (!s(e) || e || this.isGrandchildrenSafeDel()) {
            var t = 0, i = this.children.length;
            for (t = 0; t < i; t++) this.children[t].unloadChildren(e);
            for (this.children = [], this.childRanges = [], this.arryMaterialUsed = []; this.arryMaterials.length > 0;) {
                var n = this.arryMaterials.pop();
                if (s(n) && s(n.texture)) {
                    var r = n.texture;
                    this.tileset._texturesByteLength -= r.sizeInBytes, r.destroy(), n.texture = null
                }
            }
            this.arryMaterials = [];
            for (var o = this._tileCommands.length - 1; o >= 0; o--) {
                var a = this._tileCommands[o];
                s(a) && (a.vertexArray = a.vertexArray && a.vertexArray.destroy(), a.shaderProgram = a.shaderProgram && a.shaderProgram.destroy())
            }
            this._tileCommands = [], this.tileset._geometryByteLength -= this.statistics, this.statistics = 0, this.meshLoaded = !1, this.dataBuffer = null, this.setLoadStatus(H.UNLOAD)
        }
    }, X.prototype.checkAllGroupChildLoaded = function (e) {
        for (var t = 0, i = this.children.length; t < i; t++) {
            var n = this.children[t];
            if (null != n && n.checkInFrustum(e) && n.children.length > 1) {
                n.setInFrustumTestOk(!0);
                var r = n.children[0];
                if (r && "" == r.contentUrl && !r.isAllMaterialLoaded()) {
                    for (var o = r.arryMaterialUsed.length, a = 0; a < o; a++) {
                        var s = r.arryMaterialUsed[a];
                        s.status == H.UNLOAD && r.loadTexture(s, this.tileset)
                    }
                    return !1
                }
            }
        }
        return !0
    }, X.prototype.update = function (t) {
        this.frameState = t;
        t.camera;
        if (this.rendered = !1, !this.checkInFrustum(t)) return !1;
        if (this._visitedFrame = this.tileset._visitedFrame, "" != this.contentUrl && (this.getLoadStatus() == H.UNLOAD && this.netLoad(t), this.getLoadStatus() == H.NET_LOADED && this.load(t), this.getLoadStatus() != H.LOADED)) return !1;
        var i = 0;
        this.childRanges.length > 0 && this.rangeMode == W.RM_PIXEL_SIZE_ON_SCREEN && (this._boundingSphere.empty() || (i = .5 * j.computeSpherePixelSize(this._boundingSphere, this.tileset.geometricError) * t.qualityCoefficient));
        var n = this.checkAllGroupChildLoaded(t), r = this.children.length;
        if (this.children.sort(K), r > 0) {
            for (var o = 0; o < r; o++) {
                var a = this.children[o];
                if (o < this.childRanges.length) {
                    var l = this.childRanges[o];
                    if (a && i >= l.x && i < l.y) a.update(t) && (this.rendered = !0); else if ("" == a.contentUrl) {
                        a._visitedFrame = this._visitedFrame;
                        var u = a.children[0];
                        s(u) && "" == u.contentUrl && (u._visitedFrame = this._visitedFrame)
                    }
                } else a && a.update(t) && (this.rendered = !0)
            }
            !this.rendered && r > 0 && (a = this.children[0]) && a.update(t) && (this.rendered = !0)
        } else for (o = 0; o < r; o++) {
            var a = this.children[o];
            a && n && a.update(t) && (this.rendered = !0)
        }
        var c = !1, d = this.isAllMaterialLoaded();
        if (!this.rendered && t.curTexRequestNum < t.maxTexRequestNum) for (r = this.arryMaterialUsed.length, o = 0; o < r; o++) {
            var h = this.arryMaterialUsed[o];
            h.status == H.UNLOAD && this.loadTexture(h, this.tileset)
        }
        for (r = this.tileCommands.length, o = 0; o < r; o++) {
            var p = this.tileCommands[o];
            if (void 0 != p && d) {
                var f = s(this.parent) ? this.parent._boundingSphere : this._boundingSphere;
                if (f.radius < 0) for (var m = this.parent; f.radius < 0 && s(m) && s(m.parent);) f = m.parent.boundingSphere, m = m.parent;
                var _, g = this.tileset.modelMatrix;
                _ = e.transform(f, g, _), p._boundingVolume = _, this.tileset._transparency < 1 ? p.pass = I.TRANSLUCENT : p.pass = I.CESIUM_3D_TILE, this.frameState.commandList.push(p), (t.passes.render || t.passes.pick) && this.addDerivedCommands(t, p), c = !0
            }
        }
        return c ? (this.rendered = !0, !0) : this.rendered
    }, X.prototype.addDerivedCommands = function (e, t, i) {
        var n = t.derivedCommands.tileset;
        s(n) && !t.dirty || (n = {}, t.derivedCommands.tileset = n, n.originalCommand = $(t), t.dirty = !1);
        var r = n.originalCommand;
        s(n.opaque) || (n.opaque = Z(r));
        var o = e.commandList, a = o.length;
        t.pass !== I.TRANSLUCENT ? o[a - 1] = n.opaque : o[a - 1] = r
    }, X
});