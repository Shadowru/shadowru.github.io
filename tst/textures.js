import { CubeTextureLoader,RepeatWrapping, UniformsUtils, sRGBEncoding, TextureLoader, ShaderMaterial } from './libs/build/three.module.js';
import { FresnelShader } from './Shaders/FresnelShader.js';

let loaderTexture = new TextureLoader();

const envPath = {
    ROOT_PATH_ENV: './img/env/maps/',
    ENV: {
        ROOM: [
            'room_1/blur_10/left-light.jpg', 'room_1/blur_10/right-light.jpg',
            'room_1/blur_10/top-light.jpg', 'room_1/blur_10/bottom-light.jpg',
            'room_1/blur_10/back-light.jpg', 'room_1/blur_10/front-light.jpg'
        ]
    },
};



/*const path_ = "./../img/glass/roughness.jpg";
export var glass_r = loaderTexture.load(
    path_,

    function ( t ) {
        t.encoding = sRGBEncoding;
        t.anisotropy = 4;
        t.flipY = false;
        t.wrapS = t.wrapT = RepeatWrapping;
        //t.repeat.set( tWidth * fix, tHeight * fix );
    }
);*/


export var envMap = new CubeTextureLoader().load(envPath.ENV.ROOM.map( pathImage => envPath.ROOT_PATH_ENV + pathImage));

const fShader = FresnelShader;
const uniforms = UniformsUtils.clone( fShader.uniforms );
uniforms[ "tCube" ].value = envMap;

export var fresnel_sh = new ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: fShader.vertexShader,
    fragmentShader: fShader.fragmentShader
} );
fresnel_sh.transparent = true;
fresnel_sh.opacity = .15;

