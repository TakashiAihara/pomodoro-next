/*! For license information please see components-MuteToggle-mutetoggle-stories.1e620b8a.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpomodoro_react_app=self.webpackChunkpomodoro_react_app||[]).push([[507],{"./src/components/MuteToggle/mutetoggle.stories.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MutetoggleOff:function(){return MutetoggleOff},MutetoggleOn:function(){return MutetoggleOn},__namedExportsOrder:function(){return __namedExportsOrder}});var _MutetoggleOn$paramet,_MutetoggleOn$paramet2,_MutetoggleOn$paramet3,_MutetoggleOff$parame,_MutetoggleOff$parame2,_MutetoggleOff$parame3,_home_runner_work_pomodoro_next_pomodoro_next_node_modules_pnpm_babel_runtime_7_22_11_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),meta={title:"Mutetoggle",component:__webpack_require__("./src/components/MuteToggle/mutetoggle.js").Z,parameters:{layout:"centered",backgrounds:{default:"black"}},argTypes:{setVolume:{action:"setVolume"},volume:{control:"number"}}};__webpack_exports__.default=meta;var MutetoggleOn={args:{volume:1}},MutetoggleOff={args:{volume:0}};MutetoggleOn.parameters=(0,_home_runner_work_pomodoro_next_pomodoro_next_node_modules_pnpm_babel_runtime_7_22_11_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((0,_home_runner_work_pomodoro_next_pomodoro_next_node_modules_pnpm_babel_runtime_7_22_11_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},MutetoggleOn.parameters),{},{docs:(0,_home_runner_work_pomodoro_next_pomodoro_next_node_modules_pnpm_babel_runtime_7_22_11_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((0,_home_runner_work_pomodoro_next_pomodoro_next_node_modules_pnpm_babel_runtime_7_22_11_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},null===(_MutetoggleOn$paramet=MutetoggleOn.parameters)||void 0===_MutetoggleOn$paramet?void 0:_MutetoggleOn$paramet.docs),{},{source:(0,_home_runner_work_pomodoro_next_pomodoro_next_node_modules_pnpm_babel_runtime_7_22_11_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({originalSource:"{\n  args: {\n    volume: 1\n  }\n}"},null===(_MutetoggleOn$paramet2=MutetoggleOn.parameters)||void 0===_MutetoggleOn$paramet2||null===(_MutetoggleOn$paramet3=_MutetoggleOn$paramet2.docs)||void 0===_MutetoggleOn$paramet3?void 0:_MutetoggleOn$paramet3.source)})}),MutetoggleOff.parameters=(0,_home_runner_work_pomodoro_next_pomodoro_next_node_modules_pnpm_babel_runtime_7_22_11_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((0,_home_runner_work_pomodoro_next_pomodoro_next_node_modules_pnpm_babel_runtime_7_22_11_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},MutetoggleOff.parameters),{},{docs:(0,_home_runner_work_pomodoro_next_pomodoro_next_node_modules_pnpm_babel_runtime_7_22_11_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((0,_home_runner_work_pomodoro_next_pomodoro_next_node_modules_pnpm_babel_runtime_7_22_11_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},null===(_MutetoggleOff$parame=MutetoggleOff.parameters)||void 0===_MutetoggleOff$parame?void 0:_MutetoggleOff$parame.docs),{},{source:(0,_home_runner_work_pomodoro_next_pomodoro_next_node_modules_pnpm_babel_runtime_7_22_11_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({originalSource:"{\n  args: {\n    volume: 0\n  }\n}"},null===(_MutetoggleOff$parame2=MutetoggleOff.parameters)||void 0===_MutetoggleOff$parame2||null===(_MutetoggleOff$parame3=_MutetoggleOff$parame2.docs)||void 0===_MutetoggleOff$parame3?void 0:_MutetoggleOff$parame3.source)})});var __namedExportsOrder=["MutetoggleOn","MutetoggleOff"]},"./src/components/MuteToggle/mutetoggle.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__("./node_modules/.pnpm/react@17.0.1/node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/react@17.0.1/node_modules/react/jsx-runtime.js"),muteToggle=function muteToggle(_ref){var volume=_ref.volume,setVolume=_ref.setVolume,handleClick=function handleClick(event){setVolume(0===volume?1:0)};return 0===volume?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button",{className:"display__mute",id:"muteButton",title:"mute button",onClick:handleClick,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z",clipRule:"evenodd"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"})]})}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button",{className:"display__mute",id:"muteButton",title:"mute button",onClick:handleClick,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"})})})};muteToggle.__docgenInfo={description:"",methods:[],displayName:"muteToggle"},__webpack_exports__.Z=muteToggle},"./node_modules/.pnpm/react@17.0.1/node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){__webpack_require__("./node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js");var f=__webpack_require__("./node_modules/.pnpm/react@17.0.1/node_modules/react/index.js"),g=60103;if(60107,"function"==typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element"),h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,k){var b,d={},e=null,l=null;for(b in void 0!==k&&(e=""+k),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(l=a.ref),a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q,exports.jsxs=q},"./node_modules/.pnpm/react@17.0.1/node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){module.exports=__webpack_require__("./node_modules/.pnpm/react@17.0.1/node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);