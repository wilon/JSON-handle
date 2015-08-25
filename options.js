
JH.mod.add('browser_action', function (modName, JH) {
	//+++ 实现接口定义区 +++++++++++++
		var _interface = [];
	//-------------------------------------------

	//+++ 静态私有成员定义区 +++++++++++++
		var _pri_static = {
			
		};
	//-------------------------------------------

	//+++ 静态保护成员定义区 +++++++++++++
		var _pro_static = {
			
		};
	//-------------------------------------------

	var _pub_static = function () {
		var _checkArgs, _parseDOM, _init, _uiEvt, _custEvt, _airEvt, _main, _this = this, _args = arguments, _pri = {}, _pro = {}, _pub = {__varyContext_:function (pro, pub) {_pro = pro;_pub = pub;}}, _mod, _base, _parent;

		//+++ 模块的主体逻辑定义区 +++++++++++++
		_main = function () {
			_pub = JH.mod.init(_pub_static, _this, _pro, _pub, _pro_static, _interface).pub;

			_pri.loadSetting();

			

		};
		//-------------------------------------------

		//+++ 参数验证、预处理的逻辑定义区 +++++++++++++
		_checkArgs = function () {
			if(!1) {
				JH.throwLine('缺少模块入口节点');
			}
		};
		//-------------------------------------------


		//+++ 获取操作节点逻辑定义区 +++++++++++++
		_parseDOM = function () {

			_pri.node = {
				able : JH.e('#able'),
				open : JH.e('#open'),
				ok : JH.e('#ok'),
				defaultShowPanel : JH.e('#defaultShowPanel'),
				lang : JH.e('#lang')
			};
			
		};
		//-------------------------------------------


		//+++ 界面事件绑定逻辑定义区 +++++++++++++
		_uiEvt = function () {
			JH.addEvent(_pri.node['able'], 'click', _pri.uiEvtCallback.clickAble);
			JH.addEvent(_pri.node['defaultShowPanel'], 'click', _pri.uiEvtCallback.clickDefaultShowPanel);
			JH.addEvent(_pri.node['lang'], 'change', _pri.uiEvtCallback.changeLang);
			//JH.addEvent(_pri.node['open'], 'click', _pri.uiEvtCallback.clickOpen);
			JH.addEvent(_pri.node['ok'], 'click', _pri.uiEvtCallback.clickOk);
		};
		//-------------------------------------------


		//+++ 自定义事件声明逻辑定义区 +++++++++++++
		_custEvt = function () {
			
		};
		//-------------------------------------------


		//+++ 广播事件绑定逻辑定义区 +++++++++++++
		_airEvt = function () {
			
		};
		//-------------------------------------------


		JH.mergePropertyFrom(_pri, {
		//+++ 私有属性和方法定义区 +++++++++++++
			loadSetting : function () {
				_pri.node['able'].checked = _pri.getSetting('able');
				_pri.node['defaultShowPanel'].checked = _pri.getSetting('holdPanel');
				_pri.setLang(_pri.getSetting('lang'));
			},
			setLang : function (sLang) {
				_pri.node['lang'].value = sLang;
			},
			getSetting : function (sKey) {
				return JSON.parse(localStorage['jhIni'])[sKey];
			},
			saveSetting : function (sKey, sValue) {
				var oIni = JSON.parse(localStorage['jhIni']);
				oIni[sKey] = sValue;
				localStorage['jhIni'] = JSON.stringify(oIni);
			},
			uiEvtCallback : {
				clickAble : function () {
					_pri.saveSetting('able', this.checked);
				},
				clickDefaultShowPanel : function () {
					_pri.saveSetting('holdPanel', this.checked);
				},
				changeLang : function () {
					_pri.saveSetting('lang', this.value);
				},
				clickOk : function () {
					//alert(localStorage['able'] + ' | ' + localStorage['lang']);
					window.close();
				},
				clickOpen : function () {
					var jsonH_url = chrome.extension.getURL("JSON-handle/JSON-handle.html");
					chrome.tabs.create({"url":jsonH_url, "selected":true});
					//console.log(localStorage);
					window.close();
				}
			}


			
		//-------------------------------------------
		});

		JH.mergePropertyFrom(_pro, {
		//+++ 保护属性和方法定义区 +++++++++++++
			
		//-------------------------------------------
		});

		JH.mergePropertyFrom(_pub, {
		//+++ 公开属性和方法的定义区 +++++++++++++
			
			"destroy" : function(){
				if(_pub) {
					
					_pri = _pro = _pub = null;
				}
			}
		//-------------------------------------------
		});


		//+++ 模块逻辑执行定义区 +++++++++++++
		_init= function(){
			_checkArgs();
			_parseDOM();
			_main();
			_uiEvt();
			_custEvt();
			_airEvt();
		};
		_init();
		//-------------------------------------------


		return _pub;
		
	};

	return JH.mergePropertyFrom(_pub_static, {
	//+++ 静态公开成员的定义区 +++++++++++++
		
	//-------------------------------------------
	});
})();






