(()=>{"use strict";var e,a,f,t,r,c={},b={};function d(e){var a=b[e];if(void 0!==a)return a.exports;var f=b[e]={id:e,loaded:!1,exports:{}};return c[e].call(f.exports,f,f.exports,d),f.loaded=!0,f.exports}d.m=c,d.c=b,e=[],d.O=(a,f,t,r)=>{if(!f){var c=1/0;for(i=0;i<e.length;i++){f=e[i][0],t=e[i][1],r=e[i][2];for(var b=!0,o=0;o<f.length;o++)(!1&r||c>=r)&&Object.keys(d.O).every((e=>d.O[e](f[o])))?f.splice(o--,1):(b=!1,r<c&&(c=r));if(b){e.splice(i--,1);var n=t();void 0!==n&&(a=n)}}return a}r=r||0;for(var i=e.length;i>0&&e[i-1][2]>r;i--)e[i]=e[i-1];e[i]=[f,t,r]},d.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return d.d(a,{a:a}),a},f=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,d.t=function(e,t){if(1&t&&(e=this(e)),8&t)return e;if("object"==typeof e&&e){if(4&t&&e.__esModule)return e;if(16&t&&"function"==typeof e.then)return e}var r=Object.create(null);d.r(r);var c={};a=a||[null,f({}),f([]),f(f)];for(var b=2&t&&e;"object"==typeof b&&!~a.indexOf(b);b=f(b))Object.getOwnPropertyNames(b).forEach((a=>c[a]=()=>e[a]));return c.default=()=>e,d.d(r,c),r},d.d=(e,a)=>{for(var f in a)d.o(a,f)&&!d.o(e,f)&&Object.defineProperty(e,f,{enumerable:!0,get:a[f]})},d.f={},d.e=e=>Promise.all(Object.keys(d.f).reduce(((a,f)=>(d.f[f](e,a),a)),[])),d.u=e=>"assets/js/"+({435:"1daf4cd5",493:"d7ef680f",867:"33fc5bb8",1207:"f5994c1a",1235:"a7456010",1641:"aba7cf3e",1724:"dff1c289",1903:"acecf23e",1953:"1e4232ab",1972:"73664a40",1974:"5c868d36",2002:"d03ee990",2634:"c4f5d8e4",2711:"9e4087bc",2736:"a7ef3421",2748:"822bd8ab",3098:"533a09ca",3249:"ccc49370",3637:"f4f34a3a",3694:"8717b14a",3976:"0e384e19",4134:"393be207",4212:"621db11d",4325:"f6e6db05",4736:"e44a2883",4813:"60f6b09e",5499:"74902d7a",5525:"0683764d",5557:"d9f32620",5612:"737f5a7e",5742:"aba21aa0",5866:"473c9a0b",6061:"1f391b9e",6969:"14eb3368",7098:"a7bd4aaa",7128:"23ba9020",7194:"6875c492",7472:"814f3328",7643:"a6aa9e1f",8209:"01a85c17",8401:"17896441",8601:"0fb88521",8609:"925b3f96",8737:"7661071f",8863:"f55d3e7a",9048:"a94703ab",9228:"98590dc7",9262:"18c41134",9325:"59362658",9328:"e273c56f",9647:"5e95c892",9858:"36994c47",9977:"f8fe2a35"}[e]||e)+"."+{435:"91257f06",493:"43749643",867:"fdcc920b",1207:"d0397e02",1235:"5f9bbb01",1641:"eb178a91",1724:"1d2df246",1903:"36a415af",1953:"5959b547",1972:"328c5700",1974:"dbf2d40f",2002:"8f08d806",2634:"fc0fa9ad",2711:"b4c318cd",2736:"a4422000",2748:"2259e3fc",3042:"c46c6bc5",3098:"98738c2f",3249:"126bece0",3637:"02950bf2",3694:"70069665",3976:"f83b0077",4134:"0d98e4cd",4212:"5888e1e9",4325:"d8f105a9",4622:"b0619580",4736:"3ef56430",4813:"928985bf",5499:"ec41d2b4",5525:"b997c4fc",5557:"a4305ca4",5612:"3eb6f7da",5742:"ed09cce9",5866:"3621f5f0",6061:"40a83c6c",6969:"b93a9a2d",7098:"9373de31",7128:"928a26db",7194:"97af002c",7472:"19f142a6",7643:"b0abcfbd",8209:"ba7daae7",8401:"48533033",8601:"3d2a4ec9",8609:"e097c6e6",8737:"7e63b32c",8863:"5ed868b3",9048:"be591cd2",9228:"91c19604",9262:"65236c55",9325:"e64a1877",9328:"984e9926",9392:"6bcc3182",9647:"8f639fe6",9858:"337a7516",9977:"63690b81"}[e]+".js",d.miniCssF=e=>{},d.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),d.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),t={},r="docs:",d.l=(e,a,f,c)=>{if(t[e])t[e].push(a);else{var b,o;if(void 0!==f)for(var n=document.getElementsByTagName("script"),i=0;i<n.length;i++){var u=n[i];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==r+f){b=u;break}}b||(o=!0,(b=document.createElement("script")).charset="utf-8",b.timeout=120,d.nc&&b.setAttribute("nonce",d.nc),b.setAttribute("data-webpack",r+f),b.src=e),t[e]=[a];var l=(a,f)=>{b.onerror=b.onload=null,clearTimeout(s);var r=t[e];if(delete t[e],b.parentNode&&b.parentNode.removeChild(b),r&&r.forEach((e=>e(f))),a)return a(f)},s=setTimeout(l.bind(null,void 0,{type:"timeout",target:b}),12e4);b.onerror=l.bind(null,b.onerror),b.onload=l.bind(null,b.onload),o&&document.head.appendChild(b)}},d.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.p="/crypto-price-tracker/",d.gca=function(e){return e={17896441:"8401",59362658:"9325","1daf4cd5":"435",d7ef680f:"493","33fc5bb8":"867",f5994c1a:"1207",a7456010:"1235",aba7cf3e:"1641",dff1c289:"1724",acecf23e:"1903","1e4232ab":"1953","73664a40":"1972","5c868d36":"1974",d03ee990:"2002",c4f5d8e4:"2634","9e4087bc":"2711",a7ef3421:"2736","822bd8ab":"2748","533a09ca":"3098",ccc49370:"3249",f4f34a3a:"3637","8717b14a":"3694","0e384e19":"3976","393be207":"4134","621db11d":"4212",f6e6db05:"4325",e44a2883:"4736","60f6b09e":"4813","74902d7a":"5499","0683764d":"5525",d9f32620:"5557","737f5a7e":"5612",aba21aa0:"5742","473c9a0b":"5866","1f391b9e":"6061","14eb3368":"6969",a7bd4aaa:"7098","23ba9020":"7128","6875c492":"7194","814f3328":"7472",a6aa9e1f:"7643","01a85c17":"8209","0fb88521":"8601","925b3f96":"8609","7661071f":"8737",f55d3e7a:"8863",a94703ab:"9048","98590dc7":"9228","18c41134":"9262",e273c56f:"9328","5e95c892":"9647","36994c47":"9858",f8fe2a35:"9977"}[e]||e,d.p+d.u(e)},(()=>{var e={5354:0,1869:0};d.f.j=(a,f)=>{var t=d.o(e,a)?e[a]:void 0;if(0!==t)if(t)f.push(t[2]);else if(/^(1869|5354)$/.test(a))e[a]=0;else{var r=new Promise(((f,r)=>t=e[a]=[f,r]));f.push(t[2]=r);var c=d.p+d.u(a),b=new Error;d.l(c,(f=>{if(d.o(e,a)&&(0!==(t=e[a])&&(e[a]=void 0),t)){var r=f&&("load"===f.type?"missing":f.type),c=f&&f.target&&f.target.src;b.message="Loading chunk "+a+" failed.\n("+r+": "+c+")",b.name="ChunkLoadError",b.type=r,b.request=c,t[1](b)}}),"chunk-"+a,a)}},d.O.j=a=>0===e[a];var a=(a,f)=>{var t,r,c=f[0],b=f[1],o=f[2],n=0;if(c.some((a=>0!==e[a]))){for(t in b)d.o(b,t)&&(d.m[t]=b[t]);if(o)var i=o(d)}for(a&&a(f);n<c.length;n++)r=c[n],d.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return d.O(i)},f=self.webpackChunkdocs=self.webpackChunkdocs||[];f.forEach(a.bind(null,0)),f.push=a.bind(null,f.push.bind(f))})()})();