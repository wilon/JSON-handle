//alert('content_scripts.js');


chrome.extension.sendRequest({cmd:'getIni'}, (function () {
	var _pub_static = function () {var _pri = {}, _pub = {};
		var _init = function (oIni) {

			if(oIni.able && _pri.isJson()) {
				_pri.createView();
			}

		};

		_pri["isJson"] = function () {

			var isJson = false, sData = '';
			
			var eF = document.body.firstChild;
			if(eF && eF.nodeType === 1) {
				eF = eF.firstChild;
			}
			sData = eF.data;

			if(sData) {
				if(sData.match(/^\s*[\[\{]/)) {
					try{
						var oJson = JSON.parse(sData);
						if(typeof oJson === 'object') {
							isJson = true;
						}
					}catch(e) {
						
					}
				}else{
					var sTempData = sData.slice(sData.indexOf('(')+1, sData.lastIndexOf(')'));
					try{
						if(typeof JSON.parse(sTempData) === 'object') {
							isJson = true;
							sData = sTempData;
						}
					}catch(e) {}
				}
			}

			_pri["sData"] = sData;

			return isJson;
		};
		

		_pri["createView"] = function () {

			chrome.extension.sendRequest({
				cmd : 'setJson'
				, sJson : _pri.sData
			}, function() {

				document.body.style.margin = '0';
				document.body.style.padding = '0';
				document.body.innerHTML = '';
				var oView = document.createElement('iframe');
				oView.style.width = '100%';
				oView.style.height = '100%';
				oView.style.border = 'none';
				//oView.src = 'http://toy.ggg/chromeEx/test/content_iframe.html';
				oView.src = chrome.extension.getURL("JSON-handle/JSON-handle.html");
				document.body.appendChild(oView);

			});

		};
		_init.apply(_pub, arguments);
		return _pub;
	};

	

	return _pub_static;
}()));


