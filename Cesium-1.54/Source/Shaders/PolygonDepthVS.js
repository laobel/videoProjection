//This file is automatically rebuilt by the Cesium build process.
define(function() {
    'use strict';
    return "attribute vec3 position;\n\
varying vec2 depth;\n\
void main()\n\
{\n\
    vec4 pos = vec4(position.xyz,1.0);\n\
    depth = pos.zw;\n\
    pos.z = 0.0;\n\
    gl_Position = czm_projection*pos;\n\
\n\
}\n\
";
});