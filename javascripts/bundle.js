!function(t){var e={};function r(a){if(e[a])return e[a].exports;var n=e[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=e,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(a,n,function(e){return t[e]}.bind(null,n));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);const a=t=>`rgb(${t[0]},${t[1]},${t[2]})`,n=(t,e,r,a)=>{const n=document.createElement(t);return Object.assign(n,r),e.append(n),a&&Object.assign(n.style,a),n},c=t=>{const e=t/slider.height*6;let r=255*(e-Math.floor(e));switch(Math.floor(e)){case 0:return[255,r,0];case 1:return[255-r,255,0];case 2:return[0,255,r];case 3:return[0,255-r,255];case 4:return[r,0,255];case 5:return[255,0,255-r];case 6:return[255,0,0]}},o=t=>{const e=document.getElementById("canvas"),r=e.getContext("2d");e.color=t;const a=r.createImageData(e.width,e.height);i(a),r.putImageData(a,0,0),d(e)},i=t=>{const{width:e,height:r,color:a}=document.getElementById("canvas");for(let n=0;n<r*e;n++){const c=Math.floor(n/e),o=Math.floor(n%e),i=r-c;let d=Math.atan(i/o);const s=(Math.PI/3-d)/(Math.PI/3);let l=Math.sqrt(o*o+i*i)/canvas.width;l=l*Math.cos(Math.PI/6-d)/(Math.sqrt(3)/2),s<0||s>1||l>1||(t.data[4*n+0]=(a[0]+(255-a[0])*s)*l,t.data[4*n+1]=(a[1]+(255-a[1])*s)*l,t.data[4*n+2]=(a[2]+(255-a[2])*s)*l,t.data[4*n+3]=255)}},d=t=>{const e=t.getContext("2d"),r=e.createLinearGradient(0,0,t.width/2,0);r.addColorStop(0,"black"),r.addColorStop(1,a(t.color));const n=e.createLinearGradient(t.width/2,0,t.width,0);n.addColorStop(0,a(t.color)),n.addColorStop(1,"white"),e.beginPath(),e.moveTo(1,t.height-.5),e.lineTo(t.width/2+.5,.5),e.strokeStyle=r,e.stroke(),e.closePath(),e.beginPath(),e.moveTo(t.width/2+.5,.5),e.lineTo(t.width,t.height-.5),e.strokeStyle=n,e.stroke(),e.closePath()},s=()=>{const t=dragger2.x,e=canvas.height-dragger2.y;let r=Math.atan(e/t);const n=(Math.PI/3-r)/(Math.PI/3);let c=Math.sqrt(t*t+e*e)/canvas.width;c=c*Math.cos(Math.PI/6-r)/(Math.sqrt(3)/2);let o=Math.round((canvas.color[0]+(255-canvas.color[0])*n)*c)||0,i=Math.round((canvas.color[1]+(255-canvas.color[1])*n)*c)||0,d=Math.round((canvas.color[2]+(255-canvas.color[2])*n)*c)||0;dragger2.color=[o,i,d],dragger2.style.background=a([o,i,d])},l=()=>{const t=document.getElementById("swatch");t.style.background=a(dragger2.color);const e=dragger2.color.reduce((t,e)=>t+=e)-255;t.style.color=e<382.5?"white":"black",dragger2.color.forEach((t,e)=>{document.getElementById(`color-${e}`).value=t})},h=({x:t,y:e,status:r})=>{void 0!==r&&(dragger.status=+r,dragger.style.background=a(c(r)),o(c(r)),dragger.style.top=dragger.status-dragger.diameter/2+"px"),void 0!==t&&(dragger2.x=t,dragger2.style.left=dragger2.x-dragger2.diameter/2+"px"),void 0!==e&&(dragger2.y=e,dragger2.style.top=dragger2.y-dragger2.diameter/2+"px"),s(),l()},u=t=>{t.preventDefault();let e=t.clientX,r=t.clientY;const a=t=>{const a=t.clientX-e,n=t.clientY-r,c=dragger2.x+a,o=dragger2.y+n;canvas.getBoundingClientRect();let i,d;-canvas.height*(2*c/canvas.width-1)>o?Math.abs(n/a)>Math.sqrt(3)?(d=o,i=canvas.width/2*(1-o/canvas.height)):(i=c,d=-canvas.height*(2*c/canvas.width-1)):canvas.height*(2*c/canvas.width-1)>o?Math.abs(n/a)>Math.sqrt(3)?(d=o,i=canvas.width/2*(o/canvas.height+1)):(i=c,d=canvas.height*(2*c/canvas.width-1)):(i=c,d=o),d>canvas.height?d=canvas.height:d<0&&(d=0),i>canvas.width?i=canvas.width:i<0&&(i=0),o<0&&(d=0,i=canvas.width/2),e=t.clientX,r=t.clientY,h({x:i,y:d})};document.addEventListener("mousemove",a),document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",a)},{once:!0})},g=t=>{t.preventDefault();let e=t.clientY;const r=t=>{const r=t.clientY-e,a=dragger.status+r;a>slider.height?status=slider.height:a<0?status=0:(status=a,e=t.clientY),h({status:status})};document.addEventListener("mousemove",r),document.addEventListener("mouseup",t=>{document.removeEventListener("mousemove",r)},{once:!0})},v=t=>{const e=[];for(let r=0;r<3;r++){const a=document.getElementById(`color-${r}`);let n=+a.value;if(a===t.target&&!(n>=0&&n<=255))return void(a.value=a.last);e.push(n),a.last=n}h((t=>{const e=document.getElementById("canvas");let[r,a,n]=Array.from(t).sort((t,e)=>t-e);const c=r/n,o=255*(a-r)/(n-r);let i=[];n!==r?t.forEach(t=>{switch(t){case n:i.push(255);break;case r:i.push(0);break;default:i.push(o)}}):i=e.color;const d=Math.PI/3-Math.PI/3*c;let s=Math.sqrt(3)*n*e.width/2/255/Math.cos(Math.PI/6-d)/Math.sqrt(1+Math.tan(d)*Math.tan(d)),l=e.height-s*Math.tan(d);return 0===n?(s=0,l=e.height):255===r&&(s=e.width,l=e.height),{x:s,y:l,status:(t=>{let e;return 255===t[0]&&0===t[2]?e=0+t[1]/255:255===t[1]&&0===t[2]?e=2-t[0]/255:255===t[1]&&0===t[0]?e=2+t[2]/255:255===t[2]&&0===t[0]?e=4-t[1]/255:255===t[2]&&0===t[1]?e=4+t[0]/255:255===t[0]&&0===t[1]&&(e=6-t[2]/255),e})(i)*e.height/6}})(e))},p=()=>{const t=n("DIV",container,{id:"swatch"},{background:a(canvas.color)}),e=document.createElement("INPUT");e.id="color-0";const r=document.createElement("INPUT");r.id="color-1";const c=document.createElement("INPUT");c.id="color-2",[e,r,c].forEach(t=>{t.setAttribute("size",3),t.addEventListener("input",v),t.addEventListener("focus",t=>t.target.select())}),n("SPAN",t,{innerHTML:"rgb("}),t.append(e),n("SPAN",t,{innerHTML:","}),t.append(r),n("SPAN",t,{innerHTML:","}),t.append(c),n("SPAN",t,{innerHTML:")"})},m=t=>{n("DIV",picker,{id:"dragger2",color:canvas.color,diameter:t,x:canvas.width/2,y:0},{height:t+"px",width:t+"px",borderRadius:"50%",left:(canvas.width-t)/2+"px",top:-t/2+"px"}).addEventListener("mousedown",u)},M=t=>{const e=n("CANVAS",picker,{id:"canvas",height:Math.round(t*Math.sqrt(3)/2),width:t});o([255,0,0,255]);e.getContext("2d")},w=(t,e)=>{n("DIV",container,{id:"slider",height:e,width:t},{position:"relative",width:t+"px",height:e+"px"})},f=t=>{let[e,r]=[t.clientX,t.clientY];const a=t=>{t.preventDefault();const n=[t.clientX-e,-(t.clientY-r)],c=circleDragger.y*circleDragger.y+circleDragger.x*circleDragger.x,o=[-circleDragger.y,circleDragger.x],i=(n[0]*o[0]+n[1]*o[1])/c;let d,s;const l=(spectrumContainer.width/2-circleSlider.thickness)/2+spectrumContainer.width/4;Math.abs(o[0])>Math.abs(o[1])?(d=circleDragger.x+o[0]*i,s=circleDragger.y>circleDragger.x?Math.sqrt(l*l-d*d):-Math.sqrt(l*l-d*d)):(s=circleDragger.y+o[1]*i,d=-Math.abs(circleDragger.y)<circleDragger.x?Math.sqrt(l*l-s*s):-Math.sqrt(l*l-s*s)),y({x:d,y:s}),e=t.clientX,r=t.clientY,document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",a)},{once:!0})};document.addEventListener("mousemove",a)},y=({x:t,y:e})=>{const r=t+spectrumContainer.width/2-circleDragger.diameter/2,a=spectrumContainer.width/2-e-circleDragger.diameter/2;circleDragger.x=t,circleDragger.y=e,circleDragger.style.left=r+"px",circleDragger.style.top=a+"px"},x=(t,e,r)=>{t.data[4*e+0]=r[0],t.data[4*e+1]=r[1],t.data[4*e+2]=r[2],t.data[4*e+3]=255},b=(t,e,r)=>{for(let a=0;a<circleSlider.width*circleSlider.width;a++){const n=a%circleSlider.width-circleSlider.width/2;const c=circleSlider.width-Math.floor(a/circleSlider.width)-circleSlider.width/2;let o=0;o=n<0?(Math.atan(c/n)/Math.PI*2+1)/2*3:(Math.atan(c/n)/Math.PI*2+1)/2*3+3;const i=D(o),d=n*n+c*c;d<circleSlider.width*circleSlider.width/4&&d>e*e&&x(t,a,i);const s=Math.abs(n),l=Math.abs(c);s<r.outer[l]&&r.outer[l]<s+1?x(t,a,[0,0,0]):s<r.outer[l+1]&&r.outer[l+1]<s+1?x(t,a,[0,0,0]):l<r.outer[s]&&r.outer[s]<l+1?x(t,a,[0,0,0]):l<r.outer[s+1]&&r.outer[s+1]<l+1&&x(t,a,[0,0,0])}circleSlider.getContext("2d").putImageData(t,0,0)},D=t=>{let e=255*(t-Math.floor(t));switch(Math.floor(t)){case 0:return[255,e,0];case 1:return[255-e,255,0];case 2:return[0,255,e];case 3:return[0,255-e,255];case 4:return[e,0,255];case 5:return[255,0,255-e];case 6:return[255,0,0]}},I=(t,e)=>{const r=[],a=[];for(let n=0;n<=circleSlider.width/2;n++){circleSlider.width;r[n]=Math.sqrt(t*t-n*n),a[n]=Math.sqrt(e*e-n*n)}return{outer:r,inner:a}};document.addEventListener("DOMContentLoaded",()=>{const t=Math.round(200*Math.sqrt(3)/2);document.body.style.cursor="default";const e=n("DIV",document.body,{id:"container"},{display:"flex"});n("DIV",e,{id:"picker"});M(200),w(10,t),m(30),(t=>{n("DIV",slider,{id:"dragger",status:0,diameter:t},{height:t+"px",width:t+"px","border-radius":"50%",top:-t/2+"px",left:-(t-slider.width)/2+"px",position:"absolute",background:a(canvas.color)}).addEventListener("mousedown",g)})(20),p(),((t,e,r)=>{const a=n("DIV",document.body,{id:"spectrumContainer",width:t},{height:t+"px",width:t+"px",position:"relative"}),c=n("CANVAS",a,{id:"circleSlider",height:t,width:t,thickness:e});n("DIV",a,{id:"circleDragger",diameter:r,x:0,y:t/2},{height:r+"px",width:r+"px","border-radius":"50%",background:"white",position:"absolute",top:(e-r)/2+"px",left:(t-r)/2+"px"}).addEventListener("mousedown",f);const o=c.getContext("2d").createImageData(t,t),i=I(t/2,t/2-e);b(o,t/2-e,i)})(300,20,15),s(),l()})}]);
//# sourceMappingURL=bundle.js.map