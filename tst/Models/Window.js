import { GLTFLoader } from './../libs/examples/jsm/loaders/GLTFLoader.js';
import { Group, Vector2, Color, RepeatWrapping, sRGBEncoding, TextureLoader,UniformsUtils, ShaderMaterial } from './../libs/build/three.module.js';
import { envMap, fresnel_sh } from "./../textures.js";




export var Window = async function( window ){

    let group = new Group();
    group.name = "window_" + window.room_id  + "_" + window.id;

    let path = 'assets/window/model.glb';

    let sf_w = window.width / 120;
    let sf_h = window.height / 150;

    let floorHeight = window.floor_height;


    await new GLTFLoader().load(
        path,

        async function(gltf){
            gltf.scene.traverse(async function(child){

                if(child.material){

                    if (child.material.name === "plastic"){

                        child.material.envMap = envMap;
                        child.envMapIntensity = 0.8;
                        child.material.roughness  = 0.4;
                        child.material.metalness  = 0.1;

                    }else if (child.material.name === "glass"){

                        //uniforms.u_helmet_texture.value = child.material.map;
                        child.material =  fresnel_sh;

/*                        child.material.metalnessMap = glass_r;
                        child.material.color = new Color("rgba(235,228,255,0.67)");
                        child.material.envMap = envMap;
                        child.material.transparent = true;
                        child.material.emissive = new Color('#ff8fec');
                        child.material.emissiveIntensity = 0.5;
                        child.material.envMapIntensity = 2;
                        child.material.metalness = 0.9;
                        child.material.roughness = 0.1;
                        child.material.opacity = .1;*/
                    }
                }

                if(child.isMesh){
                    child.castShadow = true;
                    child.receiveShadow = false;
                }

            });

            let object = gltf.scene;

            object.scale.set(107 * sf_w, 108 * sf_h, 98);

            let dir = new Vector2();

            object.rotation.y = - dir.subVectors(window.s, window.e).angle() + Math.PI;

            let depthFactor = 0.25 * window.depth;
            object.position.x = window.center.x - depthFactor*Math.sin(object.rotation.y);
            object.position.z = window.center.y - depthFactor*Math.cos(object.rotation.y);
            object.position.y = floorHeight;

            window.is_created = true;
            await group.add(object);

        },
        function(xhr){
            let proc = (xhr.loaded / xhr.total * 100);
            if(proc === 100){
                console.log(proc + '% загружено окно');
            }
        },
        function(error){
            console.log(error);
        }
    );

    return group;
};
