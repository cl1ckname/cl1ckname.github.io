export const TreeFrag = `
precision mediump float;
uniform vec3 color;
void main() {
   gl_FragColor = vec4(color, 1.0);
}
`

export const TreeVert = `
attribute vec2 a_position;
uniform mat3 u_transform;
void main() {
   vec3 ext = vec3(a_position, 1.0);
   ext = ext * u_transform;
   gl_Position = vec4(ext.x, ext.y, 0.0, 1.0);
}
`