const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000);
// camera.position.set(0.2538268801815511, 1329.2257935074563, -25.3884727987337);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

treeGroup = new THREE.Group();
const geometry = new THREE.CylinderGeometry(0.2,0.2,1,8,1);
const material = new THREE.MeshBasicMaterial( { color: 0xA0522D} );
const trunk = new THREE.Mesh( geometry, material );
trunk.position.set(0,-1,0);
scene.add( trunk );
//can change the radial segments according to the dataset
var radialSegments = 9;
const circleGeometry = new THREE.CylinderGeometry(2,2,0.2,radialSegments,1);
const circlematerial = new THREE.MeshBasicMaterial( { color: 0xA0f220} );
var leaves = new THREE.Mesh(circleGeometry, circlematerial);
leaves.position.set(0,1,0);
leaves.rotation.x  = 90;
scene.add( leaves );

camera.position.z = 5;

treeGroup.add(trunk, leaves);
const animate = function () {
    requestAnimationFrame( animate );

    //leaves.rotation.x += 0.01;
    // leaves.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();