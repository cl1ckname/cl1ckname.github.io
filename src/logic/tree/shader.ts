// The whole tree is one instanced draw call: a unit quad, `2^n - 1` instances.
// Instance `i` renders square `s = i + 1`; the bits of `s` below its top bit are
// the path from the root (0 = left branch, 1 = right). The vertex shader folds
// the per-branch affine matrices along that path, so no geometry is built or
// uploaded on the CPU and animating the wobble is just a uniform update.
//
// Every square is the canonical rectangle `[0,1] x [0,-bl]` mapped by a
// similarity. `u_baseL` / `u_baseR` take a child's canonical space into its
// parent's; the wobble is applied as a shear on the square that is drawn
// (`u_wobbleDraw`) and as a translation on the branch that carries the subtree
// (`u_wobbleSubtree`).
//
// Colour is a two-stop gradient evaluated on the GPU: `t = log2(s) / n` runs
// from 0 at the trunk to 1 at the tips (same basis the old presets used).

export const TreeVert = `#version 300 es
precision highp float;
precision highp int;

in vec2 a_corner;   // {0,1}^2

uniform mat3 u_root;
uniform mat3 u_baseL;
uniform mat3 u_baseR;
uniform mat3 u_baseLAlt;
uniform mat3 u_baseRAlt;
uniform mat3 u_wobbleDraw;
uniform mat3 u_wobbleSubtree;
uniform bool u_alternation;
uniform float u_bl;

uniform vec3 u_colorRoot;
uniform vec3 u_colorTip;
uniform float u_depth;   // n, for the colour ramp

uniform float u_scale;   // zoom factor
uniform vec2 u_offset;   // pan, in clip space
uniform vec2 u_resol;    // canvas size, for aspect correction

out vec3 v_color;

void main() {
    int s = gl_InstanceID + 1;

    // level = floor(log2(s))
    int level = 0;
    for (int k = 1; k < 31; k++) {
        if ((s >> k) == 0) {
            level = k - 1;
            break;
        }
    }

    mat3 m = u_root;
    for (int j = level - 1; j >= 0; j--) {
        int ancestor = s >> (j + 1);
        bool useAlt = u_alternation && (ancestor == 1 || (ancestor & 1) == 0);

        mat3 base = u_baseL;
        if (((s >> j) & 1) == 0) {
            base = useAlt ? u_baseLAlt : u_baseL;
        } else {
            base = useAlt ? u_baseRAlt : u_baseR;
        }

        m = m * base;
        m = m * (j == 0 ? u_wobbleDraw : u_wobbleSubtree);
    }

    vec2 corner = vec2(a_corner.x, -a_corner.y * u_bl);
    vec2 world = (m * vec3(corner, 1.0)).xy;

    vec2 pos = world * u_scale;
    float aspect = u_resol.x / u_resol.y;
    if (aspect > 1.0) {
        pos.x /= aspect;
    } else {
        pos.y *= aspect;
    }
    pos += u_offset;

    gl_Position = vec4(pos, 0.0, 1.0);

    float t = clamp(log2(float(s)) / max(u_depth, 1.0), 0.0, 1.0);
    v_color = mix(u_colorRoot, u_colorTip, t);
}
`;

export const TreeFrag = `#version 300 es
precision mediump float;

in vec3 v_color;
out vec4 fragColor;

void main() {
    fragColor = vec4(v_color, 1.0);
}
`;
