import * as THREE from 'three';

const len = 2;
const symbolData = [
    [
        ["-o,-x,o", "o,-x,r", "-x,-o,-x"],
        ['-x,r,o', '-o,r,r', '-o,r,-o'],
        ['-x,o,x', '-x,o,r', '-o,x,-x']
    ],
    [
        ['r,-o,x', 'r,-o,r', 'r,-x,-o'],
        ['r,r,x', 'r,r,r', 'r,r,-x'],
        ['r,x,o', 'r,x,r', 'r,o,-x']
    ],
    [
        ['o,-x,o', 'x,-x,r', 'x,-o,-o'],
        ['x,r,x', 'o,r,r', 'o,r,-x'],
        ['o,o,x', 'x,x,r', 'x,x,o']
    ]

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

    if (i == 0) {
        console.log(symbolData[i][j][k]);
    }
    return cube;

}
export function spawnTestCube(i, j, k, sides) {
    let x = len * i;
    let y = len * j;
    let z = len * k;
    const _texture = new THREE.TextureLoader();
    const geometry = new THREE.BoxGeometry(sides, sides, sides);

    const material = [
        new THREE.MeshBasicMaterial({ map: _texture.load('/mineText/diamouns.png'), transparent: true }), //px
        new THREE.MeshBasicMaterial({ map: _texture.load('/mineText/glass.png'), transparent: true }), //nx
        new THREE.MeshBasicMaterial({ map: _texture.load('/diceTexture/cube1.png'), transparent: true }), //py;
        new THREE.MeshBasicMaterial({ map: _texture.load('/diceTexture/cube1.png'), transparent: true }), //ny;
        new THREE.MeshBasicMaterial({ map: _texture.load('/mineText/Grass.jpeg'), transparent: true }), //pz;
        new THREE.MeshBasicMaterial({ map: _texture.load('/mineText/obsedian.jpg'), transparent: true }), //nz
    ]

    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    return cube;
}

