﻿(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        root.log = factory(root.$);
    }
}(this, function ($) {
    'use strict';

    /*
    TraceKit - Cross brower stack traces - github.com/occ/TraceKit
    MIT license

    SHA: c680a29a63c7c70e473ce45f09ddc2f24e9c8792
    */
    /* jshint ignore:start */
    (function(e,t){function o(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function u(e){return typeof e==="undefined"}var n={};var r=e.TraceKit;var i=[].slice;var s="?";n.noConflict=function(){e.TraceKit=r;return n};n.wrap=function(t){function r(){try{return t.apply(this,arguments)}catch(e){n.report(e);throw e}}return r};n.report=function(){function a(e){d();r.push(e)}function f(e){for(var t=r.length-1;t>=0;--t){if(r[t]===e){r.splice(t,1)}}}function l(e,t){var s=null;if(t&&!n.collectWindowErrors){return}for(var u in r){if(o(r,u)){try{r[u].apply(null,[e].concat(i.call(arguments,2)))}catch(a){s=a}}}if(s){throw s}}function p(e,t,r){var i=null;if(u){n.computeStackTrace.augmentStackTraceWithInitialElement(u,t,r,e);i=u;u=null;s=null}else{var o={url:t,line:r};o.func=n.computeStackTrace.guessFunctionName(o.url,o.line);o.context=n.computeStackTrace.gatherContext(o.url,o.line);i={mode:"onerror",message:e,url:document.location.href,stack:[o],useragent:navigator.userAgent}}l(i,"from window.onerror");if(c){return c.apply(this,arguments)}return false}function d(){if(h===true){return}c=e.onerror;e.onerror=p;h=true}function v(t){var r=i.call(arguments,1);if(u){if(s===t){return}else{var o=u;u=null;s=null;l.apply(null,[o,null].concat(r))}}var a=n.computeStackTrace(t);u=a;s=t;e.setTimeout(function(){if(s===t){u=null;s=null;l.apply(null,[a,null].concat(r))}},a.incomplete?2e3:0);throw t}var r=[],s=null,u=null;var c,h;v.subscribe=a;v.unsubscribe=f;return v}();n.computeStackTrace=function(){function a(t){if(!n.remoteFetching){return""}try{var r=function(){try{return new e.XMLHttpRequest}catch(t){return new e.ActiveXObject("Microsoft.XMLHTTP")}};var i=r();i.open("GET",t,false);i.send("");return i.responseText}catch(s){return""}}function f(e){if(!o(i,e)){var t="";if(e.indexOf(document.domain)!==-1){t=a(e)}i[e]=t?t.split("\n"):[]}return i[e]}function l(e,t){var n=/function ([^(]*)\(([^)]*)\)/,r=/['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,i="",o=10,a=f(e),l;if(!a.length){return s}for(var c=0;c<o;++c){i=a[t-c]+i;if(!u(i)){if(l=r.exec(i)){return l[1]}else if(l=n.exec(i)){return l[1]}}}return s}function c(e,t){var r=f(e);if(!r.length){return null}var i=[],s=Math.floor(n.linesOfContext/2),o=s+n.linesOfContext%2,a=Math.max(0,t-s-1),l=Math.min(r.length,t+o-1);t-=1;for(var c=a;c<l;++c){if(!u(r[c])){i.push(r[c])}}return i.length>0?i:null}function h(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g,"\\$&")}function p(e){return h(e).replace("<","(?:<|&lt;)").replace(">","(?:>|&gt;)").replace("&","(?:&|&)").replace('"','(?:"|&quot;)').replace(/\s+/g,"\\s+")}function d(e,t){var n,r;for(var i=0,s=t.length;i<s;++i){if((n=f(t[i])).length){n=n.join("\n");if(r=e.exec(n)){return{url:t[i],line:n.substring(0,r.index).split("\n").length,column:r.index-n.lastIndexOf("\n",r.index)-1}}}}return null}function v(e,t,n){var r=f(t),i=new RegExp("\\b"+h(e)+"\\b"),s;n-=1;if(r&&r.length>n&&(s=i.exec(r[n]))){return s.index}return null}function m(t){var n=[e.location.href],r=document.getElementsByTagName("script"),i,s=""+t,o=/^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,u=/^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,a,f,l;for(var c=0;c<r.length;++c){var v=r[c];if(v.src){n.push(v.src)}}if(!(f=o.exec(s))){a=new RegExp(h(s).replace(/\s+/g,"\\s+"))}else{var m=f[1]?"\\s+"+f[1]:"",g=f[2].split(",").join("\\s*,\\s*");i=h(f[3]).replace(/;$/,";?");a=new RegExp("function"+m+"\\s*\\(\\s*"+g+"\\s*\\)\\s*{\\s*"+i+"\\s*}")}if(l=d(a,n)){return l}if(f=u.exec(s)){var y=f[1];i=p(f[2]);a=new RegExp("on"+y+"=[\\'\"]\\s*"+i+"\\s*[\\'\"]","i");if(l=d(a,n[0])){return l}a=new RegExp(i);if(l=d(a,n)){return l}}return null}function g(e){if(!e.stack){return null}var t=/^\s*at (?:((?:\[object object\])?\S+(?: \[as \S+\])?) )?\(?((?:file|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i,n=/^\s*(\S*)(?:\((.*?)\))?@((?:file|http|https).*?):(\d+)(?::(\d+))?\s*$/i,r=e.stack.split("\n"),i=[],o,u,a=/^(.*) is undefined$/.exec(e.message);for(var f=0,h=r.length;f<h;++f){if(o=n.exec(r[f])){u={url:o[3],func:o[1]||s,args:o[2]?o[2].split(","):"",line:+o[4],column:o[5]?+o[5]:null}}else if(o=t.exec(r[f])){u={url:o[2],func:o[1]||s,line:+o[3],column:o[4]?+o[4]:null}}else{continue}if(!u.func&&u.line){u.func=l(u.url,u.line)}if(u.line){u.context=c(u.url,u.line)}i.push(u)}if(i[0]&&i[0].line&&!i[0].column&&a){i[0].column=v(a[1],i[0].url,i[0].line)}if(!i.length){return null}return{mode:"stack",name:e.name,message:e.message,url:document.location.href,stack:i,useragent:navigator.userAgent}}function y(e){var t=e.stacktrace;var n=/ line (\d+), column (\d+) in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\) in (.*):\s*$/i,r=t.split("\n"),i=[],s;for(var o=0,u=r.length;o<u;o+=2){if(s=n.exec(r[o])){var a={line:+s[1],column:+s[2],func:s[3]||s[4],args:s[5]?s[5].split(","):[],url:s[6]};if(!a.func&&a.line){a.func=l(a.url,a.line)}if(a.line){try{a.context=c(a.url,a.line)}catch(f){}}if(!a.context){a.context=[r[o+1]]}i.push(a)}}if(!i.length){return null}return{mode:"stacktrace",name:e.name,message:e.message,url:document.location.href,stack:i,useragent:navigator.userAgent}}function b(t){var n=t.message.split("\n");if(n.length<4){return null}var r=/^\s*Line (\d+) of linked script ((?:file|http|https)\S+)(?:: in function (\S+))?\s*$/i,i=/^\s*Line (\d+) of inline#(\d+) script in ((?:file|http|https)\S+)(?:: in function (\S+))?\s*$/i,s=/^\s*Line (\d+) of function script\s*$/i,u=[],a=document.getElementsByTagName("script"),h=[],v,m,g,y;for(m in a){if(o(a,m)&&!a[m].src){h.push(a[m])}}for(m=2,g=n.length;m<g;m+=2){var b=null;if(v=r.exec(n[m])){b={url:v[2],func:v[3],line:+v[1]}}else if(v=i.exec(n[m])){b={url:v[3],func:v[4]};var w=+v[1];var E=h[v[2]-1];if(E){y=f(b.url);if(y){y=y.join("\n");var S=y.indexOf(E.innerText);if(S>=0){b.line=w+y.substring(0,S).split("\n").length}}}}else if(v=s.exec(n[m])){var x=e.location.href.replace(/#.*$/,""),T=v[1];var N=new RegExp(p(n[m+1]));y=d(N,[x]);b={url:x,line:y?y.line:T,func:""}}if(b){if(!b.func){b.func=l(b.url,b.line)}var C=c(b.url,b.line);var k=C?C[Math.floor(C.length/2)]:null;if(C&&k.replace(/^\s*/,"")===n[m+1].replace(/^\s*/,"")){b.context=C}else{b.context=[n[m+1]]}u.push(b)}}if(!u.length){return null}return{mode:"multiline",name:t.name,message:n[0],url:document.location.href,stack:u,useragent:navigator.userAgent}}function w(e,t,n,r){var i={url:t,line:n};if(i.url&&i.line){e.incomplete=false;if(!i.func){i.func=l(i.url,i.line)}if(!i.context){i.context=c(i.url,i.line)}var s=/ '([^']+)' /.exec(r);if(s){i.column=v(s[1],i.url,i.line)}if(e.stack.length>0){if(e.stack[0].url===i.url){if(e.stack[0].line===i.line){return false}else if(!e.stack[0].line&&e.stack[0].func===i.func){e.stack[0].line=i.line;e.stack[0].context=i.context;return false}}}e.stack.unshift(i);e.partial=true;return true}else{e.incomplete=true}return false}function E(e,t){var r=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,i=[],o={},u=false,a,f,c;for(var h=E.caller;h&&!u;h=h.caller){if(h===S||h===n.report){continue}f={url:null,func:s,line:null,column:null};if(h.name){f.func=h.name}else if(a=r.exec(h.toString())){f.func=a[1]}if(c=m(h)){f.url=c.url;f.line=c.line;if(f.func===s){f.func=l(f.url,f.line)}var p=/ '([^']+)' /.exec(e.message||e.description);if(p){f.column=v(p[1],c.url,c.line)}}if(o[""+h]){u=true}else{o[""+h]=true}i.push(f)}if(t){i.splice(0,t)}var d={mode:"callers",name:e.name,message:e.message,url:document.location.href,stack:i,useragent:navigator.userAgent};w(d,e.sourceURL||e.fileName,e.line||e.lineNumber,e.message||e.description);return d}function S(e,t){var n=null;t=t==null?0:+t;try{n=y(e);if(n){return n}}catch(i){if(r){throw i}}try{n=g(e);if(n){return n}}catch(i){if(r){throw i}}try{n=b(e);if(n){return n}}catch(i){if(r){throw i}}try{n=E(e,t+1);if(n){return n}}catch(i){if(r){throw i}}return{mode:"failed"}}function x(e){e=(e==null?0:+e)+1;try{throw new Error}catch(t){return S(t,e+1)}}var r=false,i={};S.augmentStackTraceWithInitialElement=w;S.guessFunctionName=l;S.gatherContext=c;S.ofCaller=x;return S}();(function(){var r=function(r){var s=e[r];e[r]=function(){var t=i.call(arguments);var r=t[0];if(typeof r==="function"){t[0]=n.wrap(r)}if(s.apply){return s.apply(this,t)}else{return s(t[0],t[1])}}};r("setTimeout");r("setInterval")})();if(!n.remoteFetching){n.remoteFetching=true}if(!n.collectWindowErrors){n.collectWindowErrors=true}if(!n.linesOfContext||n.linesOfContext<1){n.linesOfContext=11}e.TraceKit=n})(window)
    /* jshint ignore:end */

    // this target logs messages to a HTTP endpoint
    var remote = function (level, message, stack) {
        var data = JSON.stringify({
            message: message,
            level: level,
            sender: config.sender,
            url: '/' + document.URL.replace(/^(?:\/\/|[^\/]+)*\//, ''),
            useragent: window.navigator.userAgent,
            stack: stack
        });

        $.ajax({
            url: config.url,
            type: 'POST',
            contentType: 'application/json',
            data: data
        }).fail(function () {
            if (config.logRemoteFailureToConsole) {
		        local('error', 'Error posting log to server.');
            }
		});
    };

    // define the mapping between levels and console functions
    var mapping = {
        debug: 'log',
        info: 'info',
        warning: 'warn',
        error: 'error',
        critical: 'error'
    };

    // this target logs to the console, if available
    var local = function (level, message, stack) {
        if (console && console[mapping[level]]) {
            if (window.chrome) {
                console[mapping[level]]('%c' + level + '%c ' + message, 'padding-left: 3px; padding-right: 3px; margin-top: 1px; margin-bottom: 1px; color: #fff; border-radius: 2px; background-color: ' + config.colors[level] + '; font-weight: bold;', 'color: #000');
            } else {
                console[mapping[level]](message);
            }
        }
    };

    // default config
    var config = {
        sender: 'unknown-app',
        url: '/logs/',
        targets: [ local ],
        logRemoteFailureToConsole: true,
        colors: {
            debug: '#3F6833',
            info: '#7EB26D',
            warning: '#F9934E',
            error: '#E24D42',
            critical: '#58140C'
        }
    };

    var write = function (level, message, stack) {
        var i;

        for (i = 0; i < config.targets.length; i++) {
            config.targets[i](level, message, stack);
        }
    };

    // catch unhandled errors and invoke remote target. Don't invoke local
    // target because the browser tends to show these in the console anyway
    var errorHandler = function (error) {
        try {
            if (!error.stack) {
                error.stack = (new Error('force-added stack')).stack;
                if (error.stack) {
                    error.stack = error.stack.toString();
                }
            }
        } catch (e) { }

        // TODO: What if the remote target is not enabled?
        remote('error', error.message, error.stack[0]);
    };

    TraceKit.report.subscribe(errorHandler);

    return {
        config: config,

        // expose the default targets so that people can re-configure
        defaults: {
            targets: {
                remote: remote,
                local: local  
            },
        },
        debug: function(message) {
            write('debug', message);
        },
        info: function(message) {
            write('info', message);
        },
        warning: function(message) {
            write('warning', message);
        },
        error: function(message) {
            write('error', message);
        },
        critical: function(message) {
            write('critical', message);
        }
    };
}));