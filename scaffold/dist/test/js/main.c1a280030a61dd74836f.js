/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/page/test/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/page/test/app.jsx":
/*!**********************************!*\
  !*** ./client/page/test/app.jsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ../hammer-cli/node_modules/happypack/loader.js):\\nSyntaxError: /Users/fengshiyu/git_repo/hammer/scaffold/client/page/test/app.jsx: Unterminated string constant (7:0)\\n\\n\\u001b[0m \\u001b[90m  5 | \\u001b[39m\\u001b[36mimport\\u001b[39m moment from \\u001b[32m'moment'\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m  6 | \\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m  7 | \\u001b[39m\\u001b[32m'\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m\\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m  8 | \\u001b[39m\\u001b[36mexport\\u001b[39m \\u001b[36mdefault\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m  9 | \\u001b[39m    data() {\\u001b[0m\\n\\u001b[0m \\u001b[90m 10 | \\u001b[39m        \\u001b[36mreturn\\u001b[39m {\\u001b[0m\\n    at Object.raise (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:6325:17)\\n    at Object.readString (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:7275:14)\\n    at Object.getTokenFromCode (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:6954:14)\\n    at Object.getTokenFromCode (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:3633:18)\\n    at Object.nextToken (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:6525:12)\\n    at Object.next (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:6465:10)\\n    at Object.eat (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:6470:12)\\n    at Object.isLineTerminator (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:7620:17)\\n    at Object.semicolon (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:7624:15)\\n    at Object.parseImport (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:11172:10)\\n    at Object.parseStatementContent (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:9927:27)\\n    at Object.parseStatement (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:9829:17)\\n    at Object.parseBlockOrModuleBlockBody (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:10405:25)\\n    at Object.parseBlockBody (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:10392:10)\\n    at Object.parseTopLevel (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:9758:10)\\n    at Object.parse (/Users/fengshiyu/git_repo/hammer/hammer-cli/node_modules/@babel/parser/lib/index.js:11270:17)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jbGllbnQvcGFnZS90ZXN0L2FwcC5qc3guanMiLCJzb3VyY2VzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./client/page/test/app.jsx\n");

/***/ }),

/***/ "./client/page/test/index.js":
/*!***********************************!*\
  !*** ./client/page/test/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./client/page/test/app.jsx\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"vue\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _style_main_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @style/main.css */ \"./client/style/main.css\");\n/* harmony import */ var _style_main_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_main_css__WEBPACK_IMPORTED_MODULE_2__);\n\n // import _config from '@config';\n\n\n\nvar createApp = function createApp() {\n  var app = new vue__WEBPACK_IMPORTED_MODULE_1___default.a({\n    render: function render(h) {\n      return h(_app__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n    }\n  });\n  return {\n    app: app\n  };\n};\n\ncreateApp().app.$mount('#app');\n/* harmony default export */ __webpack_exports__[\"default\"] = (createApp);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jbGllbnQvcGFnZS90ZXN0L2luZGV4LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2UvdGVzdC9pbmRleC5qcz82ZDJmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpbmRleCBmcm9tICcuL2FwcCc7XG5pbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5cbi8vIGltcG9ydCBfY29uZmlnIGZyb20gJ0Bjb25maWcnO1xuaW1wb3J0ICdAc3R5bGUvbWFpbi5jc3MnO1xuXG5jb25zdCBjcmVhdGVBcHAgPSAoKSA9PiB7XG4gICAgY29uc3QgYXBwID0gbmV3IFZ1ZSh7XG4gICAgICAgIHJlbmRlcjogaCA9PiBoKGluZGV4KVxuICAgIH0pO1xuICAgIHJldHVybiB7YXBwfTtcbn07XG5cbmNyZWF0ZUFwcCgpLmFwcC4kbW91bnQoJyNhcHAnKTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQXBwO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./client/page/test/index.js\n");

/***/ }),

/***/ "./client/style/main.css":
/*!*******************************!*\
  !*** ./client/style/main.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jbGllbnQvc3R5bGUvbWFpbi5jc3MuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvc3R5bGUvbWFpbi5jc3M/NGFkYiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./client/style/main.css\n");

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