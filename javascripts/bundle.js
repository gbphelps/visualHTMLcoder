!function(e){var t={};function a(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(r,i,function(t){return e[t]}.bind(null,i));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";a.r(t);const r=e=>`rgb(${e[0]},${e[1]},${e[2]})`,i=(e,t,a,r)=>{const i=document.createElement(e);return Object.assign(i,a),t.append(i),r&&Object.assign(i.style,r),i},n=e=>{let t=255*(e-Math.floor(e));switch(Math.floor(e)){case 0:return[255,t,0];case 1:return[255-t,255,0];case 2:return[0,255,t];case 3:return[0,255-t,255];case 4:return[t,0,255];case 5:return[255,0,255-t];case 6:return[255,0,0]}},d=e=>{const t=document.getElementById("canvas");let[a,r,i]=Array.from(e).sort((e,t)=>e-t);const n=a/i,d=255*(r-a)/(i-a);let s=[];i!==a?e.forEach(e=>{switch(e){case i:s.push(255);break;case a:s.push(0);break;default:s.push(d)}}):s=t.color;const o=Math.PI/3-Math.PI/3*n;let c=Math.sqrt(3)*i*t.innerWidth/2/255/Math.cos(Math.PI/6-o)/Math.sqrt(1+Math.tan(o)*Math.tan(o)),l=t.innerHeight-c*Math.tan(o);return 0===i?(c=0,l=t.innerHeight):255===a&&(c=t.innerWidth,l=t.innerHeight),{triangleDragger:{x:c,y:l},progress:(e=>{let t;return 255===e[0]&&0===e[2]?t=0+e[1]/255:255===e[1]&&0===e[2]?t=2-e[0]/255:255===e[1]&&0===e[0]?t=2+e[2]/255:255===e[2]&&0===e[0]?t=4-e[1]/255:255===e[2]&&0===e[1]?t=4+e[0]/255:255===e[0]&&0===e[1]&&(t=6-e[2]/255),t})(s)*Math.PI/3,colorTrio:{red:e[0]/255*200,green:e[1]/255*200,blue:e[2]/255*200}}},s=e=>{const t=document.getElementById("canvas"),a=t.getContext("2d");a.clearRect(0,0,t.width,t.height),t.color=e;const r=a.createImageData(t.innerWidth,t.innerHeight);h(r),a.putImageData(r,t.padding,t.padding),p(r)},o={};let c=!1,l=!1;const g=e=>{const t=Math.floor(e/canvas.innerWidth),a=Math.floor(e%canvas.innerWidth),r=canvas.innerHeight-t-1,i=a+.5,n=r-.5;let d=Math.atan(n/i);const s=(Math.PI/3-d)/(Math.PI/3);let c=Math.sqrt(i*i+n*n)/canvas.innerWidth;return c=c*Math.cos(Math.PI/6-d)/(Math.sqrt(3)/2),o[e]={x:a,y:r,theta:s,r:c},{x:a,y:r,theta:s,r:c}},h=e=>{const[t,a,r]=canvas.color;for(let i=0;i<canvas.innerHeight*canvas.innerWidth;i++){let n,d,s,c;({x:n,y:d,theta:s,r:c}=l?o[i]:g(i)),e.data[4*i+0]=(t+(255-t)*s)*c,e.data[4*i+1]=(a+(255-a)*s)*c,e.data[4*i+2]=(r+(255-r)*s)*c,e.data[4*i+3]=s<0||s>1||c>1?0:255}c=!0,l=!0},p=()=>{const e=canvas.getContext("2d");e.beginPath(),e.fillStyle=r(canvas.color),e.arc(canvas.width/2,canvas.padding,5,Math.PI,2*Math.PI),e.fill(),e.beginPath(),e.fillStyle="black",e.arc(canvas.padding,canvas.height-canvas.padding,5,Math.PI/3,Math.PI+Math.PI/3),e.fill(),e.beginPath(),e.fillStyle="white",e.arc(canvas.width-canvas.padding,canvas.height-canvas.padding,5,-Math.PI/3,Math.PI-Math.PI/3),e.fill(),e.beginPath();const t=e.createLinearGradient(canvas.padding,0,canvas.padding+canvas.innerWidth,0);t.addColorStop(0,"black"),t.addColorStop(1,"white"),e.fillStyle=t,e.rect(canvas.padding,canvas.height-canvas.padding-1,canvas.innerWidth,6),e.fill(),e.beginPath();const a=e.createLinearGradient(canvas.width/2,canvas.padding,canvas.width-canvas.padding,canvas.height-canvas.padding);a.addColorStop(1,"white"),a.addColorStop(0,r(canvas.color)),e.fillStyle=a,e.moveTo(canvas.width/2,canvas.padding),e.lineTo(canvas.width-canvas.padding,canvas.height-canvas.padding),e.lineTo(canvas.width-canvas.padding+5*Math.cos(Math.PI/6),canvas.height-canvas.padding-5*Math.sin(Math.PI/6)),e.lineTo(canvas.width/2+5*Math.cos(Math.PI/6),canvas.padding-5*Math.sin(Math.PI/6)),e.lineTo(canvas.width/2,canvas.padding),e.fill(),e.beginPath();const i=e.createLinearGradient(canvas.width/2,canvas.padding,canvas.padding,canvas.height-canvas.padding);i.addColorStop(1,"black"),i.addColorStop(0,r(canvas.color)),e.fillStyle=i,e.moveTo(canvas.width/2,canvas.padding),e.lineTo(canvas.padding,canvas.height-canvas.padding),e.lineTo(canvas.padding-5*Math.cos(Math.PI/6),canvas.height-canvas.padding-5*Math.sin(Math.PI/6)),e.lineTo(canvas.width/2-5*Math.cos(Math.PI/6),canvas.padding-5*Math.sin(Math.PI/6)),e.lineTo(canvas.width/2,canvas.padding),e.fill()},u=()=>{const e=document.getElementById("swatch");e.style.background=r(dragger2.color);const[t,a,i]=dragger2.color,n=.2126*t+.7152*a+.0722*i;e.style.color=n<127.5?"white":"black",dragger2.color.forEach((e,t)=>{document.getElementById(`color-${t}`).value=e})},x=e=>{const t={red:redDragger.status,green:greenDragger.status,blue:blueDragger.status};Object.assign(t,e),redDragger.status=t.red,redDragger.style.left=redDragger.status-redDragger.diameter/2+"px",redProgress.style.width=redDragger.status+"px",greenDragger.status=t.green,greenDragger.style.left=greenDragger.status-greenDragger.diameter/2+"px",greenProgress.style.width=greenDragger.status+"px",blueDragger.status=t.blue,blueDragger.style.left=blueDragger.status-blueDragger.diameter/2+"px",blueProgress.style.width=blueDragger.status+"px"},b=e=>{e.preventDefault();let[t,a]=[e.clientX,e.clientY];circlePip.style.height="35px",circlePip.style.width="35px",circlePip.style["box-shadow"]="0 8px 8px 0 rgba(0,0,0,.4)",document.body.classList.add("grabbing");const r=e=>{const r=[e.clientX-t,-(e.clientY-a)],i=circleDragger.y*circleDragger.y+circleDragger.x*circleDragger.x,n=[-circleDragger.y,circleDragger.x],d=(r[0]*n[0]+r[1]*n[1])/i;let s,o;const c=(spectrumContainer.width/2-circleSlider.thickness)/2+spectrumContainer.width/4;Math.abs(n[0])>Math.abs(n[1])?(s=circleDragger.x+n[0]*d,o=circleDragger.y>circleDragger.x?Math.sqrt(c*c-s*s):-Math.sqrt(c*c-s*s)):(o=circleDragger.y+n[1]*d,s=-Math.abs(circleDragger.y)<circleDragger.x?Math.sqrt(c*c-o*o):-Math.sqrt(c*c-o*o)),Math.abs(s)>c&&(s=c,o=0),Math.abs(o)>c&&(o=c,s=0),v({x:s,y:o}),t=e.clientX,a=e.clientY};document.addEventListener("mousemove",r),document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",r),document.body.classList.remove("grabbing"),circlePip.style.height=circlePip.diameter+"px",circlePip.style.width=circlePip.diameter+"px",circlePip.style["box-shadow"]="0 2px 2px 0 rgba(0,0,0,.4)"},{once:!0})},v=({x:e,y:t})=>{const a=e+spectrumContainer.width/2-circleDragger.diameter/2,i=spectrumContainer.width/2-t-circleDragger.diameter/2;let d;const o=3*(d=e<0?Math.atan(t/e)+Math.PI/2:Math.atan(t/e)+1.5*Math.PI)/Math.PI,c=n(o);circleDragger.x=e,circleDragger.y=t,circleDragger.style.left=a+"px",circleDragger.style.top=i+"px",circlePip.style.background=r(c),s(n(o)),y(),x({red:dragger2.color[0]/255*200,green:dragger2.color[1]/255*200,blue:dragger2.color[2]/255*200}),u()},m=({triangleDragger:e,progress:t,colorTrio:a})=>{if(void 0!==t){const e=(spectrumContainer.width/2-circleSlider.thickness)/2+spectrumContainer.width/4,a=Math.cos(t+Math.PI/2)*e,r=Math.sin(t+Math.PI/2)*e;v({x:a,y:r})}if(void 0!==e&&(dragger2.x=e.x,dragger2.style.left=dragger2.x-dragger2.diameter/2+"px",dragger2.y=e.y,dragger2.style.top=dragger2.y-dragger2.diameter/2+"px"),void 0!==a){const e={red:redDragger.status,green:greenDragger.status,blue:blueDragger.status};Object.assign(e,a);const t=[255*e.red/200,255*e.green/200,255*e.blue/200];let r,i;({progress:r,triangleDragger:i}=d(t));const n=(spectrumContainer.width/2-circleSlider.thickness)/2+spectrumContainer.width/4,s=Math.cos(r+Math.PI/2)*n,o=Math.sin(r+Math.PI/2)*n;v({x:s,y:o}),dragger2.x=i.x,dragger2.style.left=dragger2.x-dragger2.diameter/2+"px",dragger2.y=i.y,dragger2.style.top=dragger2.y-dragger2.diameter/2+"px"}y(),u(),x({red:dragger2.color[0]/255*200,green:dragger2.color[1]/255*200,blue:dragger2.color[2]/255*200})},y=()=>{const e=dragger2.x,t=canvas.innerHeight-dragger2.y;let a=Math.atan(t/e);const i=(Math.PI/3-a)/(Math.PI/3);let n=Math.sqrt(e*e+t*t)/canvas.innerWidth;n=n*Math.cos(Math.PI/6-a)/(Math.sqrt(3)/2);let d=Math.round((canvas.color[0]+(255-canvas.color[0])*i)*n)||0,s=Math.round((canvas.color[1]+(255-canvas.color[1])*i)*n)||0,o=Math.round((canvas.color[2]+(255-canvas.color[2])*i)*n)||0;dragger2.color=[d,s,o],pip.style.background=r([d,s,o])},M=e=>{e.preventDefault();let t=e.clientX,a=e.clientY;pip.style.width="35px",pip.style.height="35px",pip.style["box-shadow"]="0 8px 8px 0 rgba(0,0,0,.4)",document.body.classList.add("grabbing");const r=e=>{const r=e.clientX-t,i=e.clientY-a,n=dragger2.x+r,d=dragger2.y+i;let s,o;-canvas.innerHeight*(2*n/canvas.innerWidth-1)>d?Math.abs(i/r)>Math.sqrt(3)?(o=d,s=canvas.innerWidth/2*(1-d/canvas.innerHeight)):(s=n,o=-canvas.innerHeight*(2*n/canvas.innerWidth-1)):canvas.innerHeight*(2*n/canvas.innerWidth-1)>d?Math.abs(i/r)>Math.sqrt(3)?(o=d,s=canvas.innerWidth/2*(d/canvas.innerHeight+1)):(s=n,o=canvas.innerHeight*(2*n/canvas.innerWidth-1)):(s=n,o=d),o>canvas.innerHeight?o=canvas.innerHeight:o<0&&(o=0),s>canvas.innerWidth?s=canvas.innerWidth:s<0&&(s=0),d<0&&(o=0,s=canvas.innerWidth/2),t=e.clientX,a=e.clientY,m({triangleDragger:{x:s,y:o}})};document.addEventListener("mousemove",r),document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",r),document.body.classList.remove("grabbing"),pip.style.width=pip.diameter+"px",pip.style.height=pip.diameter+"px",pip.style["box-shadow"]="0 2px 2px 0 rgba(0,0,0,.4)"},{once:!0})},f=e=>{const t=[];for(let a=0;a<3;a++){const r=document.getElementById(`color-${a}`);let i=+r.value;if(r===e.target&&!(i>=0&&i<=255))return void(r.value=r.last);t.push(i),r.last=i}m(d(t))},w=e=>t=>{t.preventDefault();let a=t.clientX;const r={red:{slider:redSlider,dragger:redDragger,pip:redPip,key:"red"},green:{slider:greenSlider,dragger:greenDragger,pip:greenPip,key:"green"},blue:{slider:blueSlider,dragger:blueDragger,pip:bluePip,key:"blue"}};r[e].pip.style.height="35px",r[e].pip.style.width="35px",r[e].pip.style["box-shadow"]="0 8px 8px 0 rgba(0,0,0,.4)",document.body.classList.add("grabbing");const i=t=>{const i={},n=t.clientX-a,d=r[e].dragger.status+n;d>200?i[r[e].key]=200:d<0?i[r[e].key]=0:(i[r[e].key]=d,a=t.clientX),m({colorTrio:i})};document.addEventListener("mousemove",i),document.addEventListener("mouseup",t=>{document.removeEventListener("mousemove",i),r[e].pip.style.height="20px",r[e].pip.style.width="20px",r[e].pip.style["box-shadow"]="0 2px 2px 0 rgba(0,0,0,.4)",document.body.classList.remove("grabbing")},{once:!0})},D=e=>{const t=i("DIV",rightContainer,{id:"swatch"},{position:"relative",background:r(canvas.color),height:e+"px",width:e+"px",left:"30px",top:"20px","border-radius":"50%","box-shadow":"0 2px 2px 0 rgba(0,0,0,.4)"}),a=document.createElement("INPUT");a.id="color-0",a.last=255;const n=document.createElement("INPUT");n.last=0,n.id="color-1";const d=document.createElement("INPUT");d.last=0,d.id="color-2",[a,n,d].forEach(e=>{e.addEventListener("input",f)});const s=i("DIV",t,{id:"inputContainer"}),o=i("DIV",s);o.classList.add("vertical-center"),i("SPAN",o,{innerHTML:"R"}),o.append(a);const c=i("DIV",s);c.classList.add("vertical-center"),i("SPAN",c,{innerHTML:"G"}),c.append(n);const l=i("DIV",s);l.classList.add("vertical-center"),i("SPAN",l,{innerHTML:"B"}),l.append(d)},I=(e,t,a)=>{const r=i("DIV",container,{id:"spectrumContainerOuter",width:e},{background:"linear-gradient(140deg,#333,black)",padding:"20px","border-radius":"50%",height:e+"px",width:e+"px",position:"relative","box-shadow":"0 2px 2px 0 rgba(0,0,0,.4)"}),n=i("DIV",r,{id:"spectrumContainer",width:e},{height:e+"px",width:e+"px",position:"relative"}),d=i("CANVAS",n,{id:"circleSlider",height:e,width:e,thickness:t}),s=i("DIV",n,{id:"circleDragger",diameter:a,x:0,y:e/2},{height:a+"px",width:a+"px","border-radius":"50%",position:"absolute",top:(t-a)/2+"px",left:(e-a)/2+"px","z-index":3});i("DIV",s,{id:"circlePip",diameter:20},{height:"20px",width:"20px","border-radius":"50%",background:"rgb(255,0,0)",position:"absolute",left:0,right:0,top:0,bottom:0,margin:"auto",transition:"width .3s, height .3s, box-shadow .3s"});s.addEventListener("mousedown",b);const o=d.getContext("2d").createImageData(e,e),c=C(d.width/2),l=C(d.width/2-t);S(o,{outer:c,inner:l})},P=(e,t,a)=>{e.data[4*t+0]=a[0],e.data[4*t+1]=a[1],e.data[4*t+2]=a[2]},S=(e,t)=>{const a=circleSlider.width/2-circleSlider.thickness;for(let r=0;r<circleSlider.width*circleSlider.width;r++){const i=r%circleSlider.width-circleSlider.width/2,d=i+.5;const s=circleSlider.width-Math.floor(r/circleSlider.width)-circleSlider.width/2,o=s-.5;if(0===i&&0===s)continue;let c=0;c=i<0?(Math.atan(s/i)/Math.PI*2+1)/2*3:(Math.atan(s/i)/Math.PI*2+1)/2*3+3;const l=n(c);P(e,r,l);const g=d*d+o*o;g<=circleSlider.width*circleSlider.width/4&&g>=a*a&&(e.data[4*r+3]=255),k(i,s,t.outer,e,r,!0),k(i,s,t.inner,e,r,!1)}circleSlider.getContext("2d").putImageData(e,0,0)},C=e=>{const t={};for(let a=0;a<circleSlider.width+1;a++){let r=a-circleSlider.width/2,i=Math.sqrt(e*e-r*r);t[r]=i}return t},k=(e,t,a,r,i,n)=>{const d=e,s=e+1,o=t-1,c=t,l={};if((d<=a[c]&&a[c]<=s||d<=-a[c]&&-a[c]<=s)&&(l.top=e>0?a[c]-d:-a[c]-d),(d<=a[o]&&a[o]<=s||d<=-a[o]&&-a[o]<=s)&&(l.bottom=e>0?a[o]-d:-a[o]-d),(o<=a[d]&&a[d]<=c||o<=-a[d]&&-a[d]<=c)&&(l.left=t>0?a[d]-o:-a[d]-o),(o<=a[s]&&a[s]<=c||o<=-a[s]&&-a[s]<=c)&&(l.right=t>0?a[s]-o:-a[s]-o),Object.keys(l).length){const a=((e,t)=>{let a={};return a.x=e>=0?0:1,a.y=t>0?0:1,a})(e,t);V(l,a,r,i,n)}},L=e=>"number"==typeof e,V=({left:e,right:t,top:a,bottom:r},i,n,d,s)=>{let o;L(e)&&L(t)?o=0===i.y?(e+t)/2:1-(e+t)/2:L(a)&&L(r)?o=0===i.x?(a+r)/2:1-(a+r)/2:L(r)&&L(e)?o=0===i.x&&0===i.y?r*e/2:1-r*e/2:L(r)&&L(t)?o=1===i.x&&0===i.y?(1-r)*t/2:1-(1-r)*t/2:L(a)&&L(e)?o=0===i.x&&1===i.y?a*(1-e)/2:1-a*(1-e)/2:L(a)&&L(t)&&(o=1===i.x&&1===i.y?(1-a)*(1-t)/2:1-(1-a)*(1-t)/2),[e,t,a,r].some(e=>L(e))&&(n.data[4*d+3]=s?255*o:255*(1-o))},E=()=>{const e={height:"10px",width:"200px",margin:"20px 0",position:"relative"},t={height:"50px",width:"50px","border-radius":"50%",left:"-25px",top:"-20px",position:"absolute",cursor:"url(https://ssl.gstatic.com/ui/v1/icons/mail/images/2/openhand.cur), default"},a=e=>({position:"absolute",top:0,bottom:0,left:0,right:0,"border-radius":"50%",margin:"auto",height:"20px",width:"20px",background:e,"z-index":2,transition:"height .3s, width .3s, box-shadow .3s","box-shadow":"0 2px 2px 0 rgba(0,0,0,.4)"}),r={background:"#000",height:"100%",width:"199px",position:"absolute",top:0,left:"1px","border-radius":"5px","box-shadow":"0 2px 2px 0 rgba(0,0,0,.4)"},n=30+spectrumContainer.width/2;let d=[35,65,95].map(e=>Math.sqrt(n*n-(n-e)*(n-e)));d=d.map(e=>e-d[1]-40),console.log(d);const s=i("DIV",rightContainer,{id:"triadContainer"},{padding:" 0 20px"}),o=i("DIV",s,{id:"redSlider",width:200},e);o.style.left=d[2]+"px",i("DIV",o,{},r);const c=i("DIV",o,{id:"redDragger",diameter:50,status:200},t);c.style.left="175px",i("DIV",c,{id:"redPip"},a("red")).addEventListener("mousedown",w("red"));i("DIV",o,{id:"redProgress"},{height:"10px",width:"200px",background:"linear-gradient(to left, #f00, #f55 200px)",position:"absolute",top:0,left:0,"border-radius":"5px"});const l=i("DIV",s,{id:"greenSlider",width:200},e);l.style.left=d[1]+"px",i("DIV",l,{},r);const g=i("DIV",l,{id:"greenDragger",diameter:50,status:0},t);i("DIV",g,{id:"greenPip"},a("lime")).addEventListener("mousedown",w("green"));i("DIV",l,{id:"greenProgress"},{height:"10px",width:0,background:"linear-gradient(to left,#0f0, #7f7 200px)",position:"absolute",top:0,left:0,"border-radius":"5px"});const h=i("DIV",s,{id:"blueSlider",width:200},e);h.style.left=d[0]+"px",i("DIV",h,{},r);const p=i("DIV",h,{id:"blueDragger",diameter:50,status:0},t);i("DIV",p,{id:"bluePip"},a("blue")).addEventListener("mousedown",w("blue"));i("DIV",h,{id:"blueProgress"},{height:"10px",width:0,background:"linear-gradient(to left,#00f, #44f 200px)",position:"absolute",top:0,left:0,"border-radius":"5px"})};document.addEventListener("DOMContentLoaded",()=>{Math.round(150*Math.sqrt(3)/2);document.body.style.cursor="default";const e=i("DIV",document.body,{id:"container"},{display:"flex",height:"290px"});I(250,10,50),(e=>{const t=Math.round(e*Math.sqrt(3)/2),a=i("DIV",spectrumContainer,{id:"triangleContainer"},{height:Math.round(e*Math.sqrt(3)/2),width:e,position:"absolute",top:circleSlider.height/2-t+e/(2*Math.sqrt(3))+"px",left:(circleSlider.width-e)/2+"px"}),r=i("CANVAS",a,{id:"canvas",height:Math.round(e*Math.sqrt(3)/2)+40,width:e+40,innerHeight:Math.round(e*Math.sqrt(3)/2),innerWidth:e,padding:20},{position:"absolute",left:"-20px",top:"-20px"});s([255,0,0,255]),r.getContext("2d")})(150),(e=>{const t=i("DIV",triangleContainer,{id:"dragger2",diameter:e,x:canvas.innerWidth/2,y:0},{height:e+"px",width:e+"px",borderRadius:"50%",left:(canvas.innerWidth-e)/2+"px",top:-e/2+"px"});i("DIV",t,{id:"pip",diameter:20},{display:"flex",background:"black",height:"20px",width:"20px","z-index":2,"border-radius":"50%",position:"absolute",top:0,left:0,bottom:0,right:0,margin:"auto",transition:"height .3s , width .3s, transform .3s, box-shadow .3s"}).addEventListener("mousedown",M)})(50);i("DIV",e,{id:"rightContainer"},{height:"100%",display:"flex","flex-direction":"column","justify-content":"space-between"});D(150),E(),y(),u()})}]);
//# sourceMappingURL=bundle.js.map