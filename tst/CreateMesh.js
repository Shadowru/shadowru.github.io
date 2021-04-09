import {
    BufferGeometry,
    BufferAttribute,
    MeshStandardMaterial,
    FrontSide,
    Color,
    Mesh,
    TextureLoader,
    sRGBEncoding,
    RepeatWrapping

} from './libs/build/three.module.js';

import { envMap } from "./textures.js";


const path_diff = "./img/wall/plaster.jpg";
const path_rou = "./img/wall/rou.png";
const path_met = "./img/wall/met.jpg";

let loaderTexture = new TextureLoader();

let diff = loaderTexture.load(
    path_diff,

    function ( t ) {
        t.encoding = sRGBEncoding;
        t.anisotropy = 16;
        t.flipY = false;
        t.wrapS = t.wrapT = RepeatWrapping;
        //t.repeat.set( tWidth * fix, tHeight * fix );
    }
);

let met = loaderTexture.load(
    path_met,

    function ( t ) {
        t.encoding = sRGBEncoding;
        t.anisotropy = 4;
        t.flipY = false;
        t.wrapS = t.wrapT = RepeatWrapping;
        //t.repeat.set( tWidth * fix, tHeight * fix );
    }
);

let rou = loaderTexture.load(
    path_rou,

    function ( t ) {
        t.encoding = sRGBEncoding;
        t.anisotropy = 4;
        t.flipY = false;
        t.wrapS = t.wrapT = RepeatWrapping;
        //t.repeat.set( tWidth * fix, tHeight * fix );
    }
);

export var CreateMesh = async function( wall ) {

    let numVertices = wall.vertices.length;
    let positionNumComponents = 3;
    let uvNumComponents = 2;
    let positions = new Float32Array(numVertices * positionNumComponents);
    let uvs = new Float32Array(numVertices * uvNumComponents);
    let posNdx = 0;
    let uvNdx = 0;


    for (let vertex of wall.vertices) {
        positions.set(vertex.pos, posNdx);
        uvs.set(vertex.uv, uvNdx);
        posNdx += positionNumComponents;
        uvNdx += uvNumComponents;
    }

    let geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, positionNumComponents));
    geometry.setAttribute('uv', new BufferAttribute(uvs, uvNumComponents));
    geometry.setIndex(wall.faces);
    geometry.computeVertexNormals();

    let material;

    if (wall.type !== 'outside') {
        material = new MeshStandardMaterial({

            side: FrontSide,
            color: new Color('#ffffff'),
            envMap: envMap,
            map: diff,
            roughnessMap: rou,
            metalnessMap: met
        });
    }else{
        material = new MeshStandardMaterial({

            side: FrontSide,
            color: new Color('#ffffff'),
            transparent: true,
            opacity: 0.05
        });

    }


    const object = new Mesh(geometry, material);

    object.name = 'wall_' + wall.id;
    object.castShadow = true;
    object.receiveShadow = false;


    return object
};
