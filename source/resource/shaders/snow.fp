uniform vec3 uColorSky;

varying float vTime;
varying vec3 vNormal;

void main() {

	vec3 lightDir = vec3(0,1,0);
	vec3 color0 = pow(uColorSky, vec3(3.0));
	vec3 color1 = vec3(1);

	float phong = dot( lightDir, vNormal );
	vec3 color = mix( color0, color1, phong);

  	gl_FragColor = vec4( color, 1.0);
}