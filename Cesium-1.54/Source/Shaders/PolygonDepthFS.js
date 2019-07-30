//This file is automatically rebuilt by the Cesium build process.
define(function() {
    'use strict';
    return "varying vec2 depth;\n\
\n\
vec4 packDepth(float depth)\n\
{\n\
    const vec4 bias = vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);\n\
\n\
    float r = depth;\n\
    float g = fract(r * 255.0);\n\
    float b = fract(g * 255.0);\n\
    float a = fract(b * 255.0);\n\
    vec4 color = vec4(r, g, b, a);\n\
\n\
    return color - (color.yzww * bias);\n\
}\n\
\n\
void main()\n\
{\n\
    float fDepth = (depth.x / 5000.0)/2.0 + 0.5;\n\
    gl_FragColor = packDepth(fDepth);\n\
}\n\
";
});