/**
* Author: Dulya Murage
*/
function CaseVisualizer(scene, subdimensions) {
    this.scene = scene;
    this.dimensions = subdimensions;
    this.ratio = 1 / 5; // 5 cases using 1 human metaphor
    this.model_loader = new THREE.OBJLoader();

    // new container to add humans
    this.container = new THREE.Group();
    this.scene.add(this.container);

    //this.manModel = null;
    //this.loadAvatar();

    // different characters
    this.modelsLoaded = false;
    this.models = {};
    this.loadAvatars();
}

CaseVisualizer.prototype.update = function (mainDimension, xDimensions, dataset, colors = []) {
    /*
          |        |
          |        |
        bar 1    bar 2

        dataset = [{data:[bar1, bar2, ...]}, {data:[bar1, bar2]}, ...]
    */
    var counts = [];
    for (var i = 0; i < dataset.length; i++) {
        var record_slices = dataset[i].data;
        for (var j = 0; j < record_slices.length; j++) {
            var count = record_slices[j];
            if (counts.length > j) {
                // bar is in count
                counts[j] = counts[j] + count;
            } else {
                counts.push(count);
            }
        }
    }
    console.log(counts, mainDimension, xDimensions);
    /*
        send data in a array of clusters. below has two clusters with 10 cases one cluster 
        and 12 cases for the other cluster

        counts = [10,12]
    */
    this.removeAll();
    if (colors.length == 0) {
        // no colors specified, use random colors
        counts.forEach(count => {
            colors.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16));
        });
    }


    if (this.modelsLoaded) {
        console.log("Human structure found");
        var lastX = -60;
        var lastZ = 100;

        // select models


        for (var j = 0; j < counts.length; j++) {
            var count = counts[j];
            count = Math.round(count * this.ratio);

            // if count is 0 check whether the actual # is 0. if not make count 1.
            if (count == 0 && counts[j] > 0) count = 1;

            // check if model exist
            var model = this.models["default"]["default"];
            if (this.models[mainDimension] && this.models[mainDimension][xDimensions[j]]) {
                model = this.models[mainDimension][xDimensions[j]];
            }

            lastX = -60;
            lastZ = lastZ + 100;
            
            var moonLabel = createLabel(xDimensions[j]);
            moonLabel.position.set(lastX+60, model.position.y, lastZ);
            this.container.add(moonLabel);
            // console.log("Adding", count, "humans for a cluster");
            for (var i = 0; i < count; i++) {
                var newMan = model.clone();

                // we'll clone the material as well
                newMan.children[0].material = model.children[0].material.clone();

                var color = hexToRgb(colors[j]);
                // console.log("COLORS", color, colors[j]);
                newMan.children[0].material.color.r = color.r / 255;
                newMan.children[0].material.color.g = color.g / 255;
                newMan.children[0].material.color.b = color.b / 255;

                newMan.position.x = lastX;
                newMan.position.z = lastZ;
                lastX = lastX - 60;

                this.container.add(newMan);
            }
        }

    }
}

CaseVisualizer.prototype.removeAll = function () {
    var count = 0;
    console.log("Items to be removed", this.container.children.length);
    for (var i = this.container.children.length - 1; i >= 0; i--) {
        var child = this.container.children[i];
        this.container.remove(child);
        count = count + 1;
    }
    console.log("Items removed", count);
}

CaseVisualizer.prototype.loadAvatars = function () {
    var dimensions = { ...this.dimensions, ...{ "default": ["default"] } };
    console.log(dimensions);
    //dimensions["default"] = ["default"];

    var mains = Object.keys(dimensions);
    mains.forEach(main => {
        for (var i = 0; i < dimensions[main].length; i++) {
            var sub = dimensions[main][i];
            var file_name = "models/" + main + "_" + sub.replace(/\s/g, '') + ".obj"; // Ex: models/age_child.obj
            // load a resource
            this.model_loader.load(
                // resource URL
                file_name,
                // called when resource is loaded
                function (object) {
                    var man = object;
                    object.scale.x = 50;
                    object.scale.y = 50;
                    object.scale.z = 50;
                    object.position.y = -205;
                    object.position.x = -205;
                    console.log("MODELLLL", this.models);
                    if (this.models[main]) {
                        this.models[main][sub] = man;
                    } else {
                        this.models[main] = {}
                        this.models[main][sub] = man;
                    }
                    this.modelsLoaded = true;
                    console.log("loaded", file_name);

                }.bind(this),
                // called when loading is in progresses
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // called when loading has errors
                function (error) {
                    console.log('An error happened', error);
                    if (this.models[main]) {
                        this.models[main][sub] = null;
                    } else {
                        this.models[main] = {}
                        this.models[main][sub] = null;
                    }
                }.bind(this)
            );
        }
    });
}



function hexToRgb(hex) {
    while (hex.length < 7) {
        hex = hex + '0';
    }
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function createLabel(msg) {
    var moonDiv = document.createElement('div');
    moonDiv.className = 'label';
    moonDiv.textContent = msg;
    moonDiv.style.marginTop = '-1em';
    var moonLabel = new THREE.CSS2DObject(moonDiv);

    return moonLabel;
}