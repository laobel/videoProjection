define([
    'Cesium/Core/CesiumTerrainProvider',
    'Cesium/Scene/Cesium3DTileset',
    'Cesium/Core/defined',
    'Cesium/ThirdParty/knockout',
    'Cesium/Core/ScreenSpaceEventHandler',
    'Cesium/Core/Color',
    'Cesium/Core/ScreenSpaceEventType',
    'Cesium/Scene/WebMapTileServiceImageryProvider',
    'Cesium/Widgets/Viewer/Viewer',
    'Cesium/DESource/DEVideoProjection',
    'domReady!'
], function (
    CesiumTerrainProvider,
    Cesium3DTileset,
    defined,
    knockout,
    ScreenSpaceEventHandler,
    Color,
    ScreenSpaceEventType,
    WebMapTileServiceImageryProvider,
    Viewer,
    DEVideoProjection
) {
    'use strict';

    //天地图
    var tdtImgMap = new WebMapTileServiceImageryProvider({
        url: "https://{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=b0ad70dc306d789204ddb4ec0b7c2b4d",
        layer: "tdtImgBasicLayer1",
        style: "default",
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
        maximumLevel: 18,
        credit: '云 S（2017）065号',
        show: true
    });

    var terrainProvider = new CesiumTerrainProvider({
        //url:'https://maps.ynmap.cn/services/stk-terrain/tiles/4326/?key=njsc8ri2OHtkKtt0cnPVyoBx7Mr9QA7a%2Bc%2FF8OGpqG4%3D'
        url: 'http://data.marsgis.cn/terrain'
    });

    //初始化viewer
    var viewer = new Viewer('cesiumContainer', {
        imageryProvider: tdtImgMap,
        //terrainProvider : terrainProvider,
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        vrButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false
    });

    var scene = viewer.scene;
    var videoProjection = undefined;

    //viewer.scene.globe.depthTestAgainstTerrain = true;

    var tileset = new Cesium3DTileset({
        url: 'http://data.marsgis.cn/3dtiles/qx-shequ/tileset.json'
    });

    viewer.scene.primitives.add(tileset);
    viewer.zoomTo(tileset);


    var viewModel = {
        direction: 0.0,
        pitch: 0.0,
        hint: true,
        distance: 200.0,
        verticalFov: 60.0,
        horizontalFov: 60.0,
        visibleAreaColor: "rgb(0, 255, 0, 0.6)",
        invisibleAreaColor: "rgb(255, 0, 0, 0.6)"
    };
    knockout.track(viewModel);
    var toolbar = document.getElementById('container');
    knockout.applyBindings(viewModel, toolbar);

    //调整视频投放相关参数
    knockout.getObservable(viewModel, 'direction').subscribe(
        function (newValue) {
            if (defined(videoProjection)) {
                videoProjection.direction = parseFloat(newValue);
            }
        }
    );
    knockout.getObservable(viewModel, 'pitch').subscribe(
        function (newValue) {
            if (defined(videoProjection)) {
                videoProjection.pitch = parseFloat(newValue);
            }
        }
    );
    knockout.getObservable(viewModel, 'hint').subscribe(
        function (newValue) {
            if (defined(videoProjection)) {
                videoProjection.showHintLine = newValue;
            }
        }
    );
    knockout.getObservable(viewModel, 'distance').subscribe(
        function (newValue) {
            if (defined(videoProjection)) {
                videoProjection.distance = parseFloat(newValue);
            }
        }
    );
    knockout.getObservable(viewModel, 'verticalFov').subscribe(
        function (newValue) {
            if (defined(videoProjection)) {
                videoProjection.verticalFov = parseFloat(newValue);
            }
        }
    );
    knockout.getObservable(viewModel, 'horizontalFov').subscribe(
        function (newValue) {
            if (defined(videoProjection)) {
                videoProjection.horizontalFov = parseFloat(newValue);
            }
        }
    )
    var handler = new ScreenSpaceEventHandler(scene.canvas);
    var start = false;
    $('#analyze').on('click', function () {
        handler.setInputAction(function (e) {
            start = true;
            if (!defined(videoProjection)) {
                //创建视频投放分析对象
                var videoElement = document.getElementById('trailer');
                videoProjection = new DEVideoProjection(viewer, videoElement);
                scene.primitives.add(videoProjection);
            }
            videoProjection.distance = 0;

            var positionWC = scene.pickPosition(e.position);

            videoProjection.viewerPosition = positionWC;
            if ($('#firstCamera').is(':checked')) {
                //设置视频投放观察点
                videoProjection.viewerPosition = viewer.camera.positionWC.clone();
            }

            viewer.entities.add({
                position: videoProjection.viewerPosition,
                point: {
                    color: Color.YELLOW,
                    pixelSize: 10
                }
            });

        }, ScreenSpaceEventType.LEFT_CLICK);
        handler.setInputAction(function (e) {
            if (start) {
                handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
                var targetPosition = scene.pickPosition(e.endPosition);
                //设置视频投放目标点
                videoProjection.setTargetPoint(targetPosition);
            }
        }, ScreenSpaceEventType.MOUSE_MOVE);
        handler.setInputAction(function (e) {
            if (defined(videoProjection) && start) {
                handler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
                viewModel.direction = videoProjection.direction.toFixed(6);
                viewModel.pitch = videoProjection.pitch.toFixed(6);
                viewModel.distance = videoProjection.distance.toFixed(6);
                viewModel.horizontalFov = videoProjection.horizontalFov.toFixed(6);
                viewModel.verticalFov = videoProjection.verticalFov.toFixed(6);
            }
            start = false;
        }, ScreenSpaceEventType.RIGHT_CLICK);
    });
    $('#observer').on('click', function () {
        if (defined(videoProjection)) {
            //切换到观察视角
            videoProjection.locateToViewer();
        }
    });
    $('#clear').on('click', function () {
        if (defined(videoProjection)) {
            videoProjection.distance = 0;
            viewer.entities.removeAll();
        }
    })
});
