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
		snowColor: 0xffffff,
		snowColorDark: 0xf485a2,
		snowParticleColor: 0xffffff,
		snowParticleColorDark: 0x000000,

		snowParticleBounds:  {x:100.0, y:40.0, z:30.0 },
		snowParticleDiameter: 20.0,
		snowParticleDiameterDark: 20.0,
		snowParticleWindSpeed: 1.0,
		snowParticleWindSpeedDark: 0.7,
		snowParticleWindDir: {x:-1.5,y:-1.0,z:0.0},
		snowParticleWindDirDark: {x:0.0,y:1.0,z:0.0},

		hypercubeRadius : 1.8,
		hypercubeInnerCoeff : 0.65,
		hypercubeMovementSpeed: 0.95,

		ambientLightColor : 0x9691bb,
		ambientLightColorDark: 0x425175,
		clearColor : 0x9ee3de,
		clearColorDark : 0x4e3e64,
	};
};