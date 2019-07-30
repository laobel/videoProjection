uniform sampler2D u_texture;
uniform vec4 u_bgColor;
uniform float u_transparency;
uniform bool u_useClip;
uniform vec4 u_clipBounds;
uniform sampler2D u_clipTexture;
uniform bool u_usePit;
uniform vec4 u_pitBounds;
uniform sampler2D u_pitTexture;
uniform bool u_useColorTable;
uniform sampler2D u_colorTexture;
uniform vec2 u_colorRange;
uniform int u_displayMode;
uniform bool u_useOverlay;
uniform vec4 u_overlayBounds;
uniform sampler2D u_overlayTexture;

varying vec2 v_textureCoordinates;
varying vec3 v_vertex;

bool isPointInBound(vec2 point, vec4 bounds) {
    return (point.x>bounds.x&&point.x<bounds.z&&point.y<bounds.y&&point.y>bounds.w);
}

void main()
{
    if (u_useClip && true) { // 多边形裁剪；'&& true'是用于解决部分ati显卡崩溃的问题。
        if (!isPointInBound(v_vertex.xy, u_clipBounds)) {
            discard;
            return;
        }

        vec2 clipTexCoord = vec2((v_vertex.x-u_clipBounds.x)/(u_clipBounds.z-u_clipBounds.x),
        (v_vertex.y-u_clipBounds.w)/(u_clipBounds.y-u_clipBounds.w));
        if (texture2D(u_clipTexture, clipTexCoord).x < 0.5) {
            discard;
            return;
        }
    }

    if (u_usePit && isPointInBound(v_vertex.xy, u_pitBounds)) { // 多边形挖坑
        vec2 pitTexCoord = vec2((v_vertex.x-u_pitBounds.x)/(u_pitBounds.z-u_pitBounds.x),
        (v_vertex.y-u_pitBounds.w)/(u_pitBounds.y-u_pitBounds.w));
        if (texture2D(u_pitTexture, pitTexCoord).x > 0.5) {
            discard;
            return;
        }
    }

    vec4 heightmapColor = vec4(1.0);
    if (u_useColorTable && u_displayMode > 0) { // 根据高度分层设色
        heightmapColor = texture2D(u_colorTexture, vec2((v_vertex.z-u_colorRange.x)/(u_colorRange.y-u_colorRange.x), 0.5));
        if (u_displayMode == 1) {
            gl_FragColor = heightmapColor;
            return;
        }
    }


    vec4 color = vec4(u_transparency);
    if(u_bgColor.r < 1.0 || u_bgColor.g < 1.0 || u_bgColor.b < 1.0 || u_bgColor.a < 1.0) {
        color.rgb = u_bgColor.rgb;
    } else {
        color.rgb = texture2D(u_texture, v_textureCoordinates).rgb;
    }

    if (u_useOverlay && isPointInBound(v_vertex.xy, u_overlayBounds)) { // 叠加影像
        vec2 overlayTexCoord = vec2((v_vertex.x-u_overlayBounds.x)/(u_overlayBounds.z-u_overlayBounds.x),
        (v_vertex.y-u_overlayBounds.w)/(u_overlayBounds.y-u_overlayBounds.w));
        vec4 overlayColor = texture2D(u_overlayTexture, overlayTexCoord);
        color.rgb = overlayColor.rgb * overlayColor.a + color.rgb * (1.0-overlayColor.a);
    }

    gl_FragColor = color * heightmapColor;
    gl_FragColor = czm_gammaCorrect(gl_FragColor);
}
