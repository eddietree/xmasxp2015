var Settings = function() {

	return {
		debug : false,
		debugForceLoading : false,
		showDebugObjects : false,
		antiAliasing : true,

		cameraFOV: 50.0,
		cameraStartPos : {x:6.82, y:2.1, z:36.95},

		cameraC4dRadius: 35.0,
		cameraC4dRadiusIntro: 70.0,
		cameraC4dTheta: 7.7,
		cameraC4dPhi: 1.5,
		cameraC4dPosLookAt: {x:2.93, y:0.95, z:-0.33},

		cameraC4dThetaRange: 0.3,
		cameraC4dPhiRange: 0.3,

		fogEnabled: true,
		fogDensity: 0.0165,

		// sound
		mute : false,

		// fade
		fadeAlpha:0.0,
		fadeColor:0xffffff,
		fadeColorDark:0xffffff,

		sunshaftAlpha:0.2,
		sunshaftAlphaDark:0.2,

		// vignette
		vignetteAlpha: 0.3,
		vignetteAlphaDark: 0.5,
		vignetteRadius: 0.4,
		vignetteRadiusDark: 0.0,

		ribbonAlpha:1.0,
		ribbonAlphaDark:-0.5,

		// snow
		snowSpeed: 2.0,
		snowSpeedDark: 1.0,
		snowHeightCoeff: 1.0,
		snowHeightCoeffDark: 5.0,
		snowColor: 0xffffff,
		//snowColorDark: 0xf485a2,
		snowColorDark: 0x000000,

		// snow paritlces
		snowParticleColor: 0xffffff,
		snowParticleColorDark: 0x252c46,//0x106ff7,
		snowParticleBounds:  {x:100.0, y:40.0, z:30.0 },
		snowParticleDiameter: 20.0,
		snowParticleDiameterDark: 45.0,
		snowParticleWindSpeed: 1.0,
		snowParticleWindSpeedDark: 0.8,
		snowParticleWindDir: {x:-1.5,y:-1.0,z:0.0},
		snowParticleWindDirDark: {x:0.0,y:1.0,z:0.0},

		mainLightIntensity: 2.0,
		mainLightIntensityDark: 5.0,

		mainLightDistance: 27.0,
		mainLightDistanceDark: 6.0,

		hypercubeRadius : 1.6,
		hypercubeInnerCoeff : 0.65,
		hypercubeMovementSpeed: 0.95,

		ambientLightColor : 0x9691bb,
		ambientLightColorDark: 0x303134,
		clearColor : 0x9ee3de,
		clearColorDark : 0x4e3e64,
	};
};