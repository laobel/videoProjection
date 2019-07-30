varying vec2 depth;

vec4 packDepth(float depth)
{
    const vec4 bias = vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);

    float r = depth;
    float g = fract(r * 255.0);
    float b = fract(g * 255.0);
    float a = fract(b * 255.0);
    vec4 color = vec4(r, g, b, a);

    return color - (color.yzww * bias);
}

void main()
{
    float fDepth = (depth.x / 5000.0)/2.0 + 0.5;
    gl_FragColor = packDepth(fDepth);
}
