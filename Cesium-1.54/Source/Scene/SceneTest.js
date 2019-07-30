define([
    "../Core/ApproximateTerrainHeights",
    "../Core/BoundingRectangle",
    "../Core/BoundingSphere",
    "../Core/BoxGeometry",
    "../Core/Cartesian2",
    "../Core/Cartesian3",
    "../Core/Cartographic",
    "../Core/Check",
    "../Core/Color",
    "../Core/ColorGeometryInstanceAttribute",
    "../Core/createGuid",
    "../Core/CullingVolume",
    "../Core/defaultValue",
    "../Core/defined",
    "../Core/defineProperties",
    "../Core/deprecationWarning",
    "../Core/destroyObject",
    "../Core/DeveloperError",
    "../Core/EllipsoidGeometry",
    "../Core/Event",
    "../Core/GeographicProjection",
    "../Core/getTimestamp",
    "../Core/GeometryInstance",
    "../Core/GeometryPipeline",
    "../Core/Intersect",
    "../Core/JulianDate",
    "../Core/Math",
    "../Core/Matrix4",
    "../Core/mergeSort",
    "../Core/Occluder",
    "../Core/OrthographicFrustum",
    "../Core/OrthographicOffCenterFrustum",
    "../Core/PerspectiveFrustum",
    "../Core/PerspectiveOffCenterFrustum",
    "../Core/PixelFormat",
    "../Core/Plane",
    "../Core/Ray",
    "../Core/RequestScheduler",
    "../Core/ShowGeometryInstanceAttribute",
    "../Core/TaskProcessor",
    "../Core/Transforms",
    "../DESource/DEPitCollection",
    "../DESource/DESetSurfaceTransparency",
    "../DESource/DEWaterCollection",
    "../Renderer/ClearCommand",
    "../Renderer/ComputeEngine",
    "../Renderer/Context",
    "../Renderer/ContextLimits",
    "../Renderer/DrawCommand",
    "../Renderer/Framebuffer",
    "../Renderer/Pass",
    "../Renderer/PixelDatatype",
    "../Renderer/RenderState",
    "../Renderer/ShaderProgram",
    "../Renderer/ShaderSource",
    "../Renderer/Texture",
    "../ThirdParty/when",
    "./BrdfLutGenerator",
    "./Camera",
    "./Cesium3DTileFeature",
    "./Cesium3DTileset",
    "./CreditDisplay",
    "./DebugCameraPrimitive",
    "./DepthPlane",
    "./DerivedCommand",
    "./DeviceOrientationCameraController",
    "./EllipsoidPrimitive",
    "./Fog",
    "./FrameState",
    "./GlobeDepth",
    "./InvertClassification",
    "./JobScheduler",
    "./MapMode2D",
    "./OctahedralProjectedCubeMap",
    "./PerformanceDisplay",
    "./PerInstanceColorAppearance",
    "./PickDepth",
    "./PostProcessStageCollection",
    "./Primitive",
    "./PrimitiveCollection",
    "./SceneMode",
    "./SceneTransforms",
    "./SceneTransitioner",
    "./ScreenSpaceCameraController",
    "./ShadowMap",
    "./StencilConstants",
    "./SunPostProcess",
    "./TweenCollection",
    "./View",
    "../DESource/DETilesetCollection"
], function (
    e,
    t,
    i,
    n,
    r,
    o,
    a,
    s,
    l,
    u,
    c,
    d,
    h,
    p,
    f,
    m,
    _,
    g,
    v,
    y,
    C,
    b,
    T,
    S,
    w,
    x,
    E,
    A,
    P,
    D,
    I,
    M,
    R,
    O,
    L,
    N,
    F,
    B,
    z,
    k,
    V,
    U,
    G,
    H,
    W,
    q,
    j,
    Y,
    X,
    Q,
    K,
    Z,
    J,
    $,
    ee,
    te,
    ie,
    ne,
    re,
    oe,
    ae,
    se,
    le,
    ue,
    ce,
    de,
    he,
    pe,
    fe,
    me,
    _e,
    ge,
    ve,
    ye,
    Ce,
    be,
    Te,
    Se,
    we,
    xe,
    Ee,
    Ae,
    Pe,
    De,
    Ie,
    Me,
    Re,
    Oe,
    Le,
    Ne
) {
    "use strict";

    var e = ApproximateTerrainHeights,
        t = BoundingRectangle,
        i = BoundingSphere,
        n = BoxGeometry,
        r = Cartesian2,
        o = Cartesian3,
        a = Cartographic,
        s = Check,
        l = Color,
        u = ColorGeometryInstanceAttribute,
        c = createGuid,
        d = CullingVolume,
        h = defaultValue,
        p = defined,
        f = defineProperties,
        m = deprecationWarning,
        _ = destroyObject,
        g = DeveloperError,
        v = EllipsoidGeometry,
        y = Event,
        C = GeographicProjection,
        b = getTimestamp,
        T = GeometryInstance,
        S = GeometryPipeline,
        w = Intersect,
        x = JulianDate,
        E = Math,
        A = Matrix4,
        P = mergeSort,
        D = Occluder,
        I = OrthographicFrustum,
        M = OrthographicOffCenterFrustum,
        R = PerspectiveFrustum,
        O = PerspectiveOffCenterFrustum,
        L = PixelFormat,
        N = Plane,
        F = Ray,
        B = RequestScheduler,
        z = ShowGeometryInstanceAttribute,
        k = TaskProcessor,
        V = Transforms,
        U = DEPitCollection,
        G = DESetSurfaceTransparency,
        H = DEWaterCollection,
        W = ClearCommand,
        q = ComputeEngine,
        j = Context,
        Y = ContextLimits,
        X = DrawCommand,
        Q = Framebuffer,
        K = Pass,
        Z = PixelDatatype,
        J = RenderState,
        $ = ShaderProgram,
        ee = ShaderSource,
        te = Texture,
        ie = when,
        ne = BrdfLutGenerator,
        re = Camera,
        oe = Cesium3DTileFeature,
        ae = Cesium3DTileset,
        se = CreditDisplay,
        le = DebugCameraPrimitive,
        ue = DepthPlane,
        ce = DerivedCommand,
        de = DeviceOrientationCameraController,
        he = EllipsoidPrimitive,
        pe = Fog,
        fe = FrameState,
        me = GlobeDepth,
        _e = InvertClassification,
        ge = JobScheduler,
        ve = MapMode2D,
        ye = OctahedralProjectedCubeMap,
        Ce = PerformanceDisplay,
        be = PerInstanceColorAppearance,
        Te = PickDepth,
        Se = PostProcessStageCollection,
        we = Primitive,
        xe = PrimitiveCollection,
        Ee = SceneMode,
        Ae = SceneTransforms,
        Pe = SceneTransitioner,
        De = ScreenSpaceCameraController,
        Ie = ShadowMap,
        Me = StencilConstants,
        Re = SunPostProcess,
        Oe = TweenCollection,
        Le = View,
        Ne = DETilesetCollection
    ;

        function Fe(e, t, i) {
        this.ray = e, this.width = t, this.primitives = i, this.ready = !1, this.deferred = ie.defer(), this.promise = this.deferred.promise
    }

    function Be(e) {
        e = h(e, h.EMPTY_OBJECT);
        var i = e.canvas, n = e.contextOptions, r = e.creditContainer, a = e.creditViewport, s = p(r),
            u = new j(i, n);
        s || (r = document.createElement("div"), r.style.position = "absolute", r.style.bottom = "0", r.style["text-shadow"] = "0 0 2px #000000", r.style.color = "#ffffff", r.style["font-size"] = "10px", r.style["padding-right"] = "5px", i.parentNode.appendChild(r)), p(a) || (a = i.parentNode), this.pit = [], this._id = c(), this._jobScheduler = new ge, this._frameState = new fe(u, new se(r, " • ", a), this._jobScheduler), this._frameState.scene3DOnly = h(e.scene3DOnly, !1), this._removeCreditContainer = !s, this._creditContainer = r, this._canvas = i, this._context = u, this._computeEngine = new q(u), this._globe = void 0, this._primitives = new xe, this._groundPrimitives = new xe, this._asyncRayPicks = [], this._tilesetLayers = new Ne, this._logDepthBuffer = !1, this._logDepthBufferDirty = !0, this._tweens = new Oe, this._shaderFrameCount = 0, this._sunPostProcess = void 0, this._computeCommandList = [], this._overlayCommandList = [], this._useOIT = h(e.orderIndependentTranslucency, !0), this._executeOITFunction = void 0, this._depthPlane = new ue, this._clearColorCommand = new W({
            color: new l,
            stencil: 0,
            owner: this
        }), this._depthClearCommand = new W({
            depth: 1,
            owner: this
        }), this._stencilClearCommand = new W({stencil: 0}), this._classificationStencilClearCommand = new W({
            stencil: 0,
            renderState: J.fromCache({stencilMask: Me.CLASSIFICATION_MASK})
        }), this._depthOnlyRenderStateCache = {}, this._pickRenderStateCache = {}, this._transitioner = new Pe(this), this._preUpdate = new y, this._postUpdate = new y, this._renderError = new y, this._preRender = new y, this._postRender = new y, this._pickPositionCache = {}, this._pickPositionCacheDirty = !1, this._minimumDisableDepthTestDistance = 0, this.rethrowRenderErrors = !1, this.completeMorphOnUserInput = !0, this.morphStart = new y, this.morphComplete = new y, this.skyBox = void 0, this.skyAtmosphere = void 0, this.sun = void 0, this.sunBloom = !0, this._sunBloom = void 0, this.moon = void 0, this.backgroundColor = l.clone(l.BLACK), this._mode = Ee.SCENE3D, this._mapProjection = p(e.mapProjection) ? e.mapProjection : new C, this.morphTime = 1, this.farToNearRatio = 1e3, this.logarithmicDepthFarToNearRatio = 1e9, this.nearToFarDistance2D = 175e4, this.debugCommandFilter = void 0, this.debugShowCommands = !1, this.debugShowFrustums = !1, this.debugShowFramesPerSecond = !1, this.debugShowGlobeDepth = !1, this.debugShowDepthFrustum = 1, this.debugShowFrustumPlanes = !1, this._debugShowFrustumPlanes = !1, this._debugFrustumPlanes = void 0, this.useDepthPicking = !0, this.pickTranslucentDepth = !1, this.cameraEventWaitTime = 500, this.fog = new pe, this._sunCamera = new re(this), this.shadowMap = new Ie({
            context: u,
            lightCamera: this._sunCamera,
            enabled: h(e.shadows, !1)
        }), this.invertClassification = !1, this.invertClassificationColor = l.clone(l.WHITE), this._actualInvertClassificationColor = l.clone(this._invertClassificationColor), this._invertClassification = new _e, this.focalLength = void 0, this.eyeSeparation = void 0, this.postProcessStages = new Se, this._brdfLutGenerator = new ne, this._terrainExaggeration = h(e.terrainExaggeration, 1), this._performanceDisplay = void 0, this._debugVolume = void 0, this._screenSpaceCameraController = new De(this), this._mapMode2D = h(e.mapMode2D, ve.INFINITE_SCROLL), this._environmentState = {
            skyBoxCommand: void 0,
            skyAtmosphereCommand: void 0,
            sunDrawCommand: void 0,
            sunComputeCommand: void 0,
            moonCommand: void 0,
            isSunVisible: !1,
            isMoonVisible: !1,
            isReadyForAtmosphere: !1,
            isSkyAtmosphereVisible: !1,
            clearGlobeDepth: !1,
            useDepthPlane: !1,
            renderTranslucentDepthForPick: !1,
            originalFramebuffer: void 0,
            useGlobeDepthFramebuffer: !1,
            useOIT: !1,
            useInvertClassification: !1,
            usePostProcess: !1,
            usePostProcessSelected: !1,
            useWebVR: !1
        }, this._ellipsoidPrimitive = new he, this._ellipsoidPrimitive.center = new o(0, 0, 0), this._ellipsoidPrimitive.radii = o.multiplyByScalar(new o(6378137, 6378137, 6356752), .9995, new o), this._ellipsoidPrimitive.material.uniforms.color = new l(0, 0, 0, 1), this._ellipsoidPrimitive.show = !1, this._primitives.add(this._ellipsoidPrimitive), this._pitCollection = new U(this), this._waterCollection = new H(this), this._setSurfaceTransparency = new G(this), this._useWebVR = !1, this._cameraVR = void 0, this._aspectRatioVR = void 0, this._useSingleFrustum = !0,this.requestRenderMode = h(e.requestRenderMode, !1),this._renderRequested = !0,this._lastFpsSampleTime = b(),this._fpsFrameCount = 0,this.maximumRenderTimeChange = h(e.maximumRenderTimeChange, 0),this._lastRenderTime = void 0,this._frameRateMonitor = void 0,this._removeRequestListenerCallback = B.requestCompletedEvent.addEventListener(Wt(this)),this._removeTaskProcessorListenerCallback = k.taskCompletedEvent.addEventListener(Wt(this)),this._removeGlobeCallbacks = [];
        var d = new t(0, 0, u.drawingBufferWidth, u.drawingBufferHeight), f = new re(this);
        this._logDepthBuffer && (f.frustum.near = .1, f.frustum.far = 1e10);
        var m = new t(0, 0, 1, 1), _ = new re(this);
        _.frustum = new I({
            width: .1,
            aspectRatio: 1,
            near: .1
        }), this._view = new Le(this, f, d), this._pickOffscreenView = new Le(this, _, m), this.pickOffscreenDefaultWidth = .1, this._defaultView = new Le(this, f, d), this._view = this._defaultView, this._hdr = void 0, this._hdrDirty = void 0, this.highDynamicRange = !0, this.gamma = 2.2, this._sunColor = new o(1.8, 1.85, 2), this.sphericalHarmonicCoefficients = void 0, this.specularEnvironmentMaps = void 0, this._specularEnvironmentMapAtlas = void 0, Ge(this, 0, x.now()), He(this), this.initializeFrame()
    }

    function ze(e, t) {
        for (var i = 0; i < e._removeGlobeCallbacks.length; ++i) e._removeGlobeCallbacks[i]();
        e._removeGlobeCallbacks.length = 0;
        var n = [];
        p(t) && (n.push(t.imageryLayersUpdatedEvent.addEventListener(Wt(e))), n.push(t.terrainProviderChanged.addEventListener(Wt(e)))), e._removeGlobeCallbacks = n
    }

    function ke(e, t, i) {
        var n = e._frameState, r = e._context, o = e._view.oit, a = n.shadowState.lightShadowMaps,
            s = n.shadowState.lightShadowsEnabled, l = t.derivedCommands;
        p(t.pickId) && (l.picking = ce.createPickDerivedCommand(e, t, r, l.picking)), t.pickOnly || (l.depth = ce.createDepthOnlyDerivedCommand(e, t, r, l.depth)), l.originalCommand = t, e._hdr && (l.hdr = ce.createHdrCommand(t, r, l.hdr), t = l.hdr.command, l = t.derivedCommands), s && t.receiveShadows && (l.shadows = Ie.createReceiveDerivedCommand(a, t, i, r, l.shadows)), t.pass === K.TRANSLUCENT && p(o) && o.isSupported() && (s && t.receiveShadows ? (l.oit = p(l.oit) ? l.oit : {}, l.oit.shadows = o.createDerivedCommands(l.shadows.receiveCommand, r, l.oit.shadows)) : l.oit = o.createDerivedCommands(t, r, l.oit))
    }

    function Ve(e) {
        var t = e.globe;
        if (e._mode === Ee.SCENE3D && p(t) && t.show) {
            var i = t.ellipsoid;
            return jt.radius = i.minimumRadius, qt = D.fromBoundingSphere(jt, e.camera.positionWC, qt)
        }
    }

    function Ue(e) {
        e.render = !1, e.pick = !1, e.depth = !1, e.postProcess = !1, e.offscreen = !1, e.asynchronous = !1
    }

    function Ge(e, t, i) {
        var n = e._frameState;
        n.frameNumber = t, n.time = x.clone(i, n.time)
    }

    function He(e) {
        var t = e.camera;
        if (e.useSingleFrustum) {
            var i = Math.abs(t.positionCartographic.height);
            if (p(e.globe)) {
                var n = e.globe.getHeight(t.positionCartographic);
                p(n) && (i = Math.abs(t.positionCartographic.height - n))
            }
            var r = i / 100 * .05;
            r *= r, r > .05 && (r = .05);
            var a = r * i;
            a < 1 && (a = 1), t.frustum.near = a;
            var s = o.magnitude(t.positionWC), u = s - t.positionCartographic.height;
            Math.sqrt(s * s - u * u);
            t.frustum.far = 1e8
        }
        var c = e._frameState;
        c.commandList.length = 0, c.shadowMaps.length = 0, c.viewshed3ds.length = 0, c._setSurfaceTransparency = e._setSurfaceTransparency, c.pit = e.pit, c.brdfLutGenerator = e._brdfLutGenerator, c.environmentMap = e.skyBox && e.skyBox._cubeMap, c.mode = e._mode, c.morphTime = e.morphTime, c.mapProjection = e.mapProjection, c.camera = t, c.cullingVolume = t.frustum.computeCullingVolume(t.positionWC, t.directionWC, t.upWC), c.occluder = Ve(e), c.terrainExaggeration = e._terrainExaggeration, c.minimumDisableDepthTestDistance = e._minimumDisableDepthTestDistance, c.invertClassification = e.invertClassification, c.useLogDepth = e._logDepthBuffer && !(e.camera.frustum instanceof I || e.camera.frustum instanceof M), c.sunColor = e._sunColor, p(e._specularEnvironmentMapAtlas) && e._specularEnvironmentMapAtlas.ready ? (c.specularEnvironmentMaps = e._specularEnvironmentMapAtlas.texture, c.specularEnvironmentMapsMaximumLOD = e._specularEnvironmentMapAtlas.maximumMipmapLevel) : (c.specularEnvironmentMaps = void 0, c.specularEnvironmentMapsMaximumLOD = void 0), c.sphericalHarmonicCoefficients = e.sphericalHarmonicCoefficients, e._actualInvertClassificationColor = l.clone(e.invertClassificationColor, e._actualInvertClassificationColor), _e.isTranslucencySupported(e._context) || (e._actualInvertClassificationColor.alpha = 1), c.invertClassificationColor = e._actualInvertClassificationColor, p(e.globe) ? c.maximumScreenSpaceError = e.globe.maximumScreenSpaceError : c.maximumScreenSpaceError = 2, Ue(c.passes)
    }

    function We(e) {
        var t = {}, i = e.vertexAttributes;
        for (var n in i) i.hasOwnProperty(n) && (t[n] = i[n].index);
        return t
    }

    function qe(e, t, i) {
        var n = t.context, r = h(i, e.shaderProgram), o = r.fragmentShaderSource.clone(), a = [];
        o.sources = o.sources.map(function (e) {
            e = ee.replaceMain(e, "czm_Debug_main");
            for (var t, i = /gl_FragData\[(\d+)\]/g; null !== (t = i.exec(e));) -1 === a.indexOf(t[1]) && a.push(t[1]);
            return e
        });
        var s, u = a.length, c = "void main() \n{ \n    czm_Debug_main(); \n";
        if (t.debugShowCommands) {
            p(e._debugColor) || (e._debugColor = l.fromRandom());
            var d = e._debugColor;
            if (u > 0) for (s = 0; s < u; ++s) c += "    gl_FragData[" + a[s] + "].rgb *= vec3(" + d.red + ", " + d.green + ", " + d.blue + "); \n"; else c += "    gl_FragColor.rgb *= vec3(" + d.red + ", " + d.green + ", " + d.blue + "); \n"
        }
        if (t.debugShowFrustums) {
            var f = 1 & e.debugOverlappingFrustums ? "1.0" : "0.0",
                m = 2 & e.debugOverlappingFrustums ? "1.0" : "0.0",
                _ = 4 & e.debugOverlappingFrustums ? "1.0" : "0.0";
            if (u > 0) for (s = 0; s < u; ++s) c += "    gl_FragData[" + a[s] + "].rgb *= vec3(" + f + ", " + m + ", " + _ + "); \n"; else c += "    gl_FragColor.rgb *= vec3(" + f + ", " + m + ", " + _ + "); \n"
        }
        c += "}", o.sources.push(c);
        var g = We(r);
        return $.fromCache({
            context: n,
            vertexShaderSource: r.vertexShaderSource,
            fragmentShaderSource: o,
            attributeLocations: g
        })
    }

    function je(e, t, i) {
        var n = X.shallowClone(e);
        n.shaderProgram = qe(e, t), n.execute(t.context, i), n.shaderProgram.destroy()
    }

    function Ye(e, t, i, r) {
        var a = t._frameState, s = a.context, l = e.boundingVolume;
        p(t._debugVolume) && t._debugVolume.destroy();
        var c, d = o.clone(l.center);
        if (a.mode !== Ee.SCENE3D) {
            d = A.multiplyByPoint(Xt, d, d);
            var h = a.mapProjection, f = h.unproject(d);
            d = h.ellipsoid.cartographicToCartesian(f)
        }
        if (p(l.radius)) {
            var m = l.radius;
            c = S.toWireframe(v.createGeometry(new v({
                radii: new o(m, m, m),
                vertexFormat: be.FLAT_VERTEX_FORMAT
            }))), t._debugVolume = new we({
                geometryInstances: new T({
                    geometry: c,
                    modelMatrix: A.fromTranslation(d),
                    attributes: {color: new u(1, 0, 0, 1)}
                }), appearance: new be({flat: !0, translucent: !1}), asynchronous: !1
            })
        } else {
            var _ = l.halfAxes;
            c = S.toWireframe(n.createGeometry(n.fromDimensions({
                dimensions: new o(2, 2, 2),
                vertexFormat: be.FLAT_VERTEX_FORMAT
            }))), t._debugVolume = new we({
                geometryInstances: new T({
                    geometry: c,
                    modelMatrix: A.fromRotationTranslation(_, d, new A),
                    attributes: {color: new u(1, 0, 0, 1)}
                }), appearance: new be({flat: !0, translucent: !1}), asynchronous: !1
            })
        }
        var g = a.commandList, y = a.commandList = [];
        if (t._debugVolume.update(a), e = y[0], a.useLogDepth) {
            e = ce.createLogDepthCommand(e, s).command
        }
        var C;
        p(r) && (C = i.framebuffer, i.framebuffer = r), e.execute(s, i), p(C) && (i.framebuffer = C), a.commandList = g
    }

    function Xe(e, t, i, n, r) {
        var o = t._frameState;
        if (!p(t.debugCommandFilter) || t.debugCommandFilter(e)) {
            if (e instanceof W) return void e.execute(i, n);
            e.debugShowBoundingVolume && p(e.boundingVolume) && Ye(e, t, n, r), o.useLogDepth && p(e.derivedCommands.logDepth) && (e = e.derivedCommands.logDepth.command);
            var a = o.passes;
            if (!a.pick && t._hdr && p(e.derivedCommands) && p(e.derivedCommands.hdr) && (e = e.derivedCommands.hdr.command), a.pick || a.depth) {
                if (a.pick && !a.depth && p(e.derivedCommands.picking)) return e = e.derivedCommands.picking.pickCommand, void e.execute(i, n);
                if (p(e.derivedCommands.depth)) return e = e.derivedCommands.depth.depthOnlyCommand, void e.execute(i, n)
            }
            if (t.debugShowCommands || t.debugShowFrustums) return void je(e, t, n);
            o.shadowState.lightShadowsEnabled && e.receiveShadows && p(e.derivedCommands.shadows) ? e.derivedCommands.shadows.receiveCommand.execute(i, n) : e.execute(i, n)
        }
    }

    function Qe(e, t, i, n) {
        var r = t._frameState, o = e.derivedCommands;
        p(o) && (r.useLogDepth && p(o.logDepth) && (e = o.logDepth.command), o = e.derivedCommands, p(o.picking) ? (e = o.picking.pickCommand, e.execute(i, n)) : p(o.depth) && (e = o.depth.depthOnlyCommand, e.execute(i, n)))
    }

    function Ke(e, t, i) {
        return t.boundingVolume.distanceSquaredTo(i) - e.boundingVolume.distanceSquaredTo(i)
    }

    function Ze(e, t, i) {
        return e.boundingVolume.distanceSquaredTo(i) - t.boundingVolume.distanceSquaredTo(i) + E.EPSILON12
    }

    function Je(e, t, i, n, r) {
        var o = e.context;
        P(n, Ke, e.camera.positionWC), p(r) && t(r.unclassifiedCommand, e, o, i);
        for (var a = n.length, s = 0; s < a; ++s) t(n[s], e, o, i)
    }

    function $e(e, t, i, n, r) {
        var o = e.context;
        P(n, Ze, e.camera.positionWC), p(r) && t(r.unclassifiedCommand, e, o, i);
        for (var a = n.length, s = 0; s < a; ++s) t(n[s], e, o, i)
    }

    function et(e, t) {
        var i = e._view.debugGlobeDepths, n = i[t];
        return !p(n) && e.context.depthTexture && (n = new me, i[t] = n), n
    }

    function tt(e, t) {
        var i = e._view.pickDepths, n = i[t];
        return p(n) || (n = new Te, i[t] = n), n
    }

    function it(e, t) {
        var i = e.camera, n = e.context, r = n.uniformState;
        r.updateCamera(i);
        var o;
        o = p(i.frustum.fov) ? i.frustum.clone(Qt) : p(i.frustum.infiniteProjectionMatrix) ? i.frustum.clone(Kt) : p(i.frustum.width) ? i.frustum.clone(Zt) : i.frustum.clone(Jt), o.near = 1, o.far = 5e8, r.updateFrustum(o), r.updatePass(K.ENVIRONMENT);
        var s = e._frameState.passes, l = s.pick, u = e._environmentState, c = e._view,
            d = u.renderTranslucentDepthForPick, h = u.useWebVR;
        if (!l) {
            var f = u.skyBoxCommand;
            if (p(f) && Xe(f, e, n, t), u.isSkyAtmosphereVisible && Xe(u.skyAtmosphereCommand, e, n, t), u.isSunVisible && (u.sunDrawCommand.execute(n, t), e.sunBloom && !h)) {
                var m;
                m = u.useGlobeDepthFramebuffer ? c.globeDepth.framebuffer : u.usePostProcess ? c.sceneFramebuffer.getFramebuffer() : u.originalFramebuffer, e._sunPostProcess.execute(n), e._sunPostProcess.copy(n, m), t.framebuffer = m
            }
            u.isMoonVisible && u.moonCommand.execute(n, t)
        }
        var _;
        u.useOIT ? (p(e._executeOITFunction) || (e._executeOITFunction = function (e, t, i, n, r) {
            c.oit.executeCommands(e, t, i, n, r)
        }), _ = e._executeOITFunction) : _ = s.render ? Je : $e;
        var g, v = u.clearGlobeDepth, y = u.useDepthPlane, C = e._depthClearCommand, b = e._stencilClearCommand,
            T = e._classificationStencilClearCommand, S = e._depthPlane, w = u.usePostProcessSelected,
            x = i.position.z, E = c.frustumCommandsList, A = E.length;
        i.workingFrustums.length = 0;
        for (var P = 0; P < A; ++P) {
            A > 1 && alert(A);
            var D = A - P - 1, I = E[D];
            e.mode === Ee.SCENE2D ? (i.position.z = x - I.near + 1, o.far = Math.max(1, I.far - I.near), o.near = 1, r.update(e.frameState), r.updateFrustum(o)) : (o.near = 0 !== D ? I.near * e.opaqueFrustumNearOffset : I.near, o.far = I.far, r.updateFrustum(o)), i.workingFrustums[D] = o.clone();
            var M, R = e.debugShowGlobeDepth ? et(e, D) : c.globeDepth;
            e.debugShowGlobeDepth && p(R) && u.useGlobeDepthFramebuffer && (R.update(n, t, c.viewport), R.clear(n, t, e._clearColorCommand.color), M = t.framebuffer, t.framebuffer = R.framebuffer), C.execute(n, t), n.stencilBuffer && b.execute(n, t);
            var O = a.fromCartesian(e.camera.position).height;
            if (0 == e._setSurfaceTransparency._enabled || O >= 1e4) {
                e._ellipsoidPrimitive.show = !1, r.updatePass(K.GLOBE);
                var L = I.commands[K.GLOBE], N = I.indices[K.GLOBE];
                for (g = 0; g < N; ++g) Xe(L[g], e, n, t)
            }
            for (p(R) && u.useGlobeDepthFramebuffer && R.executeCopyDepth(n, t), e.debugShowGlobeDepth && p(R) && u.useGlobeDepthFramebuffer && (t.framebuffer = M), r.updatePass(K.TERRAIN_CLASSIFICATION), L = I.commands[K.TERRAIN_CLASSIFICATION], N = I.indices[K.TERRAIN_CLASSIFICATION], g = 0; g < N; ++g) Xe(L[g], e, n, t);
            if (v && (C.execute(n, t), y && S.execute(n, t)), !u.useInvertClassification || l) {
                for (r.updatePass(K.CESIUM_3D_TILE), L = I.commands[K.CESIUM_3D_TILE], N = I.indices[K.CESIUM_3D_TILE], g = 0; g < N; ++g) Xe(L[g], e, n, t);
                if (N > 0) for (p(R) && u.useGlobeDepthFramebuffer && R.executeUpdateDepth(n, t, v), r.updatePass(K.CESIUM_3D_TILE_CLASSIFICATION), L = I.commands[K.CESIUM_3D_TILE_CLASSIFICATION], N = I.indices[K.CESIUM_3D_TILE_CLASSIFICATION], g = 0; g < N; ++g) Xe(L[g], e, n, t)
            } else {
                e._invertClassification.clear(n, t);
                var F = t.framebuffer;
                for (t.framebuffer = e._invertClassification._fbo, r.updatePass(K.CESIUM_3D_TILE), L = I.commands[K.CESIUM_3D_TILE], N = I.indices[K.CESIUM_3D_TILE], g = 0; g < N; ++g) Xe(L[g], e, n, t);
                for (p(R) && u.useGlobeDepthFramebuffer && R.executeUpdateDepth(n, t, v), r.updatePass(K.CESIUM_3D_TILE_CLASSIFICATION_IGNORE_SHOW), L = I.commands[K.CESIUM_3D_TILE_CLASSIFICATION_IGNORE_SHOW], N = I.indices[K.CESIUM_3D_TILE_CLASSIFICATION_IGNORE_SHOW], g = 0; g < N; ++g) Xe(L[g], e, n, t);
                for (t.framebuffer = F, e._invertClassification.executeClassified(n, t), 1 === e.frameState.invertClassificationColor.alpha && e._invertClassification.executeUnclassified(n, t), N > 0 && n.stencilBuffer && T.execute(n, t), r.updatePass(K.CESIUM_3D_TILE_CLASSIFICATION), L = I.commands[K.CESIUM_3D_TILE_CLASSIFICATION], N = I.indices[K.CESIUM_3D_TILE_CLASSIFICATION], g = 0; g < N; ++g) Xe(L[g], e, n, t)
            }
            for (N > 0 && n.stencilBuffer && b.execute(n, t), r.updatePass(K.OPAQUE), L = I.commands[K.OPAQUE], N = I.indices[K.OPAQUE], g = 0; g < N; ++g) Xe(L[g], e, n, t);
            0 !== D && e.mode !== Ee.SCENE2D && (o.near = I.near, r.updateFrustum(o));
            var B;
            if (!l && u.useInvertClassification && e.frameState.invertClassificationColor.alpha < 1 && (B = e._invertClassification), r.updatePass(K.TRANSLUCENT), L = I.commands[K.TRANSLUCENT], L.length = I.indices[K.TRANSLUCENT], _(e, Xe, t, L, B), 1 == e._setSurfaceTransparency._enabled && O < 1e4) {
                e._ellipsoidPrimitive.show = !0, r.updatePass(K.GLOBE);
                var L = I.commands[K.GLOBE], N = I.indices[K.GLOBE];
                for (g = 0; g < N; ++g) Xe(L[g], e, n, t);
                p(R) && u.useGlobeDepthFramebuffer && e.debugShowGlobeDepth && (R.update(n, t), R.executeCopyDepth(n, t)), e.debugShowGlobeDepth && p(R) && u.useGlobeDepthFramebuffer && (t.framebuffer = M)
            }
            if (n.depthTexture && e.useDepthPicking && (u.useGlobeDepthFramebuffer || d)) {
                var z = d ? t.framebuffer.depthStencilTexture : R.framebuffer.depthStencilTexture, k = tt(e, D);
                k.update(n, z), k.executeCopyDepth(n, t)
            }
            if (e._stencilClearCommand.execute(n, t), e.frameState.passes.render && nt(e, t), !l && w) {
                var V = t.framebuffer;
                for (t.framebuffer = c.sceneFramebuffer.getIdFramebuffer(), o.near = 0 !== D ? I.near * e.opaqueFrustumNearOffset : I.near, o.far = I.far, r.updateFrustum(o), r.updatePass(K.GLOBE), L = I.commands[K.GLOBE], N = I.indices[K.GLOBE], g = 0; g < N; ++g) Qe(L[g], e, n, t);
                for (v && (C.framebuffer = t.framebuffer, C.execute(n, t), C.framebuffer = void 0), v && y && S.execute(n, t), r.updatePass(K.CESIUM_3D_TILE), L = I.commands[K.CESIUM_3D_TILE], N = I.indices[K.CESIUM_3D_TILE], g = 0; g < N; ++g) Qe(L[g], e, n, t);
                for (r.updatePass(K.OPAQUE), L = I.commands[K.OPAQUE], N = I.indices[K.OPAQUE], g = 0; g < N; ++g) Qe(L[g], e, n, t);
                for (r.updatePass(K.TRANSLUCENT), L = I.commands[K.TRANSLUCENT], N = I.indices[K.TRANSLUCENT], g = 0; g < N; ++g) Qe(L[g], e, n, t);
                t.framebuffer = V
            }
        }
    }

    function nt(e, t) {
        for (var i = e.context, n = e._frameState, r = n.viewshed3ds, o = e._waterCollection._water, a = o.length, s = 0; s < a; ++s) o[s].updateReflectTexture(e);
        for (var s = 0; s < a; ++s) o[s].execute(i, t);
        for (var l = r.length, s = 0; s < l; ++s) r[s].updateDepthMap(e);
        for (var s = 0; s < l; ++s) r[s].execute(i, t)
    }

    function rt(e) {
        e.context.uniformState.updatePass(K.COMPUTE);
        var t = e._environmentState.sunComputeCommand;
        p(t) && t.execute(e._computeEngine);
        for (var i = e._computeCommandList, n = i.length, r = 0; r < n; ++r) i[r].execute(e._computeEngine)
    }

    function ot(e, t) {
        e.context.uniformState.updatePass(K.OVERLAY);
        for (var i = e.context, n = e._overlayCommandList, r = n.length, o = 0; o < r; ++o) n[o].execute(i, t)
    }

    function at(e, t, i) {
        for (var n = i.shadowMapCullingVolume, r = i.isPointLight, o = i.passes, a = o.length, s = t.length, l = 0; l < s; ++l) {
            var u = t[l];
            if (e.updateDerivedCommands(u), u.castShadows && (u.pass === K.GLOBE || u.pass === K.CESIUM_3D_TILE || u.pass === K.OPAQUE || u.pass === K.TRANSLUCENT) && e.isVisible(u, n)) if (r) for (var c = 0; c < a; ++c) o[c].commandList.push(u); else if (1 === a) o[0].commandList.push(u); else for (var d = !1, h = a - 1; h >= 0; --h) {
                var p = o[h].cullingVolume;
                if (e.isVisible(u, p)) o[h].commandList.push(u), d = !0; else if (d) break
            }
        }
    }

    function st(e) {
        var t = e.frameState, i = t.shadowState.shadowMaps, n = i.length;
        if (t.shadowState.shadowsEnabled) for (var r = e.context, o = r.uniformState, a = 0; a < n; ++a) {
            var s = i[a];
            if (!s.outOfView) {
                var l, u = s.passes, c = u.length;
                for (l = 0; l < c; ++l) u[l].commandList.length = 0;
                var d = e.frameState.commandList;
                for (at(e, d, s), l = 0; l < c; ++l) {
                    var h = s.passes[l];
                    o.updateCamera(h.camera), s.updatePass(r, l);
                    for (var p = h.commandList.length, f = 0; f < p; ++f) {
                        var m = h.commandList[f];
                        o.updatePass(m.pass), Xe(m.derivedCommands.shadows.castCommands[a], e, r, h.passState)
                    }
                }
            }
        }
    }

    function lt(e, t, i) {
        var n = e._frameState, r = n.mode;
        e._environmentState.useWebVR ? ut(e, t, i) : r !== Ee.SCENE2D || e._mapMode2D === ve.ROTATE ? dt(!0, e, t, i) : (_t(e, t, i), ct(e, t))
    }

    function ut(e, t, i) {
        var n = e._view, r = n.camera, a = e._environmentState, s = a.renderTranslucentDepthForPick;
        _t(e, t, i), s || mt(e), n.createPotentiallyVisibleSet(e), s || (rt(e), st(e));
        var l = t.viewport;
        l.x = 0, l.y = 0, l.width = .5 * l.width;
        var u = re.clone(r, e._cameraVR);
        u.frustum = r.frustum;
        var c = r.frustum.near, d = c * h(e.focalLength, 5), p = h(e.eyeSeparation, d / 30),
            f = o.multiplyByScalar(u.right, .5 * p, $t);
        r.frustum.aspectRatio = l.width / l.height;
        var m = .5 * p * c / d;
        o.add(u.position, f, r.position), r.frustum.xOffset = m, it(e, t), l.x = l.width, o.subtract(u.position, f, r.position), r.frustum.xOffset = -m, it(e, t), re.clone(u, r)
    }

    function ct(e, i) {
        var n = e.context, r = e.frameState, a = e.camera, s = i.viewport, l = t.clone(s, si);
        i.viewport = l;
        var u = ei, c = ti;
        e.mapProjection.project(u, c);
        var d = o.clone(a.position, ii), h = A.clone(a.transform, ri), p = a.frustum.clone();
        a._setTransform(A.IDENTITY);
        var f = A.computeViewportTransformation(l, 0, 1, ni), m = a.frustum.projectionMatrix, _ = a.positionWC.y,
            g = o.fromElements(E.sign(_) * c.x - _, 0, -a.positionWC.x, oi),
            v = V.pointToGLWindowCoordinates(m, f, g, ai);
        v.x = Math.floor(v.x);
        var y = l.x, C = l.width;
        if (0 === _ || v.x <= y || v.x >= y + C) dt(!0, e, i); else if (Math.abs(y + .5 * C - v.x) < 1) l.width = v.x - l.x, a.position.x *= E.sign(a.position.x), a.frustum.right = 0, r.cullingVolume = a.frustum.computeCullingVolume(a.positionWC, a.directionWC, a.upWC), n.uniformState.update(r), dt(!0, e, i), l.x = v.x, a.position.x = -a.position.x, a.frustum.right = -a.frustum.left, a.frustum.left = 0, r.cullingVolume = a.frustum.computeCullingVolume(a.positionWC, a.directionWC, a.upWC), n.uniformState.update(r), dt(!1, e, i); else if (v.x > y + .5 * C) {
            l.width = v.x - y;
            var b = a.frustum.right;
            a.frustum.right = c.x - _, r.cullingVolume = a.frustum.computeCullingVolume(a.positionWC, a.directionWC, a.upWC), n.uniformState.update(r), dt(!0, e, i), l.x = v.x, l.width = y + C - v.x, a.position.x = -a.position.x, a.frustum.left = -a.frustum.right, a.frustum.right = b - 2 * a.frustum.right, r.cullingVolume = a.frustum.computeCullingVolume(a.positionWC, a.directionWC, a.upWC), n.uniformState.update(r), dt(!1, e, i)
        } else {
            l.x = v.x, l.width = y + C - v.x;
            var T = a.frustum.left;
            a.frustum.left = -c.x - _, r.cullingVolume = a.frustum.computeCullingVolume(a.positionWC, a.directionWC, a.upWC), n.uniformState.update(r), dt(!0, e, i), l.x = y, l.width = v.x - y, a.position.x = -a.position.x, a.frustum.right = -a.frustum.left, a.frustum.left = T - 2 * a.frustum.left, r.cullingVolume = a.frustum.computeCullingVolume(a.positionWC, a.directionWC, a.upWC), n.uniformState.update(r), dt(!1, e, i)
        }
        a._setTransform(h), o.clone(d, a.position), a.frustum = p.clone(), i.viewport = s
    }

    function dt(e, t, i, n) {
        var r = t._environmentState, o = t._view, a = r.renderTranslucentDepthForPick;
        e || a || (t.frameState.commandList.length = 0), a || mt(t), o.createPotentiallyVisibleSet(t), e && (p(n) && _t(t, i, n), a || (rt(t), st(t))), it(t, i)
    }

    function ht(e) {
        var t = e._frameState, i = e._view, n = e._environmentState, r = t.passes.render, o = t.passes.offscreen,
            a = e.skyAtmosphere, s = e.globe;
        if (!r || e._mode !== Ee.SCENE2D && i.camera.frustum instanceof I) n.skyAtmosphereCommand = void 0, n.skyBoxCommand = void 0, n.sunDrawCommand = void 0, n.sunComputeCommand = void 0, n.moonCommand = void 0; else {
            p(a) && p(s) && (a.setDynamicAtmosphereColor(s.enableLighting), n.isReadyForAtmosphere = n.isReadyForAtmosphere || s._surface._tilesToRender.length > 0), n.skyAtmosphereCommand = p(a) ? a.update(t) : void 0, n.skyBoxCommand = p(e.skyBox) ? e.skyBox.update(t, e._hdr) : void 0;
            var l = p(e.sun) ? e.sun.update(t, i.passState, e._hdr) : void 0;
            n.sunDrawCommand = p(l) ? l.drawCommand : void 0, n.sunComputeCommand = p(l) ? l.computeCommand : void 0, n.moonCommand = p(e.moon) ? e.moon.update(t) : void 0
        }
        var u = n.clearGlobeDepth = p(s) && (!s.depthTestAgainstTerrain || e.mode === Ee.SCENE2D);
        (n.useDepthPlane = u && e.mode === Ee.SCENE3D) && e._depthPlane.update(t), n.renderTranslucentDepthForPick = !1, n.useWebVR = e._useWebVR && e.mode !== Ee.SCENE2D && !o;
        for (var c = t.mode === Ee.SCENE3D ? t.occluder : void 0, d = t.cullingVolume, h = Yt.planes, f = 0; f < 5; ++f) h[f] = d.planes[f];
        d = Yt, n.isSkyAtmosphereVisible = p(n.skyAtmosphereCommand) && n.isReadyForAtmosphere, n.isSunVisible = e.isVisible(n.sunDrawCommand, d, c), n.isMoonVisible = e.isVisible(n.moonCommand, d, c);
        var m = e.specularEnvironmentMaps, _ = e._specularEnvironmentMapAtlas;
        !p(m) || p(_) && _.url === m ? !p(m) && p(_) && (_.destroy(), e._specularEnvironmentMapAtlas = void 0) : (_ = _ && _.destroy(), e._specularEnvironmentMapAtlas = new ye(m)), p(e._specularEnvironmentMapAtlas) && e._specularEnvironmentMapAtlas.update(t)
    }

    function pt(e) {
        var t = e._frameState;
        e.debugShowFrustumPlanes !== e._debugShowFrustumPlanes && (e.debugShowFrustumPlanes ? e._debugFrustumPlanes = new le({
            camera: e.camera,
            updateOnChange: !1
        }) : e._debugFrustumPlanes = e._debugFrustumPlanes && e._debugFrustumPlanes.destroy(), e._debugShowFrustumPlanes = e.debugShowFrustumPlanes), p(e._debugFrustumPlanes) && e._debugFrustumPlanes.update(t)
    }

    function ft(e) {
        var t = e._frameState, i = t.shadowMaps, n = i.length, r = n > 0 && !t.passes.pick && e.mode === Ee.SCENE3D;
        if (r !== t.shadowState.shadowsEnabled && (++t.shadowState.lastDirtyTime, t.shadowState.shadowsEnabled = r), t.shadowState.lightShadowsEnabled = !1, r) {
            for (var o = 0; o < n; ++o) if (i[o] !== t.shadowState.shadowMaps[o]) {
                ++t.shadowState.lastDirtyTime;
                break
            }
            t.shadowState.shadowMaps.length = 0, t.shadowState.lightShadowMaps.length = 0;
            for (var a = 0; a < n; ++a) {
                var s = i[a];
                s.update(t), t.shadowState.shadowMaps.push(s), s.fromLightSource && (t.shadowState.lightShadowMaps.push(s), t.shadowState.lightShadowsEnabled = !0), s.dirty && (++t.shadowState.lastDirtyTime, s.dirty = !1)
            }
        }
    }

    function mt(e) {
        var t = e._frameState;
        t._scene = e, e._groundPrimitives.update(t), e._primitives.update(t), e._tilesetLayers.update(t), pt(e), ft(e), e._globe && e._globe.render(t)
    }

    function _t(e, t, i) {
        var n = e._context, r = e._frameState, o = e._environmentState, a = e._view, s = e._frameState.passes,
            u = s.pick, c = o.useWebVR;
        o.originalFramebuffer = t.framebuffer, p(e.sun) && e.sunBloom !== e._sunBloom ? (e.sunBloom && !c ? e._sunPostProcess = new Re : p(e._sunPostProcess) && (e._sunPostProcess = e._sunPostProcess.destroy()), e._sunBloom = e.sunBloom) : !p(e.sun) && p(e._sunPostProcess) && (e._sunPostProcess = e._sunPostProcess.destroy(), e._sunBloom = !1);
        var d = e._clearColorCommand;
        l.clone(i, d.color), d.execute(n, t);
        var h = o.useGlobeDepthFramebuffer = p(a.globeDepth);
        h && (a.globeDepth.update(n, t, a.viewport, e._hdr), a.globeDepth.clear(n, t, i));
        var f = a.oit, m = o.useOIT = !u && p(f) && f.isSupported();
        m && (f.update(n, t, a.globeDepth.framebuffer, e._hdr), f.clear(n, t, i), o.useOIT = f.isSupported());
        var _ = e.postProcessStages,
            g = o.usePostProcess = !u && (e._hdr || _.length > 0 || _.ambientOcclusion.enabled || _.fxaa.enabled || _.bloom.enabled);
        if (o.usePostProcessSelected = !1, g && (a.sceneFramebuffer.update(n, a.viewport, e._hdr), a.sceneFramebuffer.clear(n, t, i), _.update(n, r.useLogDepth, e._hdr), _.clear(n), g = o.usePostProcess = _.ready, o.usePostProcessSelected = g && _.hasSelected), o.isSunVisible && e.sunBloom && !c ? (t.framebuffer = e._sunPostProcess.update(t), e._sunPostProcess.clear(n, t, i)) : h ? t.framebuffer = a.globeDepth.framebuffer : g && (t.framebuffer = a.sceneFramebuffer.getFramebuffer()), p(t.framebuffer) && d.execute(n, t), o.useInvertClassification = !u && p(t.framebuffer) && e.invertClassification) {
            var v;
            if (1 === e.frameState.invertClassificationColor.alpha && o.useGlobeDepthFramebuffer && (v = a.globeDepth.framebuffer), p(v) || n.depthTexture) {
                if (e._invertClassification.previousFramebuffer = v, e._invertClassification.update(n), e._invertClassification.clear(n, t), e.frameState.invertClassificationColor.alpha < 1 && m) {
                    var y = e._invertClassification.unclassifiedCommand, C = y.derivedCommands;
                    C.oit = f.createDerivedCommands(y, n, C.oit)
                }
            } else o.useInvertClassification = !1
        }
    }

    function gt(e, t) {
        var i = e._context, n = e._frameState, r = e._environmentState, o = e._view, a = r.useOIT,
            s = r.useGlobeDepthFramebuffer, l = r.usePostProcess, u = r.originalFramebuffer,
            c = s ? o.globeDepth.framebuffer : void 0, d = o.sceneFramebuffer.getFramebuffer(),
            p = o.sceneFramebuffer.getIdFramebuffer();
        if (a && (t.framebuffer = l ? d : u, o.oit.execute(i, t)), l) {
            var f = d;
            s && !a && (f = c);
            var m = e.postProcessStages, _ = f.getColorTexture(0), g = p.getColorTexture(0),
                v = h(c, d).depthStencilTexture;
            m.execute(i, _, v, g), m.copy(i, u)
        }
        a || l || !s || (t.framebuffer = u, o.globeDepth.executeCopyColor(i, t));
        var y = n.useLogDepth;
        if (e.debugShowGlobeDepth && s) {
            et(e, e.debugShowDepthFrustum - 1).executeDebugGlobeDepth(i, t, y)
        }
        if (e.debugShowPickDepth && s) {
            tt(e, e.debugShowDepthFrustum - 1).executeDebugPickDepth(i, t, y)
        }
    }

    function vt(e) {
        for (var t = e._frameState.afterRender, i = 0, n = t.length; i < n; ++i) t[i](), e.requestRender();
        t.length = 0
    }

    function yt(e, t) {
        if (e.debugShowFramesPerSecond) {
            if (!p(e._performanceDisplay)) {
                var i = document.createElement("div");
                i.className = "cesium-performanceDisplay-defaultContainer";
                e._canvas.parentNode.appendChild(i);
                var n = new Ce({container: i});
                e._performanceDisplay = n, e._performanceContainer = i
            }
            e._performanceDisplay.throttled = e.requestRenderMode, e._performanceDisplay.update(t)
        } else p(e._performanceDisplay) && (e._performanceDisplay = e._performanceDisplay && e._performanceDisplay.destroy(), e._performanceContainer.parentNode.removeChild(e._performanceContainer))
    }

    function Ct(e) {
        var t = e._frameState;
        p(e.globe) && e.globe.update(t), It(e), t.creditDisplay.update()
    }

    function bt(e) {
        e._pickPositionCacheDirty = !0;
        var i = e.context, n = i.uniformState, r = e._frameState, a = e._defaultView;
        e._view = a, He(e), r.passes.render = !0, r.passes.postProcess = e.postProcessStages.hasSelected;
        var s = h(e.backgroundColor, l.BLACK);
        e._hdr && (s = l.clone(s, li), s.red = Math.pow(s.red, e.gamma), s.green = Math.pow(s.green, e.gamma), s.blue = Math.pow(s.blue, e.gamma)), r.backgroundColor = s, r.creditDisplay.beginFrame(), e.fog.update(r), n.update(r);
        var u = e.shadowMap;
        p(u) && u.enabled && (o.negate(n.sunDirectionWC, e._sunCamera.direction), r.shadowMaps.push(u)), e._computeCommandList.length = 0, e._overlayCommandList.length = 0;
        var c = a.viewport;
        c.x = 0, c.y = 0, c.width = i.drawingBufferWidth, c.height = i.drawingBufferHeight;
        var d = a.passState;
        d.framebuffer = void 0, d.blendingEnabled = void 0, d.scissorTest = void 0, d.viewport = t.clone(c, d.viewport), p(e.globe) && e.globe.beginFrame(r), ht(e), lt(e, d, s), gt(e, d), d.framebuffer = void 0, ot(e, d), p(e.globe) && (e.globe.endFrame(r), e.globe.tilesLoaded || (e._renderRequested = !0)), r.creditDisplay.endFrame(), i.endFrame()
    }

    function Tt(e, t) {
        try {
            t(e)
        } catch (t) {
            if (e._renderError.raiseEvent(e, t), e.rethrowRenderErrors) throw t
        }
    }

    function St(e, t, i, n, r) {
        var a = e.camera, s = a.frustum;
        p(s._offCenterFrustum) && (s = s._offCenterFrustum);
        var l = 2 * (t.x - r.x) / r.width - 1;
        l *= .5 * (s.right - s.left);
        var u = 2 * (r.height - t.y - r.y) / r.height - 1;
        u *= .5 * (s.top - s.bottom);
        var c = A.clone(a.transform, pi);
        a._setTransform(A.IDENTITY);
        var d = o.clone(a.position, ci);
        o.multiplyByScalar(a.right, l, di), o.add(di, d, d), o.multiplyByScalar(a.up, u, di), o.add(di, d, d), a._setTransform(c), e.mode === Ee.SCENE2D && o.fromElements(d.z, d.x, d.y, d);
        var h = s.getPixelDimensions(r.width, r.height, 1, hi), f = ui;
        return f.right = .5 * h.x, f.left = -f.right, f.top = .5 * h.y, f.bottom = -f.top, f.near = s.near, f.far = s.far, f.computeCullingVolume(d, a.directionWC, a.upWC)
    }

    function wt(e, t, i, n, r) {
        var o = e.camera, a = o.frustum, s = a.near, l = Math.tan(.5 * a.fovy), u = a.aspectRatio * l,
            c = 2 * (t.x - r.x) / r.width - 1, d = 2 * (r.height - t.y - r.y) / r.height - 1, h = c * s * u,
            p = d * s * l, f = a.getPixelDimensions(r.width, r.height, 1, hi), m = f.x * i * .5, _ = f.y * n * .5,
            g = fi;
        return g.top = p + _, g.bottom = p - _, g.right = h + m, g.left = h - m, g.near = s, g.far = a.far, g.computeCullingVolume(o.positionWC, o.directionWC, o.upWC)
    }

    function xt(e, t, i, n, r) {
        var o = e.camera.frustum;
        return o instanceof I || o instanceof M ? St(e, t, i, n, r) : wt(e, t, i, n, r)
    }

    function Et(e, i) {
        var n = e._context, r = e._frameState, o = e._environmentState, a = e._defaultView;
        e._view = a;
        var s = a.viewport;
        s.x = 0, s.y = 0, s.width = n.drawingBufferWidth, s.height = n.drawingBufferHeight;
        var l = a.passState;
        l.viewport = t.clone(s, l.viewport), Ue(r.passes), r.passes.pick = !0, r.passes.depth = !0, r.cullingVolume = xt(e, i, 1, 1, s), ht(e), o.renderTranslucentDepthForPick = !0, l = a.pickDepthFramebuffer.update(n, i, s), lt(e, l, vi), gt(e, l), n.endFrame()
    }

    function At(e, t) {
        var i, n, r = [], o = [], a = [], s = [];
        p(e) || (e = Number.MAX_VALUE);
        for (var l = t(); p(l);) {
            var u = l.object, c = l.position, d = l.exclude;
            if (p(c) && !p(u)) {
                r.push(l);
                break
            }
            if (!p(u) || !p(u.primitive)) break;
            if (!d && (r.push(l), 0 >= --e)) break;
            var h = u.primitive, f = !1;
            "function" == typeof h.getGeometryInstanceAttributes && p(u.id) && (n = h.getGeometryInstanceAttributes(u.id), p(n) && p(n.show) && (f = !0, n.show = z.toValue(!1, n.show), a.push(n))), u instanceof oe && (f = !0, u.show = !1, s.push(u)), f || (h.show = !1, o.push(h)), l = t()
        }
        for (i = 0; i < o.length; ++i) o[i].show = !0;
        for (i = 0; i < a.length; ++i) n = a[i], n.show = z.toValue(!0, n.show);
        for (i = 0; i < s.length; ++i) s[i].show = !0;
        return r
    }

    function Pt(e, t, i, n) {
        var r = t.direction, a = o.mostOrthogonalAxis(r, bi), s = o.cross(r, a, bi), l = o.cross(r, s, Ti);
        n.position = t.origin, n.direction = r, n.up = l, n.right = s, n.frustum.width = h(i, e.pickOffscreenDefaultWidth)
    }

    function Dt(e, t) {
        var i = e._context, n = i.uniformState, r = e._frameState, o = e._pickOffscreenView;
        e._view = o;
        var a = t.ray, s = t.width, l = t.primitives;
        Pt(e, a, s, o.camera), He(e), r.passes.offscreen = !0, r.passes.asynchronous = !0, n.update(r);
        for (var u = r.commandList, c = u.length, d = !0, h = l.length, p = 0; p < h; ++p) {
            var f = l[p];
            if (f.show && e.primitives.contains(f)) {
                var m = f.updateAsync(r);
                d = d && m
            }
        }
        return u.length = c, e._view = e._defaultView, d && t.deferred.resolve(), d
    }

    function It(e) {
        for (var t = e._asyncRayPicks, i = 0; i < t.length; ++i) Dt(e, t[i]) && t.splice(i--, 1)
    }

    function Mt(e, t, i, n, r) {
        for (var o = [], a = e.primitives, s = a.length, l = 0; l < s; ++l) {
            var u = a.get(l);
            u instanceof ae && u.show && (p(i) && -1 !== i.indexOf(u) || o.push(u))
        }
        if (0 === o.length) return ie.resolve(r());
        var c = new Fe(t, n, o);
        return e._asyncRayPicks.push(c), c.promise.then(function () {
            return r()
        })
    }

    function Rt(e, t) {
        return !(!p(e) || !p(t) || 0 === t.length) && (t.indexOf(e) > -1 || t.indexOf(e.primitive) > -1 || t.indexOf(e.id) > -1)
    }

    function Ot(e, i, n, r, o, a) {
        var s = e._context, l = s.uniformState, u = e._frameState, c = e._pickOffscreenView;
        e._view = c, Pt(e, i, r, c.camera), gi = t.clone(c.viewport, gi);
        var d = c.pickFramebuffer.begin(gi, c.viewport);
        e._jobScheduler.disableThisFrame(), He(e), u.invertClassification = !1, u.passes.pick = !0, u.passes.offscreen = !0, u.passes.asynchronous = a, l.update(u), ht(e, c), lt(e, d, vi), gt(e, d);
        var h, f = c.pickFramebuffer.end(s);
        if (e._context.depthTexture) for (var m = c.frustumCommandsList.length, _ = 0; _ < m; ++_) {
            var g = tt(e, _), v = g.getDepth(s, 0, 0);
            if (v > 0 && v < 1) {
                var y = c.frustumCommandsList[_], C = y.near * (0 !== _ ? e.opaqueFrustumNearOffset : 1), b = y.far,
                    T = C + v * (b - C);
                h = F.getPoint(i, T);
                break
            }
        }
        if (e._view = e._defaultView, s.endFrame(), p(f) || p(h)) return {
            object: f,
            position: h,
            exclude: !p(h) && o || Rt(f, n)
        }
    }

    function Lt(e, t, i, n, r, o, a) {
        return At(i, function () {
            return Ot(e, t, n, r, o, a)
        })
    }

    function Nt(e, t, i, n, r, o) {
        var a = Lt(e, t, 1, i, n, r, o);
        if (a.length > 0) return a[0]
    }

    function Ft(e, t, i, n, r, o, a) {
        return Lt(e, t, i, n, r, o, a)
    }

    function Bt(t, i) {
        var n = t.globe, r = p(n) ? n.ellipsoid : t.mapProjection.ellipsoid, s = e._defaultMaxTerrainHeight,
            l = r.geodeticSurfaceNormalCartographic(i, wi), u = a.toCartesian(i, r, Si), c = xi;
        c.origin = u, c.direction = l;
        var d = new F;
        return F.getPoint(c, s, d.origin), o.negate(l, d.direction), d
    }

    function zt(e, t) {
        var i = e.globe, n = p(i) ? i.ellipsoid : e.mapProjection.ellipsoid;
        return Bt(e, a.fromCartesian(t, n, Ei))
    }

    function kt(e, t) {
        var i = e.globe, n = p(i) ? i.ellipsoid : e.mapProjection.ellipsoid;
        return a.fromCartesian(t, n, Ei).height
    }

    function Vt(e, t, i, n) {
        var r = Bt(e, t);
        return Mt(e, r, i, n, function () {
            var t = Nt(e, r, i, n, !0, !0);
            if (p(t)) return kt(e, t.position)
        })
    }

    function Ut(e, t, i, n, r) {
        var a = zt(e, t);
        return Mt(e, a, i, n, function () {
            var t = Nt(e, a, i, n, !0, !0);
            if (p(t)) return o.clone(t.position, r)
        })
    }

    function Gt(e, t, i) {
        if (t.x >= 0 && t.x < e.canvas.clientWidth && t.y >= 0 && t.y < e.canvas.clientHeight) {
            var n = e.pickPositionWorldCoordinates(t, n);
            if (p(n)) {
                var r = o.distance(e.camera.position, n);
                if (i - r > .01 * r) return n
            }
        }
    }

    function Ht(e, t, i, n) {
        var a = o.distance(e.camera.position, i), s = 2 * n + 1;
        s = s * s - 1;
        for (var l = 1, u = new r; s > 0;) {
            u.y = t.y - l;
            for (var c = 1 - l; c <= l; c++) {
                s--, u.x = t.x + c;
                var d = Gt(e, u, a);
                if (p(d)) return d
            }
            u.x = t.x + l;
            for (var c = 1 - l; c <= l; c++) {
                s--, u.y = t.y + c;
                var d = Gt(e, u, a);
                if (p(d)) return d
            }
            u.y = t.y + l;
            for (var c = l - 1; c >= -l; c--) {
                s--, u.x = t.x + c;
                var d = Gt(e, u, a);
                if (p(d)) return d
            }
            u.x = t.x - l;
            for (var c = l - 1; c >= -l; c--) {
                s--, u.y = t.y + c;
                var d = Gt(u, a);
                if (p(d)) return d
            }
            l++
        }
    }

    var Wt = function (e) {
        return function () {
            e.frameState.afterRender.push(function () {
                e.requestRender()
            })
        }
    };
    f(Be.prototype, {
        canvas: {
            get: function () {
                return this._canvas
            }
        }, drawingBufferHeight: {
            get: function () {
                return this._context.drawingBufferHeight
            }
        }, drawingBufferWidth: {
            get: function () {
                return this._context.drawingBufferWidth
            }
        }, maximumAliasedLineWidth: {
            get: function () {
                return Y.maximumAliasedLineWidth
            }
        }, maximumCubeMapSize: {
            get: function () {
                return Y.maximumCubeMapSize
            }
        }, pickPositionSupported: {
            get: function () {
                return this._context.depthTexture
            }
        }, sampleHeightSupported: {
            get: function () {
                return this._context.depthTexture
            }
        }, clampToHeightSupported: {
            get: function () {
                return this._context.depthTexture
            }
        }, invertClassificationSupported: {
            get: function () {
                return this._context.depthTexture
            }
        }, globe: {
            get: function () {
                return this._globe
            }, set: function (e) {
                this._globe = this._globe && this._globe.destroy(), this._globe = e, ze(this, e)
            }
        }, primitives: {
            get: function () {
                return this._primitives
            }
        }, groundPrimitives: {
            get: function () {
                return this._groundPrimitives
            }
        }, tilesetLayers: {
            get: function () {
                return this._tilesetLayers
            }
        }, camera: {
            get: function () {
                return this._view.camera
            }, set: function (e) {
                this._view.camera = e
            }
        }, screenSpaceCameraController: {
            get: function () {
                return this._screenSpaceCameraController
            }
        }, mapProjection: {
            get: function () {
                return this._mapProjection
            }
        }, frameState: {
            get: function () {
                return this._frameState
            }
        }, tweens: {
            get: function () {
                return this._tweens
            }
        }, imageryLayers: {
            get: function () {
                if (p(this.globe)) return this.globe.imageryLayers
            }
        }, pitCollection: {
            get: function () {
                return this._pitCollection
            }
        }, setSurfaceTransparency: {
            get: function () {
                return this._setSurfaceTransparency
            }
        }, waterCollection: {
            get: function () {
                return this._waterCollection
            }
        }, terrainLayers: {
            get: function () {
                return this.globe.terrainLayers
            }
        }, terrainProviderChanged: {
            get: function () {
                if (p(this.globe)) return this.globe.terrainProviderChanged
            }
        }, preUpdate: {
            get: function () {
                return this._preUpdate
            }
        }, postUpdate: {
            get: function () {
                return this._postUpdate
            }
        }, renderError: {
            get: function () {
                return this._renderError
            }
        }, preRender: {
            get: function () {
                return this._preRender
            }
        }, postRender: {
            get: function () {
                return this._postRender
            }
        }, lastRenderTime: {
            get: function () {
                return this._lastRenderTime
            }
        }, context: {
            get: function () {
                return this._context
            }
        }, debugFrustumStatistics: {
            get: function () {
                return this._view.debugFrustumStatistics
            }
        }, scene3DOnly: {
            get: function () {
                return this._frameState.scene3DOnly
            }
        }, orderIndependentTranslucency: {
            get: function () {
                return this._useOIT
            }
        }, id: {
            get: function () {
                return this._id
            }
        }, mode: {
            get: function () {
                return this._mode
            }, set: function (e) {
                e === Ee.SCENE2D ? this.morphTo2D(0) : e === Ee.SCENE3D ? this.morphTo3D(0) : e === Ee.COLUMBUS_VIEW && this.morphToColumbusView(0), this._mode = e
            }
        }, frustumCommandsList: {
            get: function () {
                return this._view.frustumCommandsList
            }
        }, numberOfFrustums: {
            get: function () {
                return this._view.frustumCommandsList.length
            }
        }, terrainExaggeration: {
            get: function () {
                return this._terrainExaggeration
            }
        }, useWebVR: {
            get: function () {
                return this._useWebVR
            }, set: function (e) {
                this._useWebVR = e, this._useWebVR ? (this._frameState.creditDisplay.container.style.visibility = "hidden", this._cameraVR = new re(this), p(this._deviceOrientationCameraController) || (this._deviceOrientationCameraController = new de(this)), this._aspectRatioVR = this.camera.frustum.aspectRatio) : (this._frameState.creditDisplay.container.style.visibility = "visible", this._cameraVR = void 0, this._deviceOrientationCameraController = this._deviceOrientationCameraController && !this._deviceOrientationCameraController.isDestroyed() && this._deviceOrientationCameraController.destroy(), this.camera.frustum.aspectRatio = this._aspectRatioVR, this.camera.frustum.xOffset = 0)
            }
        }, mapMode2D: {
            get: function () {
                return this._mapMode2D
            }
        }, imagerySplitPosition: {
            get: function () {
                return this._frameState.imagerySplitPosition
            }, set: function (e) {
                this._frameState.imagerySplitPosition = e
            }
        }, minimumDisableDepthTestDistance: {
            get: function () {
                return this._minimumDisableDepthTestDistance
            }, set: function (e) {
                this._minimumDisableDepthTestDistance = e
            }
        }, logarithmicDepthBuffer: {
            get: function () {
                return this._logDepthBuffer
            }, set: function (e) {
                e = this._context.fragmentDepth && e, this._logDepthBuffer !== e && (this._logDepthBuffer = e, this._logDepthBufferDirty = !0, this._defaultView.updateFrustums = !0)
            }
        }, gamma: {
            get: function () {
                return this._context.uniformState.gamma
            }, set: function (e) {
                this._context.uniformState.gamma = e
            }
        }, highDynamicRange: {
            get: function () {
                return this._hdr
            }, set: function (e) {
                var t = this._context, i = e && t.depthTexture && (t.colorBufferFloat || t.colorBufferHalfFloat);
                this._hdrDirty = i !== this._hdr, this._hdr = i
            }
        }, highDynamicRangeSupported: {
            get: function () {
                var e = this._context;
                return e.depthTexture && (e.colorBufferFloat || e.colorBufferHalfFloat)
            }
        }, sunColor: {
            get: function () {
                return this._sunColor
            }, set: function (e) {
                this._sunColor = e
            }
        }, opaqueFrustumNearOffset: {
            get: function () {
                return this._frameState.useLogDepth ? .9 : .9999
            }
        }, useSingleFrustum: {
            get: function () {
                return this._useSingleFrustum
            }, set: function (e) {
                this._useSingleFrustum = e, e || (this.camera.frustum.near = 1, this.camera.frustum.far = 5e8)
            }
        }
    }), Be.prototype.getCompressedTextureFormatSupported = function (e) {
        var t = this.context;
        return ("WEBGL_compressed_texture_s3tc" === e || "s3tc" === e) && t.s3tc || ("WEBGL_compressed_texture_pvrtc" === e || "pvrtc" === e) && t.pvrtc || ("WEBGL_compressed_texture_etc1" === e || "etc1" === e) && t.etc1
    }, Be.prototype.updateDerivedCommands = function (e) {
        if (p(e.derivedCommands)) {
            var t = this._frameState, i = this._context, n = !1, r = t.shadowState.lastDirtyTime;
            e.lastDirtyTime !== r && (e.lastDirtyTime = r, e.dirty = !0, n = !0);
            var o = t.useLogDepth, a = this._hdr, s = e.derivedCommands, l = p(s.logDepth), u = p(s.hdr),
                c = p(s.originalCommand), d = o && !l, h = a && !u, f = !(o && a || c);
            if (e.dirty = e.dirty || d || h || f, e.dirty) {
                e.dirty = !1;
                var m = t.shadowState.shadowMaps;
                t.shadowState.shadowsEnabled && e.castShadows && (s.shadows = Ie.createCastDerivedCommand(m, e, n, i, s.shadows)), (l || d) && (s.logDepth = ce.createLogDepthCommand(e, i, s.logDepth), ke(this, s.logDepth.command, n)), (c || f) && ke(this, e, n)
            }
        }
    };
    var qt, jt = new i, Yt = new d;
    Be.prototype.isVisible = function (e, t, i) {
        return p(e) && (!p(e.boundingVolume) || !e.cull || t.computeVisibility(e.boundingVolume) !== w.OUTSIDE && (!p(i) || !e.occlude || !e.boundingVolume.isOccluded(i)))
    };
    var Xt = new A(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1);
    Xt = A.inverseTransformation(Xt, Xt);
    var Qt = new R, Kt = new O, Zt = new I, Jt = new M, $t = new o, ei = new a(Math.PI, E.PI_OVER_TWO), ti = new o,
        ii = new o, ni = new A, ri = new A, oi = new o, ai = new o, si = new t;
    Be.prototype.initializeFrame = function () {
        120 == this._shaderFrameCount++ && (this._shaderFrameCount = 0, this._context.shaderCache.destroyReleasedShaderPrograms(), this._context.textureCache.destroyReleasedTextures()), this._tweens.update(), this._screenSpaceCameraController.update(), p(this._deviceOrientationCameraController) && this._deviceOrientationCameraController.update(), this.camera.update(this._mode), this.camera._updateCameraChanged()
    };
    var li = new l;
    Be.prototype.render = function (e) {
        p(e) || (e = x.now());
        var t = this._frameState;
        this._jobScheduler.resetBudgets();
        var i = this._view.checkForCameraUpdates(this),
            n = !this.requestRenderMode || this._renderRequested || i || this._logDepthBufferDirty || this._hdrDirty || this.mode === Ee.MORPHING;
        if (!n && p(this.maximumRenderTimeChange) && p(this._lastRenderTime)) {
            var r = Math.abs(x.secondsDifference(this._lastRenderTime, e));
            n = n || r > this.maximumRenderTimeChange
        }
        if (n) {
            this._lastRenderTime = x.clone(e, this._lastRenderTime), this._renderRequested = !1, this._logDepthBufferDirty = !1, this._hdrDirty = !1;
            Ge(this, E.incrementWrap(t.frameNumber, 15e6, 1), e)
        }
        if (this._preUpdate.raiseEvent(this, e), Tt(this, Ct), this._postUpdate.raiseEvent(this, e), n && (this._preRender.raiseEvent(this, e), Tt(this, bt), B.update()), yt(this, n), vt(this), n && this._postRender.raiseEvent(this, e), !this._frameState.isPC) {
            var e = b();
            this._fpsFrameCount++;
            var o = e - this._lastFpsSampleTime;
            if (o > 1e3) {
                var a = 1e3 * this._fpsFrameCount / o | 0, s = 100;
                s = a < 20 ? 100 : a < 40 ? 200 : 500, this._frameState.maximumMemoryUsage = 1048576 * s, this._lastFpsSampleTime = e, this._fpsFrameCount = 0
            }
        }
    }, Be.prototype.getActualLightSource = function (e) {
        this._pickPositionCacheDirty = !0;
        var t = this.context, i = t.uniformState, n = this._frameState;
        Ge(this, E.incrementWrap(n.frameNumber, 15e6, 1), e), He(this), n.passes.render = !0, i.update(n);
        var r = this.shadowMap;
        p(r) && r.enabled && (o.negate(i.sunDirectionWC, this._sunCamera.direction), n.shadowMaps.push(r));
        var r = n.shadowMaps[0];
        return r.update(n), r._shadowMapCamera
    }, Be.prototype.getSceneDepth = function (e, t, i) {
        var n = this._context, r = n.uniformState, o = this._frameState;
        Ue(this._frameState.passes), this.camera.setView({
            destination: t.positionWC,
            orientation: {direction: t.directionWC, up: t.upWC}
        }), r.updateCamera(t), i.execute(this.context, e), this._jobScheduler.disableThisFrame(), He(this, o.frameNumber, o.time), o.invertClassification = !1, o.passes.render = !0, r.update(o), ht(this, e), lt(this, e, vi);
        var a = tt(this, 0);
        return gt(this, e), n.endFrame(), vt(this), a
    }, Be.prototype.forceRender = function (e) {
        this._renderRequested = !0, this.render(e)
    }, Be.prototype.requestRender = function () {
        this._renderRequested = !0
    }, Be.prototype.renderDepth = function (e, t, i) {
        var n = this.frameState, r = this.context, o = r.uniformState;
        Ue(this._frameState.passes), n.passes.depth = !0, o.updateCamera(i), e.execute(this.context, t);
        for (var a = i.frustum.computeCullingVolume(i.positionWC, i.directionWC, i.upWC), s = n.commandList, l = s.length, u = 0; u < l; ++u) {
            var c = s[u];
            c.pass !== K.GLOBE && c.pass !== K.CESIUM_3D_TILE && c.pass !== K.OPAQUE && c.pass !== K.TRANSLUCENT || this.isVisible(c, a) && (o.updatePass(c.pass), ke(this, c), Xe(c, this, r, t))
        }
        o.updateCamera(this.camera), o.updateFrustum(this.camera.workingFrustums[0])
    }, Be.prototype.renderColorTexture = function (e, t, i) {
        var n = this.frameState, r = this.context, o = r.uniformState;
        Ue(this._frameState.passes), n.passes.render = !0;
        var a = n.camera;
        n.camera = i, o.updateCamera(i), ht(this, t), e.execute(r, t);
        var s = n.commandList, l = s.length, u = this._environmentState;
        u.isSkyAtmosphereVisible && Xe(u.skyAtmosphereCommand, this, r, t);
        for (var c = 0; c < l; ++c) {
            var d = s[c];
            d.pass !== K.GLOBE && d.pass !== K.CESIUM_3D_TILE && d.pass !== K.OPAQUE && d.pass !== K.TRANSLUCENT && d.pass !== K.ENVIRONMENT && d.pass !== K.OVERLAY || (o.updatePass(d.pass), Xe(d, this, r, t))
        }
        o.updateCamera(this.camera), o.updateFrustum(this.camera.workingFrustums[0]), n.camera = a
    }, Be.prototype.clampLineWidth = function (e) {
        return Math.max(Y.minimumAliasedLineWidth, Math.min(e, Y.maximumAliasedLineWidth))
    };
    var ui = new M, ci = new o, di = new o, hi = new r, pi = new A, fi = new O, mi = 3, _i = 3,
        gi = new t(0, 0, mi, _i), vi = new l(0, 0, 0, 0), yi = new r;
    Be.prototype.pick = function (e, i, n) {
        mi = h(i, 3), _i = h(n, mi);
        var r = this._context, o = r.uniformState, a = this._frameState, s = this._defaultView;
        this._view = s;
        var l = s.viewport;
        l.x = 0, l.y = 0, l.width = r.drawingBufferWidth, l.height = r.drawingBufferHeight;
        var u = s.passState;
        u.viewport = t.clone(l, u.viewport);
        var c = Ae.transformWindowToDrawingBuffer(this, e, yi);
        this._jobScheduler.disableThisFrame(), He(this), a.cullingVolume = xt(this, c, mi, _i, l), a.invertClassification = !1, a.passes.pick = !0, o.update(a), ht(this), gi.x = c.x - .5 * (mi - 1), gi.y = this.drawingBufferHeight - c.y - .5 * (_i - 1), gi.width = mi, gi.height = _i, u = s.pickFramebuffer.begin(gi, s.viewport), lt(this, u, vi), gt(this, u);
        var d = s.pickFramebuffer.end(gi);
        return r.endFrame(), d
    }, Be.prototype._pickObjectId = function (e) {
        var t = this._context, i = t.uniformState, n = this._frameState,
            r = Ae.transformWindowToDrawingBuffer(this, e, yi);
        p(this._pickFramebuffer) || (this._pickFramebuffer = t.createPickFramebuffer()), this._jobScheduler.disableThisFrame(), He(this, n.frameNumber, n.time), n.cullingVolume = xt(this, r, mi, _i), n.passes.pick = !0, i.update(n), gi.x = r.x - .5 * (mi - 1), gi.y = this.drawingBufferHeight - r.y - .5 * (_i - 1);
        var o = this._pickFramebuffer.begin(gi);
        ht(this, o), lt(this, o, vi), gt(this, o), gi.width = 1, gi.height = 1;
        var a = this._pickFramebuffer._pickId(gi);
        return t.endFrame(), vt(this), a
    }, Be.prototype.pickPositionWorldCoordinates = function (e, t) {
        if (this.useDepthPicking) {
            var i = e.toString();
            if (this._pickPositionCacheDirty) this._pickPositionCache = {}, this._pickPositionCacheDirty = !1; else if (this._pickPositionCache.hasOwnProperty(i)) return o.clone(this._pickPositionCache[i], t);
            var n = this._frameState, r = this._context, a = r.uniformState, s = this._defaultView;
            this._view = s;
            var l = Ae.transformWindowToDrawingBuffer(this, e, yi);
            this.pickTranslucentDepth ? Et(this, l) : (He(this, n.frameNumber, n.time), a.update(n), ht(this)), l.y = this.drawingBufferHeight - l.y;
            var u, c = this.camera;
            u = p(c.frustum.fov) ? c.frustum.clone(Qt) : p(c.frustum.infiniteProjectionMatrix) ? c.frustum.clone(Kt) : p(c.frustum.width) ? c.frustum.clone(Zt) : c.frustum.clone(Jt);
            for (var d = s.frustumCommandsList, h = d.length, f = 0; f < h; ++f) {
                var m = tt(this, f), _ = m.getDepth(r, l.x, l.y);
                if (_ > 0 && _ < 1) {
                    var g, v = d[f];
                    return this.mode === Ee.SCENE2D ? (g = c.position.z, c.position.z = g - v.near + 1, u.far = Math.max(1, v.far - v.near), u.near = 1, a.update(n), a.updateFrustum(u)) : (u.near = v.near * (0 !== f ? this.opaqueFrustumNearOffset : 1), u.far = v.far, a.updateFrustum(u)), t = Ae.drawingBufferToWgs84Coordinates(this, l, _, t), this.mode === Ee.SCENE2D && (c.position.z = g, a.update(n)), this._pickPositionCache[i] = o.clone(t), t
                }
            }
            this._pickPositionCache[i] = void 0
        }
    };
    var Ci = new a;
    Be.prototype.pickPosition = function (e, t) {
        if (t = this.pickPositionWorldCoordinates(e, t), p(t) && this.mode !== Ee.SCENE3D) {
            o.fromElements(t.y, t.z, t.x, t);
            var i = this.mapProjection, n = i.ellipsoid, r = i.unproject(t, Ci);
            n.cartographicToCartesian(r, t)
        }
        return t
    }, Be.prototype.drillPick = function (e, t, i, n) {
        var r = this;
        return At(t, function () {
            var t = r.pick(e, i, n);
            if (p(t)) return {object: t, position: void 0, exclude: !1}
        }).map(function (e) {
            return e.object
        })
    };
    var bi = new o, Ti = new o;
    Be.prototype.pickFromRay = function (e, t, i) {
        return Nt(this, e, t, i, !1, !1)
    }, Be.prototype.drillPickFromRay = function (e, t, i, n) {
        return Ft(this, e, t, i, n, !1, !1)
    }, Be.prototype.pickFromRayMostDetailed = function (e, t, i) {
        var n = this;
        return e = F.clone(e), t = p(t) ? t.slice() : t, Mt(this, e, t, i, function () {
            return Nt(n, e, t, i, !1, !0)
        })
    }, Be.prototype.drillPickFromRayMostDetailed = function (e, t, i, n) {
        var r = this;
        return e = F.clone(e), i = p(i) ? i.slice() : i, Mt(this, e, i, n, function () {
            return Ft(r, e, t, i, n, !1, !0)
        })
    };
    var Si = new o, wi = new o, xi = new F, Ei = new a;
    Be.prototype.sampleHeight = function (e, t, i) {
        var n = Bt(this, e), r = Nt(this, n, t, i, !0, !1);
        if (p(r)) return kt(this, r.position)
    }, Be.prototype.clampToHeight = function (e, t, i, n) {
        i instanceof o && (n = i, i = void 0, m("clampToHeight-parameter-change", "clampToHeight now takes an optional width argument before the result argument in Cesium 1.54.  The previous function definition will no longer work in 1.56."));
        var r = zt(this, e), a = Nt(this, r, t, i, !0, !1);
        if (p(a)) return o.clone(a.position, n)
    }, Be.prototype.sampleHeightMostDetailed = function (e, t, i) {
        t = p(t) ? t.slice() : t;
        for (var n = e.length, r = new Array(n), o = 0; o < n; ++o) r[o] = Vt(this, e[o], t, i);
        return ie.all(r).then(function (t) {
            for (var i = t.length, n = 0; n < i; ++n) e[n].height = t[n];
            return e
        })
    }, Be.prototype.clampToHeightMostDetailed = function (e, t, i) {
        t = p(t) ? t.slice() : t;
        for (var n = e.length, r = new Array(n), o = 0; o < n; ++o) r[o] = Ut(this, e[o], t, i, e[o]);
        return ie.all(r).then(function (t) {
            for (var i = t.length, n = 0; n < i; ++n) e[n] = t[n];
            return e
        })
    }, Be.prototype.cartesianToCanvasCoordinates = function (e, t) {
        return Ae.wgs84ToWindowCoordinates(this, e, t)
    }, Be.prototype.completeMorph = function () {
        this._transitioner.completeMorph()
    }, Be.prototype.morphTo2D = function (e) {
        var t, i = this.globe;
        t = p(i) ? i.ellipsoid : this.mapProjection.ellipsoid, e = h(e, 2), this._transitioner.morphTo2D(e, t)
    }, Be.prototype.morphToColumbusView = function (e) {
        var t, i = this.globe;
        t = p(i) ? i.ellipsoid : this.mapProjection.ellipsoid, e = h(e, 2), this._transitioner.morphToColumbusView(e, t)
    }, Be.prototype.morphTo3D = function (e) {
        var t, i = this.globe;
        t = p(i) ? i.ellipsoid : this.mapProjection.ellipsoid, e = h(e, 2), this._transitioner.morphTo3D(e, t)
    }, Be.prototype.isDestroyed = function () {
        return !1
    }, Be.prototype.destroy = function () {
        this._tweens.removeAll(), this._computeEngine = this._computeEngine && this._computeEngine.destroy(), this._screenSpaceCameraController = this._screenSpaceCameraController && this._screenSpaceCameraController.destroy(), this._deviceOrientationCameraController = this._deviceOrientationCameraController && !this._deviceOrientationCameraController.isDestroyed() && this._deviceOrientationCameraController.destroy(), this._primitives = this._primitives && this._primitives.destroy(), this._groundPrimitives = this._groundPrimitives && this._groundPrimitives.destroy(), this._globe = this._globe && this._globe.destroy(), this.skyBox = this.skyBox && this.skyBox.destroy(), this.skyAtmosphere = this.skyAtmosphere && this.skyAtmosphere.destroy(), this._debugSphere = this._debugSphere && this._debugSphere.destroy(), this.sun = this.sun && this.sun.destroy(), this._sunPostProcess = this._sunPostProcess && this._sunPostProcess.destroy(), this._depthPlane = this._depthPlane && this._depthPlane.destroy(), this._transitioner = this._transitioner && this._transitioner.destroy(), this._debugFrustumPlanes = this._debugFrustumPlanes && this._debugFrustumPlanes.destroy(), this._brdfLutGenerator = this._brdfLutGenerator && this._brdfLutGenerator.destroy(), this._defaultView = this._defaultView && this._defaultView.destroy(), this._pickOffscreenView = this._pickOffscreenView && this._pickOffscreenView.destroy(), this._view = void 0, this._removeCreditContainer && this._canvas.parentNode.removeChild(this._creditContainer), this.postProcessStages = this.postProcessStages && this.postProcessStages.destroy(), this._context = this._context && this._context.destroy(), this._frameState.creditDisplay = this._frameState.creditDisplay && this._frameState.creditDisplay.destroy(), p(this._performanceDisplay) && (this._performanceDisplay = this._performanceDisplay && this._performanceDisplay.destroy(), this._performanceContainer.parentNode.removeChild(this._performanceContainer)), this._removeRequestListenerCallback(), this._removeTaskProcessorListenerCallback();
        for (var e = 0; e < this._removeGlobeCallbacks.length; ++e) this._removeGlobeCallbacks[e]();
        return this._removeGlobeCallbacks.length = 0, _(this)
    }, Be.prototype.cartesianToCanvasCoordinates = function (e, t) {
        return Ae.wgs84ToWindowCoordinates(this, e, t)
    };
    var Ai = new F, Pi = new o, Di = new o;
    return Be.prototype.pickGlobe = function (e, t, i) {
        var n, r = this._globe, a = this.camera;
        if (this.pickPositionSupported && (n = this.pickPositionWorldCoordinates(e, Pi), p(i) && p(n))) {
            var s = Ht(this, e, n, i);
            p(s) && (n = s)
        }
        var l = a.getPickRay(e, Ai), u = r.pick(l, this, Di);
        return (p(n) ? o.distance(n, a.positionWC) : Number.POSITIVE_INFINITY) < (p(u) ? o.distance(u, a.positionWC) : Number.POSITIVE_INFINITY) ? o.clone(n, t) : o.clone(u, t)
    }, Be
})