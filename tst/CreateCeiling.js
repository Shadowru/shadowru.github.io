import * as THREE from './libs/build/three.module.js';
import { envMap } from "./textures.js";

export var CreateCeiling = async function( perimeter_points, height){

    let ceiling_shape = new THREE.Shape();
    ceiling_shape.moveTo(perimeter_points[0].x, perimeter_points[0].y);
    for(let i=1, len=perimeter_points.length; i<len; i++){
        ceiling_shape.lineTo(perimeter_points[i].x , perimeter_points[i].y);
    }

    let mat = new THREE.MeshStandardMaterial({
        envMap: envMap,
        side: THREE.FrontSide,
        color: 0xffffff,
    });

    const ceiling_geometry = new THREE.ShapeBufferGeometry( ceiling_shape );
    let object = new THREE.Mesh( ceiling_geometry, mat );
    object.castShadow = true;
    object.receiveShadow = false;
    object.rotation.x = Math.PI / 2;
    object.position.y = height-1;
    object.name = 'ceiling';


    return object;
};
