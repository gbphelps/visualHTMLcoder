!function(t){var e={};function r(a){if(e[a])return e[a].exports;var n=e[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=e,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(a,n,function(e){return t[e]}.bind(null,n));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);const a=t=>`rgb(${t[0]},${t[1]},${t[2]})`,n=(t,e,r,a)=>{const n=document.createElement(t);return Object.assign(n,r),e.append(n),a&&Object.assign(n.style,a),n},i=t=>{let e=255*(t-Math.floor(t));switch(Math.floor(t)){case 0:return[255,e,0];case 1:return[255-e,255,0];case 2:return[0,255,e];case 3:return[0,255-e,255];case 4:return[e,0,255];case 5:return[255,0,255-e];case 6:return[255,0,0]}},c=t=>{const e=document.getElementById("canvas"),r=e.getContext("2d");e.color=t;const a=r.createImageData(e.width,e.height);h(a),r.putImageData(a,0,0)},o=t=>t<0?Math.sqrt(3)*(canvas.width/2+t):Math.sqrt(3)*(canvas.width/2-t),s=t=>-t/Math.sqrt(3)+canvas.width/2,d={};let l=!1;const h=t=>{const{width:e,height:r,color:a}=document.getElementById("canvas");for(let n=0;n<r*e;n++){const i=Math.floor(n/e),c=Math.floor(n%e),o=r-i,s=c+.5,h=o-.5;let p=Math.atan(h/s);const m=(Math.PI/3-p)/(Math.PI/3);let M=Math.sqrt(s*s+h*h)/canvas.width;M=M*Math.cos(Math.PI/6-p)/(Math.sqrt(3)/2),m<0||m>1||M>1||(t.data[4*n+0]=(a[0]+(255-a[0])*m)*M,t.data[4*n+1]=(a[1]+(255-a[1])*m)*M,t.data[4*n+2]=(a[2]+(255-a[2])*m)*M,t.data[4*n+3]=255),l?u(d[n])&&(t.data[4*n+3]=d[n]):g(c-canvas.width/2,o,t,n)}l=!0},g=(t,e,r,a)=>{const n=t,i=t+1,c=e,d=e-1,l={};if((n<=s(c)&&s(c)<=i||n<=-s(c)&&-s(c)<=i)&&(l.top=t>0?s(c)-n:-s(c)-n),(n<=s(d)&&s(d)<=i||n<=-s(d)&&-s(d)<=i)&&(l.bottom=t>0?s(d)-n:-s(d)-n),d<=o(n)&&o(n)<=c&&(l.left=o(n)-d),d<=o(i)&&o(i)<=c&&(l.right=o(i)-d),Object.keys(l).length){p(l,t>0?{x:0,y:0}:{x:1,y:0},r,a,!0)}},u=t=>"number"==typeof t,p=({left:t,right:e,top:r,bottom:a},n,i,c,o)=>{let s;u(t)&&u(e)?s=0===n.y?(t+e)/2:1-(t+e)/2:u(r)&&u(a)?s=0===n.x?(r+a)/2:1-(r+a)/2:u(a)&&u(t)?s=0===n.x&&0===n.y?a*t/2:1-a*t/2:u(a)&&u(e)?s=1===n.x&&0===n.y?(1-a)*e/2:1-(1-a)*e/2:u(r)&&u(t)?s=0===n.x&&1===n.y?r*(1-t)/2:1-r*(1-t)/2:u(r)&&u(e)&&(s=1===n.x&&1===n.y?(1-r)*(1-e)/2:1-(1-r)*(1-e)/2),[t,e,r,a].some(t=>u(t))&&(i.data[4*c+3]=o?255*s:255*(1-s),d[c]=i.data[4*c+3])},m=()=>{const t=dragger2.x,e=canvas.height-dragger2.y;let r=Math.atan(e/t);const n=(Math.PI/3-r)/(Math.PI/3);let i=Math.sqrt(t*t+e*e)/canvas.width;i=i*Math.cos(Math.PI/6-r)/(Math.sqrt(3)/2);let c=Math.round((canvas.color[0]+(255-canvas.color[0])*n)*i)||0,o=Math.round((canvas.color[1]+(255-canvas.color[1])*n)*i)||0,s=Math.round((canvas.color[2]+(255-canvas.color[2])*n)*i)||0;dragger2.color=[c,o,s],pip.style.background=a([c,o,s])},M=()=>{const t=document.getElementById("swatch");t.style.background=a(dragger2.color);const e=dragger2.color.reduce((t,e)=>t+=e)-255;t.style.color=e<382.5?"white":"black",dragger2.color.forEach((t,e)=>{document.getElementById(`color-${e}`).value=t})},y=t=>{let[e,r]=[t.clientX,t.clientY];circlePip.style.height="30px",circlePip.style.width="30px";const a=t=>{t.preventDefault();const n=[t.clientX-e,-(t.clientY-r)],i=circleDragger.y*circleDragger.y+circleDragger.x*circleDragger.x,c=[-circleDragger.y,circleDragger.x],o=(n[0]*c[0]+n[1]*c[1])/i;let s,d;const l=(spectrumContainer.width/2-circleSlider.thickness)/2+spectrumContainer.width/4;Math.abs(c[0])>Math.abs(c[1])?(s=circleDragger.x+c[0]*o,d=circleDragger.y>circleDragger.x?Math.sqrt(l*l-s*s):-Math.sqrt(l*l-s*s)):(d=circleDragger.y+c[1]*o,s=-Math.abs(circleDragger.y)<circleDragger.x?Math.sqrt(l*l-d*d):-Math.sqrt(l*l-d*d)),Math.abs(s)>l&&(s=l,d=0),Math.abs(d)>l&&(d=l,s=0),v({x:s,y:d}),e=t.clientX,r=t.clientY,document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",a),circlePip.style.height="10px",circlePip.style.width="10px"},{once:!0})};document.addEventListener("mousemove",a)},v=({x:t,y:e})=>{const r=t+spectrumContainer.width/2-circleDragger.diameter/2,n=spectrumContainer.width/2-e-circleDragger.diameter/2;let o;const s=3*(o=t<0?Math.atan(e/t)+Math.PI/2:Math.atan(e/t)+1.5*Math.PI)/Math.PI;circleDragger.x=t,circleDragger.y=e,circleDragger.style.left=r+"px",circleDragger.style.top=n+"px",circlePip.style.background=a(i(s)),c(i(s)),m(),M()},x=({triangleDragger:t,progress:e})=>{if(void 0!==e){const t=(spectrumContainer.width/2-circleSlider.thickness)/2+spectrumContainer.width/4,r=Math.cos(e+Math.PI/2)*t,a=Math.sin(e+Math.PI/2)*t;v({x:r,y:a})}void 0!==t&&(dragger2.x=t.x,dragger2.style.left=dragger2.x-dragger2.diameter/2+"px",dragger2.y=t.y,dragger2.style.top=dragger2.y-dragger2.diameter/2+"px"),m(),M()},w=t=>{t.preventDefault();let e=t.clientX,r=t.clientY;pip.style.width="30px",pip.style.height="30px";const a=t=>{const a=t.clientX-e,n=t.clientY-r,i=dragger2.x+a,c=dragger2.y+n;canvas.getBoundingClientRect();let o,s;-canvas.height*(2*i/canvas.width-1)>c?Math.abs(n/a)>Math.sqrt(3)?(s=c,o=canvas.width/2*(1-c/canvas.height)):(o=i,s=-canvas.height*(2*i/canvas.width-1)):canvas.height*(2*i/canvas.width-1)>c?Math.abs(n/a)>Math.sqrt(3)?(s=c,o=canvas.width/2*(c/canvas.height+1)):(o=i,s=canvas.height*(2*i/canvas.width-1)):(o=i,s=c),s>canvas.height?s=canvas.height:s<0&&(s=0),o>canvas.width?o=canvas.width:o<0&&(o=0),c<0&&(s=0,o=canvas.width/2),e=t.clientX,r=t.clientY,x({triangleDragger:{x:o,y:s}})};document.addEventListener("mousemove",a),document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",a),pip.style.width="10px",pip.style.height="10px"},{once:!0})},f=t=>{const e=[];for(let r=0;r<3;r++){const a=document.getElementById(`color-${r}`);let n=+a.value;if(a===t.target&&!(n>=0&&n<=255))return void(a.value=a.last);e.push(n),a.last=n}x((t=>{const e=document.getElementById("canvas");let[r,a,n]=Array.from(t).sort((t,e)=>t-e);const i=r/n,c=255*(a-r)/(n-r);let o=[];n!==r?t.forEach(t=>{switch(t){case n:o.push(255);break;case r:o.push(0);break;default:o.push(c)}}):o=e.color;const s=Math.PI/3-Math.PI/3*i;let d=Math.sqrt(3)*n*e.width/2/255/Math.cos(Math.PI/6-s)/Math.sqrt(1+Math.tan(s)*Math.tan(s)),l=e.height-d*Math.tan(s);return 0===n?(d=0,l=e.height):255===r&&(d=e.width,l=e.height),{triangleDragger:{x:d,y:l},progress:(t=>{let e;return 255===t[0]&&0===t[2]?e=0+t[1]/255:255===t[1]&&0===t[2]?e=2-t[0]/255:255===t[1]&&0===t[0]?e=2+t[2]/255:255===t[2]&&0===t[0]?e=4-t[1]/255:255===t[2]&&0===t[1]?e=4+t[0]/255:255===t[0]&&0===t[1]&&(e=6-t[2]/255),e})(o)*Math.PI/3}})(e))},b=()=>{const t=n("DIV",container,{id:"swatch"},{background:a(canvas.color)}),e=document.createElement("INPUT");e.id="color-0";const r=document.createElement("INPUT");r.id="color-1";const i=document.createElement("INPUT");i.id="color-2",[e,r,i].forEach(t=>{t.setAttribute("size",3),t.addEventListener("input",f),t.addEventListener("focus",t=>t.target.select())}),n("SPAN",t,{innerHTML:"rgb("}),t.append(e),n("SPAN",t,{innerHTML:","}),t.append(r),n("SPAN",t,{innerHTML:","}),t.append(i),n("SPAN",t,{innerHTML:")"})},I=(t,e,r)=>{const a=n("DIV",container,{id:"spectrumContainer",width:t},{background:"black","border-radius":"5px",height:t+"px",width:t+"px",position:"relative"}),i=n("CANVAS",a,{id:"circleSlider",height:t,width:t,thickness:e}),c=n("DIV",a,{id:"circleDragger",diameter:r,x:0,y:t/2},{height:r+"px",width:r+"px","border-radius":"50%",position:"absolute",top:(e-r)/2+"px",left:(t-r)/2+"px","z-index":2});n("DIV",c,{id:"circlePip"},{height:"10px",width:"10px","border-radius":"50%",background:"rgb(255,0,0)",position:"absolute",left:0,right:0,top:0,bottom:0,margin:"auto",transition:"width .3s, height .3s"});c.addEventListener("mousedown",y);const o=i.getContext("2d").createImageData(t,t),s=S(i.width/2),d=S(i.width/2-e);P(o,{outer:s,inner:d})},D=(t,e,r)=>{t.data[4*e+0]=r[0],t.data[4*e+1]=r[1],t.data[4*e+2]=r[2]},P=(t,e)=>{const r=circleSlider.width/2-circleSlider.thickness;for(let a=0;a<circleSlider.width*circleSlider.width;a++){const n=a%circleSlider.width-circleSlider.width/2,c=n+.5;const o=circleSlider.width-Math.floor(a/circleSlider.width)-circleSlider.width/2,s=o-.5;if(0===n&&0===o)continue;let d=0;d=n<0?(Math.atan(o/n)/Math.PI*2+1)/2*3:(Math.atan(o/n)/Math.PI*2+1)/2*3+3;const l=i(d);D(t,a,l);const h=c*c+s*s;h<=circleSlider.width*circleSlider.width/4&&h>=r*r&&(t.data[4*a+3]=255),E(n,o,e.outer,t,a,!0),E(n,o,e.inner,t,a,!1)}circleSlider.getContext("2d").putImageData(t,0,0)},S=t=>{const e={};for(let r=0;r<circleSlider.width+1;r++){let a=r-circleSlider.width/2,n=Math.sqrt(t*t-a*a);e[a]=n}return e},E=(t,e,r,a,n,i)=>{const c=t,o=t+1,s=e-1,d=e,l={};if((c<=r[d]&&r[d]<=o||c<=-r[d]&&-r[d]<=o)&&(l.top=t>0?r[d]-c:-r[d]-c),(c<=r[s]&&r[s]<=o||c<=-r[s]&&-r[s]<=o)&&(l.bottom=t>0?r[s]-c:-r[s]-c),(s<=r[c]&&r[c]<=d||s<=-r[c]&&-r[c]<=d)&&(l.left=e>0?r[c]-s:-r[c]-s),(s<=r[o]&&r[o]<=d||s<=-r[o]&&-r[o]<=d)&&(l.right=e>0?r[o]-s:-r[o]-s),Object.keys(l).length){const r=((t,e)=>{let r={};return r.x=t>=0?0:1,r.y=e>0?0:1,r})(t,e);k(l,r,a,n,i)}},q=t=>"number"==typeof t,k=({left:t,right:e,top:r,bottom:a},n,i,c,o)=>{let s;q(t)&&q(e)?s=0===n.y?(t+e)/2:1-(t+e)/2:q(r)&&q(a)?s=0===n.x?(r+a)/2:1-(r+a)/2:q(a)&&q(t)?s=0===n.x&&0===n.y?a*t/2:1-a*t/2:q(a)&&q(e)?s=1===n.x&&0===n.y?(1-a)*e/2:1-(1-a)*e/2:q(r)&&q(t)?s=0===n.x&&1===n.y?r*(1-t)/2:1-r*(1-t)/2:q(r)&&q(e)&&(s=1===n.x&&1===n.y?(1-r)*(1-e)/2:1-(1-r)*(1-e)/2),[t,e,r,a].some(t=>q(t))&&(i.data[4*c+3]=o?255*s:255*(1-s))};document.addEventListener("DOMContentLoaded",()=>{Math.round(200*Math.sqrt(3)/2);document.body.style.cursor="default";n("DIV",document.body,{id:"container"},{display:"flex"});I(300,20,50),(t=>{const e=Math.round(t*Math.sqrt(3)/2),r=n("DIV",spectrumContainer,{id:"triangleContainer"},{height:Math.round(t*Math.sqrt(3)/2),width:t,position:"absolute",top:circleSlider.height/2-e+t/(2*Math.sqrt(3))+"px",left:(circleSlider.width-t)/2+"px"}),a=n("CANVAS",r,{id:"canvas",height:Math.round(t*Math.sqrt(3)/2),width:t});c([255,0,0,255]),a.getContext("2d")})(200),(t=>{const e=n("DIV",triangleContainer,{id:"dragger2",color:canvas.color,diameter:t,x:canvas.width/2,y:0},{height:t+"px",width:t+"px",borderRadius:"50%",left:(canvas.width-t)/2+"px",top:-t/2+"px"});n("DIV",e,{id:"pip"},{background:"black",height:"10px",width:"10px","border-radius":"50%",position:"absolute",top:0,left:0,bottom:0,right:0,margin:"auto",transition:"height .3s , width .3s"}).addEventListener("mousedown",w)})(50),b(),m(),M()})}]);
//# sourceMappingURL=bundle.js.map