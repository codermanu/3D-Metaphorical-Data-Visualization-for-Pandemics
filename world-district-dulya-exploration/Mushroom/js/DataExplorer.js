/**
* Author: Dulya Murage
*/
function DataExplorer(scene, mainNode, dimensions, visualizer){
    this.scene = scene;
    this.mainNode = mainNode;
    this.visualizer = visualizer;

    this.dimensions = dimensions; // { mainDimension:[subDimension,...], ..}
  
    this.lockedMainDimensions = [];
    this.activeMainDimension = null;
  
    this.activeNode = null;
  
    this.levels = [[mainNode]]; // level 0 has only parent
    this.levelpositions = [
        [new THREE.Vector3(0,0,0)], // level0
        [new THREE.Vector3(600,300,0)], // level1
        [
            new THREE.Vector3(-200,500,-500), 
            new THREE.Vector3(-600,500,-1200), 
            new THREE.Vector3(200,500,-1200)
        ],  // level2
        [
            new THREE.Vector3(-800,700,0),
            new THREE.Vector3(-1200,700,-200),
            new THREE.Vector3(-1200,700,200)
        ],  // level3
        [
            new THREE.Vector3(-200,900,500),
            new THREE.Vector3(-200,900,500),
            new THREE.Vector3(200,900,500)
        ],  // level4
        [
            new THREE.Vector3(80,1100,820),
            new THREE.Vector3(-200,900,500),
            new THREE.Vector3(200,900,500)
        ]  // level5
      ];
  }


DataExplorer.prototype.middleClick = function (button) {
    var node = button.getNode();
    console.log("middle clicked", node.metaphorDescriptor.mainDimension);
    if (node.metaphorDescriptor.metaphorType > 0) {
        // if the middle button is not from the main node
        var dimensions = node.metaphorDescriptor.dimensions;
        var activeDimensions = node.getActiveDimensions();
        var nonActiveDimensions = _.difference(dimensions, activeDimensions);
        console.log(" -> sub node clicked", dimensions, activeDimensions, nonActiveDimensions);
        if(nonActiveDimensions.length > 0) {
            // there are non active segments. therefore select them
            nonActiveDimensions.forEach(dimension => {
                console.log("  |-> select", dimension);
                this.segmentClick(node.metaphor.userData.segments[dimension]);
            });

            // visualize
            //this.visualizer.update(this.getPath(node), node.metaphorDescriptor.mainDimension, node.getActiveDimensions());
            //this.visualizer.show();
        }else{
            // unselect all the dimensions
            dimensions.forEach(dimension => {
                console.log("  |-> unselect", dimension);
                this.segmentClick(node.metaphor.userData.segments[dimension]);
            });

            // this.visualizer.hide();
        }
        
    }
}

DataExplorer.prototype.getPath = function(node) {
    var result = [];
    if(node.metaphorDescriptor.connectedSegments.length > 0){
        var prevNode = node.metaphorDescriptor.connectedSegments[0].getNode();
        if(prevNode.metaphorDescriptor.metaphorType > 0) {
            var obj = {};
            obj[prevNode.metaphorDescriptor.mainDimension] = [];
            node.metaphorDescriptor.connectedSegments.forEach(segment => {
                obj[prevNode.metaphorDescriptor.mainDimension].push(segment.getDimension());
            });

            result.push(obj);
            var prevNodePath = this.getPath(prevNode);
            
            result = [...prevNodePath, ...result];
        }
        
    }
    

    return result;
}

DataExplorer.prototype.segmentClick = function (segment) {
    // when user click on a segment
    var node = segment.getNode();
    
    if(node.metaphorDescriptor.metaphorType == 0) {
        // MAIN NODE CLICKED
        console.log("main segment clicked!", segment.getDimension());
        var activeDimensions = node.getActiveDimensions();
        var lockedDimensions = node.getLockedDimensions();
        var nonLockedActiveDimensions = _.difference(activeDimensions, lockedDimensions);
        
        if(segment.userData.isActive && !segment.userData.isLocked) {
            // active and not locked -> shrink
            this.unpropogate(segment.userData.dimension);
            segment.shrink();
        }else if(!segment.userData.isActive && !segment.userData.isLocked){
            // not active and not locked -> expand

            for(var i=0; i<nonLockedActiveDimensions.length; i++) {
                // shrink active segments
                var dimension = nonLockedActiveDimensions[i];
                this.unpropogate(dimension);
                node.metaphor.userData.segments[dimension].shrink();
            }
            this.propogate(segment.userData.dimension);
            segment.expand();
        }else{
            // locked -> do nothing
        }
    }else {
        // SUB NODE CLICKED
        console.log("sub segment clicked!", segment.getDimension());
        // lock the main segment
        var mainSegment = this.mainNode.metaphor.userData.segments[node.metaphorDescriptor.mainDimension];
        
        this.activeNode = node;
        if(mainSegment && !mainSegment.userData.isLocked) {
            // main segment is not locked. lock it.
            mainSegment.lock();
        }

        if(segment.userData.isActive) {
            // segment is active. => shrink 
            console.log("############## Shrinking", segment.userData.dimension, "##############");
            segment.shrink();

            // remove all the metaphors connected to this node.
            this.clearpath(node, segment.userData.dimension);

            // check if all the segments in the node are not active. if so, unlock main dimension (PROBLEM WITH THIS LOGIC!)
            if(node.getActiveDimensions().length == 0) {
                // no active segments in this node => check if there are other nodes for main dimension.
                var nodes = this.getNodesByDimension(node.metaphorDescriptor.mainDimension);
                var shouldUnlockMain = true;
                nodes.forEach(othernode => {
                    if(othernode.getActiveDimensions().length > 0){
                        shouldUnlockMain =false;
                    }
                });

                if (shouldUnlockMain) {
                    mainSegment.unlock();
                    // set the active node to the connected node
                    if (node.metaphorDescriptor.connectedSegments.length > 0) {
                        this.activeNode = node.metaphorDescriptor.connectedSegments[0].getNode();
                        if (this.activeNode.metaphorDescriptor.metaphorType == 0) {
                            // connected node is main node. this cannot be active node
                            this.activeNode = null;
                        }
                    }
                    
                }
                
                // check if there's an connected node for this node
                if(node.metaphorDescriptor.connectedSegments.length > 0) {
                    
                    var connectedNode = node.metaphorDescriptor.connectedSegments[0].getNode();
                    this.visualizer.update(this.getPath(connectedNode), connectedNode.metaphorDescriptor.mainDimension, connectedNode.getActiveDimensions());
                    if (connectedNode.metaphorDescriptor.metaphorType == 0) {
                        this.visualizer.hide();
                    }else{
                        // visualize
                        this.visualizer.show();
                    }
                    
                }else{
                    this.visualizer.hide();
                }
                
            }else{
                // there are active dimensions for this node 
                // visualize
                this.visualizer.update(this.getPath(node), node.metaphorDescriptor.mainDimension, node.getActiveDimensions());
                this.visualizer.show();
            }
            // check the validity of locked dimensions
            console.log("Checking invalid locked main segments");
            var mainDimensions = Object.keys(this.dimensions);
            mainDimensions.forEach(dimension => {
                var mainSegment = this.mainNode.metaphor.userData.segments[dimension];
                if (!this.isValidLock(dimension)) {
                    if(mainSegment.userData.isLocked){
                        console.log(" -> invalid lock", dimension);
                        mainSegment.unlock();
                        mainSegment.shrink();
                    }else{
                        console.log(" -> not locked", mainSegment.userData.dimension);
                    }
                }else{
                    console.log(" -> valid lock", mainSegment.userData.dimension);
                }
            });
            
            // check if there are more than two only active nodes
            var activeDimensions = this.mainNode.getActiveDimensions();
            var lockedDimensions = this.mainNode.getLockedDimensions();
            var nonLockedActiveDimensions = _.difference(activeDimensions, lockedDimensions);
            console.log("Checking active main segments. found", nonLockedActiveDimensions.length);
            if(nonLockedActiveDimensions.length > 0) {
                var shrikDimensions  = nonLockedActiveDimensions;
                if(this.levels[1][0]){
                    var connectedDimensions = [];
                    this.levels[1][0].metaphorDescriptor.connectedSegments.forEach(seg=> {
                        connectedDimensions.push(seg.userData.dimension);
                    });
                    shrikDimensions = _.difference(nonLockedActiveDimensions, connectedDimensions);
                }
                shrikDimensions.forEach(dimension => {
                    if(this.getNodesByDimension(dimension).length == 0) {
                        console.log(" -> shrinking", dimension);
                        this.mainNode.metaphor.userData.segments[dimension].shrink();
                    }else{
                        console.log(" -> not shrinking", dimension, "node exists!");
                    }
                });
                
            }

            console.log("##########################################");

        }else{
            segment.expand();
             // visualize
            this.visualizer.update(this.getPath(node), node.metaphorDescriptor.mainDimension, node.getActiveDimensions());
            this.visualizer.show();
        }

    }
}

/*
    For a given node (+ index) and dimension, clear the metaphor's in any path from that segment.
    Ex. 
               Z(c) => V()
              /
    X(a) => Y(b,c)
                 \
                  W()
    clearpath(X, a) would remove Y, W, Z, V
*/ 
DataExplorer.prototype.clearpath = function(node, dimension) {
    var level = node.metaphorDescriptor.level;
    var segment = node.metaphor.userData.segments[dimension];
    console.log("clearing path of level", level," dimension", dimension);
    for(var i=level+1; i<this.levels.length; i++) {
        var levelNodes = this.levels[i];
        for(var j=0; j<levelNodes.length; j++){
            var levelNode = levelNodes[j];
            if (levelNode.metaphorDescriptor.connectedSegments.length > 0){ //.userData.dimension == dimension) {
                var isConnected = false;
                levelNode.metaphorDescriptor.connectedSegments.forEach(seg => {
                    if (seg.uuid == segment.uuid) {
                        isConnected = true;
                    }
                });

                if (isConnected) {
                    // CHECK HERE
                    // this node (levelNode) is connected to the given node. 
                    // go thorugh it's all active dimensions and clear their paths
                    var activeDimensions = levelNode.getActiveDimensions();
                    for(var k=0; k<activeDimensions.length; k++) {
                        this.clearpath(levelNode, activeDimensions[k]); 
                    }

                    //remove this node.
                    this.removeNode(levelNode);
                }
                
            }
        }
    }
}

/*
    returns a list of nodes in levels for a givn main dimension
*/
DataExplorer.prototype.getNodesByDimension = function(mainDimension) {
    var res = [];
    this.levels.forEach(level => {
        level.forEach(node => {
            if (node.metaphorDescriptor.mainDimension == mainDimension) {
                res.push(node);
            }
        });
    });
    return res;
}
/*
    check if the given mainDimension is locked and if check it's a valid lock
*/
DataExplorer.prototype.isValidLock = function(mainDimension) {
    for(var i=0; i<this.levels.length; i++) {
        for(var j=0; j<this.levels[i].length; j++){
            var levelNode = this.levels[i][j];
            if (levelNode.metaphorDescriptor.mainDimension == mainDimension && levelNode.getActiveDimensions().length > 0){
                // node is added for the given main dimension
                // node has active dimensions
                return true;
            }
        }
    }
    return false;
}

/*
    For a given main dimension, this function add nodes of main dimension for the active node's selected dimensions
*/
DataExplorer.prototype.propogate = function(mainDimension) {
    // remove metaphors related to the given dimension
    console.log("Propogating", mainDimension);

    if(this.activeNode) {
        // there's an active node! so create metaphors for the active segments of that node.
        var activeDimensions = this.activeNode.getActiveDimensions();
        var nextLevel = this.activeNode.metaphorDescriptor.level+1;
        var segments = [];
        for(var i=0; i<activeDimensions.length; i++) {
            var dimension = activeDimensions[i];
            var segment = this.activeNode.metaphor.userData.segments[dimension];
            segments.push(segment);
        }
        console.log("new node level", nextLevel, "level index", i)
        var metaphorDescriptor = new MetaphorDescriptor(1, 
            mainDimension, 
            this.dimensions[mainDimension], 
            segments,
            this.levelpositions[nextLevel][0], 
            nextLevel);

        var new_node = CreateNewNode(metaphorDescriptor);
        //this.scene.add(new_node.metaphor);
        this.addNode(new_node);
        
    }else{
        // no active node. that means 1st metaphor
        var metaphorDescriptor = new MetaphorDescriptor(1, 
            mainDimension, 
            this.dimensions[mainDimension], 
            [this.mainNode.metaphor.userData.segments[mainDimension]],
            this.levelpositions[1][0], 
            1);
        var new_node = CreateNewNode(metaphorDescriptor);
        //this.scene.add(new_node.metaphor);
        this.addNode(new_node);
    }
}

/*
    For a given main dimension, this function removes all the nodes related to that dimension
*/
DataExplorer.prototype.unpropogate = function(mainDimension) {
    // remove metaphors related to the given dimension
    console.log("Unpropogating", mainDimension);
    // first we should get the nodes to a different array. otherwise removing node would change the array
    var nodes = [];
    this.levels.forEach(level => {
        level.forEach(node => {
            nodes.push(node);
        });
    });

    nodes.forEach(node => {
        if(node.metaphorDescriptor.mainDimension == mainDimension) {
            this.removeNode(node);
            console.log(" -> removing node of", node.metaphor.mainDimension); 
        }
    });
}
  
DataExplorer.prototype.getNextLevel = function() {
    return this.levels.length;
}

DataExplorer.prototype.getAllNodes = function () {
    var nodes = [];
    for(var i=0; i<this.levels.length; i++) {
        nodes = nodes.concat(this.levels[i]);
    }
    return nodes;
}

DataExplorer.prototype.getLevelIndex = function (node) {
    var nodes = this.levels[node.metaphorDescriptor.level];
    var index = -1;
    for(var i=0; i<nodes.length; i++) {
        if (nodes[i].metaphor && node.metaphor.uuid == nodes[i].metaphor.uuid) {
            index = i;
            break;
        }
    }
    return index;
}
  
DataExplorer.prototype.addNode = function(node) {
    var level = node.metaphorDescriptor.level;
    if(this.levels.length > level) {
      this.levels[level].push(node);
      node.add(this.scene);
    } else if(this.levels.length == level) {
      this.levels.push([node]);
      node.add(this.scene);
    } else {
      console.log("invalid level");
    }
}

DataExplorer.prototype.removeNode = function(node, index=null) {
    var level = node.metaphorDescriptor.level;
    if(index == null) {
        // if index is not given
        index = this.getLevelIndex(node);
    }
    if(this.levels[level] && this.levels[level].length > index) {
        this.levels[level].splice(index, 1);
    }
    node.remove(this.scene);
}
