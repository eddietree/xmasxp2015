var Settings = function() {

	return {
		debug : true,
		showDebugObjects : false,

		cameraFOV: 50.0,
		cameraStartPos : {x:6.82, y:2.1, z:36.95},

		cameraC4dRadius: 38.0,
		cameraC4dTheta: 7.7,
		cameraC4dPhi: 1.5,
		cameraC4dPosLookAt: {x:2.93, y:0.95, z:-0.33},

		fogEnabled: true,
		fogDensity: 0.0165,

		vignetteAlpha: 0.3,
		vignetteRadius: 0.4,

		snowSpeed: 2.6,
		snowHeightCoeff: 1.0,

		snowParticleBounds:  {x:100.0, y:40.0, z:30.0 },
		snowParticleDiameter: 20.0,

		hypercubeRadius : 1.8,
		hypercubeInnerCoeff : 0.65,
		hypercubeMovementSpeed: 0.9,

		ambientLightColor : 0x9691bb,
		clearColor : 0x9ee3de,
	};
};