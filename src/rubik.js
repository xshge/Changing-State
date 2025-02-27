import * as THREE from 'three';
import crossURL from '/tttTexture/redcross.jpg'
const len = 2;
const symbolData = [
    [
        ["-x,-o,-x", "o,-x,r", "-x,-x,o"],
        ['-x,r,-o', '-o,r,r', '-x,r,o'],
        ['-o,x,-x', '-x,o,r', '-o,o,x']
    ],
    [
        ['r,-x,-o', 'r,-o,r', 'r,-o,x'],
        ['r,r,-x', 'r,r,r', 'r,r,x'],
        ['r,o,-x', 'r,x,r', 'r,x,o']
    ],
    [
        ['x,-o,-o', 'o,-x,r', 'x,-x,o'],
        ['x,r,-x', 'o,r,r', 'o,r,x'],
        ['o,x,-o', 'x,x,r', 'x,o,x']
    ]

]

const texturesImg = [
    crossURL,
    '/tttTexture/icons8-circle-100.png',
    '/tttTexture/Rectangle 2.jpg',
]

export function spawncube(i, j, k, sides, clr) {
    let x = len * i;
    let y = len * j;
    let z = len * k;
    const texture = new THREE.TextureLoader();

    const geometry = new THREE.BoxGeometry(sides, sides, sides);
    const material = [
        new THREE.MeshBasicMaterial({ map: texture.load('/diceTexture/cube1.png'), transparent: true }),
        new THREE.MeshBasicMaterial({ map: texture.load('/diceTexture/cube2.png'), transparent: true }),
        new THREE.MeshBasicMaterial({ map: texture.load('/diceTexture/cube3.png'), transparent: true }),
        new THREE.MeshBasicMaterial({ map: texture.load('/diceTexture/cube4.png'), transparent: true }),
        new THREE.MeshBasicMaterial({ map: texture.load('/diceTexture/cube5.png'), transparent: true }),
        new THREE.MeshBasicMaterial({ map: texture.load('/diceTexture/cube6.png'), transparent: true }),
    ]
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);

    // if (i == 0) {
    //     console.log(symbolData[i][j][k]);
    // }
    return cube;

}
export function spawnTestCube(i, j, k, sides) {
    let x = len * i;
    let y = len * j;
    let z = len * k;
    const _texture = new THREE.TextureLoader();
    console.log(symbolData[i][j][k]);
    const geometry = new THREE.BoxGeometry(sides, sides, sides);

    // const material = [
    //     new THREE.MeshBasicMaterial({ map: _texture.load('/mineText/diamouns.png'), transparent: true }), //px
    //     new THREE.MeshBasicMaterial({ map: _texture.load('/mineText/glass.png'), transparent: true }), //nx
    //     new THREE.MeshBasicMaterial({ map: _texture.load('/diceTexture/cube1.png'), transparent: true }), //py;
    //     new THREE.MeshBasicMaterial({ map: _texture.load('/diceTexture/cube1.png'), transparent: true }), //ny;
    //     new THREE.MeshBasicMaterial({ map: _texture.load('/mineText/Grass.jpeg'), transparent: true }), //pz;
    //     new THREE.MeshBasicMaterial({ map: _texture.load('/mineText/obsedian.jpg'), transparent: true }), //nz
    // ]
    const material = creatematerials(_texture, i, j, k);
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    return cube;
}
function creatematerials(load, i, j, k) {
    let materials = randomTextures(load);
    const _id = symbolData[i][j][k];

    const properties = _id.split(",");
    for (let a = 0; a < properties.length; a++) {
        switch (a) {
            case 0:
                if (properties[a].includes("o")) {
                    if (properties[a].charAt(0) == "-") {
                        materials[1] = new THREE.MeshBasicMaterial({ map: load.load('/tttTexture/icons8-circle-100.png'), transparent: true, side: THREE.DoubleSide });
                    } else {
                        materials[0] = new THREE.MeshBasicMaterial({ map: load.load('/tttTexture/icons8-circle-100.png'), transparent: true, side: THREE.DoubleSide });
                    }
                } else if (properties[a].includes("x")) {
                    if (properties[a].charAt(0) == "-") {
                        materials[1] = new THREE.MeshBasicMaterial({ map: load.load(texturesImg[0]), side: THREE.DoubleSide });
                    } else {
                        materials[0] = new THREE.MeshBasicMaterial({ map: load.load(texturesImg[0]), side: THREE.DoubleSide });
                    }
                }
                break;

            case 1:
                if (properties[a].includes("o")) {
                    if (properties[a].charAt(0) == "-") {
                        materials[3] = new THREE.MeshBasicMaterial({ map: load.load('/tttTexture/icons8-circle-100.png'), transparent: true, side: THREE.DoubleSide });
                    } else {
                        materials[2] = new THREE.MeshBasicMaterial({ map: load.load('/tttTexture/icons8-circle-100.png'), transparent: true, side: THREE.DoubleSide });
                    }
                } else if (properties[a].includes("x")) {
                    if (properties[a].charAt(0) == "-") {
                        materials[3] = new THREE.MeshBasicMaterial({ map: load.load(texturesImg[0]), side: THREE.DoubleSide });
                    } else {
                        materials[2] = new THREE.MeshBasicMaterial({ map: load.load(texturesImg[0]), side: THREE.DoubleSide });
                    }
                }

                break;
            case 2:
                //debugger;
                if (properties[a].includes("o")) {
                    if (properties[a].charAt(0) == "-") {
                        materials[5] = new THREE.MeshBasicMaterial({ map: load.load('/tttTexture/icons8-circle-100.png'), transparent: true, side: THREE.DoubleSide });
                    } else {
                        materials[4] = new THREE.MeshBasicMaterial({ map: load.load('/tttTexture/icons8-circle-100.png'), transparent: true, side: THREE.DoubleSide });
                    }
                } else if (properties[a].includes("x")) {
                    if (properties[a].charAt(0) == "-") {
                        materials[5] = new THREE.MeshBasicMaterial({ map: load.load(texturesImg[0]), side: THREE.DoubleSide });
                    } else {
                        materials[4] = new THREE.MeshBasicMaterial({ map: load.load(texturesImg[0]), side: THREE.DoubleSide });
                    }
                }

                break;
        }

    }

    return materials;
}
function randomTextures(loader) {

    const matArr = [];
    const len = 6;

    for (let i = 0; i < len; i++) {
        let mat = new THREE.MeshBasicMaterial({ map: loader.load(texturesImg[Math.floor(Math.random() * 3)]), transparent: true, side: THREE.DoubleSide });
        matArr.push(mat);

    }

    return matArr;

}