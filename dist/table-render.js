(()=>{"use strict";var t={d:(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{Area:()=>f,Range:()=>s,Viewport:()=>L,default:()=>G,expr2xy:()=>a,stringAt:()=>i,xy2expr:()=>l});var r="ABCDEFGHIJKLMNOPQRSTUVWXYZ";function n(t){return r.charAt(t%r.length)}function i(t){for(var e=[];t>=0;)e.push(n(t)),t=parseInt(t/r.length+"",10)-1;return e.reverse().join("")}function o(t){for(var e=0,r=0;r<t.length;r++)e=26*e+t.charCodeAt(r)-64;return e-1}function a(t){for(var e="",r="",n=0;n<t.length;n+=1)t.charAt(n)>="0"&&t.charAt(n)<="9"?r+=t.charAt(n):e+=t.charAt(n).toUpperCase();return[o(e),parseInt(r,10)-1]}function l(t,e){return"".concat(i(t)).concat(e+1)}function u(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var s=function(){function t(e,r,n,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.startRow=e,this.startCol=r,this.endRow=n,this.endCol=i}var e,r,n;return e=t,n=[{key:"create",value:function(e,r,n,i){if(void 0!==n&&void 0!==i){var o=e,a=r,l=n,u=i;return e>n&&(o=n,l=e),r>i&&(a=i,u=r),new t(o,a,l,u)}return new t(e,r,e,r)}}],(r=[{key:"start",get:function(){return[this.startRow,this.startCol]}},{key:"end",get:function(){return[this.endRow,this.endCol]}},{key:"rows",get:function(){return this.endRow-this.startRow}},{key:"cols",get:function(){return this.endCol-this.startCol}},{key:"containsRow",value:function(t){return this.startRow<=t&&t<=this.endRow}},{key:"containsCol",value:function(t){return this.startCol<=t&&t<=this.endCol}},{key:"contains",value:function(t,e){return this.containsRow(t)&&this.containsCol(e)}},{key:"within",value:function(t){return this.startRow>=t.startRow&&this.startCol>=t.startCol&&this.endRow<=t.endRow&&this.endCol<=t.endCol}},{key:"intersectsRow",value:function(t,e){return this.startRow<=e&&t<=this.endRow}},{key:"intersectsCol",value:function(t,e){return this.startCol<=e&&t<=this.endCol}},{key:"intersects",value:function(t){var e=t.startRow,r=t.startCol,n=t.endRow,i=t.endCol;return this.intersectsCol(r,i)&&this.intersectsRow(e,n)}},{key:"union",value:function(e){return new t(e.startRow<this.startRow?e.startRow:this.startRow,e.startCol<this.startCol?e.startCol:this.startCol,e.endRow>this.endRow?e.endRow:this.endRow,e.endCol>this.endCol?e.endCol:this.endCol)}},{key:"eachRow",value:function(t,e){var r=this.endRow;e&&r>e&&(r=e);for(var n=this.startRow;n<=r;n+=1)t(n);return this}},{key:"eachCol",value:function(t,e){var r=this.endCol;e&&r>e&&(r=e);for(var n=this.startCol;n<=r;n+=1)t(n);return this}},{key:"each",value:function(t){var e=this;return this.eachRow((function(r){e.eachCol((function(e){return t(r,e)}))})),this}},{key:"clone",value:function(){return new t(this.startRow,this.startCol,this.endRow,this.endCol)}}])&&u(e.prototype,r),n&&u(e,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function c(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function h(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var f=function(){function t(e,r,n,i,o){var a=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),h(this,"width",0),h(this,"height",0),h(this,"rowMap",new Map),h(this,"colMap",new Map),h(this,"cellAtCache",null),this.range=e,this.x=r,this.y=n,this.rowHeight=i,this.colWidth=o,e.eachRow((function(t){var e=i(t);e>0&&(a.rowMap.set(t,{y:a.height,height:e}),a.height+=e)})),e.eachCol((function(t){var e=o(t);e>0&&(a.colMap.set(t,{x:a.width,width:e}),a.width+=e)}))}var e,r,n;return e=t,n=[{key:"create",value:function(e,r,n,i,o,a,l,u){return new t(new s(e,r,n,i),o,a,l,u)}}],(r=[{key:"containsx",value:function(t){return t>=this.x&&t<this.x+this.width}},{key:"containsy",value:function(t){return t>=this.y&&t<this.y+this.height}},{key:"contains",value:function(t,e){return this.containsx(t)&&this.containsy(e)}},{key:"eachRow",value:function(t){var e=this;this.range.eachRow((function(r){var n=e.rowMap.get(r)||{y:0,height:0},i=n.y,o=n.height;o>0&&t(r,i,o)}))}},{key:"eachCol",value:function(t){var e=this;this.range.eachCol((function(r){var n=e.colMap.get(r)||{x:0,width:0},i=n.x,o=n.width;o>0&&t(r,i,o)}))}},{key:"each",value:function(t){var e=this;this.eachRow((function(r,n,i){e.eachCol((function(e,o,a){t(r,e,{x:o,y:n,width:a,height:i})}))}))}},{key:"rectRow",value:function(t,e){var r,n=this.rowMap,i=this.range,o=0,a=0;t>=i.startRow&&(o=(null===(r=n.get(t))||void 0===r?void 0:r.y)||0);for(var l=t;l<=e;l+=1){var u=this.rowHeight(l);u>0&&(l<i.startRow&&(o-=u),a+=u)}return{x:0,y:o,width:this.width,height:a}}},{key:"rectCol",value:function(t,e){var r,n=this.colMap,i=this.range,o=0,a=0;t>=i.startCol&&(o=(null===(r=n.get(t))||void 0===r?void 0:r.x)||0);for(var l=t;l<=e;l+=1){var u=this.colWidth(l);u>0&&(l<i.startCol&&(o-=u),a+=u)}return{x:o,y:0,width:a,height:this.height}}},{key:"rect",value:function(t){var e=this.rectRow(t.startRow,t.endRow),r=e.y,n=e.height,i=this.rectCol(t.startCol,t.endCol);return{x:i.x,y:r,width:i.width,height:n}}},{key:"cellAt",value:function(t,e){var r=this.cellAtCache;if(null!=r&&t>r.x&&t<=r.x+r.width&&e>r.y&&e<=r.y+r.height)return r;for(var n=this.range,i={row:n.startRow,col:n.startCol,x:this.x,y:this.y,width:0,height:0};i.y<e;){var o=this.rowHeight(i.row++);i.y+=o,i.height=o}for(i.y-=i.height,i.row--;i.x<t;){var a=this.colWidth(i.col++);i.x+=a,i.width=a}return i.x-=i.width,i.col--,this.cellAtCache=i,i}}])&&c(e.prototype,r),n&&c(e,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function v(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var d=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.target=e;var n=e.getContext("2d");if(!n)throw new Error("getContext(2d) is null");this._ctx=n,this._scale=r,this._target=e}var e,r;return e=t,(r=[{key:"size",value:function(t,e){var r=this._target,n=this._scale;r.style.width="".concat(t,"px"),r.style.height="".concat(e,"px");var i=window.devicePixelRatio;return r.width=Math.floor(t*i),r.height=Math.floor(e*i),this._ctx.scale(i*n,i*n),this}},{key:"attr",value:function(t,e){var r=this;return e?(this._ctx[t]=e,this):"string"==typeof t?this._ctx[t]:(Object.entries(t).forEach((function(t){var e,n,i=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,i,o=[],a=!0,l=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(o.push(n.value),!e||o.length!==e);a=!0);}catch(t){l=!0,i=t}finally{try{a||null==r.return||r.return()}finally{if(l)throw i}}return o}}(e,n)||function(t,e){if(t){if("string"==typeof t)return y(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?y(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=i[0],a=i[1];null!=a&&(r._ctx[o]=a)})),this)}},{key:"measureTextWidth",value:function(t){return this.measureText(t).width}},{key:"line",value:function(t,e,r,n,i){return i&&(this.attr({lineWidth:1,strokeStyle:i.color}),"medium"===i.type?this.attr({lineWidth:2}):"thick"===i.type?this.attr({lineWidth:3}):"dashed"===i.type?this.setLineDash([3,2]):"dotted"===i.type&&this.setLineDash([1,1])),this.moveTo(t,e).lineTo(r,n).stroke(),this}},{key:"clearRect",value:function(t,e,r,n){return this._ctx.clearRect(t,e,r,n),this}},{key:"fillRect",value:function(t,e,r,n){return this._ctx.fillRect(t,e,r,n),this}},{key:"strokeRect",value:function(t,e,r,n){return this._ctx.strokeRect(t,e,r,n),this}},{key:"fillText",value:function(t,e,r,n){return this._ctx.fillText(t,e,r,n),this}},{key:"strokeText",value:function(t,e,r,n){return this._ctx.strokeText(t,e,r,n),this}},{key:"measureText",value:function(t){return this._ctx.measureText(t)}},{key:"getLineDash",value:function(){return this._ctx.getLineDash()}},{key:"setLineDash",value:function(t){return this._ctx.setLineDash(t),this}},{key:"createLinearGradient",value:function(t,e,r,n){return this._ctx.createLinearGradient(t,e,r,n)}},{key:"createRadialGradient",value:function(t,e,r,n,i,o){return this._ctx.createRadialGradient(t,e,r,n,i,o)}},{key:"createPattern",value:function(t,e){return this._ctx.createPattern(t,e)}},{key:"beginPath",value:function(){return this._ctx.beginPath(),this}},{key:"closePath",value:function(){return this._ctx.closePath(),this}},{key:"moveTo",value:function(t,e){return this._ctx.moveTo(t,e),this}},{key:"lineTo",value:function(t,e){return this._ctx.lineTo(t,e),this}},{key:"bezierCurveTo",value:function(t,e,r,n,i,o){return this.bezierCurveTo(t,e,r,n,i,o),this}},{key:"quadraticCurveTo",value:function(t,e,r,n){return this.quadraticCurveTo(t,e,r,n),this}},{key:"arc",value:function(t,e,r,n,i,o){return this._ctx.arc(t,e,r,n,i,o),this}},{key:"arcTo",value:function(t,e,r,n,i){return this._ctx.arcTo(t,e,r,n,i),this}},{key:"ellipse",value:function(t,e,r,n,i,o,a,l){return this._ctx.ellipse(t,e,r,n,i,o,a,l),this}},{key:"rect",value:function(t,e,r,n){return this._ctx.rect(t,e,r,n),this}},{key:"fill",value:function(t){return this._ctx.fill(t),this}},{key:"stroke",value:function(){return this._ctx.stroke(),this}},{key:"clip",value:function(t){return this._ctx.clip(t),this}},{key:"isPointInPath",value:function(t,e,r){return this._ctx.isPointInPath(t,e,r)}},{key:"isPointInStroke",value:function(t,e){return this._ctx.isPointInStroke(t,e)}},{key:"getTransform",value:function(){return this._ctx.getTransform()}},{key:"rotate",value:function(t){return this._ctx.rotate(t),this}},{key:"scale",value:function(t,e){return this._ctx.scale(t,e),this}},{key:"translate",value:function(t,e){return this._ctx.translate(t,e),this}},{key:"setTransform",value:function(t,e,r,n,i,o){return this._ctx.setTransform(t,e,r,n,i,o),this}},{key:"drawImage",value:function(t,e,r){return this._ctx.drawImage(t,e,r),this}},{key:"createImageData",value:function(t,e){return this._ctx.createImageData(t,e)}},{key:"getImageData",value:function(t,e,r,n){return this._ctx.getImageData(t,e,r,n)}},{key:"putImageData",value:function(t,e,r){return this._ctx.putImageData(t,e,r),this}},{key:"save",value:function(){return this._ctx.save(),this}},{key:"restore",value:function(){return this._ctx.restore(),this}}])&&v(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function w(t,e){if(t){if("string"==typeof t)return g(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?g(t,e):void 0}}function g(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function p(t,e,r,n){if(t&&e){var i="";return r&&(i+="italic "),n&&(i+="bold "),"".concat(i," ").concat(e,"pt ").concat(t)}}function b(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,i,o=[],a=!0,l=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(o.push(n.value),!e||o.length!==e);a=!0);}catch(t){l=!0,i=t}finally{try{a||null==r.return||r.return()}finally{if(l)throw i}}return o}}(t,e)||function(t,e){if(t){if("string"==typeof t)return _(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function m(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function k(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?m(Object(r),!0).forEach((function(e){x(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function x(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function C(t,e,r){var n=e.width,i=e.color;n>0&&(t.save().beginPath().attr({lineWidth:n,strokeStyle:i}),r(),t.restore())}function S(t,e,r,n,i){var o="",a=n;e&&("string"==typeof e||"number"==typeof e?o="".concat(e):(o=(e.value||"")+"",e.style&&(a=k(k({},n),i[e.style])))),function(t,e,r,n){var i=n.border,o=n.fontSize,a=n.fontName,l=n.bold,u=n.italic,s=n.color,c=n.bgcolor,h=n.align,f=n.valign,y=n.underline,v=n.strikethrough,d=n.rotate,b=n.textwrap,_=n.padding;if(t.save().beginPath().translate(r.x,r.y),i){var m=i.top,k=i.right,x=i.bottom,C=i.left;t.save(),m&&t.line(0,0,r.width,0,{type:m[0],color:m[1]}),k&&t.line(r.width,0,r.width,r.height,{type:k[0],color:k[1]}),x&&t.line(0,r.height,r.width,r.height,{type:x[0],color:x[1]}),C&&t.line(0,0,0,r.height,{type:C[0],color:C[1]}),t.restore()}t.attr("fillStyle",c).rect(.5,.5,r.width-1,r.height-1).clip().fill(),t.save().beginPath().attr({textAlign:h,textBaseline:f,font:p(a,o,u,l),fillStyle:s}),d&&d>0&&t.rotate(d*(Math.PI/180));var S,O,R=(O=2,function(t){if(Array.isArray(t))return t}(S=_||[5,5])||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,i,o=[],a=!0,l=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(o.push(n.value),!e||o.length!==e);a=!0);}catch(t){l=!0,i=t}finally{try{a||null==r.return||r.return()}finally{if(l)throw i}}return o}}(S,O)||w(S,O)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),j=R[0],A=R[1],P=function(t,e,r){switch(t){case"left":return r;case"center":return e/2;case"right":return e-r;default:return 0}}(h,r.width,j),T=e.split("\n"),I=r.width-2*j,H=[];T.forEach((function(e){var r=t.measureTextWidth(e);if(b&&r>I){for(var n={w:0,len:0,start:0},i=0;i<e.length;i+=1)n.w>I&&(H.push(e.substr(n.start,n.len)),n={w:0,len:0,start:i}),n.len+=1,n.w+=t.measureTextWidth(e[i])+1;n.len>0&&H.push(e.substr(n.start,n.len))}else H.push(e)}));var E=1.425*o,D=(H.length-1)*E,M=[];y&&M.push("underline"),v&&M.push("strikethrough");var L=function(t,e,r,n){switch(t){case"top":return n;case"middle":return e/2-r/2;case"bottom":return e-n-r;default:return 0}}(f,r.height,D,A);H.forEach((function(e){var r=t.measureTextWidth(e);t.fillText(e,P,L),M.forEach((function(e){t.line.apply(t,function(t){return function(t){if(Array.isArray(t))return g(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||w(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(function(t,e,r,n,i,o,a){var l=0;"underline"===t?"top"===r?l=-a:"middle"===r&&(l=-a/2):"strikethrough"===t&&("top"===r?l=-a/2:"bottom"===r&&(l=a/2));var u=0;return"center"===e?u=o/2:"right"===e&&(u=o),[n-u,i-l,n-u+o,i-l]}(e,h,f,P,L,r,o)))})),L+=E})),t.restore(),t.restore()}(t,o,r,a)}function O(t,e,r,n,i,o,l,u,c){if(e){t.save().translate(e.x,e.y),function(t,e,r){C(t,r,(function(){e.eachRow((function(r,n,i){t.line(0,n+i,e.width,n+i)})),e.eachCol((function(r,n,i){t.line(n+i,0,n+i,e.height)}))}))}(t,e,i),t.rect(0,0,e.width,e.height).clip();var h,f,y=function(t,e){var r=k({},n);if(u){var i=u(t);i&&i.style&&Object.assign(r,o[i.style])}if(c){var a=c(e);a&&a.style&&Object.assign(r,o[a.style])}return r};e.each((function(e,n,i){S(t,r(e,n),i,y(e,n),o)})),l&&(f=function(n){n.intersects(e.range)&&S(t,r(n.startRow,n.startCol),e.rect(n),y(n.startRow,n.startCol),o)},(h=l)&&h.length>0&&h.forEach((function(t){f(function(t){var e=t.split(":"),r=a(e[0]),n=a(e[1]);return new s(r[1],r[0],n[1],n[0])}(t))}))),t.restore()}}function R(t,e,r){O(t,e,r._cell,r._cellStyle,r._lineStyle,r._styles,r._merges,r._row,r._col)}function j(t,e,r){var n=r._rowHeader,i=n.cell,o=n.width,a=n.merges;n.cols,o>0&&O(t,e,i,r._headerCellStyle,r._headerLineStyle,r._styles,a)}function A(t,e,r){var n=r._colHeader,i=n.cell,o=n.height,a=n.merges;n.rows,o>0&&O(t,e,i,r._headerCellStyle,r._headerLineStyle,r._styles,a)}function P(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function T(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?P(Object(r),!0).forEach((function(e){I(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):P(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function I(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function H(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,i,o=[],a=!0,l=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(o.push(n.value),!e||o.length!==e);a=!0);}catch(t){l=!0,i=t}finally{try{a||null==r.return||r.return()}finally{if(l)throw i}}return o}}(t,e)||E(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(t,e){if(t){if("string"==typeof t)return D(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?D(t,e):void 0}}function D(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function M(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var L=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._render=e;for(var r=[e._rowHeader.width,e._colHeader.height],n=r[0],i=r[1],o=H(e._freeze,2),a=o[0],l=o[1],u=e._startRow,s=e._startCol,c=e._rows,h=e._cols,y=function(t){return e.rowHeightAt(t)},v=function(t){return e.colWidthAt(t)},d=f.create(u,s,l-1,a-1,n,i,y,v),w=l+e._scrollRows,g=a+e._scrollCols,p=d.height,b=w;p<e._height&&b<c;)p+=y(b),b+=1;for(var _=d.width,m=g;_<e._width&&m<h;)_+=v(m),m+=1;var k=f.create(w,g,b-1,m-1,n+d.width,i+d.height,y,v),x=f.create(u,g,l-1,m-1,n+d.width,i,y,v),C=f.create(w,s,b-1,a-1,n,i+d.height,y,v);this.areas=[x,d,C,k];var S=e._rowHeader,O=e._colHeader,R=function(){return O.height/O.rows},j=function(){return S.width/S.cols};this.headerAreas=[f.create(0,x.range.startCol,O.rows-1,x.range.endCol,k.x,0,R,v),f.create(0,d.range.startCol,O.rows-1,d.range.endCol,d.x,0,R,v),f.create(d.range.startRow,0,d.range.endRow,S.cols-1,0,d.y,y,j),f.create(C.range.startRow,0,C.range.endRow,S.cols-1,0,k.y,y,j)]}var e,r;return e=t,(r=[{key:"cellAt",value:function(t,e){var r=this.areas[1],n=H(this.headerAreas,4),i=n[0],o=n[1],a=n[2],l=n[3];if(t<r.x&&e<r.y)return{placement:"all",row:0,col:0,x:0,y:0,width:r.x,height:r.y};if(t<r.x)return T({placement:"row-header"},(a.containsy(e)?a:l).cellAt(t,e));if(e<r.y)return T({placement:"col-header"},(o.containsx(t)?o:i).cellAt(t,e));var u,s=function(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=E(t))){r&&(t=r);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,l=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){l=!0,o=t},f:function(){try{a||null==r.return||r.return()}finally{if(l)throw o}}}}(this.areas);try{for(s.s();!(u=s.n()).done;){var c=u.value;if(c.contains(t,e))return T({placement:"body"},c.cellAt(t,e))}}catch(t){s.e(t)}finally{s.f()}return null}}])&&M(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function W(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function z(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var U,G=function(){function t(e,r,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),z(this,"_width",0),z(this,"_height",0),z(this,"_scale",1),z(this,"_rows",100),z(this,"_cols",26),z(this,"_rowHeight",25),z(this,"_colWidth",100),z(this,"_startRow",0),z(this,"_startCol",0),z(this,"_scrollRows",0),z(this,"_scrollCols",0),z(this,"_row",(function(){})),z(this,"_col",(function(){})),z(this,"_cell",(function(){})),z(this,"_merges",[]),z(this,"_styles",[]),z(this,"_lineStyle",{width:1,color:"#e6e6e6"}),z(this,"_cellStyle",{bgcolor:"#ffffff",align:"left",valign:"middle",textwrap:!0,underline:!1,strikethrough:!1,color:"#0a0a0a",bold:!1,italic:!1,rotate:0,fontSize:9,fontName:"Source Sans Pro"}),z(this,"_rowHeader",{width:60,cols:1,cell:function(t,e){return t+1}}),z(this,"_colHeader",{height:25,rows:1,cell:function(t,e){return i(e)}}),z(this,"_headerLineStyle",{width:1,color:"#e6e6e6"}),z(this,"_headerCellStyle",{bgcolor:"#f4f5f8",align:"center",valign:"middle",textwrap:!0,underline:!1,strikethrough:!1,color:"#585757",bold:!1,italic:!1,rotate:0,fontSize:9,fontName:"Source Sans Pro"}),z(this,"_freeze",[0,0]),z(this,"_freezeLineStyle",{width:2,color:"#d8d8d8"}),z(this,"_viewport",null);var o="string"==typeof e?document.querySelector(e):e;if(!o)throw new Error("target error");this._target=o,this._width=r,this._height=n}var e,r,n;return e=t,n=[{key:"create",value:function(e,r,n){return new t(e,r,n)}}],(r=[{key:"render",value:function(){return this._viewport=new L(this),function(t){var e=t._width,r=t._height,n=t._target,i=t._scale,o=t._viewport,a=t._freeze,l=t._rowHeader,u=t._colHeader;if(o){var s=new d(n,i);s.size(e,r);var c=b(o.areas,4),h=c[0],y=c[1],v=c[2],w=c[3],g=b(o.headerAreas,4),p=g[0],_=g[1],m=g[2],k=g[3];R(s,w,t),R(s,h,t),A(s,p,t),R(s,v,t),j(s,k,t),R(s,y,t),A(s,_,t),j(s,m,t);var x=b(a,2),S=x[0],P=x[1];(S>0||P>0)&&C(s,t._freezeLineStyle,(function(){S>0&&s.line(0,w.y,e,w.y),P>0&&s.line(w.x,0,w.x,r)}));var T=y.x,I=y.y;if(T>0&&I>0){var H=f.create(0,0,0,0,0,0,(function(){return u.height}),(function(){return l.width}));O(s,H,(function(){return""}),t._headerCellStyle,t._headerLineStyle,t._styles)}}}(this),this}},{key:"width",value:function(t){return this._width=t,this}},{key:"height",value:function(t){return this._height=t,this}},{key:"scale",value:function(t){return this._scale=t,this}},{key:"rows",value:function(t){return this._rows=t,this}},{key:"cols",value:function(t){return this._cols=t,this}},{key:"rowHeight",value:function(t){return this._rowHeight=t,this}},{key:"colWidth",value:function(t){return this._colWidth=t,this}},{key:"startRow",value:function(t){return this._startRow=t,this}},{key:"startCol",value:function(t){return this._startCol=t,this}},{key:"scrollRows",value:function(t){return this._scrollRows=t,this}},{key:"scrollCols",value:function(t){return this._scrollCols=t,this}},{key:"row",value:function(t){return this._row=t,this}},{key:"col",value:function(t){return this._col=t,this}},{key:"cell",value:function(t){return this._cell=t,this}},{key:"merges",value:function(t){return t&&(this._merges=t),this}},{key:"styles",value:function(t){return t&&(this._styles=t),this}},{key:"lineStyle",value:function(t){return Object.assign(this._lineStyle,t),this}},{key:"cellStyle",value:function(t){return Object.assign(this._cellStyle,t),this}},{key:"rowHeader",value:function(t){return t&&Object.assign(this._rowHeader,t),this}},{key:"colHeader",value:function(t){return t&&Object.assign(this._colHeader,t),this}},{key:"headerLineStyle",value:function(t){return Object.assign(this._headerLineStyle,t),this}},{key:"headerCellStyle",value:function(t){return t&&Object.assign(this._headerCellStyle,t),this}},{key:"freeze",value:function(t){return t&&(this._freeze=a(t)),this}},{key:"freezeLineStyle",value:function(t){return Object.assign(this._freezeLineStyle,t),this}},{key:"rowHeightAt",value:function(t){var e=this._row;if(e){var r=e(t);if(r)return r.hide?0:r.height}return this._rowHeight}},{key:"colWidthAt",value:function(t){var e=this._col;if(e){var r=e(t);if(r)return r.hide?0:r.width}return this._colWidth}},{key:"viewport",get:function(){return this._viewport}}])&&W(e.prototype,r),n&&W(e,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();window&&((U=window).wolf||(U.wolf={}),window.wolf.table_render=G.create),module.exports=e})();