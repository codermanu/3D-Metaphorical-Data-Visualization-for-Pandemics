/*ADDING CARUOSEL TO THE SCENE*/

// initScene();

var exploreobjects=[];   //add object to this after clicked mushroom


function initScene() {
    //	showMap = false;
    //	var x = document.getElementById("googleMap");
    //	x.style.display = "none";
    //	camera.position.set(-2.198618297315242, 802.3112481029098, 2755.1754787778136);
    //	controls.update();
    //	iniZoom = controls.target.distanceTo( controls.object.position );
        
        // change number of carousel segments
        /*
        var gui = new dat.gui.GUI({
            height: 5 * 32 - 1
        });

        var params = {
            numOfParas: 4,
        };*/
			
    var subdimensions;

    //Have to get from Dataset
    subdimensions= {
        death: [" no-death", " death"], 
        gender: [" male", " female"], 
        age: [" elder", " child", " adult"], 
        period:[" 2014-2016", " 2016-2018", " 2012-2014"],
        fogg: [" fogged", " not-fogged"]
    }
            
    
    var metaphorDescriptor = new MetaphorDescriptor(0, null, Object.keys(subdimensions), [], undefined);
    
    parent = CreateNewNode(metaphorDescriptor);
      
    dataset=[
      {caseid: "case6", boundaryid: " 26", lat: " 6.903300989180914", lon: " 79.86876983357969", death: " no-death",age: " elder",fogg: " fogged",gender: " male",period: " 2014-2016"},
      {caseid: "case149", boundaryid: " 26", lat: " 6.906363645677337", lon: " 79.87833850658262", death: " no-death",fogg: " fogged",gender: " male",period: " 2014-2016"},
      {caseid: "case158", boundaryid: " 26", lat: " 6.914638656293256", lon: " 79.8543108969087", death: " no-death",fogg: " fogged",gender: " male",period: " 2014-2016"},
      {caseid: "case299", boundaryid: " 26", lat: " 6.904201098343787", lon: " 79.87146513218475", death: " death",fogg: " fogged",gender: " male",period: " 2014-2016"},

      ]

    caseVisualizer = new CaseVisualizer(scene, subdimensions);
    dataVisualizer = new DataVisualizer(dataset, caseVisualizer);
    dataExplorer = new DataExplorer(scene, parent, subdimensions, dataVisualizer);

    
   // console.log("PARENTMETAPHOR",parent.metaphor.children);
    parent.metaphor.userData.name = "parentMetaphor"

    scene.add(parent.metaphor);

    //Since parent.metaphor type is a "Group" , do add children which type="Mesh"
    for(var i=0; i< parent.metaphor.children.length;i++ ){
        exploreobjects.push(parent.metaphor.children[i])

    }


    //	infowindow.open(map, marker);

        // switchScene(polygon);
        // //load human avatar
        // //loadAvatar(scene,dataset.length*ratio);
    // console.log("Scene initialization completed!");
    // showMenu();
      
    

      //ADD HALF SPHERE TO REMOVE OBJECTS FROM THE SCENE
        var geometry = new THREE.SphereGeometry(50,16,16, Math.PI/2, Math.PI*2, 0, 0.5 * Math.PI)
        var material = new THREE.MeshBasicMaterial( { color: '#C70039'} );
        material.side = THREE.DoubleSide;
        var clicksphere = new THREE.Mesh( geometry, material );
        clicksphere.userData.name = "removesphere"
        
        console.log("CLICKSPHERE",clicksphere.id);
    
        clicksphere.position.copy(
            new THREE.Vector3(50, 100, -50));   
    
            scene.add(clicksphere);

           exploreobjects.push(clicksphere)
        //   console.log("#############################################",exploreobjects)
   
}


function onDocumentMouseDown(event) {
    
    event.preventDefault();

    var canvasPosition = renderer.domElement.getBoundingClientRect();
    var mouseX = event.clientX - canvasPosition.left;
    var mouseY = event.clientY - canvasPosition.top;

   // console.log("canvasPosition:left,top:", canvasPosition.left, canvasPosition.top);
   // console.log("Mouse X + Y : ",mouseX, mouseY);

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
            
        console.log("NAME",intersects[0]);

       // var id = intersects[0].object.id;
        var clickedobject=intersects[0].object.userData.name;
       // console.log("intersects:" + id);

        
        if(clickedobject=="removesphere"){
            console.log("CLICK");
            removeObjectOnclick();

        }else{

            console.log("NOT CLICK");
        }
    
    }
    
}
            
            
function removeObjectOnclick(){
    console.log("REMOVE")
    for( var i = scene.children.length - 1; i >= 0; i--) { 
        obj = scene.children[i];
        console.log("SCENE CHILDREN", scene.children)
        if(obj.userData.name=="parentMetaphor" || obj.userData.name=="removesphere"){
            scene.remove(obj); 

        }
    }

}


//window.addEventListener('mousedown', onMouseDown, false);
document.addEventListener("mousedown", onDocumentMouseDown, false);




