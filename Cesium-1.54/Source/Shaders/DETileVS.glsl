attribute vec3 position;
attribute vec2 textureCoordinates;

uniform mat4 u_modelViewMatrix;
uniform bool u_bFlatten;
uniform sampler2D u_polygonTexture;
uniform vec4 u_polygonBounds;

varying vec2 v_textureCoordinates;
varying vec3 v_vertex;
varying vec2 v_bInFlatten;

bool isPointInBound(vec4 point, vec4 bounds)
{
    return (point.x>bounds.x&&point.x<bounds.z&&point.y<bounds.y&&point.y>bounds.w);
}

float unpackDepth(const in vec4 rgba_depth)
{
    const vec4 bitShifts = vec4(1.0, 1.0 / 255.0, 1.0 / (255.0 * 255.0), 1.0 / (255.0 * 255.0 * 255.0));
    float depth=dot(rgba_depth, bitShifts);
    return depth;
}

void main()
{
    vec4 viewPos = vec4(position.xyz,1.0);
    v_vertex = viewPos.xyz;
    v_bInFlatten = vec2(0.0,0.0);

    if (isPointInBound(viewPos, u_polygonBounds)){
        vec2 texCoord;
        texCoord.x = (viewPos.x-u_polygonBounds.x)/(u_polygonBounds.z-u_polygonBounds.x);
        texCoord.y = (viewPos.y-u_polygonBounds.w)/(u_polygonBounds.y-u_polygonBounds.w);

        float texelSize = 1.0/4096.0;
        float depth0 = unpackDepth(texture2D(u_polygonTexture, texCoord.xy));
        float depth1 = unpackDepth(texture2D(u_polygonTexture, texCoord.xy + vec2(-texelSize,0.0)));
        float depth2 = unpackDepth(texture2D(u_polygonTexture, texCoord.xy + vec2(texelSize,0.0)));
        float depth3 = unpackDepth(texture2D(u_polygonTexture, texCoord.xy + vec2(0.0,-texelSize)));
        float depth4 = unpackDepth(texture2D(u_polygonTexture, texCoord.xy + vec2(0.0,texelSize)));

        float depth =  max( max( max( max( depth0, depth1),depth2), depth3), depth4);
        float z = (depth - 0.5)*2.0*5000.0;
        if(abs(depth) > 0.00001){
            v_bInFlatten = vec2(1.0,1.0);
            viewPos.z = z;
        }
    }

    gl_Position = czm_projection* u_modelViewMatrix* viewPos;
    v_textureCoordinates = textureCoordinates;
}
