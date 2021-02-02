/**
* Author: Dulya Murage
*/

function createConnector(source,target){
    var material = new THREE.LineBasicMaterial( { color: 0xffffff } );
    geometry = new THREE.Geometry();
    var point = source.getinsidepoint();
    geometry.vertices.push(source.localToWorld(new THREE.Vector3(point.x, point.y, point.z)) );
    geometry.vertices.push(target.position );     
    var connector = new THREE.Line( geometry, material );
    
    //connector.userData.fromNode = source.getNode(); // source must be a segment
    //connector.userData.toNode = target.userData.node; // target must be a full metaphor

    return connector;
}
