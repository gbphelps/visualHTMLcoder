!function(t){var e={};function r(a){if(e[a])return e[a].exports;var n=e[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=e,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(a,n,function(e){return t[e]}.bind(null,n));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);const a=t=>`rgb(${t[0]},${t[1]},${t[2]})`,n=(t,e,r,a)=>{const n=document.createElement(t);return Object.assign(n,r),e.append(n),a&&Object.assign(n.style,a),n},c=t=>{let e=255*(t-Math.floor(t));switch(Math.floor(t)){case 0:return[255,e,0];case 1:return[255-e,255,0];case 2:return[0,255,e];case 3:return[0,255-e,255];case 4:return[e,0,255];case 5:return[255,0,255-e];case 6:return[255,0,0]}},i=t=>{const e=document.getElementById("canvas"),r=e.getContext("2d");e.color=t;const a=r.createImageData(e.width,e.height);o(a),r.putImageData(a,0,0),d(e)},o=t=>{const{width:e,height:r,color:a}=document.getElementById("canvas");for(let n=0;n<r*e;n++){const c=Math.floor(n/e),i=Math.floor(n%e),o=r-c;let d=Math.atan(o/i);const s=(Math.PI/3-d)/(Math.PI/3);let l=Math.sqrt(i*i+o*o)/canvas.width;l=l*Math.cos(Math.PI/6-d)/(Math.sqrt(3)/2),s<0||s>1||l>1||(t.data[4*n+0]=(a[0]+(255-a[0])*s)*l,t.data[4*n+1]=(a[1]+(255-a[1])*s)*l,t.data[4*n+2]=(a[2]+(255-a[2])*s)*l,t.data[4*n+3]=255)}},d=t=>{const e=t.getContext("2d"),r=e.createLinearGradient(0,0,t.width/2,0);r.addColorStop(0,"black"),r.addColorStop(1,a(t.color));const n=e.createLinearGradient(t.width/2,0,t.width,0);n.addColorStop(0,a(t.color)),n.addColorStop(1,"white"),e.beginPath(),e.moveTo(1,t.height-.5),e.lineTo(t.width/2+.5,.5),e.strokeStyle=r,e.stroke(),e.closePath(),e.beginPath(),e.moveTo(t.width/2+.5,.5),e.lineTo(t.width,t.height-.5),e.strokeStyle=n,e.stroke(),e.closePath()},s=()=>{const t=dragger2.x,e=canvas.height-dragger2.y;let r=Math.atan(e/t);const n=(Math.PI/3-r)/(Math.PI/3);let c=Math.sqrt(t*t+e*e)/canvas.width;c=c*Math.cos(Math.PI/6-r)/(Math.sqrt(3)/2);let i=Math.round((canvas.color[0]+(255-canvas.color[0])*n)*c)||0,o=Math.round((canvas.color[1]+(255-canvas.color[1])*n)*c)||0,d=Math.round((canvas.color[2]+(255-canvas.color[2])*n)*c)||0;dragger2.color=[i,o,d],pip.style.background=a([i,o,d])},l=()=>{const t=document.getElementById("swatch");t.style.background=a(dragger2.color);const e=dragger2.color.reduce((t,e)=>t+=e)-255;t.style.color=e<382.5?"white":"black",dragger2.color.forEach((t,e)=>{document.getElementById(`color-${e}`).value=t})},h=t=>{let[e,r]=[t.clientX,t.clientY];const a=t=>{t.preventDefault();const n=[t.clientX-e,-(t.clientY-r)],c=circleDragger.y*circleDragger.y+circleDragger.x*circleDragger.x,i=[-circleDragger.y,circleDragger.x],o=(n[0]*i[0]+n[1]*i[1])/c;let d,s;const l=(spectrumContainer.width/2-circleSlider.thickness)/2+spectrumContainer.width/4;Math.abs(i[0])>Math.abs(i[1])?(d=circleDragger.x+i[0]*o,s=circleDragger.y>circleDragger.x?Math.sqrt(l*l-d*d):-Math.sqrt(l*l-d*d)):(s=circleDragger.y+i[1]*o,d=-Math.abs(circleDragger.y)<circleDragger.x?Math.sqrt(l*l-s*s):-Math.sqrt(l*l-s*s)),Math.abs(d)>l&&(d=l,s=0),Math.abs(s)>l&&(s=l,d=0),g({x:d,y:s}),e=t.clientX,r=t.clientY,document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",a)},{once:!0})};document.addEventListener("mousemove",a)},g=({x:t,y:e})=>{const r=t+spectrumContainer.width/2-circleDragger.diameter/2,a=spectrumContainer.width/2-e-circleDragger.diameter/2;let n;n=t<0?(Math.atan(e/t)/Math.PI*2+1)/2*3:(Math.atan(e/t)/Math.PI*2+1)/2*3+3,circleDragger.x=t,circleDragger.y=e,circleDragger.style.left=r+"px",circleDragger.style.top=a+"px",i(c(n)),s(),l()},u=({triangleDragger:t,progress:e})=>{if(void 0!==e){const t=(spectrumContainer.width/2-circleSlider.thickness)/2+spectrumContainer.width/4,r=Math.cos(e+Math.PI/2)*t,a=Math.sin(e+Math.PI/2)*t;g({x:r,y:a})}void 0!==t&&(dragger2.x=t.x,dragger2.style.left=dragger2.x-dragger2.diameter/2+"px",dragger2.y=t.y,dragger2.style.top=dragger2.y-dragger2.diameter/2+"px"),s(),l()},p=t=>{t.preventDefault();let e=t.clientX,r=t.clientY;pip.style.width="30px",pip.style.height="30px";const a=t=>{const a=t.clientX-e,n=t.clientY-r,c=dragger2.x+a,i=dragger2.y+n;canvas.getBoundingClientRect();let o,d;-canvas.height*(2*c/canvas.width-1)>i?Math.abs(n/a)>Math.sqrt(3)?(d=i,o=canvas.width/2*(1-i/canvas.height)):(o=c,d=-canvas.height*(2*c/canvas.width-1)):canvas.height*(2*c/canvas.width-1)>i?Math.abs(n/a)>Math.sqrt(3)?(d=i,o=canvas.width/2*(i/canvas.height+1)):(o=c,d=canvas.height*(2*c/canvas.width-1)):(o=c,d=i),d>canvas.height?d=canvas.height:d<0&&(d=0),o>canvas.width?o=canvas.width:o<0&&(o=0),i<0&&(d=0,o=canvas.width/2),e=t.clientX,r=t.clientY,u({triangleDragger:{x:o,y:d}})};document.addEventListener("mousemove",a),document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",a),pip.style.width="10px",pip.style.height="10px"},{once:!0})},M=t=>{const e=[];for(let r=0;r<3;r++){const a=document.getElementById(`color-${r}`);let n=+a.value;if(a===t.target&&!(n>=0&&n<=255))return void(a.value=a.last);e.push(n),a.last=n}u((t=>{const e=document.getElementById("canvas");let[r,a,n]=Array.from(t).sort((t,e)=>t-e);const c=r/n,i=255*(a-r)/(n-r);let o=[];n!==r?t.forEach(t=>{switch(t){case n:o.push(255);break;case r:o.push(0);break;default:o.push(i)}}):o=e.color;const d=Math.PI/3-Math.PI/3*c;let s=Math.sqrt(3)*n*e.width/2/255/Math.cos(Math.PI/6-d)/Math.sqrt(1+Math.tan(d)*Math.tan(d)),l=e.height-s*Math.tan(d);return 0===n?(s=0,l=e.height):255===r&&(s=e.width,l=e.height),{triangleDragger:{x:s,y:l},progress:(t=>{let e;return 255===t[0]&&0===t[2]?e=0+t[1]/255:255===t[1]&&0===t[2]?e=2-t[0]/255:255===t[1]&&0===t[0]?e=2+t[2]/255:255===t[2]&&0===t[0]?e=4-t[1]/255:255===t[2]&&0===t[1]?e=4+t[0]/255:255===t[0]&&0===t[1]&&(e=6-t[2]/255),e})(o)*Math.PI/3}})(e))},m=()=>{const t=n("DIV",container,{id:"swatch"},{background:a(canvas.color)}),e=document.createElement("INPUT");e.id="color-0";const r=document.createElement("INPUT");r.id="color-1";const c=document.createElement("INPUT");c.id="color-2",[e,r,c].forEach(t=>{t.setAttribute("size",3),t.addEventListener("input",M),t.addEventListener("focus",t=>t.target.select())}),n("SPAN",t,{innerHTML:"rgb("}),t.append(e),n("SPAN",t,{innerHTML:","}),t.append(r),n("SPAN",t,{innerHTML:","}),t.append(c),n("SPAN",t,{innerHTML:")"})},v=(t,e,r)=>{const a=n("DIV",container,{id:"spectrumContainer",width:t},{"border-radius":"5px",height:t+"px",width:t+"px",position:"relative"}),c=n("CANVAS",a,{id:"circleSlider",height:t,width:t,thickness:e});n("DIV",a,{id:"circleDragger",diameter:r,x:0,y:t/2},{height:r+"px",width:r+"px","border-radius":"50%",background:"white",position:"absolute",top:(e-r)/2+"px",left:(t-r)/2+"px"}).addEventListener("mousedown",h);const i=c.getContext("2d").createImageData(t,t),o=b(t/2,t/2-e);w(i,t/2-e,o)},y=(t,e,r)=>{t.data[4*e+0]=r[0],t.data[4*e+1]=r[1],t.data[4*e+2]=r[2]},w=(t,e,r)=>{for(let a=0;a<circleSlider.width*circleSlider.width;a++){const n=a%circleSlider.width-circleSlider.width/2;const i=circleSlider.width-Math.floor(a/circleSlider.width)-circleSlider.width/2;if(0===n&&0===i)continue;let o=0;o=n<0?(Math.atan(i/n)/Math.PI*2+1)/2*3:(Math.atan(i/n)/Math.PI*2+1)/2*3+3;const d=c(o);y(t,a,d);const s=n*n+i*i;s<=circleSlider.width*circleSlider.width/4&&s>=e*e&&(t.data[4*a+3]=255),P(n,i,r,t,a)}circleSlider.getContext("2d").putImageData(t,0,0)},b=(t,e)=>{const r=[],a=[];for(let n=0;n<=circleSlider.width/2;n++){circleSlider.width;r[n]=Math.sqrt(t*t-n*n),a[n]=Math.sqrt(e*e-n*n)}return{outer:r,inner:a}},f=(t,e,r)=>{const a=Math.abs(t),n=Math.abs(e);let c,i,o,d;return a<=r[n]&&r[n]<=a+1&&(o=r[n]-a),a<=r[n+1]&&r[n+1]<=a+1&&(d=r[n+1]-a),n<=r[a]&&r[a]<=n+1&&(c=r[a]-n),n<=r[a+1]&&r[a+1]<=n+1&&(i=r[a+1]-n),{l:c,r:i,t:o,b:d}},x=(t,e)=>t>=e,S=(t,e)=>t<=e,D=(t,e,r,a)=>{let n;return n=r(t*t+e*e,a*a)?{x:0,y:0}:r(t*t+(e+1)*(e+1),a*a)?{x:0,y:1}:r((t+1)*(t+1)+e*e,a*a)?{x:1,y:0}:{x:1,y:1}},I=(t,e,r,a,n,c,i,o,d,s,l)=>{let h;"number"==typeof i&&"number"==typeof c?(h=0===t.x?(i+c)/2:1-(i+c)/2,e.data[4*r+3]=255*h):"number"==typeof a&&"number"==typeof n?(h=0===t.y?(a+n)/2:1-(a+n)/2,e.data[4*r+3]=255*h):"number"==typeof n&&"number"==typeof i?(h=o?1:0,e.data[4*r+3]=255*h):"number"==typeof a&&"number"==typeof c&&(h=o?0:1,e.data[4*r+3]=255*h)},P=(t,e,r,a,n)=>{const c=circleSlider.width/2,i=circleSlider.width/2-circleSlider.thickness;Math.abs(t),Math.abs(e);let o,d,s,l,h;({l:o,r:d,t:s,b:l}=f(t,e,r.outer)),h=D(t,e,S,c),I(h,a,n,o,d,s,l,!0),({l:o,r:d,t:s,b:l}=f(t,e,r.inner)),h=D(t,e,x,i),I(h,a,n,o,d,s,l,!1)};document.addEventListener("DOMContentLoaded",()=>{Math.round(200*Math.sqrt(3)/2);document.body.style.cursor="default";n("DIV",document.body,{id:"container"},{display:"flex"});v(340,20,20),(t=>{const e=Math.round(t*Math.sqrt(3)/2),r=n("DIV",spectrumContainer,{id:"triangleContainer"},{height:Math.round(t*Math.sqrt(3)/2),width:t,position:"absolute",top:circleSlider.height/2-e+t/(2*Math.sqrt(3))+"px",left:(circleSlider.width-t)/2+"px"}),a=n("CANVAS",r,{id:"canvas",height:Math.round(t*Math.sqrt(3)/2),width:t});i([255,0,0,255]),a.getContext("2d")})(200),(t=>{const e=n("DIV",triangleContainer,{id:"dragger2",color:canvas.color,diameter:t,x:canvas.width/2,y:0},{height:t+"px",width:t+"px",borderRadius:"50%",left:(canvas.width-t)/2+"px",top:-t/2+"px"});e.addEventListener("mousedown",p),n("DIV",e,{id:"pip"},{background:"black",height:"10px",width:"10px","border-radius":"50%",position:"absolute",top:0,left:0,bottom:0,right:0,margin:"auto",transition:"height .3s , width .3s"})})(30),m(),s(),l()})}]);
//# sourceMappingURL=bundle.js.map