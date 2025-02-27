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
const renderer = new THREE.WebGLRenderer();
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


    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scn').appendChild(renderer.domElement);


    // const orbit = new OrbitControls(camera, renderer.domElement);
    // orbit.enableDamping = true; // Smooth orbiting
    // orbit.dampingFactor = 0.05;

    const light = new THREE.DirectionalLight(0xffffff, 3);
    scene.add(light);

    // const axesHelper = new THREE.AxesHelper(10);
    // scene.add(axesHelper);

    formingtogether();
    // cube();
    //highlight(scene, camera);
    Update(renderer, camera);
    //orbit.update();

}
//resizable canvas
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

})
//#endregion
//#region Interactions Listener

window.addEventListener("click", function (e) {
    pointer.x = (e.clientX / this.window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / this.window.innerHeight) * 2 + 1;

    highlight(scene, camera);

})
let centered = true;

$(document).on('keydown', function (event) {
    // Check which key was pressed
    let currentPos = camera.position;
    let currentRot = camera.rotation;
    //console.log("centered " + centered);
    console.log("x" + camera.rotation.x);
    if (event.key === 'ArrowUp') {

        //default locations for going up;
        let _nY = 15;
        let _nZ = 2.5;
        console.log("x" + camera.position.x + "y" + camera.position.y + "z" + camera.position.z);
        //debugger;
        //change rotation base off of where the user is at;

        //reset from bottom, to either -Z or Z;
        if (camera.position.y <= -9) {
            //debugger;
            if (Math.abs(camera.rotation.y) >= 3.14) {

                _nY = 2.5;
                _nZ = -15;
                //alert("change");
                gsap.to(camera.rotation, {
                    x: camera.rotation.x + Math.PI / 2,
                    duration: 1.5,
                })
            } else if (Math.abs(camera.rotation.z - 1.57) <= 0.1) {

                const eu = new THREE.Euler(-Math.PI / 2, 0, 0);
                let qX = new THREE.Quaternion().setFromEuler(eu);
                let newQua = new THREE.Quaternion();
                newQua.multiplyQuaternions(camera.quaternion, qX);
                const tl = gsap.timeline();
                tl.to(camera.quaternion, {
                    x: newQua.x,
                    y: newQua.y,
                    z: newQua.z,
                    w: newQua.w,
                    duration: 1.5,
                    onUpdate: function () {
                        //camera.quaternion.normalize();
                    },
                    onComplete: function () {
                        console.log("rotation  x" + camera.rotation.x, "y" + camera.rotation.y, "z" + camera.rotation.z);
                        console.log("x" + camera.position.x + "y" + camera.position.y + "z" + camera.position.z);
                    }
                })
                    .to(camera.position, {
                        x: -15,
                        y: 2.5,
                        z: 2.5,
                        duration: 1.5,

                    })

            } else if (Math.abs(camera.rotation.z + 1.57) <= 0.1) {
                const eu = new THREE.Euler(-Math.PI / 2, 0, 0);
                let qX = new THREE.Quaternion().setFromEuler(eu);
                let newQua = new THREE.Quaternion();
                newQua.multiplyQuaternions(camera.quaternion, qX);
                const tl = gsap.timeline();
                tl.to(camera.quaternion, {
                    x: newQua.x,
                    y: newQua.y,
                    z: newQua.z,
                    w: newQua.w,
                    duration: 1.5,
                    onUpdate: function () {
                        //camera.quaternion.normalize();
                    },
                    onComplete: function () {
                        console.log("rotation  x" + camera.rotation.x, "y" + camera.rotation.y, "z" + camera.rotation.z);
                        console.log("x" + camera.position.x + "y" + camera.position.y + "z" + camera.position.z);
                    }
                })
                    .to(camera.position, {
                        x: 15,
                        y: 2.5,
                        z: 2.5,
                        duration: 1.5,

                    })
            }
            else {
                _nY = 2.5;
                _nZ = 15;

                gsap.to(camera.rotation, {
                    x: camera.rotation.x - Math.PI / 2,
                    duration: 1.5,
                })
            }
            centered = true;

        } else if (camera.position.z <= 0) {

            gsap.to(camera.rotation, {
                x: camera.rotation.x + Math.PI / 2,
                duration: 1.5,
            })
            centered = false;
        } else if ((camera.position.x <= 0 || camera.position.x >= 15) && camera.position.z <= 2.5) {
            //reassigning axis from -X and X as Z;

            let qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
            let newQua = new THREE.Quaternion();
            newQua.multiplyQuaternions(camera.quaternion, qX);

            gsap.to(camera.quaternion, {
                x: newQua.x,
                y: newQua.y,
                z: newQua.z,
                w: newQua.w,
                duration: 1.5,
                onUpdate: function () {
                    camera.quaternion.normalize();
                }
            })
            //reset X
            gsap.to(camera.position, {
                x: 2.5,
                duration: 1.5,

            })
            centered = false;
        } else if (camera.position.y >= 15) {
            return;
        }
        else {
            gsap.to(camera.rotation, {
                x: camera.rotation.x - Math.PI / 2,
                duration: 1.5,
            })
            centered = false;
        }

        gsap.to(camera.position, {
            y: _nY,
            z: _nZ,
            duration: 1.5,

        })



    } else if (event.key === 'ArrowDown') {
        let _nY = -10;
        let _nZ = 2.5;
        //debugger;
        if (camera.position.y <= -9) {
            return;
        }
        if (camera.position.y >= 15) {

            if (Math.abs(camera.rotation.y) >= 3.14) {

                _nY = 2.5;
                _nZ = -15;
                //alert("change");
                gsap.to(camera.rotation, {
                    x: camera.rotation.x - Math.PI / 2,
                    duration: 1.5,
                })
            } else if (Math.abs(camera.rotation.z - 1.57) <= 0.1) {
                const eu = new THREE.Euler(Math.PI / 2, 0, 0);
                let qX = new THREE.Quaternion().setFromEuler(eu);
                let newQua = new THREE.Quaternion();
                newQua.multiplyQuaternions(camera.quaternion, qX);
                const tl = gsap.timeline();
                tl.to(camera.quaternion, {
                    x: newQua.x,
                    y: newQua.y,
                    z: newQua.z,
                    w: newQua.w,
                    duration: 1.5,
                    onUpdate: function () {
                        //camera.quaternion.normalize();
                    },
                    onComplete: function () {
                        console.log("rotation  x" + camera.rotation.x, "y" + camera.rotation.y, "z" + camera.rotation.z);
                        console.log("x" + camera.position.x + "y" + camera.position.y + "z" + camera.position.z);
                    }
                })
                    .to(camera.position, {
                        x: 15,
                        y: 2.5,
                        z: 2.5,
                        duration: 1.5,

                    })
            } else if (Math.abs(camera.rotation.z + 1.57) <= 0.1) {
                const eu = new THREE.Euler(Math.PI / 2, 0, 0);
                let qX = new THREE.Quaternion().setFromEuler(eu);
                let newQua = new THREE.Quaternion();
                newQua.multiplyQuaternions(camera.quaternion, qX);
                const tl = gsap.timeline();
                tl.to(camera.quaternion, {
                    x: newQua.x,
                    y: newQua.y,
                    z: newQua.z,
                    w: newQua.w,
                    duration: 1.5,
                    onUpdate: function () {
                        //camera.quaternion.normalize();
                    },
                    onComplete: function () {
                        console.log("rotation  x" + camera.rotation.x, "y" + camera.rotation.y, "z" + camera.rotation.z);
                        console.log("x" + camera.position.x + "y" + camera.position.y + "z" + camera.position.z);
                    }
                })
                    .to(camera.position, {
                        x: -15,
                        y: 2.5,
                        z: 2.5,
                        duration: 1.5,

                    })
            }
            else {
                _nY = 2.5;
                _nZ = 15;
                //default

                gsap.to(camera.rotation, {
                    x: camera.rotation.x + Math.PI / 2,
                    duration: 1.5,
                })
            }
            centered = true;




        } else if ((camera.position.x <= 0 || camera.position.x >= 15) && camera.position.z <= 2.5) {
            //reassigning axis from -X and X as Z;
            //debugger;
            centered = false;
            let qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
            let newQua = new THREE.Quaternion();
            newQua.multiplyQuaternions(camera.quaternion, qX);

            gsap.to(camera.quaternion, {
                x: newQua.x,
                y: newQua.y,
                z: newQua.z,
                w: newQua.w,
                duration: 1.5,
                onUpdate: function () {
                    camera.quaternion.normalize();
                }
            })
            //reset X
            gsap.to(camera.position, {
                x: 2.5,
                duration: 1.5,

            })
        }
        else if (camera.position.z <= 0) {
            // alert("test");
            centered = false;
            gsap.to(camera.rotation, {
                x: camera.rotation.x - Math.PI / 2,
                duration: 1.5,
            })
        } else {
            centered = false;
            gsap.to(camera.rotation, {
                x: camera.rotation.x + Math.PI / 2,
                duration: 1.5,
            })
        }
        gsap.to(camera.position, {
            y: _nY,
            z: _nZ,
            duration: 1.5,
        })
        console.log(camera.position.y);

    } else if (event.key === 'ArrowLeft' && centered == true) {
        console.log(camera.position.y);
        function positionNUMB() {
            let pos = [];
            let currentX = camera.position.x;
            let currentZ = camera.position.z;
            if (currentX == 2.5 && currentZ == 15) {
                //neg X
                pos[0] = -15;
                pos[1] = 2.5;
            } else if (currentX == -15 && currentZ == 2.5) {
                //neg z;
                pos[0] = 2.5;
                pos[1] = -15;
            } else if (currentX == 2.5 && currentZ == -15) {
                //pos X
                console.log("x" + camera.position.x + "y" + camera.position.y + "z" + camera.position.z);
                pos[0] = 15;
                pos[1] = 2.5
            } else if (currentX == 15 && currentZ == 2.5) {
                //pos Z, default
                pos[0] = 2.5;
                pos[1] = 15;
            } else {
                //alert("falled through");
            }
            return pos;

        }

        let _posX = positionNUMB();

        gsap.to(camera.position, {
            x: _posX[0],
            z: _posX[1],
            duration: 1.5,

        })
        gsap.to(camera.rotation, {
            y: camera.rotation.y - Math.PI / 2,
            duration: 1.5,
            onStart: function () {
                centered = false;
            },
            onComplete: function () {
                centered = true;
            }
        })

    } else {
        // debugger;
        camera.position.set(currentPos.x, currentPos.y, currentPos.z);
        console.log(currentPos.x + currentPos.y + currentPos.z);
        camera.rotation.set(currentRot.x, currentRot.y, currentRot.z);
        //alert("falled through og");
    }
});

//#endregion

let animationPlaying = false;
//mouse highlight
function highlight(scene, cam) {
    raycaster.setFromCamera(pointer, cam);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);


    if (intersects.length > 0) {
        //intersects[0].object.material.color.set(0xff0000); // Example: Change color on hit
        //console.log("Object clicked:", intersects[0].object);
        console.log("Object clicked:", intersects[0]);

        if (animationPlaying == false) {
            rotateCube(intersects[0]);
        }


    } else {

    }
}
//#region cubeRotation;
function rotateCube(target) {
    //empty euler;
    let dirct;
    let _case = null;
    //debugger;
    //determine direction with normal
    const _x = Math.ceil(target.point.x);
    const _z = Math.ceil(target.point.z);

    let axis = new THREE.Vector3(); //axis of rotation;
    //target.object.rotation.order = "YXZ";

    if (target.point.x >= 5) {

        _case = "x";
        axis.set(0, 0, -1);
    } else if (target.point.x <= -1) {
        dirct = target.object.rotation.z;
        _case = "x";
        axis.set(0, 0, 1);
    } else if (target.point.y >= 5) {
        dirct = target.object.rotation.y;
        _case = "y";
        axis.set(1, 0, 0);
    } else if (target.point.y <= -1) {
        dirct = target.object.rotation.y;
        _case = "y";
        axis.set(-1, 0, 0);

    } else if (target.point.z >= 5) {
        dirct = target.object.rotation.x;
        _case = "z";
        axis.set(1, 0, 0);
    } else if (target.point.z <= -1) {
        dirct = target.object.rotation.x;
        _case = "z";
        axis.set(-1, 0, 0);
    }

    let quat = new THREE.Quaternion();
    let angle = Math.PI / 2;

    quat.setFromAxisAngle(axis, angle);
    // console.log("direct" + dirct);
    let finRotation = new THREE.Quaternion();
    finRotation.multiplyQuaternions(target.object.quaternion, quat);


    gsap.to(target.object.quaternion, {
        x: finRotation.x,
        y: finRotation.y,
        z: finRotation.z,
        w: finRotation.w,
        duration: 1.5,
        onStart: function () {
            animationPlaying = true;
        },
        onComplete: function () {
            animationPlaying = false;
        }
    })


}
//#endregion
function formingtogether() {
    const len = 2;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {


                const random = Math.floor(Math.random() * colors.length);
                let cubes = null;

                //cubes = spawnTestCube(i, j, k, len);

                cubes = spawnTestCube(i, j, k, len);


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