/**
* Author: Dulya Murage
*/
function createCarousel(node, hasMiddle) {
    var parent = new THREE.Group();
    parent.userData.node = node;
    var startAngle=0;
    var segments={};
    var numOfSegments=node.metaphorDescriptor.dimensions.length;
    //trying to add explode button
    if(hasMiddle){
        var middleButton = createMiddleButton(node);
        parent.userData.middleButton = middleButton;
        parent.add(middleButton);
    }
    
    //end of explode button
    for(i=0;i<numOfSegments;i++){

        var segmentPortion=360/numOfSegments;
        var color=Math.random() * 0xffff00;
        var segment=createSegment(300,THREE.Math.degToRad(startAngle),THREE.Math.degToRad(startAngle+segmentPortion), color, node.metaphorDescriptor.dimensions[i], parent); 
        startAngle+=segmentPortion;

        // create a canvas element
        var canvas = document.createElement('canvas');
        var context = canvas.getContext("2d");
        context.font = "Bold 36px Arial";
        context.fillStyle = "rgb(255,255,255)";
        context.fillText(toTitleCase(node.metaphorDescriptor.dimensions[i]), 0, 50);
        var texture = new THREE.Texture(canvas) 
        texture.needsUpdate = true;
        
        var material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide } );
        material.transparent = true;

        var mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(canvas.width, canvas.height,40),
            material
        );
        

        mesh.position.set(segment.getinsidepoint().x+90,segment.getinsidepoint().y+10,segment.getinsidepoint().z+10);
        segment.add( mesh );         
        //end : create canvas element

        //using text geometry
        // add 3D text beveled and sized
        /*var loader = new THREE.FontLoader();
        loader.load( 'js/fonts/helvetiker_bold.typeface.json', function ( font ) {
        console.log("awa", font);
        var textGeometry = new THREE.TextBufferGeometry( "text", {

            font: font,
            size: 50,
            height: 10,
            curveSegments: 12,

            bevelThickness: 1,
            bevelSize: 1,
            bevelEnabled: true

        });

        var textMaterial = new THREE.MeshPhongMaterial( 
            { color: 0xff0000, specular: 0xffffff }
        );

        var mesh = new THREE.Mesh( textGeometry, textMaterial );
        mesh.position.set(segment.getinsidepoint().x+80,segment.getinsidepoint().y+100,segment.getinsidepoint().z+100);
        segment.add( mesh );

        });*/  
        //end text geometry

        segments[node.metaphorDescriptor.dimensions[i]] = segment;       
        parent.add(segment);
    }
    parent.userData.segments = segments;
    // return {main:parent, segments:segments};
    return parent;
}




function createMiddleButton(node) {
    //trying to add explode button
    var geometry = new THREE.SphereGeometry(50,16,16, Math.PI/2, Math.PI*2, 0, 0.5 * Math.PI)
    var material = new THREE.MeshBasicMaterial( { color: '#FF0000'} );
    material.side = THREE.DoubleSide;
    var sphere = new THREE.Mesh( geometry, material );
    sphere.position.y=20;
    sphere.userData.node = node;

    sphere.getType = function(){
        return "middle_button";
    }

    sphere.getNode = function(){
        return this.userData.node;
    }

    sphere.select = function(dataExplorer) {
        dataExplorer.middleClick(this);
    }
    //end of explode button
    return sphere;
}
			
function createSegment(radius, angleStart, angleEnd, color, dimension, carousel) {
    var extrOpt = {
        curveSegments: 32,
        steps: 1,
        amount: 25,
        depth:2,
        bevelEnabled: false,
    };

    var shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.absarc(0, 0, radius, angleStart, angleEnd, false);
    shape.lineTo(0, 0);  
    
    var segmentGeom = new THREE.ExtrudeGeometry( shape, extrOpt );
    segmentGeom.rotateX(-Math.PI / 2);

    var segmentMat = new THREE.MeshLambertMaterial({
        color: color
    });
    
    var segment = new THREE.Mesh(segmentGeom, segmentMat);
    segment.userData.angleStart = angleStart;
    segment.userData.angleEnd = angleEnd;
    segment.userData.initialPosition = {x:segment.position.x, y:segment.position.y, z:segment.position.z};
    segment.userData.initialColor = {r:segment.material.color.r, g:segment.material.color.g ,b:segment.material.color.b};
    segment.userData.dimension=dimension;
    segment.userData.carousel = carousel;
    segment.userData.isActive = false;
    segment.userData.isLocked = false;
    

    segment.getType = function(){
        return "segment";
    }

    segment.getNode = function() {
        return this.userData.carousel.userData.node;
    }
    segment.getDimension=function(){
        return this.userData.dimension;
    }

    segment.getinsidepoint = function() {

        var radians = (this.userData.angleEnd + this.userData.angleStart) * 0.5;
        var vx = Math.cos(radians);
        var vz = -Math.sin(radians);
        var sinTime = 0.6;
        return {x:sinTime * vx * 200, y: this.userData.initialPosition.y, z:sinTime * vz * 200};
    }

    segment.select = function (dataExplorer) {
        dataExplorer.segmentClick(this);
    }

    segment.expand = function() {

        // save the previous position
        //this.userData.initialPosition = {x:this.position.x, y:this.position.y, z:this.position.z};

        var radians = (this.userData.angleEnd + this.userData.angleStart) * 0.5;
        var vx = Math.cos(radians);
        var vz = -Math.sin(radians);
        var sinTime = 0.6; //Math.abs(Math.sin(3500*0.001)+1);

        //Move the actual piece
        this.position.x = sinTime * vx*100;
        this.position.z = sinTime * vz*100;

        this.scale.y = this.scale.y+0.5;

        this.userData.isActive = true;
    }

    segment.shrink = function() {
        this.position.x = this.userData.initialPosition.x;
        this.position.z = this.userData.initialPosition.z;
        this.scale.y = this.scale.y-0.5;
        this.userData.isActive = false;
    }

    segment.lock = function() {
        // make the segment black
        this.material.color.r = 0;
        this.material.color.g = 0;
        this.material.color.b = 0;
        this.userData.isLocked = true;
    }

    segment.unlock = function() {
        this.material.color.r = this.userData.initialColor.r;
        this.material.color.g = this.userData.initialColor.g;
        this.material.color.b = this.userData.initialColor.b;
        this.userData.isLocked = false;
    }
    return segment;
}