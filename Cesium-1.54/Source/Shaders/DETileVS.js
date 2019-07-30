//This file is automatically rebuilt by the Cesium build process.
define(function() {
    'use strict';
    return "attribute vec3 position;\n\
attribute vec2 textureCoordinates;\n\
\n\
uniform mat4 u_modelViewMatrix;\n\
uniform bool u_bFlatten;\n\
uniform sampler2D u_polygonTexture;\n\
uniform vec4 u_polygonBounds;\n\
\n\
varying vec2 v_textureCoordinates;\n\
varying vec3 v_vertex;\n\
varying vec2 v_bInFlatten;\n\
\n\
bool isPointInBound(vec4 point, vec4 bounds)\n\
{\n\
    return (point.x>bounds.x&&point.x<bounds.z&&point.y<bounds.y&&point.y>bounds.w);\n\
}\n\
\n\
float unpackDepth(const in vec4 rgba_depth)\n\
{\n\
    const vec4 bitShifts = vec4(1.0, 1.0 / 255.0, 1.0 / (255.0 * 255.0), 1.0 / (255.0 * 255.0 * 255.0));\n\
    float depth=dot(rgba_depth, bitShifts);\n\
    return depth;\n\
}\n\
\n\
void main()\n\
{\n\
    vec4 viewPos = vec4(position.xyz,1.0);\n\
    v_vertex = viewPos.xyz;\n\
    v_bInFlatten = vec2(0.0,0.0);\n\
\n\
    if (isPointInBound(viewPos, u_polygonBounds)){\n\
        vec2 texCoord;\n\
        texCoord.x = (viewPos.x-u_polygonBounds.x)/(u_polygonBounds.z-u_polygonBounds.x);\n\
        texCoord.y = (viewPos.y-u_polygonBounds.w)/(u_polygonBounds.y-u_polygonBounds.w);\n\
\n\
        float texelSize = 1.0/4096.0;\n\
        float depth0 = unpackDepth(texture2D(u_polygonTexture, texCoord.xy));\n\
        float depth1 = unpackDepth(texture2D(u_polygonTexture, texCoord.xy + vec2(-texelSize,0.0)));\n\
        float depth2 = unpackDepth(texture2D(u_polygonTexture, texCoord.xy + vec2(texelSize,0.0)));\n\
        float depth3 = unpackDepth(texture2D(u_polygonTexture, texCoord.xy + vec2(0.0,-texelSize)));\n\
        float depth4 = unpackDepth(texture2D(u_polygonTexture, texCoord.xy + vec2(0.0,texelSize)));\n\
\n\
        float depth =  max( max( max( max( depth0, depth1),depth2), depth3), depth4);\n\
        float z = (depth - 0.5)*2.0*5000.0;\n\
        if(abs(depth) > 0.00001){\n\
            v_bInFlatten = vec2(1.0,1.0);\n\
            viewPos.z = z;\n\
        }\n\
    }\n\
\n\
    gl_Position = czm_projection* u_modelViewMatrix* viewPos;\n\
    v_textureCoordinates = textureCoordinates;\n\
}\n\
";
});