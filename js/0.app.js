(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(23)},22:function(e,t,n){},23:function(e,t,n){"use strict";function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}n.r(t);var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,o;return t=e,(n=[{key:"webgl",value:function(){try{var e=document.createElement("canvas");return!(!window.WebGLRenderingContext||!e.getContext("webgl")&&!e.getContext("experimental-webgl"))}catch(e){return!1}}},{key:"getWebGLErrorMessage",value:function(){var e=document.createElement("div");return e.id="webgl-error-message",e.style.fontFamily="monospace",e.style.fontSize="13px",e.style.fontWeight="normal",e.style.textAlign="center",e.style.background="#fff",e.style.color="#000",e.style.padding="1.5em",e.style.width="400px",e.style.margin="5em auto 0",e.innerHTML=window.WebGLRenderingContext?['Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000000">WebGL</a>.<br />','Find out how to get it <a href="http://get.webgl.org/" style="color:#000000">here</a>.'].join("\n"):['Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000000">WebGL</a>.<br/>','Find out how to get it <a href="http://get.webgl.org/" style="color:#000000">here</a>.'].join("\n"),e}},{key:"addGetWebGLMessage",value:function(e){var t,n,a;t=void 0!==(e=e||{}).parent?e.parent:document.body,n=void 0!==e.id?e.id:"oldie",(a=this.getWebGLErrorMessage()).id=n,t.appendChild(a)}}])&&a(t.prototype,n),o&&a(t,o),e}();function r(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var i=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._loading=t.getElementById("loading"),this._saveStyle(),this._progress=t.getElementById("progress")}var t,n,a;return t=e,(n=[{key:"_saveStyle",value:function(){this._old_style=this._loading.style.display}},{key:"hideLoading",value:function(){this._saveStyle(),this._loading.style.display="none"}},{key:"showLoading",value:function(){this._loading.style.display=this._old_style}},{key:"progress",value:function(e,t){console.log(e,t),this._progress.style.width=e+"%"}}])&&r(t.prototype,n),a&&r(t,a),e}(),s=n(4),u=n.n(s);function l(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._audioConfig=t,this._audioInited=!1;this._audioManager=new u.a(["speech","music"]),this._audioManager.settings.audioPath="assets/audio/",this._audioManager.settings.getFileUri=this._getAudioPath,this._currentSound=void 0,this._preloadMusic(this._audioManager)}var t,n,a;return t=e,(n=[{key:"_getAudioPath",value:function(e,t){return e+t}},{key:"mute",value:function(){this._audioInited&&this._audioManager.setMute()}},{key:"unmute",value:function(){this._audioInited||(this._audioManager.init(),this._setAudioVolume(this._audioManager),this._playBackgroundAudio(this._audioManager),this._audioInited=!0)}},{key:"_setAudioVolume",value:function(e){e.setVolume("speech",.4),e.setVolume("music",.03)}},{key:"_preloadMusic",value:function(e){e.createSound(this._getAudio("background")).load()}},{key:"_getAudio",value:function(e){return e+".mp3"}},{key:"_playBackgroundAudio",value:function(e){e.playSound("music",this._getAudio("background"))}},{key:"say",value:function(e){this.stopSpeaking();var t=this._playSound(this._audioManager,"speech",e);return this._currentSound=t,t}},{key:"_playSound",value:function(e,t,n){return e.playSound(t,this._getAudio(n))}},{key:"stopSpeaking",value:function(){void 0!==this._currentSound&&(this._currentSound.stop(),this._currentSound=void 0)}}])&&l(t.prototype,n),a&&l(t,a),e}();function h(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var d=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);this._soundProducer=new c({background:"bensound-jazzyfrenchy.mp3"}),this._soundButton=t.getElementById("soundButton"),this._soundState=!1,this._setButtonState(this._soundState),this._soundButton.addEventListener?this._soundButton.addEventListener("click",(function(){var e=n._swapState();n._setButtonState(e)})):this._soundButton.attachEvent&&this._soundButton.attachEvent("onclick",(function(){var e=n._swapState();n._setButtonState(e)}))}var t,n,a;return t=e,(n=[{key:"say",value:function(e,t){var n=this._soundProducer.say(e);t("speak"),n.onEnd=function(){t("stop"),console.log("sound playback ended"),n.onEnd=null}}},{key:"mute",value:function(){this._soundProducer.stopSpeaking()}},{key:"_swapState",value:function(){return this._soundState=!this._soundState,this._soundState}},{key:"_setButtonState",value:function(e){var t=this._soundButton.firstChild;e?(t.data="MUTE",this._soundProducer.unmute()):(t.data="UNMUTE",this._soundProducer.mute())}}])&&h(t.prototype,n),a&&h(t,a),e}(),f=n(0),v=n(5);n(24);function m(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var p=function(){function e(t,n,a){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.scene=n,this.container=a,this.threeRenderer=new f.Yb({antialias:!0}),this.threeRenderer.setClearColor(n.fog.color),this.threeRenderer.setPixelRatio(window.devicePixelRatio),a.appendChild(this.threeRenderer.domElement),this.threeRenderer.shadowMap.enabled=!0,this.threeRenderer.shadowMap.type=f.mb,t.maxAnisotropy=this.threeRenderer.capabilities.getMaxAnisotropy(),this.updateSize(),this.threeRenderer.outputEncoding=f.Zb,this.threeRenderer.xr.enabled=!0,document.body.appendChild(v.a.createButton(this.threeRenderer)),document.addEventListener("DOMContentLoaded",(function(){return o.updateSize()}),!1),window.addEventListener("resize",(function(){return o.updateSize()}),!1)}var t,n,a;return t=e,(n=[{key:"updateSize",value:function(){this.threeRenderer.setSize(this.container.offsetWidth,this.container.offsetHeight)}},{key:"render",value:function(e,t){this.threeRenderer.render(e,t)}}])&&m(t.prototype,n),a&&m(t,a),e}();function y(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var _=function(){function e(t,n){var a=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var o=n.domElement.width,r=n.domElement.height;this.threeCamera=new f.nb(t.camera.fov,o/r,t.camera.near,t.camera.far),this.threeCamera.position.set(t.camera.posX,t.camera.posY,t.camera.posZ),this.threeCamera.lookAt(0,0,0),this.updateSize(n),window.addEventListener("resize",(function(){return a.updateSize(n)}),!1)}var t,n,a;return t=e,(n=[{key:"updateSize",value:function(e){this.threeCamera.aspect=e.domElement.width/e.domElement.height,this.threeCamera.updateProjectionMatrix()}}])&&y(t.prototype,n),a&&y(t,a),e}(),g=n(6);function w(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var b=function(){function e(t,n,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.threeControls=new g.a(n,a),this.init(t)}var t,n,a;return t=e,(n=[{key:"init",value:function(e){this.threeControls.target.set(e.controls.target.x,e.controls.target.y,e.controls.target.z),this.threeControls.autoRotate=e.controls.autoRotate,this.threeControls.autoRotateSpeed=e.controls.autoRotateSpeed,this.threeControls.rotateSpeed=e.controls.rotateSpeed,this.threeControls.zoomSpeed=e.controls.zoomSpeed,this.threeControls.minDistance=e.controls.minDistance,this.threeControls.maxDistance=e.controls.maxDistance,this.threeControls.minPolarAngle=e.controls.minPolarAngle,this.threeControls.maxPolarAngle=e.controls.maxPolarAngle,this.threeControls.enableDamping=e.controls.enableDamping,this.threeControls.enableZoom=e.controls.enableZoom,this.threeControls.dampingFactor=e.controls.dampingFactor,this.threeControls.keys={LEFT:0,RIGHT:0,UP:0,BOTTOM:0}}}])&&w(t.prototype,n),a&&w(t,a),e}(),k=n(7);function S(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var x=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._initSky(t)}var t,n,a;return t=e,(n=[{key:"_initSky",value:function(e){var t=new k.a;t.scale.setScalar(45e4),e.add(t);var n=new f.Vb,a=10,o=3,r=.005,i=.7,s=.49,u=.25,l=t.material.uniforms;l.turbidity.value=a,l.rayleigh.value=o,l.mieCoefficient.value=r,l.mieDirectionalG.value=i;var c=Math.PI*(s-.5),h=2*Math.PI*(u-.5);n.x=Math.cos(h),n.y=Math.sin(h)*Math.sin(c),n.z=Math.sin(h)*Math.cos(c),l.sunPosition.value.copy(n)}}])&&S(t.prototype,n),a&&S(t,a),e}();function A(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var C=function(){function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.keys={};var n=new Map,a=function(e,a){t.keys[a]={down:!1,justPressed:!1},n.set(e,a)},o=function(e,a){var o=n.get(e);o&&function(e,n){var a=t.keys[e];a.justPressed=n&&!a.down,a.down=n}(o,a)};a(65,"left"),a(68,"right"),a(87,"up"),a(83,"down"),a(69,"action"),a(32,"action2"),a(70,"speak"),window.addEventListener("keydown",(function(e){o(e.keyCode,!0)})),window.addEventListener("keyup",(function(e){o(e.keyCode,!1)}))}var t,n,a;return t=e,(n=[{key:"update",value:function(){for(var e=0,t=Object.values(this.keys);e<t.length;e++){var n=t[e];n.justPressed&&(n.justPressed=!1)}}}])&&A(t.prototype,n),a&&A(t,a),e}(),M=n(8),P=n(9),E=n.n(P);function j(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return z(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return z(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,i=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,r=e},f:function(){try{i||null==n.return||n.return()}finally{if(s)throw r}}}}function z(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function O(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var B=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,a;return t=e,(n=[{key:"generate",value:function(e,t,n,a){var o,r=[],i=(this._calcCenter(e),j(e));try{for(i.s();!(o=i.n()).done;){var s=o.value,u=this._generateShape(s.points,.01,a.getTexture("floor"));u.userData={roomId:s.type},r.push(u)}}catch(e){i.e(e)}finally{i.f()}var l,c=j(t);try{for(c.s();!(l=c.n()).done;){var h=l.value,d=this._generateShape(h,-2,a.getTexture("door"));r.push(d)}}catch(e){c.e(e)}finally{c.f()}return r}},{key:"_generateShape",value:function(e,t,n){var a,o=[],r=j(e);try{for(r.s();!(a=r.n()).done;){var i=a.value;o.push(new f.Ub(this._transform(i[0]),this._transform(i[1])))}}catch(e){r.e(e)}finally{r.f()}var s=new f.Db(o),u={depth:t,bevelEnabled:!1},l=new f.w(s,u),c=new f.Z(l,new f.bb({map:n,side:f.s}));return c.receiveShadow=!0,c.rotateX(Math.PI/2),c}},{key:"_calcCenter",value:function(e){var t,n=j(e);try{for(n.s();!(t=n.n()).done;){var a,o=j(t.value.points);try{for(o.s();!(a=o.n()).done;)a.value}catch(e){o.e(e)}finally{o.f()}}}catch(e){n.e(e)}finally{n.f()}}},{key:"generate2",value:function(e,t){var n=this._convertToVertices(e),a=new f.l,o=new Float32Array(n);a.setAttribute("position",new f.k(o,3));var r=new f.ab({color:16711680,side:f.s}),i=new f.Z(a,r);i.scale.set(.01,.01,.01);var s=this._moveToCenter(i);return[i,this._generateWallExtrude(s)]}},{key:"_generateWallExtrude",value:function(e){var t=[];t.push(new f.Ub(e.min.x,e.min.z)),t.push(new f.Ub(e.min.x,e.max.z)),t.push(new f.Ub(e.max.x,e.max.z)),t.push(new f.Ub(e.max.x,e.min.z));var n=new f.Db(t),a=new f.w(n,{depth:-2.6,bevelEnabled:!1}),o=new f.Z(a,new f.cb({side:f.s}));return o.rotateX(Math.PI/2),o.translateZ(-2),o}},{key:"_generateWall",value:function(){var e=new f.Db(this._convertToVector(walls)),t=new f.w(e,{depth:-260}),n=new f.Z(t,new f.cb({side:f.s}));n.rotateY(Math.PI/2),n.scale.set(.01,.01,.01),n.translateX(-cent.x),n.translateZ(-cent.z)}},{key:"_generatePlane",value:function(e,t){var n,a=[],o=j(t);try{for(o.s();!(n=o.n()).done;){var r=n.value;a.push(r[0]),a.push(r[1])}}catch(e){o.e(e)}finally{o.f()}var i,s=j(E()(a));try{for(s.s();!(i=s.n()).done;){var u=2*i.value,l=a[u],c=a[u+1];e.push(-c),e.push(0),e.push(l)}}catch(e){s.e(e)}finally{s.f()}}},{key:"_convertToVertices",value:function(e){var t,n=[],a=j(e);try{for(a.s();!(t=a.n()).done;){var o=t.value.points;this._generatePlane(n,o)}}catch(e){a.e(e)}finally{a.f()}return n}},{key:"_convertToVector",value:function(e){var t,n=[],a=5,o=j(e);try{for(o.s();!(t=o.n()).done;){var r=t.value;if(n.push(new f.Ub(r[0],r[1])),a++>8)break}}catch(e){o.e(e)}finally{o.f()}return console.log(n),n}},{key:"_moveToCenter",value:function(e){var t=(new f.g).setFromObject(e),n=t.getCenter(new f.Vb);return t.getSize(new f.Vb),console.log(t),console.log(n),e.translateX(-n.x),e.translateZ(-n.z),(new f.g).setFromObject(e)}},{key:"_transform",value:function(e){return e/100}}])&&O(t.prototype,n),a&&O(t,a),e}();function T(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var I=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.textures={},this._loadTextures(this.textures)}var t,n,a;return t=e,(n=[{key:"_loadTextures",value:function(e){var t=new f.Ob,n=t.load("assets/textures/floor_tiles_06_diff_1k.png");n.wrapS=n.wrapT=f.Ab,n.repeat.set(2,2),e.floor=n;var a=t.load("assets/textures/door_texture_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_963788_o.jpg");a.wrapS=a.wrapT=f.Ab,a.repeat.set(1,1),e.door=a}},{key:"getTexture",value:function(e){return this.textures[e]}}])&&T(t.prototype,n),a&&T(t,a),e}();function D(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return W(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return W(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,i=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,r=e},f:function(){try{i||null==n.return||n.return()}finally{if(s)throw r}}}}function W(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function L(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var R=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),f.m.enabled=!0;var a=new I;this._loadJSON(t.url,this._sceneImporter,t,n,a)}var t,n,a;return t=e,(n=[{key:"_generateFlat",value:function(e,t){return(new B).generate(e.rooms,e.doors,e.external_walls,t)}},{key:"_sceneImporter",value:function(e,t,n){t.userData.boundingBoxes=[];var a,o=D(n);try{for(o.s();!(a=o.n()).done;){var r=a.value;r.scale.set(e.size.x,e.size.y,e.size.z),r.translateX(e.translate.x),r.translateY(e.translate.y),r.translateZ(e.translate.z),r.geometry.computeBoundingBox(),r.updateMatrixWorld();var i=r.geometry.boundingBox.clone();i.applyMatrix4(r.matrixWorld),i.userData=r.userData,t.userData.boundingBoxes.push(i),t.add(r)}}catch(e){o.e(e)}finally{o.f()}}},{key:"_loadJSON",value:function(e,t,n,a,o){var r=new f.x,i=this;r.load(e,(function(e){var r=i._generateFlat(JSON.parse(e.replaceAll("'",'"')),o);t(n,a,r)}),(function(e){console.log(e.loaded/e.total*100+"% loaded")}),(function(e){console.error("An error happened")}))}},{key:"_loadTexture",value:function(e,t){var n=this;(new f.Ob).load("assets/textures/floor_tiles_06_diff_1k.png ",(function(a){n._material=new f.ab({map:a,side:f.s}),n._loadJSON(e.url,n._sceneImporter,e,t,n._material)}),void 0,(function(e){console.error("An error happened.")}))}}])&&L(t.prototype,n),a&&L(t,a),e}(),F=n(10),V=n(1),G=n(11),U=n(12);function Z(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return N(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return N(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,i=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,r=e},f:function(){try{i||null==n.return||n.return()}finally{if(s)throw r}}}}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function X(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var Y=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._moveSpeed=.05/60,this._turnSpeed=4,this._avatar=t.scene,this._kForward=n,this._walk=!1,this._avatar.castShadow=!0;var a=new f.c(this._avatar);this._mixer=a,this._fade_duration=.4,this._stop_fade_duration=1.5,this._animations=this._getAnimations(this._mixer,t),this._startAnimation("idle",this._fade_duration),this._action=!1,this._action2=!1;var o=new f.i(.7,.5,.5),r=new f.ab({color:65280}),i=new f.Z(o,r);this._boundingBox=i,this._speakingState=!1,this._speakingNext=-1,this._animationNext=-1,this._phonemeDuration=.02}var t,n,a;return t=e,(n=[{key:"setSpeechManager",value:function(e){this._speechManager=e}},{key:"update",value:function(e,t,n){this._moveSpeed;var a=this._avatar,o=this._fade_duration,r=this._stop_fade_duration,i=(t.keys.up.down?1:0)+(t.keys.down.down?-1:0),s=(t.keys.left.down?1:0)+(t.keys.right.down?-1:0);if(0!==s&&a.rotateY(this._turnSpeed*s*e),0!==i){var u=i*e;a.translateOnAxis(this._kForward,u),this._walk||(this._stopAnimation("idle",o),this._startAnimation("walk",o),this._walk=!0),void 0!==this._findBoundingBox(a,1,n)&&a.translateOnAxis(this._kForward,-u)}else this._walk&&(this._stopAnimation("walk",o),this._startAnimation("idle",this._fade_duration),this._walk=!1);this._speakingState&&this._speakingAnimation();var l=this._findBoundingBox(a,0,n);if(t.keys.speak.down)if(!0!==this._speakingState){if(void 0!==l){var c=l.userData.roomId;console.log("roomId : "+c),this._speakAboutRoom(c),this._speakingState=!0}}else this._stopSpeak(),this._speakingState=!1;t.keys.action.down?!0!==this._action&&(this._stopAnimation("idle",o),this._startAnimation("pointing",o),this._action=!0):!0===this._action&&(this._startAnimation("idle",o),this._stopAnimation("pointing",r),this._action=!1),t.keys.action2.down?!0!==this._action2&&(this._stopAnimation("idle",o),this._startAnimation("gesture",o),this._action2=!0):!0===this._action2&&(this._startAnimation("idle",o),this._stopAnimation("gesture",r),this._action2=!1),this._mixer.update(e)}},{key:"_getAnimations",value:function(e,t){var n=t.animations,a=e.clipAction(n[6]),o=e.clipAction(n[0]),r=e.clipAction(n[8]),i=e.clipAction(n[4]),s=e.clipAction(n[10]),u=e.clipAction(n[12]),l=[];l.pointing=a,l.gesture=o,l.startWalk=r,l.endWalk=i,l.walk=s,l.idle=u;var c=e.clipAction(this._makeJaw());return c.setLoop(f.T,2),l.jaw=c,l}},{key:"_startAnimation",value:function(e,t){this._animations[e].reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(t).play()}},{key:"_stopAnimation",value:function(e,t){this._animations[e].fadeOut(t)}},{key:"_makeJaw",value:function(){var e=new f.Vb(0,0,1),t=new f.tb(0,0,-.8664570450782776,.4992516338825226),n=(new f.tb).setFromAxisAngle(e,-Math.PI),a=new f.ub("jaw.quaternion",[0,1,2],[t.x,t.y,t.z,t.w,n.x,n.y,n.z,n.w,t.x,t.y,t.z,t.w]);return new f.b("Action",.5,[a])}},{key:"_speakAboutRoom",value:function(e){var t=this;void 0!==this._speechManager&&this._speechManager.say(e,(function(e){"stop"===e&&t._stopSpeak(),"speak"===e&&t._startSpeak()}))}},{key:"_stopSpeak",value:function(){void 0!==this._speechManager&&this._speechManager.mute(),this._speakingState=!1,this._stopAnimation("jaw",.02),this._stopAnimation("gesture",3),this._stopAnimation("pointing",3)}},{key:"_startSpeak",value:function(){this._speakingState=!0,this._speakingNext=Date.now(),this._animationNext=Date.now()}},{key:"_speakingAnimation",value:function(){if(this._speakingNext<Date.now()&&(this._startAnimation("jaw",this._phonemeDuration),this._speakingNext=Date.now()+Math.floor(Math.random()*this._phonemeDuration*3e4)),this._animationNext<Date.now()){var e=this._randomAnimation(["gesture","pointing"]);this._startAnimation(e,3),this._animationNext=Date.now()+Math.floor(3*Math.random()*3e4)}}},{key:"_randomAnimation",value:function(e){return Math.random()<.5?e[0]:e[1]}},{key:"_findBoundingBox",value:function(e,t,n){this._boundingBox.position.x=e.position.x,this._boundingBox.position.y=t,this._boundingBox.position.z=e.position.z,this._boundingBox.geometry.computeBoundingBox(),this._boundingBox.updateMatrixWorld();var a=this._boundingBox.geometry.boundingBox.clone();a.applyMatrix4(this._boundingBox.matrixWorld);var o,r=Z(n);try{for(r.s();!(o=r.n()).done;){var i=o.value;if(i.intersectsBox(a))return i}}catch(e){r.e(e)}finally{r.f()}}}])&&X(t.prototype,n),a&&X(t,a),e}();function J(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return H(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,i=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,r=e},f:function(){try{i||null==n.return||n.return()}finally{if(s)throw r}}}}function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function $(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var q=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._loaded=!1,this._scene=t,this._sceneElements=n}var t,n,a;return t=e,(n=[{key:"loadScenePromises",value:function(){var e,t=this,n=[],a=J(t._sceneElements);try{var o=function(){var a=e.value,o=new Promise((function(e,n){t._loadSceneElement(t._scene,a,e,n)}));n.push(o)};for(a.s();!(e=a.n()).done;)o()}catch(e){a.e(e)}finally{a.f()}return n}},{key:"loadScenePromise",value:function(){var e=this;return new Promise((function(t){var n=e.loadScenePromises();Promise.all(n).then((function(e){console.log("success",e);var n,a={result:"success"},o=J(e);try{for(o.s();!(n=o.n()).done;){var r=n.value;a=Object.assign(r,a)}}catch(e){o.e(e)}finally{o.f()}t(a)})).catch((function(e){console.log("error",e),t({result:"error"+e})}))}))}},{key:"_loadSceneElement",value:function(e,t,n,a){try{var o=t.url.toLowerCase();o.endsWith("json")?(new R(t,e),n({})):o.endsWith("gltf")||o.endsWith("glb")?this._loadGLTF(e,t,(function(e){n(e)})):o.endsWith("fbx")?this._loadFBX(config,e):o.endsWith("vrm")?this._loadVRM(config,e):o.endsWith("bvh")?this._loadBVH(config,e):(console.log("Unknown format! "+o),a("Unknown format! "+o))}catch(e){a("Exc! "+e)}}},{key:"_loadGLTF",value:function(e,t,n){var a=new V.a,o=this._processScene,r=(this._searchAnimations,this);a.load(t.url,(function(a){var i=o(a.scene),s=void 0;if(t.isAvatar){new f.Fb(i);var u=new f.Vb(0,0,1);s=new Y(a,u)}var l=r._fixObject(t.translate,r._resizeObject(t.size,i));e.add(l),n({avatar:{manager:s}})}),void 0,(function(e){console.error(e)}))}},{key:"_ddd",value:function(){if(config.animated){var e=new f.Fb(gltf_scene);e.visible=!1,scene.add(e),console.log(e);var t=new f.c(gltf.scene);main_instance._mixer=t,main_instance.bones=[];var n=gltf.animations;console.log(n);var a=t.clipAction(n[6]),o=t.clipAction(n[0]),r=t.clipAction(n[8]),i=t.clipAction(n[4]),s=t.clipAction(n[10]),u=t.clipAction(n[12]);main_instance.durations=[],main_instance.durations.pointing=n[6].duration,main_instance.durations.gesture=n[0].duration,main_instance.durations.walk=n[10].duration,main_instance.durations.startWalk=n[8].duration,main_instance.durations.endWalk=n[4].duration,main_instance.durations.idle=n[12].duration,main_instance.animations=[],main_instance.animations.pointing=a,main_instance.animations.gesture=o,main_instance.animations.startWalk=r,main_instance.animations.endWalk=i,main_instance.animations.walk=s,main_instance.animations.idle=u;var l=config.animatedCycle;void 0!==l&&(main_instance._lastAnimationPhase=Date.now(),main_instance._animatedCycle=l,main_instance._animatedCyclePos=0,main_instance.animations[l[main_instance._animatedCyclePos].animation].play())}}},{key:"_loadBVH",value:function(e,t){var n=this;(new F.a).load(e.scene.url,(function(a){console.log(a);var o=new f.Fb(a.skeleton.bones[0]);o.skeleton=a.skeleton;var r=new f.C;r.add(a.skeleton.bones[0]),t.add(n._resizeObject(e.scene.size,o)),t.add(n._resizeObject(e.scene.size,r));var i=new f.c(o);i.clipAction(a.clip).setEffectiveWeight(1).play(),n._setMixer(i)}))}},{key:"_loadVRM",value:function(e,t){(new V.a).load(e.scene.url,(function(e){G.a.from(e).then((function(e){console.log(e.meta),t.add(e.scene),console.log(e)}))}),(function(e){return console.log("Loading model...",e.loaded/e.total*100,"%")}),(function(e){return console.error(e)}))}},{key:"_fixObject",value:function(e,t){return t.translateX(e.x),t.translateY(e.y),t.translateZ(e.z),t}},{key:"_resizeObject",value:function(e,t){var n=(new f.g).setFromObject(t).getSize(new f.Vb);return Math.max(n.x,n.y,n.z),Math.max(e.x,e.y,e.z),t.scale.set(e.x,e.y,e.z),t}},{key:"_loadFBX",value:function(e,t){var n=new U.a,a=this;n.load(e.scene.url,(function(n){var o=new f.Fb(n);o.visible=!0,t.add(o);var r=new f.c(n);console.log(n.animations),r.clipAction(n.animations[0]).play(),n.traverse((function(e){e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)})),t.add(a._resizeObject(e.scene.size,n)),a._setMixer(r)}))}},{key:"_searchAnimations",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this._searchAnimations;void 0!==e&&void 0!==e.children&&e.children.forEach((function(e){var n=e.animations;void 0!==n&&console.log(n),t(e,t)}))}},{key:"_processScene",value:function(e){var t=e,n=(new f.g).setFromObject(t),a=n.getCenter(new f.Vb),o=n.getSize(new f.Vb),r=Math.max(o.x,o.y,o.z);return t.scale.multiplyScalar(1.8/r),n.setFromObject(t),n.getCenter(a),n.getSize(o),t.position.copy(a).multiplyScalar(-1),t.position.y+=.5*o.y,e}}])&&$(t.prototype,n),a&&$(t,a),e}();function K(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return Q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Q(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,i=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,r=e},f:function(){try{i||null==n.return||n.return()}finally{if(s)throw r}}}}function Q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function ee(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function te(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var ne=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2?arguments[2]:void 0;ee(this,e),this._container=t,this._config=Object.assign({fog:{color:5263440,near:8e-4},camera:{fov:60,near:.001,far:1e3,aspect:1,posX:0,posY:1.8,posZ:10.2},controls:{autoRotate:!1,autoRotateSpeed:-.5,rotateSpeed:.5,zoomSpeed:.8,minDistance:.01,maxDistance:600,minPolarAngle:Math.PI/5,maxPolarAngle:Math.PI/2,minAzimuthAngle:-1/0,maxAzimuthAngle:1/0,enableDamping:!0,dampingFactor:.5,enableZoom:!0,target:{x:0,y:1.8,z:0}},scene:[],isDev:!1},n),this._config.isDev&&console.log(this._config),this._speechManager=a}var t,n,a;return t=e,(n=[{key:"start",value:function(e){var t=this,n=this._config;this._scene=this.createScene(n);var a=this._scene;this._renderer=new p(n,a,this._container),this._camera=new _(n,this._renderer.threeRenderer),this._controls=new b(n,this._camera.threeCamera,this._container);var o=new f.a(4210752,3);a.add(o),n.isDev&&this._addDeveloper(a),n.sky&&new x(a),this._inputManager=new C,this._avatarManager=void 0;var r=new q(a,n.scene,e).loadScenePromises(),i=r.length;e(0,"Start loading"),Promise.all(r).then((function(n){console.log("success",n);var a,o=0,r=K(n);try{for(r.s();!(a=r.n()).done;){var s=a.value;void 0!==s.avatar&&(t._avatarManager=s.avatar.manager,t._avatarManager.setSpeechManager(t._speechManager)),o++,e(Math.floor(o/i),"")}}catch(e){r.e(e)}finally{r.f()}e(100,"load done.")})).catch((function(t){console.log("error",t),e(-1,"Error.")}))}},{key:"run",value:function(){this.render()}},{key:"createScene",value:function(e){var t=new f.Bb;return window.devicePixelRatio&&(e.dpr=window.devicePixelRatio),t.fog=new f.z(e.fog.color,e.fog.near),t}},{key:"render",value:function(){this._renderer.render(this._scene,this._camera.threeCamera),this._controls.threeControls.update();var e=(Date.now()-this._lastframe)/1e3;void 0!==this._mixer&&this._mixer.update(e),this._lastframe=Date.now(),this._inputManager.update(),void 0!==this._avatarManager&&this._avatarManager.update(e,this._inputManager,this._scene.userData.boundingBoxes),requestAnimationFrame(this.render.bind(this))}},{key:"_animateCycle",value:function(){if(void 0!==this._animatedCycle){var e=this._animatedCycle[this._animatedCyclePos],t=e.time;void 0===t&&(t=this._getDuration());var n=1e3*t,a=Date.now();if(void 0!==e.speed){var o=dt*e.speed;this._action_figure.translateZ(o)}a-this._lastAnimationPhase>n&&(this._getAnimation().fadeOut(.4),this._animatedCyclePos=this._animatedCyclePos+1,this._animatedCyclePos>this._animatedCycle.length-1&&(this._animatedCyclePos=0),this._lastAnimationPhase=a,this._getAnimation().reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(.4).play(),console.log(this._animatedCyclePos))}}},{key:"_setMixer",value:function(e){this._mixer=e}},{key:"_getAnimation",value:function(){return this.animations[this._getAnimationName()]}},{key:"_getDuration",value:function(){return this.durations[this._getAnimationName()]}},{key:"_getAnimationName",value:function(){return this._animatedCycle[this._animatedCyclePos].animation}},{key:"_addDeveloper",value:function(e){var t=new f.M(new M.a(6,6,6,10,10,10),new f.K({color:8388608}));t.geometry.translate(0,3,0),e.add(t)}}])&&te(t.prototype,n),a&&te(t,a),e}();n(22);console.log("Start sequor.edu");var ae=new o,oe=new i(document),re=new d(document);if(ae.webgl()){oe.showLoading();var ie=document.getElementById("appContainer");fetch("./assets/config.json").then((function(e){return e.json()})).then((function(e){console.log(e);var t=new ne(ie,{sky:!1,scene:e},re);t.start((function(e,n){oe.progress(e,n),e>99&&(oe.hideLoading(),t.run())}))}))}else oe.hideLoading(),ae.addGetWebGLMessage({parent:document.getElementById("appContainer"),id:"webgl-error"})}},[[13,1,2]]]);