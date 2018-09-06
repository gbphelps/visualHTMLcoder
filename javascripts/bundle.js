!function(e){var t={};function a(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";a.r(t);const r=e=>`rgb(${e[0]},${e[1]},${e[2]})`,n=(e,t,a,r)=>{const n=document.createElement(e);return Object.assign(n,a),t.append(n),r&&Object.assign(n.style,r),n},i=e=>{let t=255*(e-Math.floor(e));switch(Math.floor(e)){case 0:return[255,t,0];case 1:return[255-t,255,0];case 2:return[0,255,t];case 3:return[0,255-t,255];case 4:return[t,0,255];case 5:return[255,0,255-t];case 6:return[255,0,0]}},d=e=>{const t=document.getElementById("canvas"),a=t.getContext("2d");a.clearRect(0,0,t.width,t.height),t.color=e;const r=a.createImageData(t.innerWidth,t.innerHeight);g(r),a.putImageData(r,t.padding,t.padding),h(r)},o={};let s=!1,c=!1;const l=e=>{const t=Math.floor(e/canvas.innerWidth),a=Math.floor(e%canvas.innerWidth),r=canvas.innerHeight-t-1,n=a+.5,i=r-.5;let d=Math.atan(i/n);const s=(Math.PI/3-d)/(Math.PI/3);let c=Math.sqrt(n*n+i*i)/canvas.innerWidth;return c=c*Math.cos(Math.PI/6-d)/(Math.sqrt(3)/2),o[e]={x:a,y:r,theta:s,r:c},{x:a,y:r,theta:s,r:c}},g=e=>{const[t,a,r]=canvas.color;for(let n=0;n<canvas.innerHeight*canvas.innerWidth;n++){let i,d,s,g;({x:i,y:d,theta:s,r:g}=c?o[n]:l(n)),e.data[4*n+0]=(t+(255-t)*s)*g,e.data[4*n+1]=(a+(255-a)*s)*g,e.data[4*n+2]=(r+(255-r)*s)*g,e.data[4*n+3]=s<0||s>1||g>1?0:255}s=!0,c=!0},h=()=>{const e=canvas.getContext("2d");e.beginPath(),e.fillStyle=r(canvas.color),e.arc(canvas.width/2,canvas.padding,5,Math.PI,2*Math.PI),e.fill(),e.beginPath(),e.fillStyle="black",e.arc(canvas.padding,canvas.height-canvas.padding,5,Math.PI/3,Math.PI+Math.PI/3),e.fill(),e.beginPath(),e.fillStyle="white",e.arc(canvas.width-canvas.padding,canvas.height-canvas.padding,5,-Math.PI/3,Math.PI-Math.PI/3),e.fill(),e.beginPath();const t=e.createLinearGradient(canvas.padding,0,canvas.padding+canvas.innerWidth,0);t.addColorStop(0,"black"),t.addColorStop(1,"white"),e.fillStyle=t,e.rect(canvas.padding,canvas.height-canvas.padding-1,canvas.innerWidth,6),e.fill(),e.beginPath();const a=e.createLinearGradient(canvas.width/2,canvas.padding,canvas.width-canvas.padding,canvas.height-canvas.padding);a.addColorStop(1,"white"),a.addColorStop(0,r(canvas.color)),e.fillStyle=a,e.moveTo(canvas.width/2,canvas.padding),e.lineTo(canvas.width-canvas.padding,canvas.height-canvas.padding),e.lineTo(canvas.width-canvas.padding+5*Math.cos(Math.PI/6),canvas.height-canvas.padding-5*Math.sin(Math.PI/6)),e.lineTo(canvas.width/2+5*Math.cos(Math.PI/6),canvas.padding-5*Math.sin(Math.PI/6)),e.lineTo(canvas.width/2,canvas.padding),e.fill(),e.beginPath();const n=e.createLinearGradient(canvas.width/2,canvas.padding,canvas.padding,canvas.height-canvas.padding);n.addColorStop(1,"black"),n.addColorStop(0,r(canvas.color)),e.fillStyle=n,e.moveTo(canvas.width/2,canvas.padding),e.lineTo(canvas.padding,canvas.height-canvas.padding),e.lineTo(canvas.padding-5*Math.cos(Math.PI/6),canvas.height-canvas.padding-5*Math.sin(Math.PI/6)),e.lineTo(canvas.width/2-5*Math.cos(Math.PI/6),canvas.padding-5*Math.sin(Math.PI/6)),e.lineTo(canvas.width/2,canvas.padding),e.fill()},p=()=>{const e=document.getElementById("swatch");e.style.background=r(dragger2.color);const[t,a,n]=dragger2.color,i=.2126*t+.7152*a+.0722*n;e.style.color=i<127.5?"white":"black",dragger2.color.forEach((e,t)=>{document.getElementById(`color-${t}`).value=e})},u=e=>{const t={red:redDragger.status,green:greenDragger.status,blue:blueDragger.status};Object.assign(t,e),redDragger.status=t.red,redDragger.style.left=redDragger.status-redDragger.diameter/2+"px",redProgress.style.width=redDragger.status+"px",greenDragger.status=t.green,greenDragger.style.left=greenDragger.status-greenDragger.diameter/2+"px",greenProgress.style.width=greenDragger.status+"px",blueDragger.status=t.blue,blueDragger.style.left=blueDragger.status-blueDragger.diameter/2+"px",blueProgress.style.width=blueDragger.status+"px"},v=e=>{e.preventDefault();let[t,a]=[e.clientX,e.clientY];circlePip.style.height="35px",circlePip.style.width="35px",circlePip.style["box-shadow"]="0 8px 8px 0 rgba(0,0,0,.4)",document.body.classList.add("grabbing");const r=e=>{const r=[e.clientX-t,-(e.clientY-a)],n=circleDragger.y*circleDragger.y+circleDragger.x*circleDragger.x,i=[-circleDragger.y,circleDragger.x],d=(r[0]*i[0]+r[1]*i[1])/n;let o,s;const c=(spectrumContainer.width/2-circleSlider.thickness)/2+spectrumContainer.width/4;Math.abs(i[0])>Math.abs(i[1])?(o=circleDragger.x+i[0]*d,s=circleDragger.y>circleDragger.x?Math.sqrt(c*c-o*o):-Math.sqrt(c*c-o*o)):(s=circleDragger.y+i[1]*d,o=-Math.abs(circleDragger.y)<circleDragger.x?Math.sqrt(c*c-s*s):-Math.sqrt(c*c-s*s)),Math.abs(o)>c&&(o=c,s=0),Math.abs(s)>c&&(s=c,o=0),b({x:o,y:s}),t=e.clientX,a=e.clientY};document.addEventListener("mousemove",r),document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",r),document.body.classList.remove("grabbing"),circlePip.style.height=circlePip.diameter+"px",circlePip.style.width=circlePip.diameter+"px",circlePip.style["box-shadow"]="0 2px 2px 0 rgba(0,0,0,.4)"},{once:!0})},b=({x:e,y:t})=>{const a=e+spectrumContainer.width/2-circleDragger.diameter/2,n=spectrumContainer.width/2-t-circleDragger.diameter/2;let o;const s=3*(o=e<0?Math.atan(t/e)+Math.PI/2:Math.atan(t/e)+1.5*Math.PI)/Math.PI,c=i(s);circleDragger.x=e,circleDragger.y=t,circleDragger.style.left=a+"px",circleDragger.style.top=n+"px",circlePip.style.background=r(c),d(i(s)),m(),u({red:dragger2.color[0]/255*200,green:dragger2.color[1]/255*200,blue:dragger2.color[2]/255*200}),p()},x=({triangleDragger:e,progress:t,colorTrio:a})=>{if(void 0!==t){const e=(spectrumContainer.width/2-circleSlider.thickness)/2+spectrumContainer.width/4,a=Math.cos(t+Math.PI/2)*e,r=Math.sin(t+Math.PI/2)*e;b({x:a,y:r})}void 0!==e&&(dragger2.x=e.x,dragger2.style.left=dragger2.x-dragger2.diameter/2+"px",dragger2.y=e.y,dragger2.style.top=dragger2.y-dragger2.diameter/2+"px"),void 0!==a&&(console.log(a),u(a)),m(),p(),u({red:dragger2.color[0]/255*200,green:dragger2.color[1]/255*200,blue:dragger2.color[2]/255*200})},m=()=>{const e=dragger2.x,t=canvas.innerHeight-dragger2.y;let a=Math.atan(t/e);const n=(Math.PI/3-a)/(Math.PI/3);let i=Math.sqrt(e*e+t*t)/canvas.innerWidth;i=i*Math.cos(Math.PI/6-a)/(Math.sqrt(3)/2);let d=Math.round((canvas.color[0]+(255-canvas.color[0])*n)*i)||0,o=Math.round((canvas.color[1]+(255-canvas.color[1])*n)*i)||0,s=Math.round((canvas.color[2]+(255-canvas.color[2])*n)*i)||0;dragger2.color=[d,o,s],pip.style.background=r([d,o,s])},M=e=>{e.preventDefault();let t=e.clientX,a=e.clientY;pip.style.width="35px",pip.style.height="35px",pip.style["box-shadow"]="0 8px 8px 0 rgba(0,0,0,.4)",document.body.classList.add("grabbing");const r=e=>{const r=e.clientX-t,n=e.clientY-a,i=dragger2.x+r,d=dragger2.y+n;let o,s;-canvas.innerHeight*(2*i/canvas.innerWidth-1)>d?Math.abs(n/r)>Math.sqrt(3)?(s=d,o=canvas.innerWidth/2*(1-d/canvas.innerHeight)):(o=i,s=-canvas.innerHeight*(2*i/canvas.innerWidth-1)):canvas.innerHeight*(2*i/canvas.innerWidth-1)>d?Math.abs(n/r)>Math.sqrt(3)?(s=d,o=canvas.innerWidth/2*(d/canvas.innerHeight+1)):(o=i,s=canvas.innerHeight*(2*i/canvas.innerWidth-1)):(o=i,s=d),s>canvas.innerHeight?s=canvas.innerHeight:s<0&&(s=0),o>canvas.innerWidth?o=canvas.innerWidth:o<0&&(o=0),d<0&&(s=0,o=canvas.innerWidth/2),t=e.clientX,a=e.clientY,x({triangleDragger:{x:o,y:s}})};document.addEventListener("mousemove",r),document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",r),document.body.classList.remove("grabbing"),pip.style.width=pip.diameter+"px",pip.style.height=pip.diameter+"px",pip.style["box-shadow"]="0 2px 2px 0 rgba(0,0,0,.4)"},{once:!0})},y=e=>{const t=[];for(let a=0;a<3;a++){const r=document.getElementById(`color-${a}`);let n=+r.value;if(r===e.target&&!(n>=0&&n<=255))return void(r.value=r.last);t.push(n),r.last=n}x((e=>{const t=document.getElementById("canvas");let[a,r,n]=Array.from(e).sort((e,t)=>e-t);const i=a/n,d=255*(r-a)/(n-a);let o=[];n!==a?e.forEach(e=>{switch(e){case n:o.push(255);break;case a:o.push(0);break;default:o.push(d)}}):o=t.color;const s=Math.PI/3-Math.PI/3*i;let c=Math.sqrt(3)*n*t.innerWidth/2/255/Math.cos(Math.PI/6-s)/Math.sqrt(1+Math.tan(s)*Math.tan(s)),l=t.innerHeight-c*Math.tan(s);return 0===n?(c=0,l=t.innerHeight):255===a&&(c=t.innerWidth,l=t.innerHeight),{triangleDragger:{x:c,y:l},progress:(e=>{let t;return 255===e[0]&&0===e[2]?t=0+e[1]/255:255===e[1]&&0===e[2]?t=2-e[0]/255:255===e[1]&&0===e[0]?t=2+e[2]/255:255===e[2]&&0===e[0]?t=4-e[1]/255:255===e[2]&&0===e[1]?t=4+e[0]/255:255===e[0]&&0===e[1]&&(t=6-e[2]/255),t})(o)*Math.PI/3,colorTrio:{red:e[0]/255*200,green:e[1]/255*200,blue:e[2]/255*200}}})(t))},f=e=>t=>{t.preventDefault();let a=t.clientX;const r={red:{slider:redSlider,dragger:redDragger,pip:redPip,key:"red"},green:{slider:greenSlider,dragger:greenDragger,pip:greenPip,key:"green"},blue:{slider:blueSlider,dragger:blueDragger,pip:bluePip,key:"blue"}};r[e].pip.style.height="35px",r[e].pip.style.width="35px",r[e].pip.style["box-shadow"]="0 8px 8px 0 rgba(0,0,0,.4)";const n=t=>{const n={},i=t.clientX-a,d=r[e].dragger.status+i;d>200?n[r[e].key]=200:d<0?n[r[e].key]=0:(n[r[e].key]=d,a=t.clientX),x({colorTrio:n})};document.addEventListener("mousemove",n),document.addEventListener("mouseup",t=>{document.removeEventListener("mousemove",n),r[e].pip.style.height="20px",r[e].pip.style.width="20px",r[e].pip.style["box-shadow"]="0 2px 2px 0 rgba(0,0,0,.4)"},{once:!0})},w=e=>{const t=n("DIV",container,{id:"swatch"},{position:"relative",background:r(canvas.color),height:e+"px",width:e+"px","border-radius":"50%"}),a=document.createElement("INPUT");a.id="color-0",a.last=255;const i=document.createElement("INPUT");i.last=0,i.id="color-1";const d=document.createElement("INPUT");d.last=0,d.id="color-2",[a,i,d].forEach(e=>{e.addEventListener("input",y),e.addEventListener("focus",e=>e.target.select())});const o=n("DIV",t,{id:"inputContainer"});n("SPAN",o,{innerHTML:"rgb("}),o.append(a),n("SPAN",o,{innerHTML:","}),o.append(i),n("SPAN",o,{innerHTML:","}),o.append(d),n("SPAN",o,{innerHTML:")"});const s={height:"10px",width:"200px",margin:"10px 0",position:"relative"},c={height:"50px",width:"50px","border-radius":"50%",left:"-25px",top:"-20px",position:"absolute"},l=e=>({position:"absolute",top:0,bottom:0,left:0,right:0,"border-radius":"50%",margin:"auto",height:"20px",width:"20px",background:e,"z-index":2,transition:"height .3s, width .3s, box-shadow .3s","box-shadow":"0 2px 2px 0 rgba(0,0,0,.4)"}),g={background:"#000",height:"100%",width:"195px",position:"absolute",top:0,left:"5px","border-radius":"5px"},h=n("DIV",t,{id:"redSlider",width:200},s);n("DIV",h,{},g);const p=n("DIV",h,{id:"redDragger",diameter:50,status:0},c);n("DIV",p,{id:"redPip"},l("red")).addEventListener("mousedown",f("red"));n("DIV",h,{id:"redProgress"},{height:"10px",width:0,background:"linear-gradient(to left, #f00, #f55 200px)",position:"absolute",top:0,left:0,"border-radius":"5px"});const u=n("DIV",t,{id:"greenSlider",width:200},s);n("DIV",u,{},g);const v=n("DIV",u,{id:"greenDragger",diameter:50,status:0},c);n("DIV",v,{id:"greenPip"},l("lime")).addEventListener("mousedown",f("green"));n("DIV",u,{id:"greenProgress"},{height:"10px",width:0,background:"linear-gradient(to left,#0f0, #7f7 200px)",position:"absolute",top:0,left:0,"border-radius":"5px"});const b=n("DIV",t,{id:"blueSlider",width:200},s);n("DIV",b,{},g);const x=n("DIV",b,{id:"blueDragger",diameter:50,status:0},c);n("DIV",x,{id:"bluePip"},l("blue")).addEventListener("mousedown",f("blue"));n("DIV",b,{id:"blueProgress"},{height:"10px",width:0,background:"linear-gradient(to left,#00f, #44f 200px)",position:"absolute",top:0,left:0,"border-radius":"5px"})},D=(e,t,a)=>{const r=n("DIV",container,{id:"spectrumContainerOuter",width:e},{background:"linear-gradient(140deg,#333,black)",padding:"20px","border-radius":"50%",height:e+"px",width:e+"px",position:"relative"}),i=n("DIV",r,{id:"spectrumContainer",width:e},{height:e+"px",width:e+"px",position:"relative"}),d=n("CANVAS",i,{id:"circleSlider",height:e,width:e,thickness:t}),o=n("DIV",i,{id:"circleDragger",diameter:a,x:0,y:e/2},{height:a+"px",width:a+"px","border-radius":"50%",position:"absolute",top:(t-a)/2+"px",left:(e-a)/2+"px","z-index":3});n("DIV",o,{id:"circlePip",diameter:20},{height:"20px",width:"20px","border-radius":"50%",background:"rgb(255,0,0)",position:"absolute",left:0,right:0,top:0,bottom:0,margin:"auto",transition:"width .3s, height .3s, box-shadow .3s"});o.addEventListener("mousedown",v);const s=d.getContext("2d").createImageData(e,e),c=S(d.width/2),l=S(d.width/2-t);I(s,{outer:c,inner:l})},P=(e,t,a)=>{e.data[4*t+0]=a[0],e.data[4*t+1]=a[1],e.data[4*t+2]=a[2]},I=(e,t)=>{const a=circleSlider.width/2-circleSlider.thickness;for(let r=0;r<circleSlider.width*circleSlider.width;r++){const n=r%circleSlider.width-circleSlider.width/2,d=n+.5;const o=circleSlider.width-Math.floor(r/circleSlider.width)-circleSlider.width/2,s=o-.5;if(0===n&&0===o)continue;let c=0;c=n<0?(Math.atan(o/n)/Math.PI*2+1)/2*3:(Math.atan(o/n)/Math.PI*2+1)/2*3+3;const l=i(c);P(e,r,l);const g=d*d+s*s;g<=circleSlider.width*circleSlider.width/4&&g>=a*a&&(e.data[4*r+3]=255),k(n,o,t.outer,e,r,!0),k(n,o,t.inner,e,r,!1)}circleSlider.getContext("2d").putImageData(e,0,0)},S=e=>{const t={};for(let a=0;a<circleSlider.width+1;a++){let r=a-circleSlider.width/2,n=Math.sqrt(e*e-r*r);t[r]=n}return t},k=(e,t,a,r,n,i)=>{const d=e,o=e+1,s=t-1,c=t,l={};if((d<=a[c]&&a[c]<=o||d<=-a[c]&&-a[c]<=o)&&(l.top=e>0?a[c]-d:-a[c]-d),(d<=a[s]&&a[s]<=o||d<=-a[s]&&-a[s]<=o)&&(l.bottom=e>0?a[s]-d:-a[s]-d),(s<=a[d]&&a[d]<=c||s<=-a[d]&&-a[d]<=c)&&(l.left=t>0?a[d]-s:-a[d]-s),(s<=a[o]&&a[o]<=c||s<=-a[o]&&-a[o]<=c)&&(l.right=t>0?a[o]-s:-a[o]-s),Object.keys(l).length){const a=((e,t)=>{let a={};return a.x=e>=0?0:1,a.y=t>0?0:1,a})(e,t);L(l,a,r,n,i)}},E=e=>"number"==typeof e,L=({left:e,right:t,top:a,bottom:r},n,i,d,o)=>{let s;E(e)&&E(t)?s=0===n.y?(e+t)/2:1-(e+t)/2:E(a)&&E(r)?s=0===n.x?(a+r)/2:1-(a+r)/2:E(r)&&E(e)?s=0===n.x&&0===n.y?r*e/2:1-r*e/2:E(r)&&E(t)?s=1===n.x&&0===n.y?(1-r)*t/2:1-(1-r)*t/2:E(a)&&E(e)?s=0===n.x&&1===n.y?a*(1-e)/2:1-a*(1-e)/2:E(a)&&E(t)&&(s=1===n.x&&1===n.y?(1-a)*(1-t)/2:1-(1-a)*(1-t)/2),[e,t,a,r].some(e=>E(e))&&(i.data[4*d+3]=o?255*s:255*(1-s))};document.addEventListener("DOMContentLoaded",()=>{Math.round(150*Math.sqrt(3)/2);document.body.style.cursor="default";n("DIV",document.body,{id:"container"},{display:"flex"});D(250,10,50),(e=>{const t=Math.round(e*Math.sqrt(3)/2),a=n("DIV",spectrumContainer,{id:"triangleContainer"},{height:Math.round(e*Math.sqrt(3)/2),width:e,position:"absolute",top:circleSlider.height/2-t+e/(2*Math.sqrt(3))+"px",left:(circleSlider.width-e)/2+"px"}),r=n("CANVAS",a,{id:"canvas",height:Math.round(e*Math.sqrt(3)/2)+40,width:e+40,innerHeight:Math.round(e*Math.sqrt(3)/2),innerWidth:e,padding:20},{position:"absolute",left:"-20px",top:"-20px"});d([255,0,0,255]),r.getContext("2d")})(150),(e=>{const t=n("DIV",triangleContainer,{id:"dragger2",diameter:e,x:canvas.innerWidth/2,y:0},{height:e+"px",width:e+"px",borderRadius:"50%",left:(canvas.innerWidth-e)/2+"px",top:-e/2+"px"});n("DIV",t,{id:"pip",diameter:20},{display:"flex",background:"black",height:"20px",width:"20px","z-index":2,"border-radius":"50%",position:"absolute",top:0,left:0,bottom:0,right:0,margin:"auto",transition:"height .3s , width .3s, transform .3s, box-shadow .3s"}).addEventListener("mousedown",M)})(50),w(290),m(),p()})}]);
//# sourceMappingURL=bundle.js.map