;'use strict';

import { PerspectiveCamera,
        Group,
        Object3D,
        Scene,
        FogExp2,
        Matrix4,
        Color,
        WebGLRenderer,
        AmbientLight,
        DirectionalLight,
        Raycaster,
        BufferGeometry,
        Float32BufferAttribute,
        LineBasicMaterial,
        AdditiveBlending,
        RingGeometry,
        MeshBasicMaterial,
        Mesh,
        Line
      } from './libs/build/three.module.js';
import { VRButton } from './libs/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from './libs/examples/jsm/webxr/XRControllerModelFactory.js';
import { OrbitControls } from './libs/examples/jsm/controls/OrbitControls.js';
import { WEBGL } from './libs/examples/jsm/WebGL.js';
import { CreateView } from './CreateView.js';
import { json_construct } from './json_construct.js';
import { MiniMap } from './Interface/MiniMap.js';


export var Plannerix3D = function( json_data ){


  ( !document.getElementById("container") || !json_data ) ?

                    console.error('there is no container or drawing data') : console.log('start building..');

  const drawing_data = json_construct( json_data );
  const center = drawing_data.center;
  const height = drawing_data.height;
  let prev_time = performance.now();

  let scene = new Scene();
  scene.fog = new FogExp2(0x000000, 0.0003);

  let head = new Object3D();
  scene.add( head );

  let camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 10, 4500 );
  head.add( camera );

  let raycaster = new Raycaster();


  const supportsWebGL = ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )();

  const renderer = new WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true }, supportsWebGL);
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( new Color('#f5f8ff') );
        renderer.shadowMap.enabled = true;
        renderer.shadowMapSoft = true;
        renderer.xr.enabled = true;

  window.addEventListener( 'resize', onWindowResize );

  this.container = container;
  this.container.appendChild( renderer.domElement );

  document.body.appendChild( VRButton.createButton( renderer ) );

  let lights = new Group();
      lights.name = 'lights';

  scene.add( lights );

  lights.add( new AmbientLight( 0xffffff, 1) );

  let light = new DirectionalLight( 0xffeb0a , 0.2);
      light.color.setHSL( 1, 1, 1);
      light.castShadow = true;
      light.position.set( 0, 500, center.y-1200);
      light.shadow.mapSize.width = 512;
      light.shadow.mapSize.height = 512;
      light.shadow.camera.near = 1.75;
      light.shadow.camera.far = 1000;
      light.shadow.camera.left = -1000;
      light.shadow.camera.right = 1000;
      light.shadow.camera.top = 1800;
      light.shadow.camera.bottom = -1000;
      light.shadow.camera.visible = false;
      lights.add(light);
      lights.add(light.target);
      light.shadow.bias = - 0.04;
      light.target.position.set( -300, 1, -300 );
      light.name = "dirLight";



  const orbit_ctrl = new OrbitControls( camera, this.container );
        orbit_ctrl.damping = 0.2;
        orbit_ctrl.enablePan = true;
        orbit_ctrl.minDistance = 100;
        orbit_ctrl.maxDistance = 1500;
        orbit_ctrl.maxPolarAngle = 90 * Math.PI / 180;
        orbit_ctrl.autoRotate = false;
        orbit_ctrl.autoRotateSpeed = 50;
        orbit_ctrl.enableKeys = false;
        orbit_ctrl.enabled = true;


  let bb = new Group();
      bb.name = 'wall_boundings';
  scene.add( bb );

  //VR init
  let delay = 0,
      last_Y_rot, last_X_rot, is_awaiting = null,
      vr_ctrl, vr_ctrlGrip;

  let is_vr = false;
  let aux_matrix = new Matrix4();
  const GRAD = Math.PI / 60;
  const LIMIT = 2.5;
  const AWAITING = 4;

  vr_ctrl = renderer.xr.getController( 0 );
  vr_ctrl.addEventListener( 'connected', (e) =>  { this.add( createGazeObject( e.data ) ); is_vr = true; } );
  vr_ctrl.addEventListener( 'disconnected', () => { this.remove( this.children[ 0 ] ); is_vr = false; } );
  scene.add( vr_ctrl );

  const vr_ctrlModelFactory = new XRControllerModelFactory();
    vr_ctrlGrip = renderer.xr.getControllerGrip( 0 );
    vr_ctrlGrip.add( vr_ctrlModelFactory.createControllerModel( vr_ctrlGrip ) );
  scene.add( vr_ctrlGrip );


  function createGazeObject( data ) {

    let geometry, material;

    switch ( data.targetRayMode ) {

      case 'tracked-pointer':

        geometry = new BufferGeometry();
        geometry.setAttribute( 'position', new Float32BufferAttribute( [ 0, 0, 0, 0, 0, - 10 ], 3 ) );
        geometry.setAttribute( 'color', new Float32BufferAttribute( [ 0.5, 0.5, 0.5, 0, 0, 0 ], 3 ) );

        material = new LineBasicMaterial( { vertexColors: true, blending: AdditiveBlending } );

        return new Line( geometry, material );

      case 'gaze':

        geometry = new RingGeometry( 0.2, 0.4, 32 ).translate( 0, 0, - 10 );
        material = new MeshBasicMaterial( { opacity: 0.8, transparent: true } );
        return new Mesh( geometry, material );

    }
  }

  function get_bb(){
    scene.traverse( function(child){

      if(child.isMesh){
        if (child.name.includes('wall')) {

          bb.add(child);
        }
      }

    });
  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function animate() {

    renderer.setAnimationLoop( render );
  }

  function reset(){
    last_Y_rot = last_X_rot = is_awaiting = null;
    delay = 0;
  }

  function go_to_point(){

      aux_matrix.identity().extractRotation( vr_ctrl.matrixWorld );

      raycaster.ray.origin.setFromMatrixPosition( vr_ctrl.matrixWorld );
      raycaster.ray.direction.set( 0, 0, -1 ).applyMatrix4( aux_matrix );

      const intersects = raycaster.intersectObjects( bb.children );

      return intersects.length > 0 && head.position.copy(  intersects[ 0 ].point );
  }

  function render(){

    const time = performance.now();
    const delta = ( time - prev_time ) / 1000;

    if ( is_vr ) {

      const X_rot = vr_ctrl.rotation.x;
      const Y_rot = vr_ctrl.rotation.y;

      last_Y_rot === null ?

      ( last_X_rot = X_rot, last_Y_rot = Y_rot ) :

      Math.abs( last_X_rot - X_rot ) > GRAD || Math.abs( last_Y_rot - Y_rot ) > GRAD ? reset() : (

        delay += delta, delay >= LIMIT && (

          is_awaiting ? ( delay >= AWAITING && reset() ) : go_to_point() ? is_awaiting = true : reset()
        )
      );
    }

    renderer.render( scene, camera );
    prev_time = time;
  }

  if ( WEBGL.isWebGLAvailable() ) {

    CreateView( drawing_data )
        .then( groups => scene.add(groups))
        .then(()=>{
          camera.position.set( ( center.x ), 1650, ( center.y-50 ) );
          orbit_ctrl.target.set( center.x, 170, center.y -50);
          orbit_ctrl.update();
        })
        .then(() => { MiniMap.bind(this)( json_data )})
        .then( function(){ get_bb(); })
        .then( function(){ renderer.render( scene, camera ); })
        .then( function(){ animate(); });

  } else {

    const warning = WEBGL.getWebGLErrorMessage();

    document.getElementById( 'container' ).appendChild( warning );
  }

};
