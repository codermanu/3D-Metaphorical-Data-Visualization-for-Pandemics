
/**
* Author: Dulya Murage
*/
function MetaphorDescriptor(mtype, dimension, dimensions, connectedSegments, position=new THREE.Vector3(0,0,0), level=0) {
  this.metaphorType = mtype; // main (0) or sub >=(1)
  this.mainDimension = dimension;
  this.dimensions = dimensions;
  this.position = position;
  this.level = level;
  this.connectedSegments = connectedSegments;
}

/*
  Main Node (Parent)
*/
function Node() {
  this.id = 0;
  this.metaphor=null;
  this.connectors=[];

  this.metaphorDescriptor = null;
}

Node.prototype.getActiveDimensions = function() {
  var result = [];
  if(this.metaphor) {
    var dimensions = Object.keys(this.metaphor.userData.segments);
    for(var i=0; i<dimensions.length; i++){
      var segment = this.metaphor.userData.segments[dimensions[i]];
      if(segment.userData.isActive){
        result.push(segment.userData.dimension);
      }
    }
  }
  return result;
}
Node.prototype.getLockedDimensions = function() {
  var result = [];
  if(this.metaphor) {
    var dimensions = Object.keys(this.metaphor.userData.segments);
    for(var i=0; i<dimensions.length; i++){
      var segment = this.metaphor.userData.segments[dimensions[i]];
      if(segment.userData.isLocked){
        result.push(segment.userData.dimension);
      }
    }
  }
  return result;
}

Node.prototype.updateConnector = function(scene) {
  this.connectors.forEach(connector => {
    scene.remove(connector);
  });
  this.connectors = [];
  this.metaphorDescriptor.connectedSegments.forEach(segment => {
    var connector = createConnector(segment, this.metaphor);
    scene.add(connector);
    this.connectors.push(connector);
  });
  
}

Node.prototype.getConnectedNode = function() {
  if (this.metaphorDescriptor.connectedSegments.length > 0 ) {
    return this.metaphorDescriptor.connectedSegments[0].getnode();
  }
  return null;
}

Node.prototype.add = function(scene) {
  if(this.metaphor) {
    scene.add(this.metaphor);
    this.updateConnector(scene);
  }
}
Node.prototype.remove = function(scene) {
  if (this.metaphor) {
    scene.remove(this.metaphor);
  }

  this.connectors.forEach(connector => {
    scene.remove(connector);
  });
  this.connectors = [];

}

function CreateNewNode(metaphorDescriptor){
   var node = new Node();

   node.metaphorDescriptor = metaphorDescriptor;
   
  if(metaphorDescriptor.metaphorType == 0){
    node.metaphor = createCarousel(node, false);
  }else{
    node.metaphor = createCarousel(node,true);
  }
   // check metaphor types and create appropriate metaphors
   

   node.metaphor.position.x = metaphorDescriptor.position.x;
   node.metaphor.position.y = metaphorDescriptor.position.y;
   node.metaphor.position.z = metaphorDescriptor.position.z;

   return node;
}