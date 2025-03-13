!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).flasher=e()}(this,(function(){"use strict";function t(t,e,n){if(n||2===arguments.length)for(var o,r=0,i=e.length;r<i;r++)!o&&r in e||(o||(o=Array.prototype.slice.call(e,0,r)),o[r]=e[r]);return t.concat(o||Array.prototype.slice.call(e))}var e=function(){function t(t){this.options={timeout:5e3,fps:30,position:"top-right",direction:"top",rtl:!1,style:{},darkMode:"media"},this.viewFactory=t}return t.prototype.success=function(t,e,n){this.flash("success",t,e,n)},t.prototype.info=function(t,e,n){this.flash("info",t,e,n)},t.prototype.warning=function(t,e,n){this.flash("warning",t,e,n)},t.prototype.error=function(t,e,n){this.flash("error",t,e,n)},t.prototype.flash=function(t,e,n,o){var r=this.createNotification(t,e,n,o);this.renderOptions({}),this.render({notification:r})},t.prototype.createNotification=function(t,e,n,o){if("object"==typeof t?(t=(o=t).type,e=o.message,n=o.title):"object"==typeof e?(e=(o=e).message,n=o.title):"object"==typeof n&&(n=(o=n).title),void 0===e)throw new Error("message option is required");return{type:t||"info",message:e,title:n,options:o}},t.prototype.render=function(t){var e=this,n=t.notification.options||{},o=Array.isArray(n)?this.options:Object.assign({},this.options,n),r=function(){var n=e.createContainer(o);e.addToContainer(n,t,o)};"loading"===document.readyState?document.addEventListener("DOMContentLoaded",r):r()},t.prototype.renderOptions=function(t){this.options=Object.assign({},this.options,t),this.applyDarkMode()},t.prototype.createContainer=function(t){var e='.fl-main-container[data-position="'.concat(t.position,'"]'),n=document.querySelector(e);return n?(n.dataset.turboCache="false",n.classList.add("fl-no-cache"),n):((n=document.createElement("div")).classList.add("fl-main-container"),n.dataset.position=t.position,n.dataset.turboCache="false",n.classList.add("fl-no-cache"),Object.keys(t.style).forEach((function(e){null==n||n.style.setProperty(e,t.style[e])})),document.body.append(n),n)},t.prototype.addToContainer=function(t,e,n){var o=this.stringToHTML(e.template||this.viewFactory.render(e));o.classList.add("fl-container"),this.appendNotification(t,o,n),this.renderProgressBar(o,n),this.handleClick(o)},t.prototype.appendNotification=function(t,e,n){"bottom"===n.direction?t.append(e):t.prepend(e),n.rtl&&e.classList.add("fl-rtl"),setTimeout((function(){e.classList.add("fl-show")}),100)},t.prototype.removeNotification=function(t){var e=t.parentElement;t.classList.remove("fl-show"),t.addEventListener("transitionend",(function(){t.remove(),e.hasChildNodes()||e.remove()}))},t.prototype.handleClick=function(t){var e=this;t.addEventListener("click",(function(){return e.removeNotification(t)}))},t.prototype.renderProgressBar=function(t,e){var n=this;if(e.timeout&&!(e.timeout<=0)){var o=document.createElement("span");o.classList.add("fl-progress");var r=t.querySelector(".fl-progress-bar");r&&r.append(o);var i=1e3/e.fps,s=0,a=function(){var r=100*(1-i*((s+=1)/e.timeout));o.style.width="".concat(r,"%"),r<=0&&(clearInterval(c),n.removeNotification(t))},c=window.setInterval(a,i);t.addEventListener("mouseout",(function(){return c=window.setInterval(a,i)})),t.addEventListener("mouseover",(function(){return clearInterval(c)}))}},t.prototype.applyDarkMode=function(){if(!document.body.classList.contains("fl-dark-mode")&&!document.querySelector("style.flasher-js")){var t=[].concat(this.options.darkMode),e=t[0],n=t[1],o=void 0===n?".dark":n,r=".fl-main-container .fl-container.fl-flasher {background-color: rgb(15, 23, 42);color: rgb(255, 255, 255);}";r="media"===e?"@media (prefers-color-scheme: dark) {".concat(r,"}"):"".concat(o," ").concat(r);var i=document.createElement("style");i.type="text/css",i.classList.add("flasher-js"),i.appendChild(document.createTextNode(r)),document.head.appendChild(i),document.body.classList.add("fl-dark-mode")}},t.prototype.stringToHTML=function(t){var e=function(){if(!DOMParser)return!1;var t=new DOMParser;try{t.parseFromString("x","text/html")}catch(t){return!1}return!0}();if(e)return(new DOMParser).parseFromString(t,"text/html").body.firstChild;var n=document.createElement("div");return n.innerHTML=t,n.firstElementChild},t}(),n=new(function(){function n(){this.defaultHandler="theme.flasher",this.factories=new Map,this.themes=new Map}return n.prototype.success=function(t,e,n){this.flash("success",t,e,n)},n.prototype.info=function(t,e,n){this.flash("info",t,e,n)},n.prototype.warning=function(t,e,n){this.flash("warning",t,e,n)},n.prototype.error=function(t,e,n){this.flash("error",t,e,n)},n.prototype.flash=function(t,e,n,o){var r=this.createNotification(t,e,n,o),i=this.create(this.defaultHandler);i.renderOptions({}),i.render({notification:r})},n.prototype.createNotification=function(t,e,n,o){if("object"==typeof t?(t=(o=t).type,e=o.message,n=o.title):"object"==typeof e?(e=(o=e).message,n=o.title):"object"==typeof n&&(n=(o=n).title),void 0===e)throw new Error("message option is required");return{type:t||"info",message:e,title:n,options:o}},n.prototype.create=function(t){t=this.resolveHandler(t),this.resolveThemeHandler(t);var e=this.factories.get(t);if(!e)throw new Error('Unable to resolve "'.concat(t,'" notification factory, did you forget to register it?'));return e},n.prototype.renderOptions=function(t){var e=this;Object.entries(t).forEach((function(t){var n=t[0],o=t[1];e.create(n).renderOptions(o)}))},n.prototype.render=function(t){var e=this;t=this.resolveResponse(t),this.addStyles(t.styles,(function(){e.addScripts(t.scripts,(function(){e.renderOptions(t.options),e.renderEnvelopes(t.envelopes,t.context)}))}))},n.prototype.addFactory=function(t,e){this.factories.set(t,e)},n.prototype.addTheme=function(t,e){this.themes.set(t,e)},n.prototype.using=function(t){return this.defaultHandler=t,this},n.prototype.addStyles=function(t,e){var n=this;if(0!==t.length)if(null===document.querySelector('link[href="'.concat(t[0],'"]'))){var o=document.createElement("link");o.setAttribute("href",t[0]),o.setAttribute("type","text/css"),o.setAttribute("rel","stylesheet"),o.onload=function(){return n.addStyles(t.slice(1),e)},document.head.appendChild(o)}else this.addStyles(t.slice(1),e);else"function"==typeof e&&e()},n.prototype.addScripts=function(t,e){var n=this;if(0!==t.length)if(null===document.querySelector('script[src="'.concat(t[0],'"]'))){var o=document.createElement("script");o.setAttribute("src",t[0]),o.setAttribute("type","text/javascript"),o.onload=function(){return n.addScripts(t.slice(1),e)},document.head.appendChild(o)}else this.addScripts(t.slice(1),e);else"function"==typeof e&&e()},n.prototype.renderEnvelopes=function(t,e){var n=this,o=new Map;t.forEach((function(t){t.context=Object.assign({},t.context||{},e),t.handler=n.resolveHandler(t.handler);var r=n.create(t.handler);n.isQueueable(r)?(o.get(t.handler)||r.resetQueue(),r.addEnvelope(t),o.set(t.handler,r)):r.render(t)})),o.forEach((function(t){return t.renderQueue()}))},n.prototype.isQueueable=function(t){return"function"==typeof t.addEnvelope&&"function"==typeof t.renderQueue},n.prototype.resolveResponse=function(t){var e=this;return t.envelopes=t.envelopes||[],t.options=t.options||{},t.scripts=t.scripts||[],t.styles=t.styles||[],t.context=t.context||{},Object.entries(t.options).forEach((function(n){var o=n[0],r=n[1];t.options[o]=e.parseOptions(r)})),t.envelopes.forEach((function(n){n.handler=e.resolveHandler(n.handler),n.notification.options=e.parseOptions(n.notification.options||{}),e.pushStyles(t,n.handler)})),t},n.prototype.parseOptions=function(t){var e=this;return Object.entries(t).forEach((function(n){var o=n[0],r=n[1];t[o]=e.parseFunction(r)})),t},n.prototype.parseFunction=function(e){var n,o;if("string"!=typeof e)return e;var r=e.match(/^function(?:.+)?(?:\s+)?\((.+)?\)(?:\s+|\n+)?{(?:\s+|\n+)?((?:.|\n)+)}$/m);if(!r)return e;var i=null!==(o=null===(n=r[1])||void 0===n?void 0:n.split(",").map((function(t){return t.trim()})))&&void 0!==o?o:[],s=r[2];return new(Function.bind.apply(Function,t(t([void 0],i,!1),[s],!1)))},n.prototype.pushStyles=function(t,e){var n;e=e.replace("theme.","");var o=(null===(n=this.themes.get(e))||void 0===n?void 0:n.styles)||[];t.styles=t.styles.concat(o).filter((function(t,e,n){return n.indexOf(t)===e}))},n.prototype.resolveHandler=function(t){return t=t||this.defaultHandler,["flasher","theme","template"].includes(t)&&(t="theme.flasher"),t=t.replace("template.","theme.")},n.prototype.resolveThemeHandler=function(t){if(!this.factories.get(t)&&0===t.indexOf("theme.")){var n=this.themes.get(t.replace("theme.",""));n&&this.addFactory(t,new e(n))}},n}());return n.addTheme("flasher",{render:function(t){var e,n=t.notification;return'<div class="fl-flasher fl-'+n.type+'"><div class="fl-content"><div class="fl-icon"></div><div><strong class="fl-title">'+(null!==(e=n.title)&&void 0!==e?e:n.type)+'</strong><span class="fl-message">'+n.message+'</span></div></div><span class="fl-progress-bar"></span></div>'}}),n}));