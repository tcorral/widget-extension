/* base-widget@v build with ♥ by bb-lp-cli@v1.9.7 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["base-widget"]=t():e["base-widget"]=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,exports,t){e.exports=t(1)},function(e,exports,t){var n;n=function(){function e(e,t,n,o){try{o=new(this.XMLHttpRequest||ActiveXObject)("MSXML2.XMLHTTP.3.0"),o.open(n?"POST":"GET",e,1),o.setRequestHeader("X-Requested-With","XMLHttpRequest"),o.setRequestHeader("Content-type","application/x-www-form-urlencoded"),o.onreadystatechange=function(){o.readyState>3&&t&&t(o.responseText,o)},o.send(n)}catch(r){window.console&&console.log(r)}}function t(t){var n="static",o=t.getOriginURI(),r=o.indexOf(n),i=o.substr(0,r+n.length),a="."===i?"bower_components":i,c="bower_components"===a,s=c?"/":"/features/[BBHOST]/",u=a+s+t.getPreference("main:module")+"/templates/"+t.getPreference("main:template");e(u,function(e){t.body.innerHTML=e})}var n=/^dependency/g;return function(e,o,r,i,a){var c,s,u=[],p=[];t(e),i=i||"module_"+Math.random();for(c in o)o.hasOwnProperty(c)&&n.test(o[c].name)&&(s=o[c].name.replace(n,""),s in r||(s=o[c].value),s&&p.push(s));p.push(e.getPreference("main:module")),0===p.length?a(i,e,u):window.require(p,function(){var t=Array.prototype.slice.call(arguments);t.forEach(function(e){u.push(e.name)}),a(i,e,u)})}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))}])});
//# sourceMappingURL=main.js.map