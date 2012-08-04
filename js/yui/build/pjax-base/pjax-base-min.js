/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("pjax-base",function(e){var c=e.config.win,d=e.ClassNameManager.getClassName("pjax"),a="navigate";function b(){}b.prototype={_regexURL:/^((?:[^\/#?:]+:\/\/|\/\/)[^\/]*)?([^?#]*)(\?[^#]*)?(#.*)?$/,initializer:function(){this.publish(a,{defaultFn:this._defNavigateFn});if(this.get("html5")){this._pjaxBindUI();}},destructor:function(){this._pjaxEvents&&this._pjaxEvents.detach();},navigate:function(g,f){g=this._resolveURL(g);if(this._navigate(g,f)){return true;}if(!this._hasSameOrigin(g)){e.error("Security error: The new URL must be of the same origin as the current URL.");}return false;},_isLinkSameOrigin:function(i){var f=e.getLocation(),k=f.protocol,h=f.hostname,g=parseInt(f.port,10)||null,j;if(i.get("protocol")!==k||i.get("hostname")!==h){return false;}j=parseInt(i.get("port"),10)||null;if(k==="http:"){g||(g=80);j||(j=80);}else{if(k==="https:"){g||(g=443);j||(j=443);}}return j===g;},_navigate:function(h,g){h=this._upgradeURL(h);if(!this.hasRoute(h)){return false;}g=e.merge(g,{url:h});var j=this._upgradeURL(this._getURL()),i,f;f=h.replace(/(#.*)$/,function(k,m,l){i=m;return k.substring(l);});if(i&&f===j.replace(/#.*$/,"")){if(!this.get("navigateOnHash")){return false;}g.hash=i;}"replace" in g||(g.replace=h===j);if(this.get("html5")||g.force){this.fire(a,g);}else{if(g.replace){c&&c.location.replace(h);}else{c&&(c.location=h);}}return true;},_pjaxBindUI:function(){if(!this._pjaxEvents){this._pjaxEvents=e.one("body").delegate("click",this._onLinkClick,this.get("linkSelector"),this);}},_defNavigateFn:function(f){this[f.replace?"replace":"save"](f.url);if(c&&this.get("scrollToTop")){setTimeout(function(){c.scroll(0,0);},1);}},_onLinkClick:function(h){var g,f;if(h.button!==1||h.ctrlKey||h.metaKey){return;}g=h.currentTarget;if(g.get("tagName").toUpperCase()!=="A"){return;}if(!this._isLinkSameOrigin(g)){return;}f=g.get("href");f&&this._navigate(f,{originEvent:h})&&h.preventDefault();}};b.ATTRS={linkSelector:{value:"a."+d,writeOnce:"initOnly"},navigateOnHash:{value:false},scrollToTop:{value:true}};e.PjaxBase=b;},"3.6.0",{requires:["classnamemanager","node-event-delegate","router"]});