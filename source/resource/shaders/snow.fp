varying float vTime;
varying vec3 vNormal;

void main() {

	vec3 lightDir = vec3(0,1,0);
  	gl_FragColor = vec4( vNormal, 1.0);
}