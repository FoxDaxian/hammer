/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"demo": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "." + {"0":"8bbf1ed1d49bb55597ab","1":"c0779aefbe7d18d8d690"}[chunkId] + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./client/page/demo/index.js","demo/vendors/node_modules"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../hammer/initApp.js":
/*!****************************!*\
  !*** ../hammer/initApp.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function createApp(Vue, context) {\n    var entry = context.entry;\n    var createRouter = context.createRouter;\n    var createStore = context.createStore;\n    var nodeBeforeCreate = context.nodeBeforeCreate;\n    return function() {\n        var router = createRouter();\n        var store = createStore();\n        var app = new Vue({\n            render: h => h(entry),\n            router,\n            store,\n            nodeBeforeCreate\n        });\n\n        if (typeof window !== 'undefined') {\n            app.$mount('#app');\n            store.replaceState(window.__INITIAL_STATE__);\n        }\n\n        return {app, router, store};\n    };\n}\n\nmodule.exports = createApp;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vaGFtbWVyL2luaXRBcHAuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vaGFtbWVyL2luaXRBcHAuanM/MWQwZCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVBcHAoVnVlLCBjb250ZXh0KSB7XG4gICAgdmFyIGVudHJ5ID0gY29udGV4dC5lbnRyeTtcbiAgICB2YXIgY3JlYXRlUm91dGVyID0gY29udGV4dC5jcmVhdGVSb3V0ZXI7XG4gICAgdmFyIGNyZWF0ZVN0b3JlID0gY29udGV4dC5jcmVhdGVTdG9yZTtcbiAgICB2YXIgbm9kZUJlZm9yZUNyZWF0ZSA9IGNvbnRleHQubm9kZUJlZm9yZUNyZWF0ZTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByb3V0ZXIgPSBjcmVhdGVSb3V0ZXIoKTtcbiAgICAgICAgdmFyIHN0b3JlID0gY3JlYXRlU3RvcmUoKTtcbiAgICAgICAgdmFyIGFwcCA9IG5ldyBWdWUoe1xuICAgICAgICAgICAgcmVuZGVyOiBoID0+IGgoZW50cnkpLFxuICAgICAgICAgICAgcm91dGVyLFxuICAgICAgICAgICAgc3RvcmUsXG4gICAgICAgICAgICBub2RlQmVmb3JlQ3JlYXRlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYXBwLiRtb3VudCgnI2FwcCcpO1xuICAgICAgICAgICAgc3RvcmUucmVwbGFjZVN0YXRlKHdpbmRvdy5fX0lOSVRJQUxfU1RBVEVfXyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge2FwcCwgcm91dGVyLCBzdG9yZX07XG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVBcHA7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../hammer/initApp.js\n");

/***/ }),

/***/ "./client/components/btn.jsx":
/*!***********************************!*\
  !*** ./client/components/btn.jsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data: function data() {\n    return {\n      test: '按钮'\n    };\n  },\n  methods: {\n    click: function click() {\n      console.log('点击按钮');\n    }\n  },\n  render: function render() {\n    var h = arguments[0];\n    return h(\"button\", {\n      \"class\": 'btnWrap',\n      on: {\n        \"click\": this.click\n      }\n    }, [this.test]);\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jbGllbnQvY29tcG9uZW50cy9idG4uanN4LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvYnRuLmpzeD84NGVkIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGVzdDogJ+aMiemSridcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuICAgICAgICBjbGljaygpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfngrnlh7vmjInpkq4nKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nYnRuV3JhcCcgb25DbGljaz17dGhpcy5jbGlja30+XG4gICAgICAgICAgICAgICAge3RoaXMudGVzdH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgIH1cbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQWxCQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./client/components/btn.jsx\n");

/***/ }),

/***/ "./client/page/demo/app.jsx":
/*!**********************************!*\
  !*** ./client/page/demo/app.jsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ \"./node_modules/core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.define-properties */ \"./node_modules/core-js/modules/es.object.define-properties.js\");\n/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ \"./node_modules/core-js/modules/es.object.define-property.js\");\n/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ \"./node_modules/core-js/modules/es.object.get-own-property-descriptor.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ \"./node_modules/core-js/modules/es.object.get-own-property-descriptors.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.keys */ \"./node_modules/core-js/modules/es.object.keys.js\");\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./index.css */ \"./client/page/demo/index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _components_btn__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @components/btn */ \"./client/components/btn.jsx\");\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lodash/merge */ \"./node_modules/lodash/merge.js\");\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n\n\n\n\n\n\n\n\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n\n\n // import lodash from 'lodash';\n\n // console.log(lodash);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data: function data() {\n    return {\n      test: 'demopage'\n    };\n  },\n  components: {\n    btn: _components_btn__WEBPACK_IMPORTED_MODULE_11__[\"default\"]\n  },\n  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_13__[\"mapState\"])(['count'])),\n  methods: _objectSpread({\n    onChange: function onChange(e) {},\n    click: function click() {\n      this.test = '跳转过去了';\n      this.$router.push('/home/test');\n    },\n    click1: function click1() {\n      this.$router.push('/home/test/profile');\n    },\n    testStore: function testStore() {\n      this.increment();\n    }\n  }, Object(vuex__WEBPACK_IMPORTED_MODULE_13__[\"mapMutations\"])(['increment'])),\n  mounted: function mounted() {},\n  render: function render() {\n    var h = arguments[0];\n    return h(\"div\", {\n      attrs: {\n        id: 'app'\n      },\n      \"class\": 'appclass'\n    }, [this.test, h(\"btn\"), h(\"btn\"), h(\"div\", {\n      \"class\": 'routerviewwrap'\n    }, [h(\"router-view\")]), h(\"button\", {\n      on: {\n        \"click\": this.click\n      }\n    }, [\"\\u8DF3\\u8F6C\"]), h(\"button\", {\n      on: {\n        \"click\": this.click1\n      }\n    }, [\"\\u8DF3\\u8F6C1\"]), h(\"button\", {\n      on: {\n        \"click\": this.testStore\n      }\n    }, [\"store\", this.count]), h(\"img\", {\n      attrs: {\n        src: '/img/qrcode.png',\n        alt: ''\n      }\n    })]);\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jbGllbnQvcGFnZS9kZW1vL2FwcC5qc3guanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZS9kZW1vL2FwcC5qc3g/NjFlMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vaW5kZXguY3NzJztcbmltcG9ydCBidG4gZnJvbSAnQGNvbXBvbmVudHMvYnRuJztcbmltcG9ydCBtZXJnZSBmcm9tICdsb2Rhc2gvbWVyZ2UnO1xuLy8gaW1wb3J0IGxvZGFzaCBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHttYXBTdGF0ZSwgbWFwTXV0YXRpb25zfSBmcm9tICd2dWV4Jztcbi8vIGNvbnNvbGUubG9nKGxvZGFzaCk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGVzdDogJ2RlbW9wYWdlJ1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBidG5cbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIC4uLm1hcFN0YXRlKFsnY291bnQnXSlcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgb25DaGFuZ2UoZSkge30sXG4gICAgICAgIGNsaWNrKCkge1xuICAgICAgICAgICAgdGhpcy50ZXN0ID0gJ+i3s+i9rOi/h+WOu+S6hic7XG4gICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCgnL2hvbWUvdGVzdCcpO1xuICAgICAgICB9LFxuICAgICAgICBjbGljazEoKSB7XG4gICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCgnL2hvbWUvdGVzdC9wcm9maWxlJyk7XG4gICAgICAgIH0sXG4gICAgICAgIHRlc3RTdG9yZSgpIHtcbiAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50KCk7XG4gICAgICAgIH0sXG4gICAgICAgIC4uLm1hcE11dGF0aW9ucyhbJ2luY3JlbWVudCddKVxuICAgIH0sXG4gICAgbW91bnRlZCgpIHt9LFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgaWQ9J2FwcCcgY2xhc3M9J2FwcGNsYXNzJz5cbiAgICAgICAgICAgICAgICB7dGhpcy50ZXN0fVxuICAgICAgICAgICAgICAgIDxidG4gLz5cbiAgICAgICAgICAgICAgICA8YnRuIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ncm91dGVydmlld3dyYXAnPlxuICAgICAgICAgICAgICAgICAgICA8cm91dGVyLXZpZXcgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuY2xpY2t9Pui3s+i9rDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5jbGljazF9Pui3s+i9rDE8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMudGVzdFN0b3JlfT5zdG9yZXt0aGlzLmNvdW50fTwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9Jy9pbWcvcXJjb2RlLnBuZycgYWx0PScnIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBO0FBY0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQTNDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./client/page/demo/app.jsx\n");

/***/ }),

/***/ "./client/page/demo/index.css":
/*!************************************!*\
  !*** ./client/page/demo/index.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jbGllbnQvcGFnZS9kZW1vL2luZGV4LmNzcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC9wYWdlL2RlbW8vaW5kZXguY3NzPzQ4MWYiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./client/page/demo/index.css\n");

/***/ }),

/***/ "./client/page/demo/index.js":
/*!***********************************!*\
  !*** ./client/page/demo/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./client/page/demo/app.jsx\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"vue\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router */ \"./client/page/demo/router.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ \"./client/page/demo/store.js\");\n/* harmony import */ var hammer_initApp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammer/initApp */ \"../hammer/initApp.js\");\n/* harmony import */ var hammer_initApp__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammer_initApp__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nvar app = hammer_initApp__WEBPACK_IMPORTED_MODULE_4___default()(vue__WEBPACK_IMPORTED_MODULE_1___default.a, {\n  entry: _app__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  createRouter: _router__WEBPACK_IMPORTED_MODULE_2__[\"createRouter\"],\n  createStore: _store__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  nodeBeforeCreate: function nodeBeforeCreate(_ref) {\n    var store = _ref.store;\n    store.commit('increment');\n  }\n});\napp();\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jbGllbnQvcGFnZS9kZW1vL2luZGV4LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2UvZGVtby9pbmRleC5qcz9kNTIyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpbmRleCBmcm9tICcuL2FwcCc7XG5pbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQge2NyZWF0ZVJvdXRlcn0gZnJvbSAnLi9yb3V0ZXInO1xuaW1wb3J0IGNyZWF0ZVN0b3JlIGZyb20gJy4vc3RvcmUnO1xuXG5pbXBvcnQgaW5pdEFwcCBmcm9tICdoYW1tZXIvaW5pdEFwcCc7XG5cbmNvbnN0IGFwcCA9IGluaXRBcHAoVnVlLCB7XG4gICAgZW50cnk6IGluZGV4LFxuICAgIGNyZWF0ZVJvdXRlcixcbiAgICBjcmVhdGVTdG9yZSxcbiAgICBub2RlQmVmb3JlQ3JlYXRlKHtzdG9yZX0pIHtcbiAgICAgICAgc3RvcmUuY29tbWl0KCdpbmNyZW1lbnQnKTtcbiAgICB9XG59KTtcbmFwcCgpO1xuXG5leHBvcnQgZGVmYXVsdCBhcHA7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./client/page/demo/index.js\n");

/***/ }),

/***/ "./client/page/demo/router.js":
/*!************************************!*\
  !*** ./client/page/demo/router.js ***!
  \************************************/
/*! exports provided: createRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createRouter\", function() { return createRouter; });\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.promise */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ \"vue\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n\n\n\n // 如何定义到打包结果的具体入口目录中？ 例如 dist/demo/chunks/single|0.js\n\nvar single = function single() {\n  return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! ./single */ \"./client/page/demo/single.jsx\"));\n};\n\nvue__WEBPACK_IMPORTED_MODULE_2___default.a.use(vue_router__WEBPACK_IMPORTED_MODULE_3__[\"default\"]); // TODO: 不推荐使用模板，体积会大，只需要引入vue运行时的输出库，而不是包含编译时的全部库\n\nvar Foo = {\n  template: '<div>foo<router-view></router-view></div>'\n};\nfunction createRouter() {\n  var router = new vue_router__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n    mode: 'history',\n    base: '/demopage',\n    routes: [{\n      path: '/home/test',\n      component: Foo,\n      children: [{\n        path: 'profile',\n        component: single\n      }]\n    }]\n  });\n  return router;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jbGllbnQvcGFnZS9kZW1vL3JvdXRlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC9wYWdlL2RlbW8vcm91dGVyLmpzPzg4NWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IFJvdXRlciBmcm9tICd2dWUtcm91dGVyJztcbi8vIOWmguS9leWumuS5ieWIsOaJk+WMhee7k+aenOeahOWFt+S9k+WFpeWPo+ebruW9leS4re+8nyDkvovlpoIgZGlzdC9kZW1vL2NodW5rcy9zaW5nbGV8MC5qc1xuY29uc3Qgc2luZ2xlID0gKCkgPT4gaW1wb3J0KGAuL3NpbmdsZWApO1xuXG5WdWUudXNlKFJvdXRlcik7XG5cbi8vIFRPRE86IOS4jeaOqOiNkOS9v+eUqOaooeadv++8jOS9k+enr+S8muWkp++8jOWPqumcgOimgeW8leWFpXZ1Zei/kOihjOaXtueahOi+k+WHuuW6k++8jOiAjOS4jeaYr+WMheWQq+e8luivkeaXtueahOWFqOmDqOW6k1xuY29uc3QgRm9vID0ge3RlbXBsYXRlOiAnPGRpdj5mb288cm91dGVyLXZpZXc+PC9yb3V0ZXItdmlldz48L2Rpdj4nfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJvdXRlcigpIHtcbiAgICBjb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKHtcbiAgICAgICAgbW9kZTogJ2hpc3RvcnknLFxuICAgICAgICBiYXNlOiAnL2RlbW9wYWdlJyxcbiAgICAgICAgcm91dGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogJy9ob21lL3Rlc3QnLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogRm9vLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdwcm9maWxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogc2luZ2xlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbiAgICByZXR1cm4gcm91dGVyO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFKQTtBQUpBO0FBZ0JBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./client/page/demo/router.js\n");

/***/ }),

/***/ "./client/page/demo/store.js":
/*!***********************************!*\
  !*** ./client/page/demo/store.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"vue\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvue__WEBPACK_IMPORTED_MODULE_1___default.a.use(vuex__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\nvar createStore = function createStore() {\n  return new vuex__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Store({\n    state: {\n      count: 0\n    },\n    mutations: {\n      increment: function increment(state) {\n        state.count++;\n      }\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createStore);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jbGllbnQvcGFnZS9kZW1vL3N0b3JlLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2UvZGVtby9zdG9yZS5qcz9jYjQ0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWdWV4IGZyb20gJ3Z1ZXgnO1xuaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuXG5WdWUudXNlKFZ1ZXgpO1xuXG5jb25zdCBjcmVhdGVTdG9yZSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFZ1ZXguU3RvcmUoe1xuICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgY291bnQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgbXV0YXRpb25zOiB7XG4gICAgICAgICAgICBpbmNyZW1lbnQoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS5jb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBSkE7QUFVQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./client/page/demo/store.js\n");

/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = Vue;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiVnVlXCI/NWE2OSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFZ1ZTsiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///vue\n");

/***/ })

/******/ });