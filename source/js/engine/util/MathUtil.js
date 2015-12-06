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

	var x = radius * Math.cos( theta ) * Math.sin(phi);
	var z = radius * Math.sin( theta ) * Math.sin(phi);
	var y = radius * Math.cos(phi);
};