!function(t){var e={};function a(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){"use strict";a.r(e);const n=t=>`rgb(${t[0]},${t[1]},${t[2]})`,i=(t,e,a,n)=>{const i=document.createElement(t);return Object.assign(i,a),e.append(i),n&&Object.assign(i.style,n),i},r=t=>{let e=255*(t-Math.floor(t));switch(Math.floor(t)){case 0:return[255,e,0];case 1:return[255-e,255,0];case 2:return[0,255,e];case 3:return[0,255-e,255];case 4:return[e,0,255];case 5:return[255,0,255-e];case 6:return[255,0,0]}},c=t=>{const e=document.getElementById("canvas"),a=e.getContext("2d");a.clearRect(0,0,e.width,e.height),e.color=t;const n=a.createImageData(e.innerWidth,e.innerHeight);u(n),a.putImageData(n,e.padding,e.padding),y(n)},d=t=>t<0?Math.sqrt(3)*(canvas.innerWidth/2+t):Math.sqrt(3)*(canvas.innerWidth/2-t),o=t=>-t/Math.sqrt(3)+canvas.innerWidth/2,s={},l={};let h=!1,g=!1;const p=t=>{const e=Math.floor(t/canvas.innerWidth),a=Math.floor(t%canvas.innerWidth),n=canvas.innerHeight-e,i=a+.5,r=n-.5;let c=Math.atan(r/i);const d=(Math.PI/3-c)/(Math.PI/3);let o=Math.sqrt(i*i+r*r)/canvas.innerWidth;return o=o*Math.cos(Math.PI/6-c)/(Math.sqrt(3)/2),l[t]={x:a,y:n,theta:d,r:o},{x:a,y:n,theta:d,r:o}},u=t=>{const[e,a,n]=canvas.color;for(let i=0;i<canvas.innerHeight*canvas.innerWidth;i++){let r,c,d,o;({x:r,y:c,theta:d,r:o}=g?l[i]:p(i)),t.data[4*i+0]=(e+(255-e)*d)*o,t.data[4*i+1]=(a+(255-a)*d)*o,t.data[4*i+2]=(n+(255-n)*d)*o,t.data[4*i+3]=d<0||d>1||o>1?0:255,h?M(s[i])&&(t.data[4*i+3]=s[i]):v(r-canvas.innerWidth/2,c,t,i)}h=!0,g=!0},v=(t,e,a,n)=>{const i=t,r=t+1,c=e,s=e-1,l={};if((i<=o(c)&&o(c)<=r||i<=-o(c)&&-o(c)<=r)&&(l.top=t>0?o(c)-i:-o(c)-i),(i<=o(s)&&o(s)<=r||i<=-o(s)&&-o(s)<=r)&&(l.bottom=t>0?o(s)-i:-o(s)-i),s<=d(i)&&d(i)<=c&&(l.left=d(i)-s),s<=d(r)&&d(r)<=c&&(l.right=d(r)-s),Object.keys(l).length){m(l,t>=0?{x:0,y:0}:{x:1,y:0},a,n,!0)}},M=t=>"number"==typeof t,m=({left:t,right:e,top:a,bottom:n},i,r,c,d)=>{let o;M(t)&&M(e)?o=0===i.y?(t+e)/2:1-(t+e)/2:M(a)&&M(n)?o=0===i.x?(a+n)/2:1-(a+n)/2:M(n)&&M(t)?o=0===i.x&&0===i.y?n*t/2:1-n*t/2:M(n)&&M(e)?o=1===i.x&&0===i.y?(1-n)*e/2:1-(1-n)*e/2:M(a)&&M(t)?o=0===i.x&&1===i.y?a*(1-t)/2:1-a*(1-t)/2:M(a)&&M(e)&&(o=1===i.x&&1===i.y?(1-a)*(1-e)/2:1-(1-a)*(1-e)/2),[t,e,a,n].some(t=>M(t))&&(r.data[4*c+3]=d?255*o:255*(1-o),s[c]=r.data[4*c+3])},y=()=>{const t=canvas.getContext("2d");t.beginPath(),t.fillStyle=n(canvas.color),t.arc(canvas.width/2,canvas.padding,10,Math.PI,2*Math.PI),t.fill(),t.beginPath(),t.fillStyle="black",t.arc(canvas.padding,canvas.height-canvas.padding,10,Math.PI/3,Math.PI+Math.PI/3),t.fill(),t.beginPath(),t.fillStyle="white",t.arc(canvas.width-canvas.padding,canvas.height-canvas.padding,10,-Math.PI/3,Math.PI-Math.PI/3),t.fill(),t.beginPath();const e=t.createLinearGradient(canvas.padding,0,canvas.padding+canvas.innerWidth,0);e.addColorStop(0,"black"),e.addColorStop(1,"white"),t.fillStyle=e,t.rect(canvas.padding,canvas.height-canvas.padding,canvas.innerWidth,10),t.fill(),t.beginPath();const a=t.createLinearGradient(canvas.width/2,canvas.padding,canvas.width-canvas.padding,canvas.height-canvas.padding);a.addColorStop(1,"white"),a.addColorStop(0,n(canvas.color)),t.fillStyle=a,t.moveTo(canvas.width/2,canvas.padding+2),t.lineTo(canvas.width-canvas.padding-1,canvas.height-canvas.padding),t.lineTo(canvas.width-canvas.padding+10*Math.cos(Math.PI/6),canvas.height-canvas.padding-10*Math.sin(Math.PI/6)),t.lineTo(canvas.width/2+10*Math.cos(Math.PI/6),canvas.padding-10*Math.sin(Math.PI/6)-.8),t.lineTo(canvas.width/2,canvas.padding),t.fill(),t.beginPath();const i=t.createLinearGradient(canvas.width/2,canvas.padding,canvas.padding,canvas.height-canvas.padding);i.addColorStop(1,"black"),i.addColorStop(0,n(canvas.color)),t.fillStyle=i,t.moveTo(canvas.width/2,canvas.padding+2),t.lineTo(canvas.padding+1,canvas.height-canvas.padding),t.lineTo(canvas.padding-10*Math.cos(Math.PI/6),canvas.height-canvas.padding-10*Math.sin(Math.PI/6)),t.lineTo(canvas.width/2-10*Math.cos(Math.PI/6),canvas.padding-10*Math.sin(Math.PI/6)-.8),t.lineTo(canvas.width/2,canvas.padding),t.fill()},b=()=>{const t=dragger2.x,e=canvas.innerHeight-dragger2.y;let a=Math.atan(e/t);const i=(Math.PI/3-a)/(Math.PI/3);let r=Math.sqrt(t*t+e*e)/canvas.innerWidth;r=r*Math.cos(Math.PI/6-a)/(Math.sqrt(3)/2);let c=Math.round((canvas.color[0]+(255-canvas.color[0])*i)*r)||0,d=Math.round((canvas.color[1]+(255-canvas.color[1])*i)*r)||0,o=Math.round((canvas.color[2]+(255-canvas.color[2])*i)*r)||0;dragger2.color=[c,d,o],pip.style.background=n([c,d,o])},x=()=>{const t=document.getElementById("swatch");t.style.background=n(dragger2.color);const[e,a,i]=dragger2.color,r=.2126*e+.7152*a+.0722*i;t.style.color=r<127.5?"white":"black",dragger2.color.forEach((t,e)=>{document.getElementById(`color-${e}`).value=t})},f=t=>{t.preventDefault();let[e,a]=[t.clientX,t.clientY];circlePip.style.height="35px",circlePip.style.width="35px",document.body.classList.add("grabbing");const n=t=>{const n=[t.clientX-e,-(t.clientY-a)],i=circleDragger.y*circleDragger.y+circleDragger.x*circleDragger.x,r=[-circleDragger.y,circleDragger.x],c=(n[0]*r[0]+n[1]*r[1])/i;let d,o;const s=(spectrumContainer.width/2-circleSlider.thickness)/2+spectrumContainer.width/4;Math.abs(r[0])>Math.abs(r[1])?(d=circleDragger.x+r[0]*c,o=circleDragger.y>circleDragger.x?Math.sqrt(s*s-d*d):-Math.sqrt(s*s-d*d)):(o=circleDragger.y+r[1]*c,d=-Math.abs(circleDragger.y)<circleDragger.x?Math.sqrt(s*s-o*o):-Math.sqrt(s*s-o*o)),Math.abs(d)>s&&(d=s,o=0),Math.abs(o)>s&&(o=s,d=0),w({x:d,y:o}),e=t.clientX,a=t.clientY};document.addEventListener("mousemove",n),document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",n),document.body.classList.remove("grabbing"),circlePip.style.height=circlePip.diameter+"px",circlePip.style.width=circlePip.diameter+"px"},{once:!0})},w=({x:t,y:e})=>{const a=t+spectrumContainer.width/2-circleDragger.diameter/2,i=spectrumContainer.width/2-e-circleDragger.diameter/2;let d;const o=3*(d=t<0?Math.atan(e/t)+Math.PI/2:Math.atan(e/t)+1.5*Math.PI)/Math.PI;circleDragger.x=t,circleDragger.y=e,circleDragger.style.left=a+"px",circleDragger.style.top=i+"px",circlePip.style.background=n(r(o)),c(r(o)),b(),x()},P=({triangleDragger:t,progress:e})=>{if(void 0!==e){const t=(spectrumContainer.width/2-circleSlider.thickness)/2+spectrumContainer.width/4,a=Math.cos(e+Math.PI/2)*t,n=Math.sin(e+Math.PI/2)*t;w({x:a,y:n})}void 0!==t&&(dragger2.x=t.x,dragger2.style.left=dragger2.x-dragger2.diameter/2+"px",dragger2.y=t.y,dragger2.style.top=dragger2.y-dragger2.diameter/2+"px"),b(),x()},I=t=>{t.preventDefault();let e=t.clientX,a=t.clientY;pip.style.width="35px",pip.style.height="35px",document.body.classList.add("grabbing");const n=t=>{const n=t.clientX-e,i=t.clientY-a,r=dragger2.x+n,c=dragger2.y+i;let d,o;-canvas.innerHeight*(2*r/canvas.innerWidth-1)>c?Math.abs(i/n)>Math.sqrt(3)?(o=c,d=canvas.innerWidth/2*(1-c/canvas.innerHeight)):(d=r,o=-canvas.innerHeight*(2*r/canvas.innerWidth-1)):canvas.innerHeight*(2*r/canvas.innerWidth-1)>c?Math.abs(i/n)>Math.sqrt(3)?(o=c,d=canvas.innerWidth/2*(c/canvas.innerHeight+1)):(d=r,o=canvas.innerHeight*(2*r/canvas.innerWidth-1)):(d=r,o=c),o>canvas.innerHeight?o=canvas.innerHeight:o<0&&(o=0),d>canvas.innerWidth?d=canvas.innerWidth:d<0&&(d=0),c<0&&(o=0,d=canvas.innerWidth/2),e=t.clientX,a=t.clientY,P({triangleDragger:{x:d,y:o}})};document.addEventListener("mousemove",n),document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",n),document.body.classList.remove("grabbing"),pip.style.width=pip.diameter+"px",pip.style.height=pip.diameter+"px"},{once:!0})},S=t=>{const e=[];for(let a=0;a<3;a++){const n=document.getElementById(`color-${a}`);let i=+n.value;if(n===t.target&&!(i>=0&&i<=255))return void(n.value=n.last);e.push(i),n.last=i}P((t=>{const e=document.getElementById("canvas");let[a,n,i]=Array.from(t).sort((t,e)=>t-e);const r=a/i,c=255*(n-a)/(i-a);let d=[];i!==a?t.forEach(t=>{switch(t){case i:d.push(255);break;case a:d.push(0);break;default:d.push(c)}}):d=e.color;const o=Math.PI/3-Math.PI/3*r;let s=Math.sqrt(3)*i*e.width/2/255/Math.cos(Math.PI/6-o)/Math.sqrt(1+Math.tan(o)*Math.tan(o)),l=e.height-s*Math.tan(o);return 0===i?(s=0,l=e.height):255===a&&(s=e.width,l=e.height),{triangleDragger:{x:s,y:l},progress:(t=>{let e;return 255===t[0]&&0===t[2]?e=0+t[1]/255:255===t[1]&&0===t[2]?e=2-t[0]/255:255===t[1]&&0===t[0]?e=2+t[2]/255:255===t[2]&&0===t[0]?e=4-t[1]/255:255===t[2]&&0===t[1]?e=4+t[0]/255:255===t[0]&&0===t[1]&&(e=6-t[2]/255),e})(d)*Math.PI/3}})(e))},D=()=>{const t=i("DIV",container,{id:"swatch"},{background:n(canvas.color)}),e=document.createElement("INPUT");e.id="color-0",e.last=255;const a=document.createElement("INPUT");a.last=0,a.id="color-1";const r=document.createElement("INPUT");r.last=0,r.id="color-2",[e,a,r].forEach(t=>{t.setAttribute("size",3),t.addEventListener("input",S),t.addEventListener("focus",t=>t.target.select())});const c=i("DIV",t,{id:"inputContainer"});i("SPAN",c,{innerHTML:"rgb("}),c.append(e),i("SPAN",c,{innerHTML:","}),c.append(a),i("SPAN",c,{innerHTML:","}),c.append(r),i("SPAN",c,{innerHTML:")"})},C=(t,e,a)=>{const n=i("DIV",container,{id:"spectrumContainerOuter",width:t},{background:"linear-gradient(140deg,#333,black)",padding:"20px","border-radius":"50%",height:t+"px",width:t+"px",position:"relative",border:"3px solid black"}),r=i("DIV",n,{id:"spectrumContainer",width:t},{height:t+"px",width:t+"px",position:"relative"}),c=i("CANVAS",r,{id:"circleSlider",height:t,width:t,thickness:e}),d=i("DIV",r,{id:"circleDragger",diameter:a,x:0,y:t/2},{height:a+"px",width:a+"px","border-radius":"50%",position:"absolute",top:(e-a)/2+"px",left:(t-a)/2+"px","z-index":3});i("DIV",d,{id:"circlePip",diameter:17},{height:"17px",width:"17px","border-radius":"50%",background:"rgb(255,0,0)",position:"absolute",left:0,right:0,top:0,bottom:0,margin:"auto",transition:"width .3s, height .3s"});d.addEventListener("mousedown",f);const o=c.getContext("2d").createImageData(t,t),s=L(c.width/2),l=L(c.width/2-e);E(o,{outer:s,inner:l})},W=(t,e,a)=>{t.data[4*e+0]=a[0],t.data[4*e+1]=a[1],t.data[4*e+2]=a[2]},E=(t,e)=>{const a=circleSlider.width/2-circleSlider.thickness;for(let n=0;n<circleSlider.width*circleSlider.width;n++){const i=n%circleSlider.width-circleSlider.width/2,c=i+.5;const d=circleSlider.width-Math.floor(n/circleSlider.width)-circleSlider.width/2,o=d-.5;if(0===i&&0===d)continue;let s=0;s=i<0?(Math.atan(d/i)/Math.PI*2+1)/2*3:(Math.atan(d/i)/Math.PI*2+1)/2*3+3;const l=r(s);W(t,n,l);const h=c*c+o*o;h<=circleSlider.width*circleSlider.width/4&&h>=a*a&&(t.data[4*n+3]=255),k(i,d,e.outer,t,n,!0),k(i,d,e.inner,t,n,!1)}circleSlider.getContext("2d").putImageData(t,0,0)},L=t=>{const e={};for(let a=0;a<circleSlider.width+1;a++){let n=a-circleSlider.width/2,i=Math.sqrt(t*t-n*n);e[n]=i}return e},k=(t,e,a,n,i,r)=>{const c=t,d=t+1,o=e-1,s=e,l={};if((c<=a[s]&&a[s]<=d||c<=-a[s]&&-a[s]<=d)&&(l.top=t>0?a[s]-c:-a[s]-c),(c<=a[o]&&a[o]<=d||c<=-a[o]&&-a[o]<=d)&&(l.bottom=t>0?a[o]-c:-a[o]-c),(o<=a[c]&&a[c]<=s||o<=-a[c]&&-a[c]<=s)&&(l.left=e>0?a[c]-o:-a[c]-o),(o<=a[d]&&a[d]<=s||o<=-a[d]&&-a[d]<=s)&&(l.right=e>0?a[d]-o:-a[d]-o),Object.keys(l).length){const a=((t,e)=>{let a={};return a.x=t>=0?0:1,a.y=e>0?0:1,a})(t,e);T(l,a,n,i,r)}},q=t=>"number"==typeof t,T=({left:t,right:e,top:a,bottom:n},i,r,c,d)=>{let o;q(t)&&q(e)?o=0===i.y?(t+e)/2:1-(t+e)/2:q(a)&&q(n)?o=0===i.x?(a+n)/2:1-(a+n)/2:q(n)&&q(t)?o=0===i.x&&0===i.y?n*t/2:1-n*t/2:q(n)&&q(e)?o=1===i.x&&0===i.y?(1-n)*e/2:1-(1-n)*e/2:q(a)&&q(t)?o=0===i.x&&1===i.y?a*(1-t)/2:1-a*(1-t)/2:q(a)&&q(e)&&(o=1===i.x&&1===i.y?(1-a)*(1-e)/2:1-(1-a)*(1-e)/2),[t,e,a,n].some(t=>q(t))&&(r.data[4*c+3]=d?255*o:255*(1-o))};document.addEventListener("DOMContentLoaded",()=>{Math.round(150*Math.sqrt(3)/2);document.body.style.cursor="default";i("DIV",document.body,{id:"container"},{display:"flex"});C(250,10,50),(t=>{const e=Math.round(t*Math.sqrt(3)/2),a=i("DIV",spectrumContainer,{id:"triangleContainer"},{height:Math.round(t*Math.sqrt(3)/2),width:t,position:"absolute",top:circleSlider.height/2-e+t/(2*Math.sqrt(3))+"px",left:(circleSlider.width-t)/2+"px"}),n=i("CANVAS",a,{id:"canvas",height:Math.round(t*Math.sqrt(3)/2)+40,width:t+40,innerHeight:Math.round(t*Math.sqrt(3)/2),innerWidth:t,padding:20},{position:"absolute",left:"-20px",top:"-20px"});c([255,0,0,255]),n.getContext("2d")})(150),(t=>{const e=i("DIV",triangleContainer,{id:"dragger2",diameter:t,x:canvas.innerWidth/2,y:0},{height:t+"px",width:t+"px",borderRadius:"50%",left:(canvas.innerWidth-t)/2+"px",top:-t/2+"px"});i("DIV",e,{id:"pip",diameter:17},{display:"flex",background:"black",height:"17px",width:"17px","z-index":2,"border-radius":"50%",position:"absolute",top:0,left:0,bottom:0,right:0,margin:"auto",transition:"height .3s , width .3s, transform .3s"}).addEventListener("mousedown",I)})(50),D(),b(),x()})}]);
//# sourceMappingURL=bundle.js.map