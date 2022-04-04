/*!
 * jQuery Form Plugin
 * version: 3.50.0-2014.02.05
 * Requires jQuery v1.5 or later
 * Copyright (c) 2013 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
function addSubmitParams(){var e=$(this).attr("name"),t=$(this).val();void 0!==e&&$(this).parents("form:first").append('<input type="hidden" name="'+e+'" " value="'+t+'"/>')}function addSubmitParams(){$("body").trigger("onAjaxReloadBeforeSubmitClick");var e=$(this).attr("name"),t=$(this).val();return void 0!==e&&$(this).parents("form:first").append('<input type="hidden" name="'+e+'" " value="'+t+'"/>'),$(this).closest("form").trigger("submit"),!1}function bitrixFormAjaxReplaseInit(e){$("input[name=bxajaxidjQuery]",e).length&&($(e).attr("action",$("input[name=FORM_ACTION]",e).val()),$("input[name=FORM_ACTION]",e).remove(),$("input[name=AJAX_CALLjQuery]",e).remove(),$("input[name=bxajaxidjQuery]",e).attr("name","bxajaxid"),$("input[type=submit]",e).on("click",addSubmitParams),$(e).removeClass("replaceFormBitixAjax"),$(e).on("submit",bitrixFormAjaxReplase))}function checkForAjaxForms(){$("form.replaceFormBitixAjax").each((function(){bitrixFormAjaxReplaseInit(this)}))}function bitrixFormAjaxReplase(){var e=$("#comp_"+$("input[name=bxajaxid]",this).val());loader_Custom_ajax_shadow(e);var t={url:$(this).attr("action"),dataType:"html",type:"POST",success:function(t){$(e).html(t),checkForAjaxForms(),loader_Custom_ajax_remove(),$("body").trigger("onAjaxReload",[e])}};return $(this).ajaxSubmit(t),!1}function loader_Custom_ajax_remove(){$(".waitwindowlocalshadow").remove()}function loader_Custom_ajax_shadow(e){e||(e=$("body"));var t=$('<div class="waitwindowlocalshadow"><div class="waitwindowlocalshadowico" id="loaderImage"></div></div>').appendTo("body"),a=$(e).width()+parseInt($(e).css("padding-left"))+parseInt($(e).css("padding-right")),r=$(e).height()+parseInt($(e).css("padding-top"))+parseInt($(e).css("padding-bottom")),n=$(e).offset();t.css({width:a+"px",height:r+"px",left:n.left+"px",top:n.top+"px"})}!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}((function(e){"use strict";var t={};t.fileapi=void 0!==e("<input type='file'/>").get(0).files,t.formdata=void 0!==window.FormData;var a=!!e.fn.prop;function r(t){var a=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(a))}function n(t){var a=t.target,r=e(a);if(!r.is("[type=submit],[type=image]")){var n=r.closest("[type=submit]");if(0===n.length)return;a=n[0]}var o=this;if(o.clk=a,"image"==a.type)if(void 0!==t.offsetX)o.clk_x=t.offsetX,o.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var i=r.offset();o.clk_x=t.pageX-i.left,o.clk_y=t.pageY-i.top}else o.clk_x=t.pageX-a.offsetLeft,o.clk_y=t.pageY-a.offsetTop;setTimeout((function(){o.clk=o.clk_x=o.clk_y=null}),100)}function o(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}e.fn.attr2=function(){if(!a)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(r){if(!this.length)return o("ajaxSubmit: skipping submit process - no element selected"),this;var n,i,s,u=this;"function"==typeof r?r={success:r}:void 0===r&&(r={}),n=r.type||this.attr2("method"),(s=(s="string"==typeof(i=r.url||this.attr2("action"))?e.trim(i):"")||window.location.href||"")&&(s=(s.match(/^([^#]+)/)||[])[1]),r=e.extend(!0,{url:s,success:e.ajaxSettings.success,type:n||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},r);var c={};if(this.trigger("form-pre-serialize",[this,r,c]),c.veto)return o("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(r.beforeSerialize&&!1===r.beforeSerialize(this,r))return o("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var l=r.traditional;void 0===l&&(l=e.ajaxSettings.traditional);var m,d=[],f=this.formToArray(r.semantic,d);if(r.data&&(r.extraData=r.data,m=e.param(r.data,l)),r.beforeSubmit&&!1===r.beforeSubmit(f,this,r))return o("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[f,this,r,c]),c.veto)return o("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var p=e.param(f,l);m&&(p=p?p+"&"+m:m),"GET"==r.type.toUpperCase()?(r.url+=(r.url.indexOf("?")>=0?"&":"?")+p,r.data=null):r.data=p;var h=[];if(r.resetForm&&h.push((function(){u.resetForm()})),r.clearForm&&h.push((function(){u.clearForm(r.includeHidden)})),!r.dataType&&r.target){var v=r.success||function(){};h.push((function(t){var a=r.replaceTarget?"replaceWith":"html";e(r.target)[a](t).each(v,arguments)}))}else r.success&&h.push(r.success);if(r.success=function(e,t,a){for(var n=r.context||this,o=0,i=h.length;o<i;o++)h[o].apply(n,[e,t,a||u,u])},r.error){var x=r.error;r.error=function(e,t,a){var n=r.context||this;x.apply(n,[e,t,a,u])}}if(r.complete){var g=r.complete;r.complete=function(e,t){var a=r.context||this;g.apply(a,[e,t,u])}}var b=e("input[type=file]:enabled",this).filter((function(){return""!==e(this).val()})).length>0,y="multipart/form-data",j=u.attr("enctype")==y||u.attr("encoding")==y,w=t.fileapi&&t.formdata;o("fileAPI :"+w);var T,_=(b||j)&&!w;!1!==r.iframe&&(r.iframe||_)?r.closeKeepAlive?e.get(r.closeKeepAlive,(function(){T=A(f)})):T=A(f):T=(b||j)&&w?function(t){for(var a=new FormData,o=0;o<t.length;o++)a.append(t[o].name,t[o].value);if(r.extraData){var i=function(t){var a,n,o=e.param(t,r.traditional).split("&"),i=o.length,s=[];for(a=0;a<i;a++)o[a]=o[a].replace(/\+/g," "),n=o[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}(r.extraData);for(o=0;o<i.length;o++)i[o]&&a.append(i[o][0],i[o][1])}r.data=null;var s=e.extend(!0,{},e.ajaxSettings,r,{contentType:!1,processData:!1,cache:!1,type:n||"POST"});r.uploadProgress&&(s.xhr=function(){var t=e.ajaxSettings.xhr();return t.upload&&t.upload.addEventListener("progress",(function(e){var t=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(t=Math.ceil(a/n*100)),r.uploadProgress(e,a,n,t)}),!1),t});s.data=null;var u=s.beforeSend;return s.beforeSend=function(e,t){r.formData?t.data=r.formData:t.data=a,u&&u.call(this,e,t)},e.ajax(s)}(f):e.ajax(r),u.removeData("jqxhr").data("jqxhr",T);for(var S=0;S<d.length;S++)d[S]=null;return this.trigger("form-submit-notify",[this,r]),this;function A(t){var i,s,c,l,m,f,p,h,v,x,g,b,y=u[0],j=e.Deferred();if(j.abort=function(e){h.abort(e)},t)for(s=0;s<d.length;s++)i=e(d[s]),a?i.prop("disabled",!1):i.removeAttr("disabled");if((c=e.extend(!0,{},e.ajaxSettings,r)).context=c.context||c,m="jqFormIO"+(new Date).getTime(),c.iframeTarget?(x=(f=e(c.iframeTarget)).attr2("name"))?m=x:f.attr2("name",m):(f=e('<iframe name="'+m+'" src="'+c.iframeSrc+'" />')).css({position:"absolute",top:"-1000px",left:"-1000px"}),p=f[0],h={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var a="timeout"===t?"timeout":"aborted";o("aborting upload... "+a),this.aborted=1;try{p.contentWindow.document.execCommand&&p.contentWindow.document.execCommand("Stop")}catch(e){}f.attr("src",c.iframeSrc),h.error=a,c.error&&c.error.call(c.context,h,a,t),l&&e.event.trigger("ajaxError",[h,c,a]),c.complete&&c.complete.call(c.context,h,a)}},(l=c.global)&&0==e.active++&&e.event.trigger("ajaxStart"),l&&e.event.trigger("ajaxSend",[h,c]),c.beforeSend&&!1===c.beforeSend.call(c.context,h,c))return c.global&&e.active--,j.reject(),j;if(h.aborted)return j.reject(),j;(v=y.clk)&&(x=v.name)&&!v.disabled&&(c.extraData=c.extraData||{},c.extraData[x]=v.value,"image"==v.type&&(c.extraData[x+".x"]=y.clk_x,c.extraData[x+".y"]=y.clk_y));function w(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(e){o("cannot get iframe.contentWindow document: "+e)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(a){o("cannot get iframe.contentDocument: "+a),t=e.document}return t}var T=e("meta[name=csrf-token]").attr("content"),_=e("meta[name=csrf-param]").attr("content");function S(){var t=u.attr2("target"),a=u.attr2("action"),r=u.attr("enctype")||u.attr("encoding")||"multipart/form-data";y.setAttribute("target",m),n&&!/post/i.test(n)||y.setAttribute("method","POST"),a!=c.url&&y.setAttribute("action",c.url),c.skipEncodingOverride||n&&!/post/i.test(n)||u.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),c.timeout&&(b=setTimeout((function(){g=!0,F(1)}),c.timeout));var i=[];try{if(c.extraData)for(var s in c.extraData)c.extraData.hasOwnProperty(s)&&(e.isPlainObject(c.extraData[s])&&c.extraData[s].hasOwnProperty("name")&&c.extraData[s].hasOwnProperty("value")?i.push(e('<input type="hidden" name="'+c.extraData[s].name+'">').val(c.extraData[s].value).appendTo(y)[0]):i.push(e('<input type="hidden" name="'+s+'">').val(c.extraData[s]).appendTo(y)[0]));c.iframeTarget||f.appendTo("body"),p.attachEvent?p.attachEvent("onload",F):p.addEventListener("load",F,!1),setTimeout((function e(){try{var t=w(p).readyState;o("state = "+t),t&&"uninitialized"==t.toLowerCase()&&setTimeout(e,50)}catch(e){o("Server abort: ",e," (",e.name,")"),F(2),b&&clearTimeout(b),b=void 0}}),15);try{y.submit()}catch(e){document.createElement("form").submit.apply(y)}}finally{y.setAttribute("action",a),y.setAttribute("enctype",r),t?y.setAttribute("target",t):u.removeAttr("target"),e(i).remove()}}_&&T&&(c.extraData=c.extraData||{},c.extraData[_]=T),c.forceSync?S():setTimeout(S,10);var A,k,D,$=50;function F(t){if(!h.aborted&&!D){if((k=w(p))||(o("cannot access response document"),t=2),1===t&&h)return h.abort("timeout"),void j.reject(h,"timeout");if(2==t&&h)return h.abort("server abort"),void j.reject(h,"error","server abort");if(k&&k.location.href!=c.iframeSrc||g){p.detachEvent?p.detachEvent("onload",F):p.removeEventListener("load",F,!1);var a,r="success";try{if(g)throw"timeout";var n="xml"==c.dataType||k.XMLDocument||e.isXMLDoc(k);if(o("isXml="+n),!n&&window.opera&&(null===k.body||!k.body.innerHTML)&&--$)return o("requeing onLoad callback, DOM not available"),void setTimeout(F,250);var i=k.body?k.body:k.documentElement;h.responseText=i?i.innerHTML:null,h.responseXML=k.XMLDocument?k.XMLDocument:k,n&&(c.dataType="xml"),h.getResponseHeader=function(e){return{"content-type":c.dataType}[e.toLowerCase()]},i&&(h.status=Number(i.getAttribute("status"))||h.status,h.statusText=i.getAttribute("statusText")||h.statusText);var s=(c.dataType||"").toLowerCase(),u=/(json|script|text)/.test(s);if(u||c.textarea){var m=k.getElementsByTagName("textarea")[0];if(m)h.responseText=m.value,h.status=Number(m.getAttribute("status"))||h.status,h.statusText=m.getAttribute("statusText")||h.statusText;else if(u){var d=k.getElementsByTagName("pre")[0],v=k.getElementsByTagName("body")[0];d?h.responseText=d.textContent?d.textContent:d.innerText:v&&(h.responseText=v.textContent?v.textContent:v.innerText)}}else"xml"==s&&!h.responseXML&&h.responseText&&(h.responseXML=X(h.responseText));try{A=L(h,s,c)}catch(e){r="parsererror",h.error=a=e||r}}catch(e){o("error caught: ",e),r="error",h.error=a=e||r}h.aborted&&(o("upload aborted"),r=null),h.status&&(r=h.status>=200&&h.status<300||304===h.status?"success":"error"),"success"===r?(c.success&&c.success.call(c.context,A,"success",h),j.resolve(h.responseText,"success",h),l&&e.event.trigger("ajaxSuccess",[h,c])):r&&(void 0===a&&(a=h.statusText),c.error&&c.error.call(c.context,h,r,a),j.reject(h,"error",a),l&&e.event.trigger("ajaxError",[h,c,a])),l&&e.event.trigger("ajaxComplete",[h,c]),l&&!--e.active&&e.event.trigger("ajaxStop"),c.complete&&c.complete.call(c.context,h,r),D=!0,c.timeout&&clearTimeout(b),setTimeout((function(){c.iframeTarget?f.attr("src",c.iframeSrc):f.remove(),h.responseXML=null}),100)}}}var X=e.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},L=function(t,a,r){var n=t.getResponseHeader("content-type")||"",o="xml"===a||!a&&n.indexOf("xml")>=0,i=o?t.responseXML:t.responseText;return o&&"parsererror"===i.documentElement.nodeName&&e.error&&e.error("parsererror"),r&&r.dataFilter&&(i=r.dataFilter(i,a)),"string"==typeof i&&("json"===a||!a&&n.indexOf("json")>=0?i=C(i):("script"===a||!a&&n.indexOf("javascript")>=0)&&e.globalEval(i)),i};return j}},e.fn.ajaxForm=function(t){if((t=t||{}).delegation=t.delegation&&e.isFunction(e.fn.on),!t.delegation&&0===this.length){var a={s:this.selector,c:this.context};return!e.isReady&&a.s?(o("DOM not ready, queuing ajaxForm"),e((function(){e(a.s,a.c).ajaxForm(t)})),this):(o("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return t.delegation?(e(document).off("submit.form-plugin",this.selector,r).off("click.form-plugin",this.selector,n).on("submit.form-plugin",this.selector,t,r).on("click.form-plugin",this.selector,t,n),this):this.ajaxFormUnbind().bind("submit.form-plugin",t,r).bind("click.form-plugin",t,n)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(a,r){var n=[];if(0===this.length)return n;var o,i,s,u,c,l,m,d,f=this[0],p=this.attr("id"),h=a?f.getElementsByTagName("*"):f.elements;if(h&&!/MSIE [678]/.test(navigator.userAgent)&&(h=e(h).get()),p&&(o=e(":input[form="+p+"]").get()).length&&(h=(h||[]).concat(o)),!h||!h.length)return n;for(i=0,m=h.length;i<m;i++)if((u=(l=h[i]).name)&&!l.disabled)if(a&&f.clk&&"image"==l.type)f.clk==l&&(n.push({name:u,value:e(l).val(),type:l.type}),n.push({name:u+".x",value:f.clk_x},{name:u+".y",value:f.clk_y}));else if((c=e.fieldValue(l,!0))&&c.constructor==Array)for(r&&r.push(l),s=0,d=c.length;s<d;s++)n.push({name:u,value:c[s]});else if(t.fileapi&&"file"==l.type){r&&r.push(l);var v=l.files;if(v.length)for(s=0;s<v.length;s++)n.push({name:u,value:v[s],type:l.type});else n.push({name:u,value:"",type:l.type})}else null!=c&&(r&&r.push(l),n.push({name:u,value:c,type:l.type,required:l.required}));if(!a&&f.clk){var x=e(f.clk),g=x[0];(u=g.name)&&!g.disabled&&"image"==g.type&&(n.push({name:u,value:x.val()}),n.push({name:u+".x",value:f.clk_x},{name:u+".y",value:f.clk_y}))}return n},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var a=[];return this.each((function(){var r=this.name;if(r){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var o=0,i=n.length;o<i;o++)a.push({name:r,value:n[o]});else null!=n&&a.push({name:this.name,value:n})}})),e.param(a)},e.fn.fieldValue=function(t){for(var a=[],r=0,n=this.length;r<n;r++){var o=this[r],i=e.fieldValue(o,t);null==i||i.constructor==Array&&!i.length||(i.constructor==Array?e.merge(a,i):a.push(i))}return a},e.fieldValue=function(t,a){var r=t.name,n=t.type,o=t.tagName.toLowerCase();if(void 0===a&&(a=!0),a&&(!r||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==o&&-1==t.selectedIndex))return null;if("select"==o){var i=t.selectedIndex;if(i<0)return null;for(var s=[],u=t.options,c="select-one"==n,l=c?i+1:u.length,m=c?i:0;m<l;m++){var d=u[m];if(d.selected){var f=d.value;if(f||(f=d.attributes&&d.attributes.value&&!d.attributes.value.specified?d.text:d.value),c)return f;s.push(f)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each((function(){e("input,select,textarea",this).clearFields(t)}))},e.fn.clearFields=e.fn.clearInputs=function(t){var a=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each((function(){var r=this.type,n=this.tagName.toLowerCase();a.test(r)||"textarea"==n?this.value="":"checkbox"==r||"radio"==r?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==r?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(!0===t&&/hidden/.test(r)||"string"==typeof t&&e(this).is(t))&&(this.value="")}))},e.fn.resetForm=function(){return this.each((function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()}))},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each((function(){this.disabled=!e}))},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each((function(){var a=this.type;if("checkbox"==a||"radio"==a)this.checked=t;else if("option"==this.tagName.toLowerCase()){var r=e(this).parent("select");t&&r[0]&&"select-one"==r[0].type&&r.find("option").selected(!1),this.selected=t}}))},e.fn.ajaxSubmit.debug=!1})),BX.ajax&&(BX._showWait=BX.showWait,BX.showWait=function(e,t){loader_Custom_ajax_shadow(e),BX._showWait(e,t)},BX._closeWait=BX.closeWait,BX.closeWait=function(e,t){checkForAjaxForms(e),loader_Custom_ajax_remove(),BX._closeWait(e,t)},BX.ajax._submitComponentForm=BX.ajax.submitComponentForm,BX.ajax.submitComponentForm=function(e,t){var a=$("#"+t);loader_Custom_ajax_shadow(a),BX.ajax._submitComponentForm(e,t),BX.addCustomEvent("onAjaxSuccess",(function(){loader_Custom_ajax_remove(),$("body").trigger("onAjaxReload",[a])}))},BX.ajax._insertToNode=BX.ajax.insertToNode,BX.ajax.insertToNode=function(e,t){var a=$("#"+t);loader_Custom_ajax_shadow(a);var r={url:e,dataType:"html",type:"GET",success:function(e){loader_Custom_ajax_remove(),$(a).html(e),checkForAjaxForms(),$("body").trigger("onAjaxReload",[a])}};$.ajax(r)});