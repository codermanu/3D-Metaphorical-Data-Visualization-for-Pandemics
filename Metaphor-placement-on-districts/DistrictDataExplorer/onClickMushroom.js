/*ADDING CARUOSEL TO THE SCENE*///initScene();


 // carousel variables

 var dataset = [];
 //var boundaryId=48;
 var fields = [];
 var subdimensions;
 var nonDimensionalFields = ["caseid", "boundaryid", "lat", "lon"];
 

function dataexplore_csv() {
    d3.csv("./DistrictDataExplorer/data_full.csv", function (data) {
      console.log("csv data", data);
      //select cases according to the given boundary
      dataset = data.filter(function (report) {
        var bid = 0;
        try {
          bid = parseInt(report.boundaryid);
        } catch (e) {
          console.log("error", e);
        }
        // return bid == polygon.indexID;
        return bid == 26;
      });
      //select dimensional fields

      console.log("selected dataset", dataset);
      if (dataset.length > 0) {
        fields = Object.keys(dataset[0]).filter(function (key) {
          return nonDimensionalFields.indexOf(key) == -1;
        });
      }

      //finding subdimenions from the dataset values
      var fieldValues = {};
      subdimensions = {};
      fields.forEach(function (field) {
        fieldValues[field] = [];
        subdimensions[field] = [];
      });

      dataset.forEach(function (record) {
        fields.forEach(function (field) {
          fieldValues[field].push(record[field]);
        });
      });

      fields.forEach(function (field) {
        fieldValues[field] = Array.from(new Set(fieldValues[field]));
        if (isSubdimension(fieldValues[field])) {
          subdimensions[field] = fieldValues[field];
        }
      });
      console.log("dataset loaded!");
      console.log("######## Dataset #########");
      console.log("Main dimensions = ", fields);
      console.log("Main dimensions info = ", subdimensions);
      console.log("##########################");


    });

    //conditions for selecting subdimesnions
    var isSubdimension = function (dimArray) {
      var threshold = (dataset.length * 10) / 100;
      if (!dimArray.some(isNaN)) {
        return false;
      }

      if (dimArray.length >= threshold) {
        return false;
      }

      return true;
    };
    
  }


var exploreobjects=[];   //add object to this after clicked mushroom


function initCarousel() {

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
			         
    
    var metaphorDescriptor = new MetaphorDescriptor(0, null, Object.keys(subdimensions), [], undefined);
    
    parent = CreateNewNode(metaphorDescriptor);
      
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
        // console.log("#############################################",exploreobjects)
   
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

            onMouseDown(event) ;
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

