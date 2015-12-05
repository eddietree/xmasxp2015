uniform float uVignetteAlpha;
uniform float uVignetteRadius;

varying vec2 vUv;

void main() {
	vec4 filterColor = vec4(vUv,0.0,0.1);

	float vigCoeff = smoothstep( uVignetteRadius, 1.6, length(vUv*2.0 - vec2(1.0))) * uVignetteAlpha;
	//filterColor = mix( filterColor, vec4(0.0,0.0,0.0,1.0), vigCoeff );
	filterColor = vec4(0.0,0.0,0.0, vigCoeff);
  	gl_FragColor = filterColor; 
}