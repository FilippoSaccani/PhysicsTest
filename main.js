import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { RapierPhysics } from "three/addons/physics/RapierPhysics";

//scena
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xa0a0a0 );
scene.add(new THREE.AxesHelper(1000))


//telecamera
const camera = new THREE.OrthographicCamera(-window.innerWidth/2, window.innerWidth/2, window.innerHeight/2, -window.innerHeight/2);
camera.position.set(0, 0, 1000);
camera.lookAt(0, 0, 0);
camera.near = 1;
camera.far = 2000;


//renderizzatore
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;


//fisica di RapierPhysics.js
const physics = await RapierPhysics();

const hemiLight = new THREE.HemisphereLight();
hemiLight.intensity = 0.3;
scene.add(hemiLight);

const spotLight = new THREE.SpotLight();
spotLight.intensity = 10;
spotLight.castShadow = true;
spotLight.shadow.camera.near = 0.1;
spotLight.shadow.camera.far = 3000;
spotLight.shadow.mapSize.width = 2056;
spotLight.shadow.mapSize.height = 2056;
spotLight.shadow.penumbra = 2;
spotLight.shadow.bias = 0.0000001;

spotLight.position.set(800, 600, 0);
spotLight.lookAt(0, 0, 0);
scene.add(spotLight);


const dirLightHelper = new THREE.DirectionalLightHelper( spotLight );
scene.add(dirLightHelper);


//piano
const plane = new THREE.Mesh(
    new THREE.BoxGeometry( 1000, 5, 1000 ),
    new THREE.MeshStandardMaterial( { color: 0xf0f0f0 } )
);
plane.receiveShadow = true;
scene.add(plane);
physics.addMesh(plane);


//cubo 1
const cubeGeometry = new THREE.BoxGeometry(20, 20, 20);
const cubeMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
cube.castShadow = true;
cube.receiveShadow = true;
cube.position.y = 100;
cube.position.z = 200;
scene.add(cube);
physics.addMesh(cube, 1);

//cubo 2
const cube2Material = new THREE.MeshStandardMaterial({color: 0x0000ff});
const cube2 = new THREE.Mesh( cubeGeometry, cube2Material );
cube2.castShadow = true;
cube2.receiveShadow = true;
cube2.position.y = 300;
cube2.position.z = 212;
scene.add(cube2);
physics.addMesh(cube2, 1);


const controls = new OrbitControls( camera, renderer.domElement );

function update() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );

    window.onresize = update;
    controls.update();
    //camera.lookAt(cube.position);

    renderer.render( scene, camera );
}

animate();