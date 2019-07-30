define( ["../Core/AxisAlignedBoundingBox", "../Core/BoundingRectangle", "../Core/BoundingSphere", "../Core/buildModuleUrl", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Cartographic", "../Core/createGuid", "../Core/Check", "../Core/Color", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/destroyObject", "../Core/Event", "../Core/getBaseUri", "../Core/getExtensionFromUri", "../Core/Geometry", "../Core/GeometryAttribute", "../Core/GeometryAttributes", "../Core/isArray", "../Core/isDataUri", "../Core/Intersect", "../Core/joinUrls", "../Core/JulianDate", "../Core/Math", "../Core/Matrix4", "../Core/OrthographicOffCenterFrustum", "../Core/PerspectiveFrustum", "../Core/PixelFormat", "../Core/Plane", "../Core/PolygonGeometry", "../Core/PrimitiveType", "../Core/Rectangle", "../Core/RequestType", "../Core/Resource", "../Core/TaskProcessor", "../Core/Transforms", "../Renderer/Buffer", "../Renderer/BufferUsage", "../Renderer/ClearCommand", "../Renderer/DrawCommand", "../Renderer/Framebuffer", "../Renderer/Pass", "../Renderer/PassState", "../Renderer/PixelDatatype", "../Renderer/RenderState", "../Renderer/Sampler", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Renderer/Texture", "../Renderer/TextureMagnificationFilter", "../Renderer/TextureMinificationFilter", "../Renderer/TextureWrap", "../Renderer/VertexArray", "../Scene/CullFace", "../Scene/ShadowMode", "../Shaders/PolygonDepthFS", "../Shaders/PolygonDepthVS", "../ThirdParty/jszip.min", "../ThirdParty/when", "./DEELoadStatus", "./DEMath", "./DE3DTile", "./DEPolygonDepth"], function (e, t, i, n, r, o, a, s, l, u, c, d, h, p, f, m, _, g, v, y, C, b, T, S, w, x, E, A, P, D, I, M, R, O, L, N, F, B, z, k, V, U, G, H, W, q, j, Y, X, Q, K, Z, J, $, ee, te, ie, ne, re, oe, ae, se, le, ue, ce, de, he, pe) {
    "use strict";

    function fe(t) {
        t = h(t, h.EMPTY_OBJECT);
        var n, s, u = t.url;
        "json" === y(u) ? (n = u, s = v(u, !0)) : w(u) ? (n = u, s = "") : (s = u, n = E(s, "metadata")), this._url = u, this.name = t.name, this.id = p(t.id) ? t.id : l(), this._maximumMemoryUsage = h(t.maximumMemoryUsage, 1073741824), this._readyPromise = ue.defer(), this.shadows = h(t.shadows, oe.ENABLED), this.show = h(t.show, !0), this.tiles = [], this.geometricError = new a, this._boundingSphere = new i, this._boundingBox = new e, this._position = new o(0, 0, 0), this._ready = !1, this._texturesByteLength = 0, this._geometryByteLength = 0, this._defautTexture = void 0, this._heightLimitPolygons = [], this._heightLimitBounds = new a, this._polygonDepth = void 0, this._needUpateHeightLimit = !1, this._clipPolygons = [], this._clipBounds = new a, this._clipDirty = !1, this._clipFramebuffer = void 0, this._pitPolygons = [], this._pitBounds = new a, this._pitDirty = !1, this._pitFramebuffer = void 0, this._colorTable = void 0, this._colorTexture = void 0, this._colorRange = new r, this._displayMode = 2, this._overlayImageLayer = void 0, this._overlayBounds = void 0, this._overlayRect = void 0, this._tilesInOverlay = [], this._overlayFramebuffer = void 0, this._overlayVertShaderSource = void 0, this._overlayFragShaderSource = void 0, this._overlayShaderPrograms = [], this._overlayTileCommand = void 0, this._overlayTileUniforms = [], this._loadTimestamp = void 0, this._compress = !1, this._type = "DE3DTileset", this._distanceToCamera = 0, this._tileVisibleDistance = h(t.tileVisibleDistance, 2e5), this._transparency = 1, this._visitedFrame = 0, this._dstoken = t.dstoken, this._resource = z.createIfNeeded(s, {proxy: t.proxy}), this._subdomains = t.subdomains, S(this._subdomains) ? this._subdomains = this._subdomains.slice() : p(this._subdomains) && this._subdomains.length > 0 ? this._subdomains = this._subdomains.split("") : this._subdomains = ["data1", "data2", "data3"];
        var c = z.createIfNeeded(n, {proxy: t.proxy});
        if (p(this._dstoken) && c.setQueryParameters({dstoken: this._dstoken}), this._subdomains.length > 0) {
            var d = {s: this._subdomains[parseInt(Math.random() * this._subdomains.length)]};
            c.setTemplateValues(d)
        }
        var f = c.fetchJson();
        if (p(f)) {
            var m = this;
            ue(f, function (e) {
                if (m.isDestroyed()) return ue.reject("tileset is destroyed");
                m.loadTileset(n, e), m._readyPromise.resolve(m)
            }, function (e) {
                m._readyPromise.reject(e)
            })
        }
    }

    function me(e, n) {
        if (e._clipDirty && 0 != e._clipPolygons.length) {
            var r = n.context, a = r.uniformState,
                s = Q.fromCache({depthTest: {enabled: !1}, cull: {enabled: !0, face: re.BACK}}), l = Z.fromCache({
                    context: r,
                    vertexShaderSource: "attribute vec3 position;\nvoid main()\n{\n    vec4 pos = vec4(position.xy, 0.0, 1.0);\n    gl_Position = czm_projection*pos;\n\n}",
                    fragmentShaderSource: "void main()\n{\n      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}"
                }), u = new D;
            D.inverse(e._modelMatrix, u);
            for (var d = [], h = [], f = 0; f < e._clipPolygons.length; ++f) {
                for (var m = e._clipPolygons[f], _ = L.createGeometry(m), g = _.attributes.position.values, v = 0, y = g.length / 3; v < y; ++v) {
                    var C = new o(0, 0, 0);
                    C.x = g[3 * v], C.y = g[3 * v + 1], C.z = g[3 * v + 2], D.multiplyByPoint(u, C, C), h.push(C), _.attributes.position.values[3 * v] = C.x, _.attributes.position.values[3 * v + 1] = C.y, _.attributes.position.values[3 * v + 2] = C.z
                }
                var b = new i;
                b = i.transform(_.boundingSphere, u, b), _.boundingSphere = b;
                var T = ne.fromGeometry({context: r, geometry: _, bufferUsage: G.STATIC_DRAW, interleave: !0}),
                    S = new W({
                        boundingVolume: b,
                        primitiveType: N.TRIANGLES,
                        vertexArray: T,
                        shaderProgram: l,
                        renderState: s,
                        pass: j.CESIUM_3D_TILE
                    });
                d.push(S)
            }
            var w = new t;
            if (t.fromPoints(h, w), e._clipBounds.x = w.x - w.width / 4096, e._clipBounds.y = w.y + w.height + w.height / 4096, e._clipBounds.z = w.x + w.width + w.width / 4096, e._clipBounds.w = w.y - w.height / 4096, !p(e._clipFramebuffer)) {
                var x = new $({
                    context: r,
                    width: 4096,
                    height: 4096,
                    pixelFormat: R.RGB,
                    pixelDatatype: X.UNSIGNED_BYTE
                });
                e._clipFramebuffer = new q({context: r, colorTextures: [x], destroyAttachments: !1})
            }
            var E = new I;
            E.left = e._clipBounds.x, E.top = e._clipBounds.y, E.right = e._clipBounds.z, E.bottom = e._clipBounds.w, a.updateFrustum(E);
            var A = new Y(r);
            A.framebuffer = e._clipFramebuffer, A.viewport = new t(0, 0, 4096, 4096);
            new H({color: new c(0, 0, 0, 0)}).execute(r, A);
            for (var f = 0; f < d.length; f++) {
                var S = d[f];
                a.updatePass(S.pass), S.execute(r, A)
            }
            e._clipDirty = !1
        }
    }

    function _e(e, n) {
        if (e._pitDirty && 0 != e._pitPolygons.length) {
            var r = n.context, a = r.uniformState,
                s = Q.fromCache({depthTest: {enabled: !1}, cull: {enabled: !0, face: re.BACK}}), l = Z.fromCache({
                    context: r,
                    vertexShaderSource: "attribute vec3 position;\nvoid main()\n{\n    vec4 pos = vec4(position.xy, 0.0, 1.0);\n    gl_Position = czm_projection*pos;\n\n}",
                    fragmentShaderSource: "void main()\n{\n      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}"
                }), u = new D;
            D.inverse(e._modelMatrix, u);
            for (var d = [], h = [], f = 0; f < e._pitPolygons.length; ++f) {
                for (var m = e._pitPolygons[f], _ = L.createGeometry(m), g = _.attributes.position.values, v = 0, y = g.length / 3; v < y; ++v) {
                    var C = new o(0, 0, 0);
                    C.x = g[3 * v], C.y = g[3 * v + 1], C.z = g[3 * v + 2], D.multiplyByPoint(u, C, C), h.push(C), _.attributes.position.values[3 * v] = C.x, _.attributes.position.values[3 * v + 1] = C.y, _.attributes.position.values[3 * v + 2] = C.z
                }
                var b = new i;
                b = i.transform(_.boundingSphere, u, b), _.boundingSphere = b;
                var T = ne.fromGeometry({context: r, geometry: _, bufferUsage: G.STATIC_DRAW, interleave: !0}),
                    S = new W({
                        boundingVolume: b,
                        primitiveType: N.TRIANGLES,
                        vertexArray: T,
                        shaderProgram: l,
                        renderState: s,
                        pass: j.CESIUM_3D_TILE
                    });
                d.push(S)
            }
            var w = new t;
            if (t.fromPoints(h, w), e._pitBounds.x = w.x - w.width / 4096, e._pitBounds.y = w.y + w.height + w.height / 4096, e._pitBounds.z = w.x + w.width + w.width / 4096, e._pitBounds.w = w.y - w.height / 4096, !p(e._pitFramebuffer)) {
                var x = new $({
                    context: r,
                    width: 4096,
                    height: 4096,
                    pixelFormat: R.RGB,
                    pixelDatatype: X.UNSIGNED_BYTE
                });
                e._pitFramebuffer = new q({context: r, colorTextures: [x], destroyAttachments: !1})
            }
            var E = new I;
            E.left = e._pitBounds.x, E.top = e._pitBounds.y, E.right = e._pitBounds.z, E.bottom = e._pitBounds.w, a.updateFrustum(E);
            var A = new Y(r);
            A.framebuffer = e._pitFramebuffer, A.viewport = new t(0, 0, 4096, 4096);
            new H({color: new c(0, 0, 0, 0)}).execute(r, A);
            for (var f = 0; f < d.length; f++) {
                var S = d[f];
                a.updatePass(S.pass), S.execute(r, A)
            }
            e._pitDirty = !1
        }
    }

    function ge(e, t) {
        !p(e._overlayImageLayer) || !e._overlayImageLayer.show || e._boundingSphere.radius <= 0 || (ve(e, t), e._overlayBounds.z - e._overlayBounds.x <= 1e-6 || e._overlayBounds.y - e._overlayBounds.w <= 1e-6 || (ye(t.camera._scene.globe._surface, t, e), 0 != e._tilesInOverlay.length && we(e, t)))
    }

    function ve(e, i) {
        var n = i.camera;
        if (!D.equals(Pe, n.viewMatrix) || !D.equals(De, n.frustum.projectionMatrix)) {
            Pe = n.viewMatrix.clone(Pe), De = n.frustum.projectionMatrix.clone(De);
            var s = new D;
            D.inverse(e._modelMatrix, s);
            var l = e._boundingBox.minimum.z, u = i.cullingVolume.planes, c = new O(o.UNIT_Z, 0);
            O.fromCartesian4(u[0], c), O.transform(c, s, c);
            var d = [c.normal.x, c.normal.y, c.normal.z * l + c.distance];
            O.fromCartesian4(u[1], c), O.transform(c, s, c);
            var h = [c.normal.x, c.normal.y, c.normal.z * l + c.distance];
            O.fromCartesian4(u[2], c), O.transform(c, s, c);
            var p = [c.normal.x, c.normal.y, c.normal.z * l + c.distance];
            O.fromCartesian4(u[3], c), O.transform(c, s, c);
            var f = [c.normal.x, c.normal.y, c.normal.z * l + c.distance], m = [], _ = p[0] * d[1] - p[1] * d[0];
            m[0] = new r((d[2] * p[1] - d[1] * p[2]) / _, (d[0] * p[2] - d[2] * p[0]) / _), _ = p[0] * h[1] - p[1] * h[0], m[1] = new r((h[2] * p[1] - h[1] * p[2]) / _, (h[0] * p[2] - h[2] * p[0]) / _);
            var g = n.frustum._offCenterFrustum, v = new o(g.left, g.bottom, g.near);
            D.multiplyByPoint(n.inverseViewMatrix, v, v), D.multiplyByPoint(s, v, v), (m[0].x - v.x) * (m[1].y - v.y) - (m[0].y - v.y) * (m[1].x - v.x) < 0 && (p[2] = -p[0] * v.x - p[1] * v.y, _ = p[0] * d[1] - p[1] * d[0], m[0].x = (d[2] * p[1] - d[1] * p[2]) / _, m[0].y = (d[0] * p[2] - d[2] * p[0]) / _, _ = p[0] * h[1] - p[1] * h[0], m[1].x = (h[2] * p[1] - h[1] * p[2]) / _, m[1].y = (h[0] * p[2] - h[2] * p[0]) / _);
            var y = !0;
            0 == f[0] && 0 == f[1] || (_ = f[0] * h[1] - f[1] * h[0], m[2] = new r((h[2] * f[1] - h[1] * f[2]) / _, (h[0] * f[2] - h[2] * f[0]) / _), (m[0].x - m[2].x) * (m[1].y - m[2].y) - (m[0].y - m[2].y) * (m[1].x - m[2].x) >= 0 && (y = !1)), y && (O.fromCartesian4(u[5], c), O.transform(c, s, c), f = [c.normal.x, c.normal.y, c.normal.z * l + c.distance], _ = f[0] * h[1] - f[1] * h[0], m[2].x = (h[2] * f[1] - h[1] * f[2]) / _, m[2].y = (h[0] * f[2] - h[2] * f[0]) / _), _ = f[0] * d[1] - f[1] * d[0], m[3] = new r((d[2] * f[1] - d[1] * f[2]) / _, (d[0] * f[2] - d[2] * f[0]) / _);
            for (var C = [], b = [e._boundingBox.minimum.x, e._boundingBox.minimum.y, e._boundingBox.maximum.x, e._boundingBox.maximum.y], T = [b[0], b[1], b[2], b[1], b[2], b[3], b[0], b[3]], S = 0; S < 4; ++S) {
                for (var w = 0; w < 4; ++w) {
                    var x = m[w], E = m[w + 1 < 4 ? w + 1 : 0];
                    if ((x.x - T[2 * S]) * (E.y - T[2 * S + 1]) - (x.y - T[2 * S + 1]) * (E.x - T[2 * S]) < 0) break
                }
                4 == w && C.push(new r(T[2 * S], T[2 * S + 1]))
            }
            if (4 == C.length) e._overlayBounds = a.fromElements(b[0], b[3], b[2], b[1], e._overlayBounds); else {
                for (var A = new r, P = new r, I = [p, h, f, d], S = 0, M = m.length; S < M; ++S) {
                    var x = m[S], E = m[S + 1 < M ? S + 1 : 0];
                    if (!(x.x >= b[0] && x.x <= b[2] && x.y >= b[1] && x.y <= b[3] && (C.push(x), E.x >= b[0] && E.x <= b[2] && E.y >= b[1] && E.y <= b[3]))) {
                        var R = I[S];
                        if (0 != R[1]) {
                            var L = new r(b[0], -(R[0] * b[0] + R[2]) / R[1]);
                            L.y > b[1] && L.y < b[3] && (r.subtract(L, x, A), r.subtract(L, E, P), r.dot(A, P) <= 0 && C.push(L));
                            var N = new r(b[2], -(R[0] * b[2] + R[2]) / R[1]);
                            N.y > b[1] && N.y < b[3] && (r.subtract(N, x, A), r.subtract(N, E, P), r.dot(A, P) <= 0 && C.push(N))
                        }
                        if (0 != R[0]) {
                            var F = new r(-(R[1] * b[1] + R[2]) / R[0], b[1]);
                            F.x > b[0] && F.x < b[3] && (r.subtract(F, x, A), r.subtract(F, E, P), r.dot(A, P) <= 0 && C.push(F));
                            var B = new r(-(R[1] * b[3] + R[2]) / R[0], b[3]);
                            B.x > b[0] && B.x < b[3] && (r.subtract(B, x, A), r.subtract(B, E, P), r.dot(A, P) <= 0 && C.push(B))
                        }
                    }
                }
                var z = t.fromPoints(C);
                e._overlayBounds = a.fromElements(z.x, z.y + z.height, z.x + z.width, z.y, e._overlayBounds)
            }
        }
    }

    function ye(e, t, i) {
        if (i._tilesInOverlay.length = 0, p(e._levelZeroTiles)) {
            var n = [], r = new o(i._overlayBounds.x, i._overlayBounds.w, 0);
            D.multiplyByPoint(i._modelMatrix, r, r), n.push(s.fromCartesian(r)), o.fromElements(i._overlayBounds.x, i._overlayBounds.y, 0, r), D.multiplyByPoint(i._modelMatrix, r, r), n.push(s.fromCartesian(r)), o.fromElements(i._overlayBounds.z, i._overlayBounds.w, 0, r), D.multiplyByPoint(i._modelMatrix, r, r), n.push(s.fromCartesian(r)), o.fromElements(i._overlayBounds.z, i._overlayBounds.y, 0, r), D.multiplyByPoint(i._modelMatrix, r, r), n.push(s.fromCartesian(r)), i._overlayRect = F.fromCartographicArray(n, i._overlayRect);
            for (var a, l = e._levelZeroTiles, u = 0, c = l.length; u < c; ++u) a = l[u], a.renderable && p(F.intersection(i._overlayRect, a.rectangle, Ie)) && Ce(e, t, a, i)
        }
    }

    function Ce(e, t, i, n) {
        if (Se(e, t, i) < e.maximumScreenSpaceError) return void n._tilesInOverlay.push(i);
        var r = i.southwestChild, o = i.southeastChild, a = i.northwestChild, s = i.northeastChild,
            l = r.renderable && o.renderable && a.renderable && s.renderable,
            u = r.upsampledFromParent && o.upsampledFromParent && a.upsampledFromParent && s.upsampledFromParent;
        l ? u ? n._tilesInOverlay.push(i) : be(e, r, o, a, s, t, n) : n._tilesInOverlay.push(i)
    }

    function be(e, t, i, n, r, o, a) {
        var s = o.camera.positionCartographic, l = e._tileProvider;
        s.longitude < t.rectangle.east ? s.latitude < t.rectangle.north ? (Te(e, t, l, o, a), Te(e, i, l, o, a), Te(e, n, l, o, a), Te(e, r, l, o, a)) : (Te(e, n, l, o, a), Te(e, t, l, o, a), Te(e, r, l, o, a), Te(e, i, l, o, a)) : s.latitude < t.rectangle.north ? (Te(e, i, l, o, a), Te(e, t, l, o, a), Te(e, r, l, o, a), Te(e, n, l, o, a)) : (Te(e, r, l, o, a), Te(e, n, l, o, a), Te(e, i, l, o, a), Te(e, t, l, o, a))
    }

    function Te(e, t, i, n, r) {
        p(F.intersection(r._overlayRect, t.rectangle, Ie)) && Ce(e, n, t, r)
    }

    function Se(e, t, i) {
        var n = e._tileProvider.getLevelMaximumGeometricError(i.level), r = i._distance;
        return n * t.context.drawingBufferHeight / (r * t.camera.frustum.sseDenominator)
    }

    function we(e, i) {
        var n = i.context, r = n.uniformState, s = new I;
        s.left = e._overlayBounds.x, s.top = e._overlayBounds.y, s.right = e._overlayBounds.z, s.bottom = e._overlayBounds.w, r.updateFrustum(s);
        if (!p(e._overlayFramebuffer)) {
            var l = new $({
                context: n,
                width: 4096,
                height: 4096,
                pixelFormat: R.RGBA,
                pixelDatatype: X.UNSIGNED_BYTE
            });
            e._overlayFramebuffer = new q({context: n, colorTextures: [l], destroyAttachments: !1})
        }
        var u = new Y(n);
        u.framebuffer = e._overlayFramebuffer, u.viewport = new t(0, 0, 4096, 4096);
        var h = Q.fromCache({depthTest: {enabled: !1}, cull: {enabled: !0, face: re.BACK}});
        if (!p(e._overlayVertShaderSource)) {
            var f = new J;
            f.sources.push("attribute float position;\nuniform vec4 u_rectVertexes[4];\nvarying vec2 texCoord;\n\nvoid main()\n{\n    int index = int(position);\n    vec4 pos = vec4(u_rectVertexes[index].xy, 0.0, 1.0);\n    gl_Position = czm_projection*pos;\n\n    texCoord = u_rectVertexes[index].zw;\n\n}"), e._overlayVertShaderSource = f
        }
        if (!p(e._overlayFragShaderSource)) {
            var m = new J;
            m.sources.push("uniform sampler2D u_textures[TEXTURE_UNITS];\nuniform vec4 u_texCoordRects[TEXTURE_UNITS];\nuniform vec4 u_texOffsetAndScales[TEXTURE_UNITS];\nuniform float u_texAlpha[TEXTURE_UNITS];\nvarying vec2 texCoord;\n\nvec4 sampleAndBlend(\n    vec4 previousColor,\n    sampler2D textureToSample,\n    vec2 tileTextureCoordinates,\n    vec4 textureCoordinateRectangle,\n    vec4 textureCoordinateTranslationAndScale,\n    float textureAlpha)\n{\n    // This crazy step stuff sets the alpha to 0.0 if this following condition is true:\n    //    tileTextureCoordinates.s < textureCoordinateRectangle.s ||\n    //    tileTextureCoordinates.s > textureCoordinateRectangle.p ||\n    //    tileTextureCoordinates.t < textureCoordinateRectangle.t ||\n    //    tileTextureCoordinates.t > textureCoordinateRectangle.q\n    // In other words, the alpha is zero if the fragment is outside the rectangle\n    // covered by this texture.  Would an actual 'if' yield better performance?\n    vec2 alphaMultiplier = step(textureCoordinateRectangle.st, tileTextureCoordinates);\n    textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;\n\n    alphaMultiplier = step(vec2(0.0), textureCoordinateRectangle.pq - tileTextureCoordinates);\n    textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;\n\n    vec2 translation = textureCoordinateTranslationAndScale.xy;\n    vec2 scale = textureCoordinateTranslationAndScale.zw;\n    vec2 textureCoordinates = tileTextureCoordinates * scale + translation;\n    vec4 value = texture2D(textureToSample, textureCoordinates);\n    vec3 color = value.rgb;\n    float alpha = value.a;\n\n    float sourceAlpha = alpha * textureAlpha;\n    float outAlpha = mix(previousColor.a, 1.0, sourceAlpha);\n    vec3 outColor = mix(previousColor.rgb * previousColor.a, color, sourceAlpha) / outAlpha;\n    return vec4(outColor, outAlpha);\n}\n\nvoid main()\n{\n    vec4 color = vec4(0.0);\n    for (int i = 0; i < TEXTURE_UNITS; ++i) {\n        color = sampleAndBlend(color, u_textures[i], texCoord,           u_texCoordRects[i], u_texOffsetAndScales[i], u_texAlpha[i]);\n    };\n    gl_FragColor = color;\n}"), e._overlayFragShaderSource = m
        }
        if (!p(e._overlayTileCommand)) {
            p(e._overlayTileUniforms.rectVertexes) || (e._overlayTileUniforms.rectVertexes = []);
            var _ = {
                    u_rectVertexes: function () {
                        return e._overlayTileUniforms.rectVertexes
                    }, u_textures: function () {
                        return e._overlayTileUniforms.textures
                    }, u_texCoordRects: function () {
                        return e._overlayTileUniforms.texCoordRects
                    }, u_texOffsetAndScales: function () {
                        return e._overlayTileUniforms.texOffsetAndScales
                    }, u_texAlpha: function () {
                        return e._overlayTileUniforms.texAlpha
                    }
                }, g = new b({
                    componentDatatype: d.FLOAT,
                    componentsPerAttribute: 1,
                    values: new Float32Array([0, 1, 2, 0, 2, 3])
                }), v = new T({position: g}), y = new C({attributes: v}),
                S = ne.fromGeometry({context: n, geometry: y, bufferUsage: G.STATIC_DRAW, interleave: !0});
            e._overlayTileCommand = new W({
                primitiveType: N.TRIANGLES,
                vertexArray: S,
                uniformMap: _,
                renderState: h,
                pass: j.CESIUM_3D_TILE
            })
        }
        new H({color: new c(1, 1, 1, 0)}).execute(n, u);
        var w = new D;
        D.inverse(e._modelMatrix, w);
        for (var x = 0, E = e._tilesInOverlay.length; x < E; ++x) {
            var A = e._tilesInOverlay[x], P = A.rectangle, M = o.fromRadians(P.west, P.south, 0);
            D.multiplyByPoint(w, M, M);
            var O = o.fromRadians(P.east, P.south, 0);
            D.multiplyByPoint(w, O, O);
            var L = o.fromRadians(P.east, P.north, 0);
            D.multiplyByPoint(w, L, L);
            var F = o.fromRadians(P.west, P.north, 0);
            D.multiplyByPoint(w, F, F), e._overlayTileUniforms.textures = [], e._overlayTileUniforms.texCoordRects = [], e._overlayTileUniforms.texOffsetAndScales = [], e._overlayTileUniforms.texAlpha = [];
            for (var B = A.data.imagery, z = 0, k = B.length; z < k; ++z) {
                var V = B[z], U = V.readyImagery;
                p(U) && 0 !== U.imageryLayer.alpha && U.imageryLayer == e._overlayImageLayer && (e._overlayTileUniforms.textures.push(V.useWebMercatorT ? U.textureWebMercator : U.texture), e._overlayTileUniforms.texCoordRects.push(V.textureCoordinateRectangle), e._overlayTileUniforms.texOffsetAndScales.push(V.textureTranslationAndScale), e._overlayTileUniforms.texAlpha.push(U.imageryLayer.alpha))
            }
            var K = e._overlayTileUniforms.textures.length;
            if (0 != K) {
                if (e._overlayTileUniforms.rectVertexes[0] = a.fromElements(M.x, M.y, 0, 0, e._overlayTileUniforms.rectVertexes[0]), e._overlayTileUniforms.rectVertexes[1] = a.fromElements(O.x, O.y, 1, 0, e._overlayTileUniforms.rectVertexes[1]), e._overlayTileUniforms.rectVertexes[2] = a.fromElements(L.x, L.y, 1, 1, e._overlayTileUniforms.rectVertexes[2]), e._overlayTileUniforms.rectVertexes[3] = a.fromElements(F.x, F.y, 0, 1, e._overlayTileUniforms.rectVertexes[3]), !p(e._overlayShaderPrograms[K])) {
                    var m = e._overlayFragShaderSource.clone();
                    m.defines.push("TEXTURE_UNITS " + K);
                    var ee = Z.fromCache({
                        context: n,
                        vertexShaderSource: e._overlayVertShaderSource,
                        fragmentShaderSource: m
                    });
                    e._overlayShaderPrograms[K] = ee
                }
                e._overlayTileCommand.shaderProgram = e._overlayShaderPrograms[K], r.updatePass(e._overlayTileCommand.pass), e._overlayTileCommand.execute(n, u)
            }
        }
    }

    f(fe.prototype, {
        ready: {
            get: function () {
                return this._ready
            }
        }, readyPromise: {
            get: function () {
                return this._readyPromise.promise
            }
        }, url: {
            get: function () {
                return this._url
            }
        }, basePath: {
            get: function () {
                return this._basePath
            }
        }, position: {
            get: function () {
                return this._position
            }, set: function (e) {
                this._position = e;
                var t = o.fromDegrees(this._position.x, this._position.y, this._position.z);
                this._modelMatrix = V.eastNorthUpToFixedFrame(t, void 0, this._modelMatrix);
                var i = new o;
                D.multiplyByPoint(this._modelMatrix, this._boundingBox.center, i), this.tileBoundingSphere.center = i
            }
        }, modelMatrix: {
            get: function () {
                return this._modelMatrix
            }, set: function (e) {
                this._modelMatrix = D.clone(e, this._modelMatrix)
            }
        }, maximumMemoryUsage: {
            get: function () {
                return this._maximumMemoryUsage
            }, set: function (e) {
                this._maximumMemoryUsage = e
            }
        }, transparency: {
            get: function () {
                return this._transparency
            }, set: function (e) {
                this._transparency = e
            }
        }, boundingSphere: {
            get: function () {
                return this._boundingSphere
            }
        }, boundingBox: {
            get: function () {
                return this._boundingBox
            }
        }, totalMemoryUsageInBytes: {
            get: function () {
                return this._texturesByteLength + this._geometryByteLength
            }
        }, type: {
            get: function () {
                return this._type
            }
        }
    }), fe.prototype.addTile = function (e) {
        this.tiles.push(e), e.tileset = this, e.root = e
    },
        fe.prototype.loadTileset = function (t, n) {
            var r = this;
            if (p(n.root)) {
                var a = n.root;
                if (p(a)) {
                    r._position.x = parseFloat(a.position.x), r._position.y = parseFloat(a.position.y), r._position.z = parseFloat(a.position.z), r._compress = Boolean(a.compress);
                    var s = o.fromDegrees(this._position.x, this._position.y, this._position.z);
                    if (r._modelMatrix = V.eastNorthUpToFixedFrame(s, void 0, r._modelMatrix), p(a.boundingVolume)) {
                        if (p(a.boundingVolume.sphere)) {
                            var l = a.boundingVolume.sphere, u = new o(l[0], l[1], l[2]), c = l[3];
                            r._boundingSphere = new i(u, c), D.multiplyByPoint(r._modelMatrix, u, u), r.tileBoundingSphere = new i(u, c)
                        }
                        if (p(a.boundingVolume.box)) {
                            var d = a.boundingVolume.box, u = new o(d[0], d[1], d[2]),
                                h = new o(d[0] - d[3], d[1] - d[7], d[2] - d[11]),
                                f = new o(d[0] + d[3], d[1] + d[7], d[2] + d[11]);
                            r._boundingBox = new e(h, f, u);
                            var c = Math.max(d[3], Math.max(d[7], d[11]));
                            r._boundingSphere = new i(u, c);
                            var m = new o;
                            D.multiplyByPoint(r._modelMatrix, u, m), r.tileBoundingSphere = new i(m, c)
                        }
                    }
                    for (var _ = a.children.length, g = 0; g < _; g++) {
                        var v = a.children[g];
                        if (void 0 != v) {
                            var y = new he;
                            if (void 0 !== v.boundingVolume) {
                                var l = v.boundingVolume.sphere, u = new o(l[0], l[1], l[2]), c = l[3];
                                y._boundingSphere = new i(u, c)
                            }
                            y.contentUrl = v.content.url, y.bRootTile = !0, r.addTile(y)
                        }
                    }
                }
            }
            r._ready = !0
        }, fe.prototype.unLoadTiles = function (e, t, i) {
        if (t |= i.frameNumber - e._visitedFrame > 1800, null != e) {
            if (e.getLoadStatus() != ce.LOADED) return !1;
            for (var n = 0, r = e.children.length; n < r; n++) this.unLoadTiles(e.children[n], t, i);
            if (i.totalMemoryUsageInBytes < i.maximumMemoryUsage) return !1;
            if (!t && e == e.root) return !1;
            if ("" == e.contentUrl) return !1;
            if (e.isGrandchildrenSafeDel()) {
                i.unloadTimestamp++;
                var o = this.totalMemoryUsageInBytes;
                e.unloadChildren(!1), i.totalMemoryUsageInBytes -= o - this.totalMemoryUsageInBytes
            }
        }
    };
    var xe = new a, Ee = new D;
    fe.prototype.updateMatrix = function (e) {
        var t = e.camera, i = e.context, n = t._viewMatrix;
        D.multiply(n, this._modelMatrix, Ee), xe.z = i.drawingBufferWidth, xe.w = i.drawingBufferHeight, this.geometricError = de.computePixelSizeVector(xe, t.frustum.projectionMatrix, Ee)
    }, fe.prototype.distanceToCamera = function (e, t) {
        return Math.max(0, o.distance(e.center, t.camera.positionWC) - e.radius)
    };
    var Ae = new i;
    fe.prototype.update = function (e) {
        if (this._frameState = e, this.show && this.ready) {
            if (this._boundingSphere.radius > 0) {
                if (i.transform(this._boundingSphere, this._modelMatrix, Ae), this._distanceToCamera > this._tileVisibleDistance) return e.totalMemoryUsageInBytes += this.totalMemoryUsageInBytes, !1;
                if (e.cullingVolume.computeVisibility(Ae) == x.OUTSIDE) return e.totalMemoryUsageInBytes += this.totalMemoryUsageInBytes, !1
            }
            this._visitedFrame = e.frameNumber;
            var t = this;
            if (!p(this._defautTexture)) {
                var r = document.createElement("img");
                r.src = n("Assets/Textures/noImage.jpg"), r.onload = function (e, i) {
                    t._defautTexture = new $({
                        context: t._frameState.context,
                        width: r.width,
                        height: r.height,
                        source: r
                    })
                }
            }
            if (this._needUpateHeightLimit && (this.updateHeightLimitPolygons(e), this._needUpateHeightLimit = !1), p(this._polygonDepth) && this._polygonDepth.update(e), me(this, e), _e(this, e), !p(this._colorTexture) && p(this._colorTable)) {
                var o = this._colorTable.generateImage(1024);
                this._colorTexture = new $({
                    context: e.context,
                    source: o,
                    width: 1024,
                    height: 1,
                    pixelFormat: R.RGBA,
                    pixelDatatype: X.UNSIGNED_BYTE,
                    sampler: new K({
                        wrapS: ie.CLAMP_TO_EDGE,
                        wrapT: ie.CLAMP_TO_EDGE,
                        minificationFilter: te.LINEAR,
                        magnificationFilter: ee.LINEAR
                    })
                })
            }
            ge(this, e);
            this.tiles;
            this._loadTimestamp = A.now();
            e.commandList.length;
            this.selectTiles(e), e.totalMemoryUsageInBytes += this.totalMemoryUsageInBytes
        }
    }, fe.prototype.selectTiles = function (e) {
        for (var t = 0, i = this.tiles.length; t < i; t++) {
            var n = this.tiles[t];
            n.checkInFrustum(e) && (n.boundingSphere.empty() ? e._selectedTiles.push(n) : n._distanceToCamera < this._tileVisibleDistance && e._selectedTiles.push(n))
        }
    }, fe.prototype.isDestroyed = function () {
        return !1
    }, fe.prototype.updateHeightLimitPolygons = function (e) {
        if (0 != this._heightLimitPolygons.length) {
            p(this._polygonDepth) || (this._polygonDepth = new pe), this._polygonDepth._flattenPolygonDrawCommonds = [];
            var n = {position: 0}, r = new D;
            D.inverse(this._modelMatrix, r);
            for (var a = new t, s = [], l = 0; l < this._heightLimitPolygons.length; l++) {
                for (var u = this._heightLimitPolygons[l], c = e.context, d = L.createGeometry(u), h = d.attributes.position.values, f = 0; f < h.length / 3; f++) {
                    var m = new o(0, 0, 0);
                    m.x = h[3 * f], m.y = h[3 * f + 1], m.z = h[3 * f + 2];
                    new o;
                    D.multiplyByPoint(r, m, m), s.push(m), d.attributes.position.values[3 * f] = m.x, d.attributes.position.values[3 * f + 1] = m.y, d.attributes.position.values[3 * f + 2] = m.z
                }
                var _;
                _ = i.transform(d.boundingSphere, r, _), d.boundingSphere = _;
                var g = ne.fromGeometry({
                    context: c,
                    geometry: d,
                    attributeLocations: n,
                    bufferUsage: G.STATIC_DRAW,
                    interleave: !0
                }), v = Z.fromCache({context: c, vertexShaderSource: se, fragmentShaderSource: ae}), y = new Q;
                y.depthTest.enabled = !0, y.cull.enabled = !0, y.cull.face = re.BACK;
                var C = {}, b = new W({
                    boundingVolume: _,
                    modelMatrix: new D,
                    primitiveType: N.TRIANGLES,
                    vertexArray: g,
                    shaderProgram: v,
                    uniformMap: C,
                    renderState: y,
                    pass: j.CESIUM_3D_TILE
                });
                this._polygonDepth._flattenPolygonDrawCommonds.push(b)
            }
            t.fromPoints(s, a), this._heightLimitBounds.x = a.x, this._heightLimitBounds.y = a.y + a.height, this._heightLimitBounds.z = a.x + a.width, this._heightLimitBounds.w = a.y, this._polygonDepth.updateFrustum(this._heightLimitBounds.x, this._heightLimitBounds.y, this._heightLimitBounds.z, this._heightLimitBounds.w)
        }
    }, fe.prototype.toJSON = function () {
        var e = {};
        return p(this.name) ? e.name = this.name : e.name = this._url, e.id = this.id, e.type = this._type, e.url = this._url, e.subdomains = this._subdomains, e.colorTable = this._colorTable, e.displayMode = this._displayMode, e.transparency = this.transparency, e.shadows = this.shadows, e.show = h(this.show, !0), e
    }, fe.prototype.release = function (e) {
        var t = e.frameNumber - this._visitedFrame > 1800;
        t |= this._distanceToCamera > this._tileVisibleDistance;
        for (var i = 0, n = this.tiles.length; i < n; i++) if (this.unLoadTiles(this.tiles[i], t, e), e.unloadTimestamp > 10) return !1;
        return !0
    }, fe.prototype.destroy = function () {
        for (var e = 0, t = this.tiles.length; e < t; e++) this.tiles[e].unloadChildren(!0), _(this.tiles[e]);
        return this.tiles = [], this.cleanClipPolygons(), this.cleanPitPolygons(), this.setColorTable(null), this.setOverlayImageLayer(null), _(this)
    }, fe.prototype.addHeightLimitPolygonPolygon = function (e) {
        this._heightLimitPolygons.push(e), this._needUpateHeightLimit = !0
    }, fe.prototype.cleanHeightLimitPolygons = function () {
        this._polygonDepth._flattenPolygonDrawCommonds = [], this._polygonDepth.destroy(), this._polygonDepth = void 0, this._heightLimitPolygons = [], this._heightLimitBounds = new a
    }, fe.prototype.addClipPolygon = function (e) {
        this._clipPolygons.push(e), this._clipDirty = !0
    }, fe.prototype.cleanClipPolygons = function () {
        this._clipPolygons.length = 0, this._clipDirty = !1, a.fromElements(0, 0, 0, 0, this._clipBounds), this._clipFramebuffer = this._clipFramebuffer && !this._clipFramebuffer.isDestroyed() && this._clipFramebuffer.destroy()
    }, fe.prototype.addPitPolygon = function (e) {
        this._pitPolygons.push(e), this._pitDirty = !0
    }, fe.prototype.cleanPitPolygons = function () {
        this._pitPolygons.length = 0, this._pitDirty = !1, a.fromElements(0, 0, 0, 0, this._pitBounds), this._pitFramebuffer = this._pitFramebuffer && !this._pitFramebuffer.isDestroyed() && this._pitFramebuffer.destroy()
    }, fe.prototype.setColorTable = function (e) {
        p(this._colorTable) && this._colorTable.destroy(), this._colorTable = e, p(e) && e.length > 0 && (this._colorRange.x = e._elements[0].key, this._colorRange.y = e._elements[e.length - 1].key), this._colorTexture = this._colorTexture && !this._colorTexture.isDestroyed() && this._colorTexture.destroy()
    }, fe.prototype.setDisplayMode = function (e) {
        this._displayMode = e
    }, fe.prototype.setOverlayImageLayer = function (e) {
        this._overlayImageLayer = e, p(e) || (this._overlayBounds = void 0, this._overlayRect = void 0, this._tilesInOverlay.length = 0, this._overlayFramebuffer = this._overlayFramebuffer && !this._overlayFramebuffer.isDestroyed() && this._overlayFramebuffer.destroy(), this._overlayVertShaderSource = void 0, this._overlayFragShaderSource = void 0, this._overlayShaderPrograms.length = 0, this._overlayTileCommand = void 0, this._overlayTileUniforms.length = 0)
    };
    var Pe = void 0, De = void 0, Ie = new F;
    return fe
});