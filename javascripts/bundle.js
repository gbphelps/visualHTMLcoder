!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";let o,r;n.r(t);const s=Array.from(document.getElementsByTagName("html"))[0],l=e=>t=>{t.stopPropagation(),t.preventDefault(),o=t.clientX,r=t.clientY,document.addEventListener("mousemove",e),window.mouseup=(()=>{document.removeEventListener("mouseup",mouseup),document.removeEventListener("mousemove",e),s.style.cursor="auto";{const e=document.activeElement;e.style.top=20*Math.round(u(e.style.top)/20)+"px",e.style.left=20*Math.round(u(e.style.left)/20)+"px",e.style.height=20*Math.round(u(e.style.height)/20)+"px",e.style.width=20*Math.round(u(e.style.width)/20)+"px"}}),document.addEventListener("mouseup",mouseup)},u=e=>+e.slice(0,e.length-2),d=e=>t=>{const n=u(e.style.height)+t.clientY-r;e.style.height=n+"px",r=t.clientY,s.style.cursor="ns-resize"},i=e=>t=>{const n=u(e.style.height)-t.clientY+r;e.style.height=n+"px",n>0&&(e.style.top=u(e.style.top)+t.clientY-r+"px"),r=t.clientY,s.style.cursor="ns-resize"},c=e=>t=>{const n=u(e.style.width)+t.clientX-o;e.style.width=n+"px",o=t.clientX,s.style.cursor="ew-resize"},a=e=>t=>{const n=u(e.style.width)-t.clientX+o;e.style.width=n+"px",n>0&&(e.style.left=u(e.style.left)+t.clientX-o+"px"),o=t.clientX,s.style.cursor="ew-resize"},y=["boundary-bottom","boundary-top","boundary-right","boundary-left","boundary-bottom-right","boundary-top-left","boundary-top-right","boundary-bottom-left"],p=[d,i,c,a,e=>t=>{d(e)(t),c(e)(t),s.style.cursor="nwse-resize"},e=>t=>{i(e)(t),a(e)(t),s.style.cursor="nwse-resize"},e=>t=>{i(e)(t),c(e)(t),s.style.cursor="nesw-resize"},e=>t=>{d(e)(t),a(e)(t),s.style.cursor="nesw-resize"}],m=()=>{console.log(document.activeElement);const e=document.createElement("DIV");e.classList.add("draggable"),e.style.top="0px",e.style.left="0px",e.style.height="60px",e.style.width="60px",e.addEventListener("mousedown",l((e=>t=>{e.style.top=u(e.style.top)+t.clientY-r+"px",e.style.left=u(e.style.left)+t.clientX-o+"px",o=t.clientX,r=t.clientY})(e))),e.addEventListener("focus",()=>{const t=document.createElement("DIV");t.id="boundary-box",y.forEach((n,o)=>{const r=document.createElement("DIV");r.classList.add(n),r.addEventListener("mousedown",l(p[o](e))),t.append(r)}),e.append(t)}),e.addEventListener("blur",()=>{document.getElementById("boundary-box").remove()}),document.getElementById("content").append(e),e.tabIndex=-1,e.addEventListener("mousedown",()=>e.focus())};Array.from(document.getElementsByTagName("html"))[0];document.addEventListener("DOMContentLoaded",()=>{document.getElementById("add").addEventListener("mousedown",e=>{e.preventDefault(),m()})})}]);
//# sourceMappingURL=bundle.js.map