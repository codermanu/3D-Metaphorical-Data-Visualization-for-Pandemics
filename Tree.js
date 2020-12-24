/* setup */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 4, 10 );

const renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// var controls = new THREE.OrbitControls( camera, renderer.domElement );
// controls = new OrbitControls( camera, renderer.domElement );

/* scene */
/* scene */
const sceneWidth = 20;
let tree;

const numTrees = random( 4, 8 );
for (let i = 0; i < numTrees; i++) {
    tree = new THREE.Group();
    const h = random(2, 4);

    const geo = new THREE.CylinderGeometry( 0.125, 0.25, h, 5 );
    const mat = new THREE.MeshBasicMaterial( { color: 0xA19281 } );
    const trunk = new THREE.Mesh( geo, mat );
    tree.add( trunk );

    const numLeaves = random( 1, 5 );
    for (let j = 0; j < numLeaves; j++) {
        const leafGeo = new THREE.IcosahedronGeometry( random( 0.25 ) );
        const leafMat = new THREE.MeshBasicMaterial( { color: 0x8AE8A7 } );
        const leaf = new THREE.Mesh( leafGeo, leafMat );
        let x = random( -0.5, 0.5 );
        let y = h / 2 + random( -0.5, 0.25 );
        let z = random( -0.5, 0.5 );
        leaf.position.set( x, y, z );
        leaf.rotation.x = random( 0, Math.PI * 0.5 );
        leaf.rotation.y = random( 0, Math.PI * 0.5 );
        tree.add( leaf );
    }

    let x = random(-sceneWidth / 2, sceneWidth / 2);
    let z = random( -2, -3 );
    tree.position.set( x, h / 2, z );
    scene.add( tree );
}

// random range function
// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function random( min, max ) {
    return Math.random() * ( max - min ) + min;
}

/* load editor scene */
const loader = new THREE.ObjectLoader();
loader.load( 'scene.json', onLoad);

function onLoad( bench ) {

    bench.scale.set( 0.5, 0.5, 0.5 );
    bench.position.set( 0, 0.5, -3.3 );

    scene.add( bench );
    render();
}
// function animate() {
//
//     controls.update();
//
//     requestAnimationFrame( animate );
//     renderer.render( scene, camera );
// }
function render() {

    requestAnimationFrame( render );

    tree.rotation.y += 0.007;

    renderer.render( scene, camera );

}