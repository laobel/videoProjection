//This file is automatically rebuilt by the Cesium build process.
define(function() {
    'use strict';
    return "uniform sampler2D u_texture;\n\
uniform vec4 u_bgColor;\n\
uniform float u_transparency;\n\
uniform bool u_useClip;\n\
uniform vec4 u_clipBounds;\n\
uniform sampler2D u_clipTexture;\n\
uniform bool u_usePit;\n\
uniform vec4 u_pitBounds;\n\
uniform sampler2D u_pitTexture;\n\
uniform bool u_useColorTable;\n\
uniform sampler2D u_colorTexture;\n\
uniform vec2 u_colorRange;\n\
uniform int u_displayMode;\n\
uniform bool u_useOverlay;\n\
uniform vec4 u_overlayBounds;\n\
uniform sampler2D u_overlayTexture;\n\
\n\
varying vec2 v_textureCoordinates;\n\
varying vec3 v_vertex;\n\
\n\
bool isPointInBound(vec2 point, vec4 bounds) {\n\
    return (point.x>bounds.x&&point.x<bounds.z&&point.y<bounds.y&&point.y>bounds.w);\n\
}\n\
\n\
void main()\n\
{\n\
    if (u_useClip && true) { // 多边形裁剪；'&& true'是用于解决部分ati显卡崩溃的问题。\n\
        if (!isPointInBound(v_vertex.xy, u_clipBounds)) {\n\
            discard;\n\
            return;\n\
        }\n\
\n\
        vec2 clipTexCoord = vec2((v_vertex.x-u_clipBounds.x)/(u_clipBounds.z-u_clipBounds.x),\n\
        (v_vertex.y-u_clipBounds.w)/(u_clipBounds.y-u_clipBounds.w));\n\
        if (texture2D(u_clipTexture, clipTexCoord).x < 0.5) {\n\
            discard;\n\
            return;\n\
        }\n\
    }\n\
\n\
    if (u_usePit && isPointInBound(v_vertex.xy, u_pitBounds)) { // 多边形挖坑\n\
        vec2 pitTexCoord = vec2((v_vertex.x-u_pitBounds.x)/(u_pitBounds.z-u_pitBounds.x),\n\
        (v_vertex.y-u_pitBounds.w)/(u_pitBounds.y-u_pitBounds.w));\n\
        if (texture2D(u_pitTexture, pitTexCoord).x > 0.5) {\n\
            discard;\n\
            return;\n\
        }\n\
    }\n\
\n\
    vec4 heightmapColor = vec4(1.0);\n\
    if (u_useColorTable && u_displayMode > 0) { // 根据高度分层设色\n\
        heightmapColor = texture2D(u_colorTexture, vec2((v_vertex.z-u_colorRange.x)/(u_colorRange.y-u_colorRange.x), 0.5));\n\
        if (u_displayMode == 1) {\n\
            gl_FragColor = heightmapColor;\n\
            return;\n\
        }\n\
    }\n\
\n\
\n\
    vec4 color = vec4(u_transparency);\n\
    if(u_bgColor.r < 1.0 || u_bgColor.g < 1.0 || u_bgColor.b < 1.0 || u_bgColor.a < 1.0) {\n\
        color.rgb = u_bgColor.rgb;\n\
    } else {\n\
        color.rgb = texture2D(u_texture, v_textureCoordinates).rgb;\n\
    }\n\
\n\
    if (u_useOverlay && isPointInBound(v_vertex.xy, u_overlayBounds)) { // 叠加影像\n\
        vec2 overlayTexCoord = vec2((v_vertex.x-u_overlayBounds.x)/(u_overlayBounds.z-u_overlayBounds.x),\n\
        (v_vertex.y-u_overlayBounds.w)/(u_overlayBounds.y-u_overlayBounds.w));\n\
        vec4 overlayColor = texture2D(u_overlayTexture, overlayTexCoord);\n\
        color.rgb = overlayColor.rgb * overlayColor.a + color.rgb * (1.0-overlayColor.a);\n\
    }\n\
\n\
    gl_FragColor = color * heightmapColor;\n\
    gl_FragColor = czm_gammaCorrect(gl_FragColor);\n\
}\n\
";
});