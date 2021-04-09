import { GLTFLoader } from './../libs/examples/jsm/loaders/GLTFLoader.js';
import { Group, Vector2 } from './../libs/build/three.module.js';
import { envMap } from "./../textures.js";

export var Door = async function( door ){

    let group = new Group();
    group.name = "door_" + door.room_id  + "|" + door.id;

    let path = 'assets/door/model.glb';

    let loader = new GLTFLoader();

    let scaleFactor = door.width / 85;
    let scaleFactorHeight = door.height / 210;

    await loader.load(
        path,
        async function(gltf){

            gltf.scene.traverse(async function(child){

                if(child.isMesh){

                    child.castShadow = true;
                    child.receiveShadow = false;
                }

                if(child.material){

                    if (child.material.name === "door-material"){

                        child.material.envMap = envMap;
                        child.material.roughness  = 0.6;
                        child.material.metalness  = 0.1;

                    }else if (child.material.name === "chrome"){

                        child.material.envMap = envMap;
                        child.envMapIntensity = 2;
                        child.material.roughness  = 0;
                        child.material.metalness  = 1;
                    }
                }
            });

            let object = gltf.scene;

            let dir = new Vector2();

            object.rotation.y = -dir.subVectors(door.s, door.e).angle();

            object.position.x = door.center.x;
            object.position.z = door.center.y;

            object.scale.set( 100 * scaleFactor, 100 * scaleFactorHeight, 100 );

            await group.add( object );

        },

        function(xhr){
            let proc = (xhr.loaded / xhr.total * 100);
            if(proc == 100){
                console.log(proc + '% загружена дверь ');
            }
        },

        function(error){
            console.log(error);
        }
    );

    return group;
};
