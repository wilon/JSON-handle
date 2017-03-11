//alert('content_scripts.js');

chrome.extension.sendRequest({cmd:'getIni'}, (function () {
	var _pub_static = function () {var _pri = {}, _pub = {};
		var _init = function (oIni) {

			if(oIni.able && _pri.isJson()) {
				_pri.createView();
			}
		};

		_pri["getTheJSON"] = function () {
			var arr = [];
			var sData = '';

			[].slice.call(document.getElementsByTagName('*')).filter(function (e) {
				return (e.offsetHeight + e.offsetWidth) > 0;
			}).forEach(function (e) {
				var sT = '';
				[].slice.call(e.childNodes).forEach(function (e) {
					if(e.nodeType === document.TEXT_NODE) {
						sT += e.data;
					}else{
						arr.push(sT);
						sT = '';
					}
				});
				sT && arr.push(sT);
				
			});

			arr = arr.filter(function (s) {
				return s.trim();
			});

			sData = arr[0] || '';
			arr.forEach(function (e) {
				try{

					var isJson = false;

					if(sData) {
						if(sData.match(/^\s*[\[\{]/)) {
								var oJson = JSON.parse(sData);
								if(typeof oJson === 'object') {
									isJson = true;
								}
						}else{
							var sTempData = sData.slice(sData.indexOf('(')+1, sData.lastIndexOf(')'));
								if(typeof JSON.parse(sTempData) === 'object') {
									isJson = true;
									sData = sTempData;
								}
						}

					}
				}catch(e) {}
				
				if(e.length > sData.length) {
					sData = sData || e;
				}

				if(!isJson) {
					sData = '';
				}
			});
			return sData;
		};

		_pri["isJson"] = function () {

			var isJson = false, sData = '';
			
			try{
				if(window.beHtml) {
					if(window.bHasTitle && window.bHasScript && window.bHasCss) {
						return false;
					}
				}
				sData = _pri.getTheJSON();


			}catch(e) {}

			isJson = !!sData;

			_pri["sData"] = sData;

			return isJson;
		};
		

		_pri["createView"] = function () {

			chrome.extension.sendRequest({
				cmd : 'setJson'
				, sJson : _pri.sData
			}, function() {

				var sStyle = [
					'html {height:100%;}',
					'body {margin:0;padding:0;height:100%;overflow:hidden;}',
					'.tips-loading {color:#ccc;font-size:12px;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;width:80%;text-align:center;height:50%;}'
				].join('');

				var eStyle = document.createElement('style');
				eStyle.innerHTML = sStyle;
				document.getElementsByTagName('head')[0].appendChild(eStyle);

				document.body.innerHTML = '<span class="_tipsLoading tips-loading">JSON-Handle is loading...</span>';
				var oView = document.createElement('iframe');
				oView.style.width = '100%';
				oView.style.height = '100%';
				oView.style.border = 'none';
				//oView.src = 'http://toy.ggg/chromeEx/test/content_iframe.html';
				oView.src = chrome.extension.getURL("JSON-handle/JSON-handle.html");
				document.body.appendChild(oView);
				window.addEventListener( "message", function (evt) {
					var $tipsLoading = document.querySelector('._tipsLoading');
					if(evt.data.cmd === 'jhLoadedError') {
						$tipsLoading.innerHTML = 'JSON-Handle throw a error msg : <br />' + evt.data.msg;
					}else{
						$tipsLoading.parentNode.removeChild($tipsLoading);
					}
				}, false);
			});

		};
		_init.apply(_pub, arguments);
		return _pub;
	};

	

	return _pub_static;
}()));


