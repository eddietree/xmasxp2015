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