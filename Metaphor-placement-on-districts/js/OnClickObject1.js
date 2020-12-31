function drawObjectOnclick(){
var m1 = new Mushroom(65, 0, 19, 15, 1.6, 1);
    
// Mushroom1
    m1.setColors("0xff00ba", "0xbbba00", "0xffba00");
    m1.setTextures("./img/cap1.png", "./img/ucap1.png", "./img/stalk1.png");
    m1.growIt();

    m1.model.id = "m1";
    m1.model.children[0].id = "cap1";
    m1.model.children[1].id = "ucap1";
    // m1.model.children[2].id = "stalk1";
    //  m1.model.children[2].material.map.wrapT = THREE.RepeatWrapping;
    m1.model.children[0].material.map.wrapS = THREE.RepeatWrapping;
    m1.model.children[0].material.map.repeat.set(3, 1);

    // adding the single mushroom
    m1.model.position.copy(
    new THREE.Vector3(-100, -50, -660)
    );

    var shroomGroup = new THREE.Object3D();
    shroomGroup.add(m1.model);
    scene.add(shroomGroup);
}

