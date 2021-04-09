var fs = require( 'fs' );
var os = require( 'os' ), EOL = os.EOL;
THREE = require( '../build/three.js' );

var srcFolder = __dirname + '/../examples/js/';
var dstFolder = __dirname + '/../examples/jsm/';

var files = [
	{ path: 'animation/AnimationClipCreator.js', dependencies: [], ignoreList: [] },
	{ path: 'animation/CCDIKSolver.js', dependencies: [], ignoreList: [ 'SkinnedMesh' ] },
	{ path: 'animation/MMDAnimationHelper.js', dependencies: [ { name: 'CCDIKSolver', path: 'animation/CCDIKSolver.js' }, { name: 'MMDPhysics', path: 'animation/MMDPhysics.js' } ], ignoreList: [ 'AnimationClip', 'Audio', 'Camera', 'SkinnedMesh' ] },
	{ path: 'animation/MMDPhysics.js', dependencies: [], ignoreList: [ 'SkinnedMesh' ] },

	{ path: 'cameras/CinematicCamera.js', dependencies: [ { name: 'BokehShader', path: 'Shaders/BokehShader2.js' }, { name: 'BokehDepthShader', path: 'Shaders/BokehShader2.js' } ], ignoreList: [] },

	{ path: 'controls/DragControls.js', dependencies: [], ignoreList: [] },
	{ path: 'controls/DeviceOrientationControls.js', dependencies: [], ignoreList: [] },
	{ path: 'controls/FirstPersonControls.js', dependencies: [], ignoreList: [] },
	{ path: 'controls/FlyControls.js', dependencies: [], ignoreList: [] },
	{ path: 'controls/OrbitControls.js', dependencies: [], ignoreList: [] },
	{ path: 'controls/PointerLockControls.js', dependencies: [], ignoreList: [] },
	{ path: 'controls/TrackballControls.js', dependencies: [], ignoreList: [] },
	{ path: 'controls/TransformControls.js', dependencies: [], ignoreList: [] },

	{ path: 'curves/CurveExtras.js', dependencies: [], ignoreList: [] },
	{ path: 'curves/NURBSCurve.js', dependencies: [ { name: 'NURBSUtils', path: 'curves/NURBSUtils.js' } ], ignoreList: [] },
	{ path: 'curves/NURBSSurface.js', dependencies: [ { name: 'NURBSUtils', path: 'curves/NURBSUtils.js' } ], ignoreList: [] },
	{ path: 'curves/NURBSUtils.js', dependencies: [], ignoreList: [] },

	{ path: 'effects/AnaglyphEffect.js', dependencies: [], ignoreList: [] },
	{ path: 'effects/AsciiEffect.js', dependencies: [], ignoreList: [] },
	{ path: 'effects/OutlineEffect.js', dependencies: [], ignoreList: [] },
	{ path: 'effects/ParallaxBarrierEffect.js', dependencies: [], ignoreList: [] },
	{ path: 'effects/PeppersGhostEffect.js', dependencies: [], ignoreList: [] },
	{ path: 'effects/StereoEffect.js', dependencies: [], ignoreList: [] },

	{ path: 'exporters/ColladaExporter.js', dependencies: [], ignoreList: [ 'BufferGeometry' ] },
	{ path: 'exporters/DRACOExporter.js', dependencies: [], ignoreList: [ 'Geometry', 'BufferGeometry' ] },
	{ path: 'exporters/GLTFExporter.js', dependencies: [], ignoreList: [ 'AnimationClip', 'Camera', 'Geometry', 'Material', 'Mesh', 'Object3D', 'Scenes', 'ShaderMaterial', 'BufferGeometry', 'Texture' ] },
	{ path: 'exporters/MMDExporter.js', dependencies: [ { name: 'MMDParser', path: 'libs/mmdparser.module.js' } ], ignoreList: [] },
	{ path: 'exporters/OBJExporter.js', dependencies: [], ignoreList: [ 'BufferGeometry' ] },
	{ path: 'exporters/PLYExporter.js', dependencies: [], ignoreList: [ 'BufferGeometry' ] },
	{ path: 'exporters/STLExporter.js', dependencies: [], ignoreList: [ 'BufferGeometry' ] },

	{ path: 'geometries/BoxLineGeometry.js', dependencies: [], ignoreList: [] },
	{ path: 'geometries/ConvexGeometry.js', dependencies: [ { name: 'ConvexHull', path: 'math/ConvexHull.js' } ], ignoreList: [] },
	{ path: 'geometries/DecalGeometry.js', dependencies: [], ignoreList: [ 'Geometry' ] },
	{ path: 'geometries/LightningStrike.js', dependencies: [ { name: 'SimplexNoise', path: 'math/SimplexNoise.js' } ], ignoreList: [ 'Mesh' ] },
	{ path: 'geometries/ParametricGeometries.js', dependencies: [], ignoreList: [] },
	{ path: 'geometries/TeapotGeometry.js', dependencies: [], ignoreList: [] },

	{ path: 'interactive/SelectionBox.js', dependencies: [], ignoreList: [] },
	{ path: 'interactive/SelectionHelper.js', dependencies: [], ignoreList: [] },

	{ path: 'lights/LightProbeGenerator.js', dependencies: [], ignoreList: [] },
	{ path: 'lights/RectAreaLightUniformsLib.js', dependencies: [], ignoreList: [] },

	{ path: 'lines/Line2.js', dependencies: [ { name: 'LineSegments2', path: 'lines/LineSegments2.js' }, { name: 'LineGeometry', path: 'lines/LineGeometry.js' }, { name: 'LineMaterial', path: 'lines/LineMaterial.js' } ], ignoreList: [] },
	{ path: 'lines/LineGeometry.js', dependencies: [ { name: 'LineSegmentsGeometry', path: 'lines/LineSegmentsGeometry.js' } ], ignoreList: [ 'BufferGeometry' ] },
	{ path: 'lines/LineMaterial.js', dependencies: [], ignoreList: [] },
	{ path: 'lines/LineSegments2.js', dependencies: [ { name: 'LineSegmentsGeometry', path: 'lines/LineSegmentsGeometry.js' }, { name: 'LineMaterial', path: 'lines/LineMaterial.js' } ], ignoreList: [] },
	{ path: 'lines/LineSegmentsGeometry.js', dependencies: [], ignoreList: [ 'BufferGeometry' ] },
	{ path: 'lines/Wireframe.js', dependencies: [ { name: 'LineSegmentsGeometry', path: 'lines/LineSegmentsGeometry.js' }, { name: 'LineMaterial', path: 'lines/LineMaterial.js' } ], ignoreList: [] },
	{ path: 'lines/WireframeGeometry2.js', dependencies: [ { name: 'LineSegmentsGeometry', path: 'lines/LineSegmentsGeometry.js' } ], ignoreList: [] },

	{ path: 'loaders/3MFLoader.js', dependencies: [ { name: 'fflate', path: 'libs/fflate.module.min.js', importAll: true } ], ignoreList: [] },
	{ path: 'loaders/AMFLoader.js', dependencies: [ { name: 'fflate', path: 'libs/fflate.module.min.js', importAll: true } ], ignoreList: [] },
	{ path: 'loaders/AssimpLoader.js', dependencies: [], ignoreList: [] },
	{ path: 'loaders/BasisTextureLoader.js', dependencies: [], ignoreList: [] },
	{ path: 'loaders/BVHLoader.js', dependencies: [], ignoreList: [ 'Bones' ] },
	{ path: 'loaders/ColladaLoader.js', dependencies: [ { name: 'TGALoader', path: 'loaders/TGALoader.js' } ], ignoreList: [] },
	{ path: 'loaders/DDSLoader.js', dependencies: [], ignoreList: [] },
	{ path: 'loaders/DRACOLoader.js', dependencies: [], ignoreList: [ 'LoadingManager' ] },
	{ path: 'loaders/EXRLoader.js', dependencies: [ { name: 'fflate', path: 'libs/fflate.module.min.js', importAll: true } ], ignoreList: [] },
	{ path: 'loaders/FBXLoader.js', dependencies: [ { name: 'fflate', path: 'libs/fflate.module.min.js', importAll: true }, { name: 'NURBSCurve', path: 'curves/NURBSCurve.js' } ], ignoreList: [] },
	{ path: 'loaders/GCodeLoader.js', dependencies: [], ignoreList: [] },
	{ path: 'loaders/GLTFLoader.js', dependencies: [], ignoreList: [ 'NoSide', 'Matrix2', 'Camera', 'Texture' ] },
	{ path: 'loaders/HDRCubeTextureLoader.js', dependencies: [ { name: 'RGBELoader', path: 'loaders/RGBELoader.js' } ], ignoreList: [] },
	{ path: 'loaders/KMZLoader.js', dependencies: [ { name: 'ColladaLoader', path: 'loaders/ColladaLoader.js' }, { name: 'fflate', path: 'libs/fflate.module.min.js', importAll: true } ], ignoreList: [] },
	{ path: 'loaders/LDrawLoader.js', dependencies: [], ignoreList: [ 'Cache', 'Material', 'Object3D' ] },
	{ path: 'loaders/KTXLoader.js', dependencies: [], ignoreList: [] },
	{ path: 'loaders/MD2Loader.js', dependencies: [], ignoreList: [] },
	{ path: 'loaders/MMDLoader.js', dependencies: [ { name: 'TGALoader', path: 'loaders/TGALoader.js' }, { name: 'MMDParser', path: 'libs/mmdparser.module.js' } ], ignoreList: [ 'Camera', 'LoadingManager' ] },
	{ path: 'loaders/MTLLoader.js', dependencies: [], ignoreList: [ 'BackSide', 'DoubleSide', 'ClampToEdgeWrapping', 'MirroredRepeatWrapping' ] },
	{ path: 'loaders/NRRDLoader.js', dependencies: [ { name: 'fflate', path: 'libs/fflate.module.min.js', importAll: true }, { name: 'Volume', path: 'misc/Volume.js' } ], ignoreList: [] },
	{ path: 'loaders/OBJLoader.js', dependencies: [], ignoreList: [] },
	{ path: 'loaders/PCDLoader.js', dependencies: [], ignoreList: [] },
	{ path: 'loaders/PDBLoader.js', dependencies: [], ignoreList: [] },
	{ path: 'loaders/PLYLoader.js', dependencies: [], ignoreList: [ 'Mesh' ] },
	{ path: 'loaders/PRWMLoader.js', dependencies: [], ignoreList: [] },
	{ path: 'loaders/PVRLoader.js', dependencies: [], ignoreList: [] },
	{ path: 'loaders/RGBELoader.js', dependencies: [], ignoreList: [ 'RGBAFormat' ] },
	{ path: 'loaders/STLLoader.js', dependencies: [], ignoreList: [ 'Mesh', 'MeshPhongMaterial' ] },
	{ path: 'loaders/SVGLoader.js', dependencies: [], ignoreList: [ 'Color' ] },
	{ path: 'loaders/TDSLoader.js', dependencies: [], ignoreList: [] },
	{ path: 'loaders/TGALoader.js', dependencies: [], ignoreList: [] },
	{ path: 'loaders/TTFLoader.js', dependencies: [ { name: 'opentype', path: 'libs/opentype.module.min.js' } ], ignoreList: [ 'Font' ] },
	{ path: 'loaders/VRMLLoader.js', dependencies: [ { name: 'chevrotain', path: 'libs/chevrotain.module.min.js' } ], ignoreList: [] },
	{ path: 'loaders/VRMLoader.js', dependencies: [ { name: 'GLTFLoader', path: 'loaders/GLTFLoader.js' } ], ignoreList: [] },
	{ path: 'loaders/VTKLoader.js', dependencies: [ { name: 'fflate', path: 'libs/fflate.module.min.js', importAll: true } ], ignoreList: [] },
	{ path: 'loaders/XLoader.js', dependencies: [], ignoreList: [] },

	{ path: 'math/ColorConverter.js', dependencies: [], ignoreList: [] },
	{ path: 'math/ConvexHull.js', dependencies: [], ignoreList: [ 'BufferGeometry' ] },
	{ path: 'math/ImprovedNoise.js', dependencies: [], ignoreList: [] },
	{ path: 'math/Lut.js', dependencies: [], ignoreList: [] },
	{ path: 'math/SimplexNoise.js', dependencies: [], ignoreList: [] },

	{ path: 'misc/ConvexObjectBreaker.js', dependencies: [ { name: 'ConvexGeometry', path: 'geometries/ConvexGeometry.js' } ], ignoreList: [ 'Matrix4' ] },
	{ path: 'misc/GPUComputationRenderer.js', dependencies: [], ignoreList: [] },
	{ path: 'misc/Gyroscope.js', dependencies: [], ignoreList: [] },
	{ path: 'misc/MD2Character.js', dependencies: [ { name: 'MD2Loader', path: 'loaders/MD2Loader.js' } ], ignoreList: [] },
	{ path: 'misc/MD2CharacterComplex.js', dependencies: [ { name: 'MD2Loader', path: 'loaders/MD2Loader.js' }, { name: 'MorphBlendMesh', path: 'misc/MorphBlendMesh.js' } ], ignoreList: [] },
	{ path: 'misc/MorphAnimMesh.js', dependencies: [], ignoreList: [] },
	{ path: 'misc/MorphBlendMesh.js', dependencies: [], ignoreList: [] },
	{ path: 'misc/Ocean.js', dependencies: [ { name: 'OceanShaders', path: 'Shaders/OceanShaders.js' } ], ignoreList: [] },
	{ path: 'misc/RollerCoaster.js', dependencies: [], ignoreList: [] },
	{ path: 'misc/Volume.js', dependencies: [ { name: 'VolumeSlice', path: 'misc/VolumeSlice.js' } ], ignoreList: [] },
	{ path: 'misc/VolumeSlice.js', dependencies: [], ignoreList: [] },

	{ path: 'modifiers/EdgeSplitModifier.js', dependencies: [ { name: 'BufferGeometryUtils', path: 'utils/BufferGeometryUtils.js' } ], ignoreList: [ 'Geometry' ] },
	{ path: 'modifiers/SimplifyModifier.js', dependencies: [ { name: 'BufferGeometryUtils', path: 'utils/BufferGeometryUtils.js' } ], ignoreList: [] },
	{ path: 'modifiers/TessellateModifier.js', dependencies: [], ignoreList: [] },

	{ path: 'objects/Lensflare.js', dependencies: [], ignoreList: [] },
	{ path: 'objects/LightningStorm.js', dependencies: [ { name: 'LightningStrike', path: 'geometries/LightningStrike.js' } ], ignoreList: [ 'Material' ] },
	{ path: 'objects/MarchingCubes.js', dependencies: [], ignoreList: [] },
	{ path: 'objects/Reflector.js', dependencies: [], ignoreList: [] },
	{ path: 'objects/Refractor.js', dependencies: [], ignoreList: [] },
	{ path: 'objects/ReflectorRTT.js', dependencies: [ { name: 'Reflector', path: 'objects/Reflector.js' } ], ignoreList: [] },
	{ path: 'objects/ShadowMesh.js', dependencies: [], ignoreList: [] },
	{ path: 'objects/Sky.js', dependencies: [], ignoreList: [] },
	{ path: 'objects/Water.js', dependencies: [], ignoreList: [] },
	{ path: 'objects/Water2.js', dependencies: [ { name: 'Reflector', path: 'objects/Reflector.js' }, { name: 'Refractor', path: 'objects/Refractor.js' } ], ignoreList: [] },

	{ path: 'postprocessing/AdaptiveToneMappingPass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'CopyShader', path: 'Shaders/CopyShader.js' }, { name: 'LuminosityShader', path: 'Shaders/LuminosityShader.js' }, { name: 'ToneMapShader', path: 'Shaders/ToneMapShader.js' } ], ignoreList: [] },
	{ path: 'postprocessing/AfterimagePass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'AfterimageShader', path: 'Shaders/AfterimageShader.js' } ], ignoreList: [] },
	{ path: 'postprocessing/BloomPass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'CopyShader', path: 'Shaders/CopyShader.js' }, { name: 'ConvolutionShader', path: 'Shaders/ConvolutionShader.js' } ], ignoreList: [] },
	{ path: 'postprocessing/BokehPass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'BokehShader', path: 'Shaders/BokehShader.js' } ], ignoreList: [] },
	{ path: 'postprocessing/ClearPass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' } ], ignoreList: [] },
	{ path: 'postprocessing/CubeTexturePass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' } ], ignoreList: [] },
	{ path: 'postprocessing/DotScreenPass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'DotScreenShader', path: 'Shaders/DotScreenShader.js' } ], ignoreList: [] },
	{ path: 'postprocessing/EffectComposer.js', dependencies: [ { name: 'CopyShader', path: 'Shaders/CopyShader.js' }, { name: 'ShaderPass', path: 'postprocessing/ShaderPass.js' }, { name: 'MaskPass', path: 'postprocessing/MaskPass.js' }, { name: 'ClearMaskPass', path: 'postprocessing/MaskPass.js' } ], ignoreList: [] },
	{ path: 'postprocessing/FilmPass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'FilmShader', path: 'Shaders/FilmShader.js' } ], ignoreList: [] },
	{ path: 'postprocessing/GlitchPass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'DigitalGlitch', path: 'Shaders/DigitalGlitch.js' } ], ignoreList: [] },
	{ path: 'postprocessing/HalftonePass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'HalftoneShader', path: 'Shaders/HalftoneShader.js' } ], ignoreList: [] },
	{ path: 'postprocessing/MaskPass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' } ], ignoreList: [] },
	{ path: 'postprocessing/OutlinePass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'CopyShader', path: 'Shaders/CopyShader.js' } ], ignoreList: [] },
	{ path: 'postprocessing/RenderPass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' } ], ignoreList: [] },
	{ path: 'postprocessing/SAOPass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'SAOShader', path: 'Shaders/SAOShader.js' }, { name: 'DepthLimitedBlurShader', path: 'Shaders/DepthLimitedBlurShader.js' }, { name: 'BlurShaderUtils', path: 'Shaders/DepthLimitedBlurShader.js' }, { name: 'CopyShader', path: 'Shaders/CopyShader.js' }, { name: 'UnpackDepthRGBAShader', path: 'Shaders/UnpackDepthRGBAShader.js' } ], ignoreList: [] },
	{ path: 'postprocessing/SavePass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'CopyShader', path: 'Shaders/CopyShader.js' } ], ignoreList: [] },
	{ path: 'postprocessing/ShaderPass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' } ], ignoreList: [] },
	{ path: 'postprocessing/SMAAPass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'SMAAEdgesShader', path: 'Shaders/SMAAShader.js' }, { name: 'SMAAWeightsShader', path: 'Shaders/SMAAShader.js' }, { name: 'SMAABlendShader', path: 'Shaders/SMAAShader.js' } ], ignoreList: [] },
	{ path: 'postprocessing/SSAARenderPass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'CopyShader', path: 'Shaders/CopyShader.js' } ], ignoreList: [] },
	{ path: 'postprocessing/SSAOPass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'SimplexNoise', path: 'math/SimplexNoise.js' }, { name: 'SSAOShader', path: 'Shaders/SSAOShader.js' }, { name: 'SSAOBlurShader', path: 'Shaders/SSAOShader.js' }, { name: 'SSAODepthShader', path: 'Shaders/SSAOShader.js' }, { name: 'CopyShader', path: 'Shaders/CopyShader.js' } ], ignoreList: [] },
	{ path: 'postprocessing/TAARenderPass.js', dependencies: [ { name: 'SSAARenderPass', path: 'postprocessing/SSAARenderPass.js' } ], ignoreList: [] },
	{ path: 'postprocessing/TexturePass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'CopyShader', path: 'Shaders/CopyShader.js' } ], ignoreList: [] },
	{ path: 'postprocessing/UnrealBloomPass.js', dependencies: [ { name: 'Pass', path: 'postprocessing/Pass.js' }, { name: 'CopyShader', path: 'Shaders/CopyShader.js' }, { name: 'LuminosityHighPassShader', path: 'Shaders/LuminosityHighPassShader.js' } ], ignoreList: [] },

	{ path: 'renderers/CSS2DRenderer.js', dependencies: [], ignoreList: [] },
	{ path: 'renderers/CSS3DRenderer.js', dependencies: [], ignoreList: [] },
	{ path: 'renderers/Projector.js', dependencies: [], ignoreList: [ 'BufferGeometry' ] },
	{ path: 'renderers/SVGRenderer.js', dependencies: [ { name: 'Projector', path: 'renderers/Projector.js' }, { name: 'RenderableFace', path: 'renderers/Projector.js' }, { name: 'RenderableLine', path: 'renderers/Projector.js' }, { name: 'RenderableSprite', path: 'renderers/Projector.js' } ], ignoreList: [] },

	{ path: 'Shaders/ACESFilmicToneMappingShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/AfterimageShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/BasicShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/BleachBypassShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/BlendShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/BokehShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/BokehShader2.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/BrightnessContrastShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/ColorCorrectionShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/ColorifyShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/ConvolutionShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/CopyShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/DepthLimitedBlurShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/DigitalGlitch.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/DOFMipMapShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/DotScreenShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/FilmShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/FocusShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/FreiChenShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/FresnelShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/FXAAShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/GammaCorrectionShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/GodRaysShader.js', dependencies: [], ignoreList: [ 'MeshDepthMaterial' ] },
	{ path: 'Shaders/HalftoneShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/HorizontalBlurShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/HorizontalTiltShiftShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/HueSaturationShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/KaleidoShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/LuminosityHighPassShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/LuminosityShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/MirrorShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/NormalMapShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/OceanShaders.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/ParallaxShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/PixelShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/RGBShiftShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/SAOShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/SepiaShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/SMAAShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/SobelOperatorShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/SSAOShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/TechnicolorShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/ToneMapShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/ToonShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/SubsurfaceScatteringShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/TriangleBlurShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/UnpackDepthRGBAShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/VerticalBlurShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/VerticalTiltShiftShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/VignetteShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/VolumeShader.js', dependencies: [], ignoreList: [] },
	{ path: 'Shaders/WaterRefractionShader.js', dependencies: [], ignoreList: [] },

	{ path: 'utils/BufferGeometryUtils.js', dependencies: [], ignoreList: [] },
	{ path: 'utils/GeometryUtils.js', dependencies: [], ignoreList: [] },
	{ path: 'utils/SceneUtils.js', dependencies: [], ignoreList: [] },
	{ path: 'utils/ShadowMapViewer.js', dependencies: [ { name: 'UnpackDepthRGBAShader', path: 'Shaders/UnpackDepthRGBAShader.js' } ], ignoreList: [] },
	{ path: 'utils/SkeletonUtils.js', dependencies: [], ignoreList: [] },
	{ path: 'utils/UVsDebug.js', dependencies: [], ignoreList: [ 'SphereGeometry', 'BufferGeometry' ] },

	{ path: 'WebGL.js', dependencies: [], ignoreList: [] },
];

for ( var i = 0; i < files.length; i ++ ) {

	var file = files[ i ];
	convert( file.path, file.dependencies, file.ignoreList );

}

//

function convert( path, exampleDependencies, ignoreList ) {

	var contents = fs.readFileSync( srcFolder + path, 'utf8' );

	var classNames = [];
	var coreDependencies = {};

	// class name

	contents = contents.replace( /THREE\.([a-zA-Z0-9]+) = /g, function ( match, p1 ) {

		classNames.push( p1 );

		console.log( p1 );

		return `var ${p1} = `;

	} );

	contents = contents.replace( /(\'?)THREE\.([a-zA-Z0-9]+)(\.{0,1})/g, function ( match, p1, p2, p3 ) {

		if ( p1 === '\'' ) return match; // Inside a string
		if ( classNames.includes( p2 ) ) return `${p2}${p3}`;

		return match;

	} );

	// methods

	contents = contents.replace( /new THREE\.([a-zA-Z0-9]+)\(/g, function ( match, p1 ) {

		if ( ignoreList.includes( p1 ) ) return match;

		if ( p1 in THREE ) coreDependencies[ p1 ] = true;

		return `new ${p1}(`;

	} );

	// constants

	contents = contents.replace( /(\'?)THREE\.([a-zA-Z0-9_]+)/g, function ( match, p1, p2 ) {

		if ( ignoreList.includes( p2 ) ) return match;
		if ( p1 === '\'' ) return match; // Inside a string
		if ( classNames.includes( p2 ) ) return p2;

		if ( p2 in THREE ) coreDependencies[ p2 ] = true;

		// console.log( match, p2 );

		return `${p2}`;

	} );

	//

	var keys = Object.keys( coreDependencies )
		.filter( value => ! classNames.includes( value ) )
		.map( value => EOL + '\t' + value )
		.sort()
		.toString();

	var imports = [];

	// compute path prefix for imports/exports

	var level = path.split( '/' ).length - 1;
	var pathPrefix = '../'.repeat( level );

	// core imports

	if ( keys ) imports.push( `import {${keys}${EOL}} from '${pathPrefix}../../build/three.module.js';` );

	// example imports

	for ( var dependency of exampleDependencies ) {

		if ( dependency.importAll === true ) {

			imports.push( `import * as ${dependency.name} from '${pathPrefix}${dependency.path}';` );

		} else {

			imports.push( `import { ${dependency.name} } from '${pathPrefix}${dependency.path}';` );

		}

	}

	var output = '';

	if ( imports.length > 0 ) output += imports.join( EOL ) + EOL + EOL;

	output += contents + `${EOL}export { ${classNames.join( ', ' )} };${EOL}`;

	// console.log( output );

	fs.writeFileSync( dstFolder + path, output, 'utf-8' );

}
