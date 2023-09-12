export const SolidColor = `
precision mediump float;

void main() {
gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

export const PoolVertShader = `
precision mediump float;

attribute vec2 vertPosition;

void main() {
    gl_Position = vec4(vertPosition, 0.0, 1.0);
}
`
export const PoolFragShader = `
	
precision highp float;

uniform vec2 resol;
uniform int n;
uniform float scale;
uniform float roots[12];
uniform float xx;
uniform float yy;
uniform vec3 colors[12];
uniform int max_its;

const int MAX_ITS = 300;

vec2 cmul(vec2 x, vec2 y) {
	return vec2(x.x * y.x - x.y * y.y, x.x * y.y + x.y * y.x);
}

vec2 cdiv(vec2 x, vec2 y) {
	float d = (y.x * y.x + y.y * y.y);
	return vec2((x.x * y.x + x.y * y.y) / d, (y.x * x.y - x.x * y.y) / d);
	
}

vec2 cpow(vec2 x, int p) {
	vec2 res = vec2(1, 0);
	for (int i = 0; i <= MAX_ITS; i++) {
		if (i == p) {break;}
		res = cmul(res, x);
	}
	return res;
}

vec2 transform(float phi) {
	return vec2(cos(phi), sin(phi));
}

float cdist(vec2 x, vec2 y) {
	return length((x-y));
}

void main( void ) {

float escale = exp(scale);
vec2 pos = ( gl_FragCoord.xy / resol.xy) * escale * 2.0;
pos.x = pos.x - escale + xx;
pos.y = pos.y - escale - yy;
pos.x = pos.x*(resol.x / resol.y);

vec2 zi = pos;
for (int i = 0; i < MAX_ITS; i++) {
	if (i == max_its) {break;}
	zi = zi - cdiv(cpow(zi, n) - vec2(1), float(n) * cpow(zi, n-1));
}

int mi = 0;
float md =  cdist(transform(roots[0]), zi);
for (int i = 0; i < MAX_ITS; i++) {
	if (i == n) { break; }

	vec2 point = transform(roots[i]);

	float dst = cdist(point, zi);
	if (dst < md) {
		md = dst;
		mi = i;
	}
}
vec3 color = vec3(1.0);
for (int i = 0; i < MAX_ITS; i++) {
	if (i == n) { break; }
	vec2 point = transform(roots[i]);

	if (cdist(pos, point) < 0.01) {
		color = vec3(1., 0., 0.);
	}
}
for (int i = 0; i < 12; i++) {
    if (i == mi) {
        color = colors[i];
        break;
    }
}
gl_FragColor = vec4(color / 255., 1);
}
`;