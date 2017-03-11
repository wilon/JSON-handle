var oDefaultIni = {
	"able": true,
	"renderMode": 'rich',
	"openJhMode": 'win',
	"showLengthMode": 'array',
	"saveKeyStatus": true,
	"showLengthMode": 'array'
};


if(!localStorage['jhIni']) {
	localStorage['jhIni'] = JSON.stringify(oDefaultIni);
}

var Http = (function () {
	var _fun = function (oA){
		var oReq=_fun.createRequest(), oJson, i, l;
		if(oReq) {
			oA.headers = oA.headers || [];
			oA.method = oA.method || 'get';
			oA.async = oA.async === false?false:true;
			oA.clear = oA.clear === false?false:true;
			oA.resultType = oA.resultType || 'json';
			oA.onSuccess = oA.onSuccess || function () {};
			oA.onError = oA.onError || function () {};
			oA.onEnd = oA.onEnd || function () {};
			oReq.onreadystatechange=function(){
				var oReArg, bError = false, err;
				if(oReq.readyState == 1 && oA.onRead) {
					oA.onRead.call(oA, oReq, oA.context);
				}
				if(oReq.readyState == 2 && oA.onSent) {
					oA.onSent.call(oA, oReq, oA.context);
				}
				if(oReq.readyState == 3 && oA.onConnected) {
					oA.onConnected.call(oA, oReq, oA.context);
				}
				if(oReq.readyState == 4 && oA.onEnd) {
					switch(oA.resultType.toLowerCase()) {
						case 'text':
							oReArg = oReq.responseText;
							break;
						case 'xml':
							oReArg = oReq.responseXML;
							break;
						case 'xhr':
							oReArg = oReq;
							break;
						case 'json':
							if(!oReq.responseText) {
								bError = true;
							}else{
								oJson = JSON.parse(oReq.responseText);
								if(oJson.constructor === String) {
									bError = true;
								}else{
									oReArg = oJson;
								}
							}
							break;
						default:
							err = new Error('XHR.resultType 的值只能是 text | xml | xhr | json');
							err.message += err.stack;
							throw err;
					}
					if(oReq.status < 400 && !bError) {
						oA.onSuccess.call(oA, oReArg, oA.context);
					}else{
						oA.onError.call(oA, oReq, oA.context);
					}
					oA.onEnd.call(oA, oReq, oA.context);
				}
			};
			if(oA.clear) {
				if(oA.url.indexOf('?') != -1) {oA.url += '&';}
				else{oA.url += '?';}
				oA.url += 'clear_client_cache='+Math.random()+'_'+new Date().getTime();
			}
			oA.method = oA.method.toUpperCase();
			if(oA.method == 'GET' && oA.data) {
				if(oA.url.indexOf('?') != -1) {oA.url += '&';}
				else{oA.url += '?';}
				oA.url += oA.data;
			}
			oReq.open(oA.method,oA.url,oA.async,oA.un,oA.pw);//print_r('Value = '+oA.method+' || '+oA.url+' || '+oA.async+' || '+oA.un+' || '+oA.pw,false);
			oReq.setRequestHeader("request-method", "XMLHttpRequest");
			if(oA.method == 'POST') {
				oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			}
			if(oA.headers && oA.headers.length) {
				for(i=0, l=oA.headers.length; i<l; i++) {
					oReq.setRequestHeader(oA.headers[i][0], oA.headers[i][1]);
				}
			}
			if(!oA.data) {oA.data = null;}
			oReq.send(oA.data);
		}else{
			oReq = false;
		}
		return oReq;
	};

	_fun["createRequest"] = function(){
		for(var i=0; i<_fun.api.length; i++){
			try{
				var request=_fun.api[i]();
				return request;
			}
			catch(e){
				continue;
			}
		}
		//alert("XMLHttpRequest not supported");
		return false;
	};

	_fun["api"] = [
		function(){return new XMLHttpRequest();},
		function(){return new ActiveXObject("Microsoft.XMLHTTP");},
		function(){return new ActiveXObject("Msxml2.XMLHTTP");}
	];

	return _fun;
}());




chrome.browserAction.onClicked.addListener(function( tab ) {
	var jsonH_url = chrome.extension.getURL("JSON-handle/JSON-handle.html");
	var oIni = JSON.parse(localStorage['jhIni'] || {});
	if(oIni.openJhMode === 'tab') {
		chrome.tabs.create({"url":jsonH_url, "selected":true});
	}else{
		chrome.windows.create({url: jsonH_url, type: "popup", width: 1024, height: 768});
	}
});

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {


	switch(request.cmd) {
		case 'setJson':
			chrome.browserAction.sJson = request.sJson;
			sendResponse({});
			break;
		case 'openTab':
			chrome.tabs.create({"url":request.data, "selected":true}, function (oTab) {
				chrome.windows.update(oTab.windowId, {
					focused : true
				});
			});
			sendResponse({});
			break;
		case 'getAdData':
			var oHttp = Http({
				method:'GET',
				url:request.data.url,
				resultType:'json' ,
				onSuccess:function (oJson) {
					sendResponse(oJson);
				}
			});
			
			break;
		case 'getJson':
			sendResponse(chrome.browserAction.sJson);
			chrome.browserAction.sJson = null;
			break;
		case 'setIni':
			var oIni = JSON.parse(localStorage['jhIni']);
			var i;
			for (i in request.oIni) {if(request.oIni.hasOwnProperty(i)) {
				oIni[i] = request.oIni[i];
			}}
			localStorage['jhIni'] = JSON.stringify(oIni);
			sendResponse({});
			break;
		case 'getIni':
			var sIni = localStorage['jhIni'] || '{}';
			var oIni = JSON.parse(sIni);
			for (var k in oDefaultIni) {
				if(oIni[k] === undefined) {
					oIni[k] = oDefaultIni[k];
				}
			}
			sendResponse(oIni);
			break;
		case 'getJhData':
			sendResponse({
				jhPath : chrome.extension.getURL('JSON-handle/')
			});
			break;
		case 'env js ok':
		case 'content script ok':
			break;
		default:
			throw new Error('bg 收到的 cmd 不正确');
		
	}

});


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if(changeInfo.status == 'loading') {
		chrome.tabs.executeScript(tabId, {
			runAt : 'document_start',
			code : [

				'try{',
					'var bHasScript = document.querySelectorAll("script").length > 0;',
					'var bHasCss = document.querySelectorAll(\'link[rel="stylesheet"]\').length > 0;',
					'var bHasTitle = !!document.getElementsByTagName("title").length;',
					//'debugger;alert(document.documentElement.innerHTML);',
				'}catch(e) {}'

			].join('')
		});
	}
});



chrome.webRequest.onResponseStarted.addListener(function (oD) {
	if(oD.responseHeaders && oD.type === 'main_frame') {
		var sContetnType = '';
		oD.responseHeaders.some(function (o) {
			if(o.name.toLowerCase() === 'content-type') {
				sContetnType = o.value;
			}
		});

		if(sContetnType.split(';')[0] === 'text/html') {
			chrome.tabs.executeScript(oD.tabId, {
				runAt : 'document_start',
				code : [

					'var beHtml = true;'

				].join('')
			});
		}
	}
	
},{urls: ['<all_urls>']}, ['responseHeaders']);