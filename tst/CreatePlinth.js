import * as THREE from './libs/build/three.module.js';
import {r_d} from "./calculus/r_d.js";

let mlt = 0.7;
let skirtingHeight = 12;
let skirtingNum = 0;


let shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, 12);
shape.lineTo(1.1*mlt, 12);
shape.lineTo(1.1*mlt, 3);
shape.lineTo(1.01*mlt, 3);



function ControurGeometry( profileShape, contour, contourClosed, openEnded ) {

    contourClosed = contourClosed !== undefined ? contourClosed : true;
    openEnded = openEnded !== undefined ? openEnded : false;
    openEnded = contourClosed === true ? false : openEnded;

    let profileGeometry = new THREE.ShapeBufferGeometry(profileShape);
    let flipProfileGeometry = flipShapeGeometry(profileGeometry);
    profileGeometry.rotateX(Math.PI * 0.5);

    let profile = profileGeometry.attributes.position;

    let addEnds = openEnded === false ? 2 : 0;
    let profilePoints = new Float32Array(profile.count * (contour.length + addEnds) * 3);

    let endProfiles = [];

    for (let i = 0; i < contour.length; i++) {
        let v1 = new THREE.Vector2().subVectors(contour[i - 1 < 0 ? contour.length - 1 : i - 1], contour[i]);
        let v2 = new THREE.Vector2().subVectors(contour[i + 1 === contour.length ? 0 : i + 1], contour[i]);
        let angle = v2.angle() - v1.angle();
        let hA = angle * 0.5;
        let tA = v2.angle() + Math.PI * 0.5;
        if (!contourClosed){
            if (i === 0 || i === contour.length - 1) {hA = Math.PI * 0.5;}
            if (i === contour.length - 1) {tA = v1.angle() - Math.PI * 0.5;}
        }

        let shift = Math.tan(hA - Math.PI * 0.5);

        let shiftMatrix = new THREE.Matrix4().set(
            1, 0, 0, 0,
            -shift, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );


        let tempAngle = tA;

        let rotationMatrix = new THREE.Matrix4().set(
            Math.cos(tempAngle), -Math.sin(tempAngle), 0, 0,
            Math.sin(tempAngle),  Math.cos(tempAngle), 0, 0,
            0,                    0, 1, 0,
            0,                    0, 0, 1
        );

        let translationMatrix = new THREE.Matrix4().set(
            1, 0, 0, contour[i].x,
            0, 1, 0, contour[i].y,
            0, 0, 1, 0,
            0, 0, 0, 1,
        );

        let cloneProfile = profile.clone();

        cloneProfile.applyMatrix4( shiftMatrix);
        cloneProfile.applyMatrix4(rotationMatrix);
        cloneProfile.applyMatrix4(translationMatrix);

        profilePoints.set(cloneProfile.array, cloneProfile.count * i * 3);
        if (openEnded === false && (i === 0 || i === contour.length - 1)){
            endProfiles.push(cloneProfile);
        }
    }

    endProfiles.forEach((ep, idx) => {
        profilePoints.set(ep.array, ep.count * (contour.length + idx) * 3)
    });

    let fullProfileGeometry = new THREE.BufferGeometry();
    fullProfileGeometry.setAttribute("position", new THREE.BufferAttribute(profilePoints, 3));

    let index = [];

    let lastCorner = contourClosed === false ? contour.length - 1: contour.length;

    for (let i = 0; i < lastCorner; i++) {
        for (let j = 0; j < profile.count; j++) {
            let currCorner = i;
            let nextCorner = i + 1 == contour.length ? 0 : i + 1;
            let currPoint = j;
            let nextPoint = j + 1 == profile.count ? 0 : j + 1;

            let a = nextPoint + profile.count * currCorner;
            let b = currPoint + profile.count * currCorner;
            let c = currPoint + profile.count * nextCorner;
            let d = nextPoint + profile.count * nextCorner;


            index.push(a, b, d);
            index.push(b, c, d);
        }
    }

    if (openEnded === false){

        flipProfileGeometry.index.array.forEach(i => {index.push(i +  profile.count * (contour.length))});
        profileGeometry.index.array.forEach(i =>{index.push(i + profile.count * (contour.length + 1))});

    }

    fullProfileGeometry.setIndex(index);
    fullProfileGeometry.computeVertexNormals();

    return fullProfileGeometry;
}

function flipShapeGeometry(shapeGeometry) {
    let flipGeom = shapeGeometry.clone();
    for (let i = 0; i < flipGeom.attributes.position.count; i++) {
        flipGeom.attributes.position.array[i * 3] *= -1;
    }
    flipGeom.attributes.position.needsUpdate = true;

    let index = flipGeom.index.array;
    for (let i = 0; i < index.length; i += 3) {
        let v2 = index[i + 1];
        let tmp = v2;
        let v3 = index[i + 2];
        index[i + 1] = index[i + 2];
        index[i + 2] = tmp;
    }
    flipGeom.computeVertexNormals();
    return flipGeom;
}


export var CreatePlinth = async function( contour, room_id ){

    let group = new THREE.Group();
    group.name = "plinth_" + room_id;

    let start_p = contour.length - contour.indexOf("|");

    contour = contour.concat(contour.splice(0, contour.length - start_p));

    let paths = [];
    let path = [];

    for (let i = 0, l = contour.length; i < l; i++) {
        if ( contour[i] !== "|" ) {
            if ( i === l - 1 ) { path.push(contour[i]); paths.push( r_d(path)); }
            else path.push(contour[i]);
        }
        else { paths.push( r_d(path) ); path = []}
    }


    for (let path of paths){

        if (path.length < 2) continue;

        let geom = ControurGeometry( shape, path, false, false);

        geom.rotateX(Math.PI * 0.5);
        geom.translate(0, skirtingHeight, 0);

        let object = new THREE.Mesh(geom, new THREE.MeshStandardMaterial({color: new THREE.Color('#52494A'), side: THREE.FrontSide}));

        skirtingNum++;
        object.name = "plinth";

        group.add(object);
    }


    return group;
};

