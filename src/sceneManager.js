import * as THREE from 'three';
import { gsap } from "gsap";
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { spawncube, spawnTestCube } from './rubik';

//#region SetUps
const scene = new THREE.Scene();
const colors = [0xfcba03, 0xf54b27, 0x7bf527, 0x27a4f5, 0x9127f5, 0xf527ec];
const _cubepositions = [];
const color2 = new THREE.Color(0xf6f6f6);
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const fov = 45;
const aspect = size.width / size.height;  // 2 is the canvas default
const near = 0.1
const far = 1005;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector('#scn');
    canvas.style.width = size.width + 'px';
    canvas.style.height = size.height + 'px';
    canvas.width = size.width * 2;
    canvas.height = size.height * 2;
    scene.background = color2;
    initialize();

})


function initialize() {

    //const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    camera.position.set(2.5, 2.5, 15);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scn').appendChild(renderer.domElement);


    // const orbit = new OrbitControls(camera, renderer.domElement);
    // orbit.enableDamping = true; // Smooth orbiting
    // orbit.dampingFactor = 0.05;

    const light = new THREE.DirectionalLight(0xffffff, 3);
    scene.add(light);

    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    formingtogether();
    // cube();
    //highlight(scene, camera);
    Update(renderer, camera);
    //orbit.update();

}
//#endregion
//#region Interactions Listener
const _positions = [
    new THREE.Vector3(2, 2, 4),
    new THREE.Vector3(4, 2, 2),
    new THREE.Vector3(0, 2, 2),
    new THREE.Vector3(0, 1, 1),
    new THREE.Vector3(2, 4, 2),
    new THREE.Vector3(2, 0, 2)

]
window.addEventListener("click", function (e) {
    pointer.x = (e.clientX / this.window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / this.window.innerHeight) * 2 + 1;

    highlight(scene, camera);

})

$(document).on('keydown', function (event) {
    // Check which key was pressed
    if (event.key === 'ArrowUp') {
        //alert('You pressed the UP arrow!');
        //move the camera up while looking at the center square;
        gsap.to(camera.position, {
            y: 15,
            z: 2.5,
            duration: 1.5,
            onUpdate: function () {
                camera.lookAt(2, 4, 2);
            }
        })

    } else if (event.key === 'ArrowDown') {
        gsap.to(camera.position, {
            y: -10,
            z: 2.5,
            duration: 1.5,
            onUpdate: function () {
                camera.lookAt(2, 0, 2);
            }
        })

    } else if (event.key === 'ArrowLeft') {
        function positionNUMB() {
            let pos = [];
            currentX = camera.position.x;
            currentZ = camera.position.z;
            if (currentX == 2.5 && currentZ == 15) {
                pos[0] = -15;
                pos[1] = 2.5;
            }

        }
        gsap.to(camera.position, {
            x: -10,
            z: 2.5,
            duration: 1.5,
            onUpdate: function () {
                camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
            }
        })

    } else if (event.key === 'ArrowRight') {
        alert('You pressed the RIGHT arrow!');
    }
});

//#endregion


//mouse highlight
function highlight(scene, cam) {
    raycaster.setFromCamera(pointer, cam);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);


    if (intersects.length > 0) {
        //intersects[0].object.material.color.set(0xff0000); // Example: Change color on hit
        //console.log("Object clicked:", intersects[0].object);
        console.log("Object clicked:", intersects[0]);
        rotateCube(intersects[0]);

    } else {

    }
}

function rotateCube(target) {
    //empty euler;
    let dirct;
    let _case = null;
    //debugger;
    //determine direction with normal
    const _x = Math.ceil(target.point.x);
    console.log("x_rotation" + _x);
    const _z = Math.ceil(target.point.z);
    console.log("z_rotation" + _z);

    if (Math.ceil(target.point.x) >= 5) {
        dirct = target.object.rotation.z;
        _case = "x";
        console.log(_case);
    } else if (Math.floor(target.point.x) <= -1) {
        dirct = target.object.rotation.z;
        _case = "x";
        console.log(_case + "negative");
    } else if (Math.floor(target.point.y) >= 5) {
        dirct = target.object.rotation.y;
        _case = "y";
        console.log(_case);
    } else if (Math.floor(target.point.y) <= -1) {
        dirct = target.object.rotation.y;
        _case = "y";
        console.log(_case + "neg");

    } else if (Math.ceil(target.point.z) >= 5) {
        dirct = target.object.rotation.x;
        _case = "z";
        console.log(_case);
    } else if (Math.floor(target.point.z) <= -1) {
        dirct = target.object.rotation.x;
        _case = "z";
        console.log(_case + "negative");
    }

    let newAngle = dirct + Math.PI / 2;
    console.log("Nangle" + newAngle);
    console.log("rotattion" + dirct);
    // console.log("direct" + dirct);
    function _rotating() {
        let finRotate = new THREE.Euler();
        if (dirct < newAngle - 0.01) {
            switch (_case) {
                case "x":
                    dirct += 0.05;
                    target.object.rotation.set(target.object.rotation.x, target.object.rotation.y, dirct);
                    finRotate.copy(target.object.rotation);

                    break;
                case "y":
                    dirct += 0.05;
                    target.object.rotation.set(dirct, target.object.rotation.y, target.object.rotation.z);
                    finRotate.copy(target.object.rotation);
                    break;
                case "z":
                    dirct += 0.05;
                    target.object.rotation.set(dirct, target.object.rotation.y, target.object.rotation.z);
                    finRotate.copy(target.object.rotation);
                    //console.log(finRotate);
                    break;
            }

            requestAnimationFrame(_rotating);
        }
    }
    _rotating();
}
function formingtogether() {
    const len = 2;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {

                let x = len * i;
                let y = len * j;
                let z = len * k;
                const random = Math.floor(Math.random() * colors.length);
                let cubes = null;
                if (j == 2) {
                    cubes = spawnTestCube(x, y, z, len);
                } else {
                    cubes = spawncube(x, y, z, len, colors[random]);
                }

                if (cubes != null) {
                    scene.add(cubes);
                    _cubepositions.push(cubes);
                }


            }
        }

    }
}
function Update(render, camera, controls) {

    //controls.update();
    render.render(scene, camera);

    requestAnimationFrame(() => Update(render, camera));
}