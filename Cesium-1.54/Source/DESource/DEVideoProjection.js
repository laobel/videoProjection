define([
    "../Core/Resource",
    "../Core/BoundingRectangle",
    "../Core/BoundingSphere",
    "../Core/Cartesian3",
    "../Core/Cartesian4",
    "../Core/Color",
    "../Core/ComponentDatatype",
    "../Core/defined",
    "../Core/defineProperties",
    "../Core/destroyObject",
    "../Core/IndexDatatype",
    "../Core/Intersect",
    "../Core/Math",
    "../Core/Matrix3",
    "../Core/Matrix4",
    "../Core/PixelFormat",
    "../Core/PrimitiveType",
    "../Core/Transforms",
    "../Renderer/Buffer",
    "../Renderer/BufferUsage",
    "../Renderer/ClearCommand",
    "../Renderer/DrawCommand",
    "../Renderer/Framebuffer",
    "../Renderer/Pass",
    "../Renderer/PassState",
    "../Renderer/PixelDatatype",
    "../Renderer/RenderState",
    "../Renderer/Sampler",
    "../Renderer/ShaderProgram",
    "../Renderer/ShaderSource",
    "../Renderer/Texture",
    "../Renderer/TextureMagnificationFilter",
    "../Renderer/TextureMinificationFilter",
    "../Renderer/VertexArray",
    "../Scene/BlendingState",
    "../Scene/Camera",
    "../Scene/Scene",
    "../Shaders/ViewshedLineFS",
    "../Shaders/ViewshedLineVS"
], function (e, t, i, n, r, o, a, s, l, u, c, d, h, p, f, m, _, g, v, y, C, b, T, S, w, x, E, A, P, D, I, M, R, O, L, N, F, B, z) {
    "use strict";

    function k(e, t) {
        this._viewer = e, this._viewerPosition = new n(0, 0, 0), this._direction = 0, this._pitch = 0, this._horizontalFov = 60, this._verticalFov = 60, this._distance = 100, this._visibleAreaColor = new o(0, 1, 0, .5), this._hiddenAreaColor = new o(1, 0, 0, .5), this._targetPoint = new n(0, 0, 0), this._modelMatrix = new f, this._lineColor = o.YELLOW, this._hintLineUpdated = !1, this._initialized = !1, this._cameraUpdated = !1, this._indices = void 0, this._positions = void 0, this._drawLineCommand = void 0, this._showHintLine = !0, this._depthPassState = void 0, this._depthCamera = void 0, this._textureViewMatrix = new f, this._textureProjMatrix = new f, this._analysisCommand = void 0, this._valid = !1, this._videoElement = t, this._videoTexture = void 0, this._oldUniformValue = void 0
    }

    function V(e, t, i) {
        var n = E.fromCache({depthTest: {enabled: !1}, depthMask: !1, blending: L.ALPHA_BLEND}), r = new D({
            sources: ["precision highp float;\n\nuniform sampler2D u_sceneDepthTexture;\nuniform sampler2D u_depthTexture;\nuniform mat4 u_textureViewMatrix;\nuniform mat4 u_textureProjMatrix;\nuniform float u_farDist;\nuniform vec4 u_visibleAreaColor;\nuniform vec4 u_hiddenAreaColor;\nuniform sampler2D u_videoTexture;\n\nvarying vec2 v_textureCoordinates;\n\nvoid main()\n{\n       vec4 result = vec4(0.0);\n      // 还原到观察视角的坐标系统下\n       float sceneDepth = czm_unpackDepth(texture2D(u_sceneDepthTexture, v_textureCoordinates));\n       sceneDepth = sceneDepth>0.0 ? sceneDepth : 1.0;\n       vec4 projPos = vec4(v_textureCoordinates*2.0-1.0, sceneDepth*2.0-1.0, 1.0);\n       vec4 texViewPos = u_textureViewMatrix * projPos;\n       vec4 texProjPos = u_textureProjMatrix * texViewPos;\n       texProjPos /= texProjPos.w;\n       texProjPos.xyz = texProjPos.xyz * 0.5 + 0.5;\n\n       // 计算最远距离的深度\n       texViewPos /= texViewPos.w;\n       texViewPos.xyz *= u_farDist / length(texViewPos.xyz);\n       vec4 farPos = u_textureProjMatrix * texViewPos;\n       float farDepth = farPos.z / farPos.w;\n       farDepth = farDepth * 0.5 + 0.5;\n       farDepth = min(farDepth, 1.0);\n\n       if (texProjPos.x > 0.0 && texProjPos.x < 1.0 &&\n           texProjPos.y > 0.0 && texProjPos.y < 1.0 &&\n           texProjPos.z > 0.5 && texProjPos.z < farDepth) {\n           float depth = texture2D(u_depthTexture, texProjPos.xy).r;\n           if (depth - texProjPos.z > -1.0e-5) {\n               result = texture2D(u_videoTexture, texProjPos.xy);\n           }\n       }\n   gl_FragColor = result;\n}"]
        }), o = {
            u_sceneDepthTexture: function () {
                return e._viewer.scene._view.pickDepths[0]._depthTexture
            }, u_depthTexture: function () {
                return e._depthPassState.framebuffer.depthStencilTexture
            }, u_textureViewMatrix: function () {
                return e._textureViewMatrix
            }, u_textureProjMatrix: function () {
                return e._textureProjMatrix
            }, u_farDist: function () {
                return e._distance
            }, u_videoTexture: function () {
                return e._videoTexture
            }
        };
        return i.createViewportQuadCommand(r, {renderState: n, uniformMap: o, owner: e})
    }

    return l(k.prototype, {
        viewerPosition: {
            get: function () {
                return this._viewerPosition
            }, set: function (e) {
                this._viewerPosition = e, this._cameraUpdated = !1
            }
        }, showHintLine: {
            get: function () {
                return this._showHintLine
            }, set: function (e) {
                this._showHintLine = e
            }
        }, direction: {
            get: function () {
                return this._direction
            }, set: function (e) {
                this._direction = e, this._cameraUpdated = !1
            }
        }, pitch: {
            get: function () {
                return this._pitch
            }, set: function (e) {
                this._pitch = e, this._cameraUpdated = !1
            }
        }, horizontalFov: {
            get: function () {
                return this._horizontalFov
            }, set: function (e) {
                this._horizontalFov = e, this._cameraUpdated = !1, this._hintLineUpdated = !1
            }
        }, verticalFov: {
            get: function () {
                return this._verticalFov
            }, set: function (e) {
                this._verticalFov = e, this._cameraUpdated = !1, this._hintLineUpdated = !1
            }
        }, distance: {
            get: function () {
                return this._distance
            }, set: function (e) {
                this._distance = e, this._cameraUpdated = !1, this._hintLineUpdated = !1
            }
        }, lineColor: {
            get: function () {
                return this._lineColor
            }, set: function (e) {
                this._lineColor = e
            }
        }
    }), k.prototype.setTargetPoint = function (e) {
        this.distance = n.distance(this._viewerPosition, e);
        var t = new n, i = g.eastNorthUpToFixedFrame(this._viewerPosition);
        f.inverse(i, i), f.multiplyByPoint(i, e, t), n.normalize(t, t), this.direction = h.toDegrees(Math.atan2(t.x, t.y)), this.pitch = h.toDegrees(Math.asin(t.z))
    }, k.prototype.locateToViewer = function () {
        this._viewer.camera.setView({
            destination: this._depthCamera.position,
            orientation: {direction: this._depthCamera.direction, up: this._depthCamera.up}
        })
    }, k.prototype.update = function (e) {
        e.viewshed3ds.push(this), this.fetchImage()
    }, k.prototype._initialize = function () {
        this._positions = new Float32Array(633), this._indices = new Uint16Array(408);
        var e = this._indices, i = 0;
        e[i++] = 0, e[i++] = 1, e[i++] = 0, e[i++] = 21, e[i++] = 0, e[i++] = 85, e[i++] = 0, e[i++] = 105;
        for (var n = 0, r = 0; r < 5; ++r) {
            n++;
            for (var o = 0; o < 20; ++o) e[i++] = n++, e[i++] = n
        }
        n++;
        for (var a = 0; a < 20; ++a) for (var l = 0; l < 5; ++l) e[i++] = n, e[i++] = 5 + n++;
        var u = this._viewer.scene, c = u._context;
        if (s(this._depthCamera) || (this._depthCamera = new N(u)), !s(this._depthPassState)) {
            var d = new T({
                context: c,
                depthStencilTexture: new I({
                    context: c,
                    width: 2048,
                    height: 2048,
                    pixelFormat: m.DEPTH_STENCIL,
                    pixelDatatype: x.UNSIGNED_INT_24_8
                })
            });
            this._depthPassState = new w(c), this._depthPassState.viewport = new t(0, 0, 2048, 2048), this._depthPassState.framebuffer = d
        }
        this._initialized = !0
    }, k.prototype.fetchImage = function () {
        var e = this._oldUniformValue !== this._videoElement;
        this._oldUniformValue = this._videoElement;
        var t = this._viewer.scene._context;
        if (this._videoElement instanceof HTMLVideoElement) {
            var i = this._videoElement;
            if (i.readyState >= 2) {
                if (e && s(this._videoTexture) && (this._videoTexture !== t.defaultTexture && this._videoTexture.destroy(), this._videoTexture = void 0), !s(this._videoTexture) || this._videoTexture === t.defaultTexture) return void (this._videoTexture = new I({
                    context: t,
                    source: i
                }));
                this._videoTexture.copyFrom(i)
            } else s(this._videoTexture) || (this._videoTexture = t.defaultTexture)
        }
    }, k.prototype._updateCamera = function () {
        this._depthCamera.frustum.near = .001 * this._distance, this._depthCamera.frustum.far = this._distance, this._depthCamera.frustum.fov = h.toRadians(Math.max(this._horizontalFov, this._verticalFov)), this._depthCamera.frustum.aspectRatio = this._horizontalFov / this._verticalFov, this._depthCamera.setView({
            destination: this._viewerPosition,
            orientation: {heading: h.toRadians(this._direction), pitch: h.toRadians(this._pitch)}
        }), this._modelMatrix = this._depthCamera.inverseViewMatrix, this._cameraUpdated = !0
    }, k.prototype._updateHintLine = function (e) {
        var t, r, o, l, u = this._positions, p = h.toRadians(this._horizontalFov),
            m = h.toRadians(this._verticalFov), g = Math.tan(.5 * p), C = Math.tan(.5 * m);
        r = this._distance * g, l = this._distance * C, t = -r, o = -l;
        var T = new n(t, o, -this._distance), w = new n(r, l, 0);
        f.multiplyByPoint(this._modelMatrix, T, T), f.multiplyByPoint(this._modelMatrix, w, w);
        var x = i.fromCornerPoints(T, w);
        if (e.cullingVolume.computeVisibility(x) === d.OUTSIDE) return void (this._valid = !1);
        this._valid = !0;
        var A = 0;
        u[A++] = 0, u[A++] = 0, u[A++] = 0
        ;
        for (var D, I, M = Math.PI - .5 * p, R = p / 4, L = 0; L < 5; ++L) {
            D = M + L * R;
            for (var N = l / (this._distance / Math.cos(D)), F = Math.atan(N), k = -F, V = F / 10, U = 0; U < 21; ++U) I = k + U * V, u[A++] = this._distance * Math.cos(I) * Math.sin(D), u[A++] = this._distance * Math.sin(I), u[A++] = this._distance * Math.cos(I) * Math.cos(D)
        }
        R = p / 20;
        for (var G = 0; G < 21; ++G) {
            D = M + G * R;
            for (var N = l / (this._distance / Math.cos(D)), F = Math.atan(N), k = -F, V = F / 2, H = 0; H < 5; ++H) I = k + H * V, u[A++] = this._distance * Math.cos(I) * Math.sin(D), u[A++] = this._distance * Math.sin(I), u[A++] = this._distance * Math.cos(I) * Math.cos(D)
        }
        var W = e.context, q = v.createIndexBuffer({
            context: W,
            typedArray: new Uint32Array(this._indices),
            usage: y.STATIC_DRAW,
            indexDatatype: c.UNSIGNED_INT
        }), j = v.createVertexBuffer({
            context: W,
            typedArray: a.createTypedArray(a.FLOAT, this._positions),
            usage: y.STATIC_DRAW
        }), Y = [];
        Y.push({index: 0, vertexBuffer: j, componentDatatype: a.FLOAT, componentsPerAttribute: 3, normalize: !1});
        var X = new O({context: W, attributes: Y, indexBuffer: q});
        if (s(this._drawLineCommand)) this._drawLineCommand.vertexArray.destroy(), this._drawLineCommand.vertexArray = X, this._drawLineCommand.modelMatrix = this._modelMatrix, this._drawLineCommand.boundingVolume = x; else {
            var Q = P.fromCache({context: W, vertexShaderSource: z, fragmentShaderSource: B}),
                K = E.fromCache({depthTest: {enabled: !0}}), Z = this, J = {
                    u_bgColor: function () {
                        return Z._lineColor
                    }, u_modelViewMatrix: function () {
                        return W.uniformState.modelView
                    }
                };
            this._drawLineCommand = new b({
                boundingVolume: x,
                modelMatrix: Z._modelMatrix,
                primitiveType: _.LINES,
                vertexArray: X,
                shaderProgram: Q,
                castShadows: !1,
                receiveShadows: !1,
                uniformMap: J,
                renderState: K,
                pass: S.OPAQUE
            })
        }
        this._hintLineUpdated = !0
    }, k.prototype.updateDepthMap = function (e) {
        if (0 !== this._distance) {
            this._initialized || this._initialize(), this._cameraUpdated || this._updateCamera();
            var t = this._viewer.scene._frameState;
            if (this._hintLineUpdated || this._updateHintLine(t), this._valid && s(e.camera.workingFrustums[0])) {
                f.multiply(e.camera.workingFrustums[0].projectionMatrix, e.camera.viewMatrix, this._textureViewMatrix), f.inverse(this._textureViewMatrix, this._textureViewMatrix), f.multiply(this._depthCamera.viewMatrix, this._textureViewMatrix, this._textureViewMatrix), f.clone(this._depthCamera.frustum.projectionMatrix, this._textureProjMatrix);
                var i = new C({depth: 1, framebuffer: this._depthPassState.framebuffer});
                this._viewer.scene.renderDepth(i, this._depthPassState, this._depthCamera)
            }
        }
    }, k.prototype.execute = function (e, t) {
        0 !== this._distance && this._valid && this._showHintLine && e.draw(this._drawLineCommand, t), this._doAnalysis(this, e, t)
    }, k.prototype._doAnalysis = function (e, t, i) {
        e._valid && (s(e._analysisCommand) || (e._analysisCommand = V(e, this, t)), t.draw(e._analysisCommand, i))
    }, k.prototype.destroy = function () {
        return u(this)
    }, k
});