function v3(x, y, z)
{
	return new THREE.Vector3(x,y,z);
}

function v2(x, y)
{
	return new THREE.Vector2(x,y);
}

function randBetween(x,y)
{
	return x + (y-x)*Math.random();
}

function clamp(minVal, maxVal, val)
{
	return Math.max(minVal, Math.min(val, maxVal));
}

function spherical( theta, phi, radius ) {
	radius = radius | 1.0;

	var sinPhi = Math.sin(phi);
	var cosPhi = Math.cos(phi);
	var sinTheta = Math.sin(theta);
	var cosTheta = Math.cos(theta);

	var x = radius * cosTheta * sinPhi;
	var z = radius * sinTheta * sinPhi;
	var y = radius * cosPhi;

	return v3(x,y,z);
};