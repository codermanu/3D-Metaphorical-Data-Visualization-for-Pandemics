var exploreobjects=[];

function drawObjectOnclick(){
    
    var geometry = new THREE.SphereGeometry(50,16,16, Math.PI/2, Math.PI*2, 0, 0.5 * Math.PI)
    var material = new THREE.MeshBasicMaterial( { color: '#C6FF00'} );
    material.side = THREE.DoubleSide;
    var sphere = new THREE.Mesh( geometry, material );

    sphere.userData.name ="sid"

    var geometry = new THREE.SphereGeometry(20,16,16, Math.PI/2, Math.PI*2, 0, 0.5 * Math.PI)
    var material = new THREE.MeshBasicMaterial( { color: '#C70039'} );
    material.side = THREE.DoubleSide;
    var clicksphere = new THREE.Mesh( geometry, material );
    clicksphere.userData.name = "csid"
    
    console.log("SPHERE",sphere.id);
    console.log("CLICKSPHERE",clicksphere.id);

    clicksphere.position.copy(
        new THREE.Vector3(-80, 200, -50));   
    sphere.position.copy(
        new THREE.Vector3(-80, 150, -50));
        
        scene.add(sphere,  clicksphere);
        exploreobjects.push(sphere,clicksphere)
    }




function onDocumentMouseDown(event) {
    
    event.preventDefault();

    var canvasPosition = renderer.domElement.getBoundingClientRect();

    var mouseX = event.clientX - canvasPosition.left;
    var mouseY = event.clientY - canvasPosition.top;

    console.log("canvasPosition:left,top:", canvasPosition.left, canvasPosition.top);
    console.log("Mouse X + Y : ",mouseX, mouseY);


    var mouseVector = new THREE.Vector3(
        2 * (mouseX / canvasWidth) - 1,
        1 - 2 * (mouseY / canvasHeight)
    );

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(exploreobjects);
    // console.log("OBJECTS", objects);
    console.log("INTERSECT", intersects);

    if (intersects.length > 0) {
        drawObjectOnclick();
        
        console.log("NAME",intersects[0]);

        var id = intersects[0].object.id;
        var click=intersects[0].object.userData.name;
        console.log("intersects:" + id);

       
        if(click=="csid"){
        
         removeObjectOnclick()

        }else{
            console.log("NOT CLICK")
        }
    
    }
    
}

document.addEventListener("mousedown", onDocumentMouseDown, false);

      
function removeObjectOnclick(){
    console.log("REMOVE")
    for( var i = scene.children.length - 1; i >= 0; i--) { 
        obj = scene.children[i];
        console.log("SCENE CHILDREN", scene.children)
        if(obj.userData.name=="sid" || obj.userData.name=="csid"){
            scene.remove(obj); 

        }
   }

}