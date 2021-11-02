(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* global AFRAME */\nif (typeof AFRAME === 'undefined') {\n  throw new Error('Component attempted to register before AFRAME was available.');\n}\n\nvar LOADING_MODELS = {};\nvar MODELS = {};\nAFRAME.registerComponent('gltf-part-plus', {\n  schema: {\n    buffer: {\n      default: true\n    },\n    part: {\n      type: 'string'\n    },\n    src: {\n      type: 'asset'\n    },\n    resetPosition: {\n      default: false\n    }\n  },\n  init: function () {\n    this.dracoLoader = document.querySelector('a-scene').systems['gltf-model'].getDRACOLoader();\n  },\n  update: function () {\n    var el = this.el;\n    var data = this.data;\n\n    if (!this.data.part && this.data.src) {\n      return;\n    }\n\n    this.getModel(function (modelPart) {\n      if (!modelPart) {\n        return;\n      }\n\n      if (data.resetPosition) {\n        el.setAttribute('position', modelPart.position.x + ' ' + modelPart.position.y + ' ' + modelPart.position.z);\n        modelPart.position.set(0, 0, 0);\n      }\n\n      el.setObject3D('mesh', modelPart);\n      el.emit('model-loaded', {\n        format: 'gltf',\n        part: this.modelPart\n      });\n    });\n  },\n\n  /**\n   * Fetch, cache, and select from GLTF.\n   *\n   * @returns {object} Selected subset of model.\n   */\n  getModel: function (cb) {\n    var self = this; // Already parsed, grab it.\n\n    if (MODELS[this.data.src]) {\n      cb(this.selectFromModel(MODELS[this.data.src]));\n      return;\n    } // Currently loading, wait for it.\n\n\n    if (LOADING_MODELS[this.data.src]) {\n      return LOADING_MODELS[this.data.src].then(function (model) {\n        cb(self.selectFromModel(model));\n      });\n    } // Not yet fetching, fetch it.\n\n\n    LOADING_MODELS[this.data.src] = new Promise(function (resolve) {\n      var loader = new THREE.GLTFLoader();\n\n      if (self.dracoLoader) {\n        loader.setDRACOLoader(self.dracoLoader);\n      }\n\n      loader.load(self.data.src, function (gltfModel) {\n        var model = gltfModel.scene || gltfModel.scenes[0];\n        MODELS[self.data.src] = model;\n        delete LOADING_MODELS[self.data.src];\n        cb(self.selectFromModel(model));\n        resolve(model);\n      }, function () {}, console.error);\n    });\n  },\n\n  /**\n   * Search for the part name and return it.\n   */\n  selectFromModel: function (model) {\n    var part;\n    part = model.getObjectByName(this.data.part);\n\n    if (!part) {\n      console.error('[gltf-part] `' + this.data.part + '` not found in model.');\n      return;\n    }\n\n    return part;\n  }\n});\nAFRAME.registerComponent('model-center', {\n  schema: {\n    bottomAlign: {\n      default: false\n    }\n  },\n  init: function () {\n    this.el.addEventListener('model-loaded', event => {\n      var modelPart = this.el.getObject3D('mesh');\n      modelPart.position.set(0, 0, 0); // center all axes\n\n      modelPart.geometry.center();\n\n      if (this.data.bottomAlign) {\n        // align the bottom of the geometry on the y axis\n        var box = new THREE.Box3().setFromObject(modelPart);\n        var boundingBoxSize = box.max.sub(box.min);\n        var height = boundingBoxSize.y;\n        modelPart.position.y = height / 2;\n      }\n    });\n  }\n});\nAFRAME.registerComponent('anisotropy', {\n  schema: {\n    default: 0\n  },\n  // default 0 will apply max anisotropy according to hardware\n  dependencies: ['material', 'geometry'],\n  init: function () {\n    this.maxAnisotropy = this.el.sceneEl.renderer.capabilities.getMaxAnisotropy(); // console.log('this.maxAnisotropy', this.maxAnisotropy);\n\n    ['model-loaded', 'materialtextureloaded'].forEach(evt => this.el.addEventListener(evt, () => {\n      const mesh = this.el.getObject3D('mesh'); // console.log('mesh', mesh);\n\n      var anisotropyTargetValue = this.data;\n      anisotropyTargetValue = +anisotropyTargetValue || 0; // https://stackoverflow.com/questions/7540397/convert-nan-to-0-in-javascript\n      // console.log('anisotropyTargetValue', anisotropyTargetValue);\n\n      if (anisotropyTargetValue === 0) {\n        anisotropyTargetValue = this.maxAnisotropy; // console.log('anisotropyTargetValue', anisotropyTargetValue);\n      }\n\n      mesh.traverse(object => {\n        if (object.isMesh === true && object.material.map !== null) {\n          // console.log('object', object);\n          // console.log('object.material.map.anisotropy', object.material.map.anisotropy);\n          object.material.map.anisotropy = anisotropyTargetValue; // console.log('object.material.map.anisotropy', object.material.map.anisotropy);\n\n          object.material.map.needsUpdate = true;\n        }\n      });\n    }, false)); // this.el.addEventListener('model-loaded', () => {\n    //   const mesh = this.el.getObject3D('mesh');\n    //   // console.log('mesh', mesh);\n    //   var anisotropyTargetValue = this.data;\n    //   anisotropyTargetValue = +anisotropyTargetValue || 0; // https://stackoverflow.com/questions/7540397/convert-nan-to-0-in-javascript\n    //   // console.log('anisotropyTargetValue', anisotropyTargetValue);\n    //   if (anisotropyTargetValue === 0) {\n    //     anisotropyTargetValue = this.maxAnisotropy;\n    //     // console.log('anisotropyTargetValue', anisotropyTargetValue);\n    //   }\n    //   mesh.traverse((object) => {\n    //     if (object.isMesh === true && object.material.map !== null) {\n    //       // console.log('object', object);\n    //       // console.log('object.material.map.anisotropy', object.material.map.anisotropy);\n    //       object.material.map.anisotropy = anisotropyTargetValue;\n    //       // console.log('object.material.map.anisotropy', object.material.map.anisotropy);\n    //       object.material.map.needsUpdate = true;\n    //     }\n    //   });\n    // });\n  }\n}); // original source: https://github.com/EX3D/aframe-InstancedMesh/blob/master/instancedmesh.js\n\nAFRAME.registerComponent('instancedmesh', {\n  schema: {\n    retainParent: {\n      default: false\n    },\n    retainChildren: {\n      default: false\n    },\n    // Not yet implemented\n    inheritMat: {\n      default: true\n    },\n    mergeInstances: {\n      default: false\n    },\n    // Not yet implemented\n    frustumCulled: {\n      default: true\n    }\n  },\n  init: function () {},\n  update: function () {\n    var self = this;\n    var el = this.el;\n    var list = this.el.children;\n    var quantity = 0;\n\n    var applyMatrix = function () {\n      var position = new THREE.Vector3();\n      var rotation = new THREE.Euler();\n      var scale = new THREE.Vector3();\n      var quaternion = new THREE.Quaternion();\n      return function (i, matrix) {\n        position.x = el.children[i].object3D.position.x;\n        position.y = el.children[i].object3D.position.y;\n        position.z = el.children[i].object3D.position.z;\n        rotation.x = el.children[i].object3D.rotation.x;\n        rotation.y = el.children[i].object3D.rotation.y;\n        rotation.z = el.children[i].object3D.rotation.z;\n        quaternion.setFromEuler(rotation);\n        scale.x = el.children[i].object3D.scale.x;\n        scale.y = el.children[i].object3D.scale.y;\n        scale.z = el.children[i].object3D.scale.z;\n        matrix.compose(position, quaternion, scale);\n      }; // High verbosity because imma N00b don´t know how to access matrix on an uninitialized object\n    }();\n\n    for (var item of list) {\n      quantity = quantity + 1;\n    }\n\n    var mesh = this.el.getObject3D('mesh');\n\n    if (!mesh) {\n      this.el.addEventListener('model-loaded', e => {\n        this.update(this.data);\n      });\n      return;\n    }\n\n    var material = mesh.material.clone();\n    var geometry = null;\n    mesh.traverse(function (node) {\n      if (node.isMesh === true) {\n        geometry = node.geometry;\n      }\n    });\n    var amesh = new THREE.InstancedMesh(geometry, material, quantity);\n\n    for (var i = 0; i < quantity; i++) {\n      var matrix = new THREE.Matrix4(); // var child = this.el.children[i];\n\n      applyMatrix(i, matrix);\n      amesh.setMatrixAt(i, matrix);\n    } // frustumCulled\n\n\n    amesh.frustumCulled = this.data.frustumCulled;\n    this.el.object3D.add(amesh); // retainParent\n\n    if (!self.data.retainParent) {\n      this.el.object3D.remove(mesh);\n    } // inheritMat (Set material attribute to cloned material)\n\n\n    if (self.data.inheritMat) {\n      this.el.components.material.material = material;\n    } // why? maybe this is helpful for modifying the material of the instances after the scene initializes? otherwise modifying material on the parent element will not affect the cloned material used by the intances?\n\n  }\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });
});