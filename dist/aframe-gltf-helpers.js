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

eval("/* global AFRAME */\nif (typeof AFRAME === 'undefined') {\n  throw new Error('Component attempted to register before AFRAME was available.');\n}\n\nvar LOADING_MODELS = {};\nvar MODELS = {};\nAFRAME.registerComponent('gltf-part-plus', {\n  schema: {\n    buffer: {\n      default: true\n    },\n    part: {\n      type: 'string'\n    },\n    src: {\n      type: 'asset'\n    },\n    resetPosition: {\n      default: false\n    }\n  },\n  init: function () {\n    this.dracoLoader = document.querySelector('a-scene').systems['gltf-model'].getDRACOLoader();\n  },\n  update: function () {\n    var el = this.el;\n    var data = this.data;\n\n    if (!this.data.part && this.data.src) {\n      return;\n    }\n\n    this.getModel(function (modelPart) {\n      if (!modelPart) {\n        return;\n      }\n\n      if (data.resetPosition) {\n        el.setAttribute('position', modelPart.position.x + ' ' + modelPart.position.y + ' ' + modelPart.position.z);\n        modelPart.position.set(0, 0, 0);\n      }\n\n      el.setObject3D('mesh', modelPart);\n      el.emit('model-loaded', {\n        format: 'gltf',\n        part: this.modelPart\n      });\n    });\n  },\n\n  /**\n   * Fetch, cache, and select from GLTF.\n   *\n   * @returns {object} Selected subset of model.\n   */\n  getModel: function (cb) {\n    var self = this; // Already parsed, grab it.\n\n    if (MODELS[this.data.src]) {\n      cb(this.selectFromModel(MODELS[this.data.src]));\n      return;\n    } // Currently loading, wait for it.\n\n\n    if (LOADING_MODELS[this.data.src]) {\n      return LOADING_MODELS[this.data.src].then(function (model) {\n        cb(self.selectFromModel(model));\n      });\n    } // Not yet fetching, fetch it.\n\n\n    LOADING_MODELS[this.data.src] = new Promise(function (resolve) {\n      var loader = new THREE.GLTFLoader();\n\n      if (self.dracoLoader) {\n        loader.setDRACOLoader(self.dracoLoader);\n      }\n\n      loader.load(self.data.src, function (gltfModel) {\n        var model = gltfModel.scene || gltfModel.scenes[0];\n        MODELS[self.data.src] = model;\n        delete LOADING_MODELS[self.data.src];\n        cb(self.selectFromModel(model));\n        resolve(model);\n      }, function () {}, console.error);\n    });\n  },\n\n  /**\n   * Search for the part name and look for a mesh.\n   */\n  selectFromModel: function (model) {\n    var mesh;\n    var part;\n    part = model.getObjectByName(this.data.part);\n\n    if (!part) {\n      console.error('[gltf-part] `' + this.data.part + '` not found in model.');\n      return;\n    }\n\n    mesh = part.getObjectByProperty('type', 'Mesh').clone(true);\n\n    if (this.data.buffer) {\n      mesh.geometry = mesh.geometry.toNonIndexed();\n      return mesh;\n    }\n\n    mesh.geometry = new THREE.Geometry().fromBufferGeometry(mesh.geometry);\n    return mesh;\n  }\n});\nAFRAME.registerComponent('model-center', {\n  schema: {\n    bottomAlign: {\n      default: false\n    }\n  },\n  init: function () {\n    this.el.addEventListener('model-loaded', event => {\n      var modelPart = this.el.getObject3D('mesh');\n      modelPart.position.set(0, 0, 0); // center all axes\n\n      modelPart.geometry.center();\n\n      if (this.data.bottomAlign) {\n        // align the bottom of the geometry on the y axis\n        var box = new THREE.Box3().setFromObject(modelPart);\n        var boundingBoxSize = box.max.sub(box.min);\n        var height = boundingBoxSize.y;\n        modelPart.position.y = height / 2;\n      }\n    });\n  }\n});\nAFRAME.registerComponent('anisotropy', {\n  schema: {\n    default: 0\n  },\n  // default 0 will apply max anisotropy according to hardware\n  dependencies: ['material', 'geometry'],\n  init: function () {\n    this.maxAnisotropy = this.el.sceneEl.renderer.capabilities.getMaxAnisotropy(); // console.log('this.maxAnisotropy', this.maxAnisotropy);\n\n    this.el.addEventListener('model-loaded', () => {\n      const mesh = this.el.getObject3D('mesh'); // console.log('mesh', mesh);\n\n      var anisotropyTargetValue = this.data;\n      anisotropyTargetValue = +anisotropyTargetValue || 0; // https://stackoverflow.com/questions/7540397/convert-nan-to-0-in-javascript\n      // console.log('anisotropyTargetValue', anisotropyTargetValue);\n\n      if (anisotropyTargetValue === 0) {\n        anisotropyTargetValue = this.maxAnisotropy; // console.log('anisotropyTargetValue', anisotropyTargetValue);\n      }\n\n      mesh.traverse(object => {\n        if (object.isMesh === true && object.material.map !== null) {\n          // console.log('object', object);\n          // console.log('object.material.map.anisotropy', object.material.map.anisotropy);\n          object.material.map.anisotropy = anisotropyTargetValue; // console.log('object.material.map.anisotropy', object.material.map.anisotropy);\n\n          object.material.map.needsUpdate = true;\n        }\n      });\n    });\n  }\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });
});