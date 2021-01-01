// function onMouseDown(event) {
//     event.preventDefault();
//     startDragCone(event);


//     if (mouseDragCount < 5) {

//         var raycaster = new THREE.Raycaster();
//         var mouse = new THREE.Vector2();
//         var intersects;
//         mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//         mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//         raycaster.setFromCamera(mouse, camera);

//         if (isCasaroul) {
//             var prevNumLevels = dataExplorer.levels.length;
//             // get all segments and buttons in the scene
//             var i = 0;
//             var children_segments = [];
//             var allNodes = dataExplorer.getAllNodes();

//             for (i = 0; i < allNodes.length; i++) {
//                 children_segments = children_segments.concat(allNodes[i].metaphor.children);
//             }


//             var intersects = raycaster.intersectObjects(children_segments, true);
//             //console.log(allActiveNodes);											
//             var time = new Date() * 0.001;
//             for (i = 0; i < intersects.length; i++) {
//                 if (intersects[i].object.geometry.type == 'ExtrudeGeometry' || intersects[i].object.geometry.type == "SphereGeometry") {
//                     isSegmentClicked = true;

//                     // When the user clicks on the button, open the modal

//                     clickedSlice = intersects[i].object;

//                     clickedSlice.select(dataExplorer);
//                     /*
//                     if(clickedSlice.getType() == "segment"){
//                         //clickedDimension = clickedSlice.getDimension();
//                         clickedSlice.select(dataExplorer);
//                     }else if(clickedSlice.getType() == "middle_button"){
//                         clickedSlice.select(dataExplorer);
//                     }*/


//                     break;
//                 }
//             }
//             /*
//             var curNumLevels = dataExplorer.levels.length;
//             if(curNumLevels>prevNumLevels && curNumLevels>3){
//                 var lev = curNumLevels-1;
//                 var zooms = [0,0,0,1.36*iniZoom,1.5*iniZoom, 1.7*iniZoom];

//                 var curZoom = controls.target.distanceTo( controls.object.position );
                
//                 if (curZoom < zooms[lev]){
//                     controls.zoomOut(zooms[lev]);
//                     controls.update();
//                 }
                
//             }*/
//         }
//     }
//     mouseDragCount = 0;
// }

// function checkMouseIntersect(obj, mouseEvent){
//     var raycaster = new THREE.Raycaster();
//     var mouse = new THREE.Vector2();
//     var intersects;
//     mouse.x = (mouseEvent.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(mouseEvent.clientY / window.innerHeight) * 2 + 1;
//     raycaster.setFromCamera(mouse, camera);

//     var intersects = raycaster.intersectObjects([obj], true);
//     if(intersects.length > 0){
//         return intersects[0];
//     }
//     return false;
// }