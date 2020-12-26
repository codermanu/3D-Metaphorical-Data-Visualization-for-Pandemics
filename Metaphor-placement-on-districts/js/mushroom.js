//mushroom.js - javascript to create a mushroom object 
//uses three.js to create the 3d model (http://threejs.org/)
//uses tween.js to perform animations (https://github.com/sole/tween.js/)


//example use:
/*
	var m1 = new Mushroom();
	m1.growIt();
	scene.add(m1.model);
*/

//set optional initial values
//capOffsetY - difference in bottom cap edge and top edge of the stalk
function Mushroom (capSize, stalkHeight, stalkTop, stalkBottom, capScaleY, capOffsetY) {

	this.capColor = "0xffffff";
	this.underCapColor = "0xffffff";
	this.stalkColor = "0xffffff";
	
	this.capTexture = null;
	this.underCapTexture = null;
	this.stalkTexture = null;
	
	this.rSeg = 16;					//radius segments
	this.hSeg = 2;					//height segments
			
	this.capSize = (capSize === undefined) ? 30 : capSize; 
	this.stalkHeight = (stalkHeight === undefined) ? 30 : stalkHeight;
	this.stalkTop = (stalkTop === undefined) ? 5 : stalkTop;
	this.stalkBottom = (stalkBottom === undefined) ? 20 : stalkBottom;
	this.capScaleY = (capScaleY === undefined) ? 0.5 : capScaleY;
	this.capOffsetY = (capOffsetY === undefined) ? 0 : capOffsetY;	//how far from stalk
	
	this.model = null;			//Object3D
}

//for debug
/*
Mushroom.prototype.displayValues = function() {
	console.log("--------------------------------");
	console.log("capSize:" + this.capSize);	
	console.log("stalkHeight:" + this.stalkHeight);
	console.log("capScaleY:" + this.capScaleY);
}
*/

//call setTextures before growIt() to set colors
// pass in colors as hex string
Mushroom.prototype.setColors = function(c1, c2, c3) {
	this.capColor = c1;
	this.underCapColor = c2;
	this.stalkColor = c3;
}

//call setTextures before growIt to set material textures
//pass in texture file location as string
Mushroom.prototype.setTextures = function(t1, t2, t3) {
	this.capTexture = t1;
	this.underCapTexture = t2;
	this.stalkTexture = t3;
}

//Sets up the geometry and apply materials to mesh.  
//Creates the THREE.Object3D to store in the model property
Mushroom.prototype.growIt = function() {	
	var capGeo = new THREE.SphereGeometry(this.capSize, rSeg, hSeg, 0, Math.PI * 2, 0, Math.PI / 2 );
	var underCapGeo = new THREE.Geometry();
	var stalkGeo = new THREE.CylinderGeometry (this.stalkTop, this.stalkBottom, this.stalkHeight, rSeg, 4, false);	
	
	var capMaterial = new THREE.MeshLambertMaterial();
	var underCapMaterial = new THREE.MeshLambertMaterial({side: THREE.DoubleSide});
	var stalkMaterial = new THREE.MeshLambertMaterial();

	capMaterial.color.setHex(this.capColor);
	underCapMaterial.color.setHex(this.underCapColor);
	stalkMaterial.color.setHex(this.stalkColor);
	
	if (this.capTexture !== null) {
		var t1 = THREE.ImageUtils.loadTexture( this.capTexture );	
		capMaterial.map = t1;
	}
	
	if (this.underCapTexture !== null) {		
		var t2 = THREE.ImageUtils.loadTexture( this.underCapTexture );	
		underCapMaterial.map = t2;	
	}
		
	if (this.stalkTexture !== null) {
		var t3 = THREE.ImageUtils.loadTexture( this.stalkTexture );	
		stalkMaterial.map = t3;
	}
	
	//create the underCap
	var uvs = [];
	for (var i = 0; i < rSeg; i++) {
		var geo = new THREE.Geometry();
		
		var theta = i * 2 * Math.PI / rSeg;	
		var thetaNext = (i+1) * 2 * Math.PI / rSeg;	
	
		var p1 = new THREE.Vector3(this.capSize * Math.cos(theta), 0, this.capSize * Math.sin(theta));
		var p2 = new THREE.Vector3(this.capSize * Math.cos(thetaNext), 0, this.capSize * Math.sin(thetaNext));
		var p3 = new THREE.Vector3(this.stalkTop * Math.cos(theta), -this.capOffsetY, this.stalkTop * Math.sin(theta));
		var p4 = new THREE.Vector3(this.stalkTop * Math.cos(thetaNext), -this.capOffsetY, this.stalkTop * Math.sin(thetaNext));
		
		geo.vertices.push(p3);
		geo.vertices.push(p1);
		geo.vertices.push(p2);
		geo.vertices.push(p4);
	
		geo.faces.push(new THREE.Face4(0,1,2,3));		
		
		//need to do assign uvs to vertices so can apply texture to undercap
		uvs.push(new THREE.Vector2(0.0, 0.0));
		uvs.push(new THREE.Vector2(1.0, 0.0));
		uvs.push(new THREE.Vector2(1.0, 1.0));
		uvs.push(new THREE.Vector2(0.0, 1.0));
		
		geo.faceVertexUvs[0].push([uvs[i * 4], uvs[i * 4 + 1], uvs[i * 4 + 2], uvs[i * 4 + 3]]);
		
		THREE.GeometryUtils.merge(underCapGeo, geo);
	}
	
	var cap = new THREE.Mesh(capGeo, capMaterial);		
	var underCap = new THREE.Mesh(underCapGeo, underCapMaterial);
	var stalk = new THREE.Mesh(stalkGeo, stalkMaterial);
	
	cap.scale.y = this.capScaleY;
	cap.position.y = this.stalkHeight / 2 + this.capOffsetY;
	
	underCap.position.y = this.stalkHeight / 2 + this.capOffsetY;
		
	var mushroomObj = new THREE.Object3D();
	mushroomObj.add(cap);
	mushroomObj.add(underCap);
	mushroomObj.add(stalk);
	
	mushroomObj.position.y = this.stalkHeight / 2;
	this.model = mushroomObj;
	
	return mushroomObj;
}



