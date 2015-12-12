function getMeshesUsingMaterial( rootDae, matName ) {
	var result = [];

	function traverseObj( object ) {

		if ( object instanceof THREE.Mesh ) {
			if ( object.material.name === matName ) {
				result.push(object);
			}
		}

		for( var i = object.children.length-1; i >= 0; i-=1 ) {
			traverseObj(object.children[i]);
		}
	}

	traverseObj(rootDae);
	return result;
};

function getMeshByName( rootDae, objectName ) {

	function traverseObj( object ) {

		if ( object.name === objectName ) {
			return object;
		}

		for( var i = object.children.length-1; i >= 0; i-=1 ) {
			var obj = traverseObj(object.children[i]);
			if ( obj !== null ) {
				return obj;
			}
		}

		return null;
	}

	return traverseObj(rootDae);
};
