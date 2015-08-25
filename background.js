

chrome.browserAction.onClicked.addListener(function( tab ) {
	var jsonH_url = chrome.extension.getURL("JSON-handle/JSON-handle.html");
	chrome.tabs.create({"url":jsonH_url, "selected":true});
});

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {

	if(localStorage['jhIni'] === undefined) {
		localStorage['jhIni'] = JSON.stringify({
			able : true
			, lang : 'en'
			, holdPanel : true
			, showValue : true
			, showIco : false
			, showStyle : ''
		});
	}

	switch(request.cmd) {
		case 'setJson':
			chrome.browserAction.sJson = request.sJson;
			sendResponse({});
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
			sendResponse(JSON.parse(localStorage['jhIni']));
			break;
		default:
			throw new Error('bg 收到的 cmd 不正确');
		
	}

});
