export const TreeFrag = `
precision mediump float;
 
void main() {
   gl_FragColor = vec4(0.0, 0.5, 1.0, 1.0);
}
`

export const TreeVert = `
attribute vec2 a_position;
 
void main() {
   gl_Position = vec4(a_position, 0.0, 1.0);
}
`