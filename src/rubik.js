import * as THREE from 'three';

export function spawncube(x, y, z, sides, clr) {

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
    return cube;

}
export function spawnTestCube(x, y, z, sides) {
    const _texture = new THREE.TextureLoader();
    const geometry = new THREE.BoxGeometry(sides, sides, sides);

    const material = [
        new THREE.MeshBasicMaterial({ map: _texture.load('/mineText/diamouns.png'), transparent: true }),
        new THREE.MeshBasicMaterial({ map: _texture.load('/mineText/glass.png'), transparent: true }),
        new THREE.MeshBasicMaterial({ map: _texture.load('/diceTexture/cube1.png'), transparent: true }),
        new THREE.MeshBasicMaterial({ map: _texture.load('/diceTexture/cube1.png'), transparent: true }),
        new THREE.MeshBasicMaterial({ map: _texture.load('/mineText/Grass.jpeg'), transparent: true }),
        new THREE.MeshBasicMaterial({ map: _texture.load('/mineText/obsedian.jpg'), transparent: true }),
    ]

    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    return cube;
}

