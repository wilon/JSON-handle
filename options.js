JH.mod.add(['lang', 'ad'], 'browser_action', function (modName, JH, $$) {
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

			//$(function () {
				
				_pri.getIni(function (oResp) {
					var oIni = oResp.data;
					_pri.createAdList(oIni);
					_pri.loadSetting(oIni);

					if(location.hash === '#ad') {
						_pri.hideAd();
						setTimeout(function() {
							_pri.showAd();
						},1000);
					}
				});

			//});
			



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
				aboutAdBtn : JH.e('#aboutAdBtn'),
				closeAdBtn : JH.e('#closeAdBtn'),
				showLengthMode : $('input[name=showLengthMode]'),
				showImgMode : $('input[name=showImgMode]'),
				openJhMode : $('input[name=openJhMode]'),
				renderMode : $('input[name=renderMode]'),
				saveKeyStatus : JH.e('#saveKeyStatus'),
				lang : JH.e('#lang')
			};
			
		};
		//-------------------------------------------


		//+++ 界面事件绑定逻辑定义区 +++++++++++++
		_uiEvt = function () {
			JH.addEvent(_pri.node['able'], 'click', _pri.uiEvtCallback.clickAble);
			JH.addEvent(_pri.node['defaultShowPanel'], 'click', _pri.uiEvtCallback.clickDefaultShowPanel);
			JH.addEvent(_pri.node['saveKeyStatus'], 'click', _pri.uiEvtCallback.clickSaveKeyStatus);
			JH.addEvent(_pri.node['lang'], 'change', _pri.uiEvtCallback.changeLang);
			//JH.addEvent(_pri.node['open'], 'click', _pri.uiEvtCallback.clickOpen);
			JH.addEvent(_pri.node['ok'], 'click', _pri.uiEvtCallback.clickOk);
			JH.addEvent(_pri.node['closeAdBtn'], 'click', _pri.uiEvtCallback.clickCloseAdBtn);
			JH.addEvent(_pri.node['aboutAdBtn'], 'click', _pri.uiEvtCallback.clickAboutAdBtn);
			$(_pri.node['showImgMode']).on('click', _pri.uiEvtCallback.clickShowImgMode);
			$(_pri.node['showLengthMode']).on('click', _pri.uiEvtCallback.clickShowLengthMode);
			$(_pri.node['openJhMode']).on('click', _pri.uiEvtCallback.clickOpenJhMode);
			$(_pri.node['renderMode']).on('click', _pri.uiEvtCallback.clickRenderMode);
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


		_pri["request"] = JH.request(_pub);

		JH.mergePropertyFrom(_pri, {
		//+++ 私有属性和方法定义区 +++++++++++++
			hideAd : function () {
				$('.ad-help').addClass('hide');
					_pri.saveSetting('hideAdList', true);
			},
			showAd : function () {
				$('.ad-help').removeClass('hide');
					_pri.saveSetting('hideAdList', false);
			},
			createAdList : function (oIni) {
				//$$.ad(oIni).getAdList(function (aList) {
					//var sHtml = aList.map(function (o) {
						//return o.showInOpt ? [
							//'<li>',
								//'<h4>',
									//'<a class="title langID_data" target="_blank" href="'+_pri.encodeToXMLchar(o.url)+'" data-lang="'+_pri.createLangJsonStr(o.lang, 'title')+'">'+_pri.encodeToXMLchar(o.title)+'</a>',
									//'<span>( <a href="'+_pri.encodeToXMLchar(o.url)+'" target="_blank">'+_pri.encodeToXMLchar(o.site)+'</a> )</span>',
								//'</h4>',
								//'<p class="langID_data" data-lang="'+_pri.createLangJsonStr(o.lang, 'desc')+'">'+_pri.encodeToXMLchar(o.desc)+'</p>',
								//'<a class="title" target="_blank" href="'+_pri.encodeToXMLchar(o.url)+'"><img src="'+o.pic+'" alt="" /></a>',
							//'</li>'
						//].join('\n') : '';
					//}).join('');
					//$('.ad-list ul').html(sHtml);
				//});
			},
			createLangData : function (oLang, sName) {
				var o = {};
				JH.forIn(oLang, function (v, k) {
					o[k] = v[sName];
				});
				return o;
			},
			createLangJsonStr : function (oLang, sName) {
				var o = _pri.createLangData(oLang, sName);
				return _pri.encodeToXMLchar(JSON.stringify(o));
			},
			"encodeToXMLchar" : function (sValue) {
				return sValue.replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;').replace(/\"/g,'&quot;');
			},
			"setIni" : _pri.request.create(JH.request.NS.opt, 'setIni'),
			"getIni" : function (cb) {
				_pri.request.create(JH.request.NS.opt, 'getIni', {
					succeed : function (oIni) {
						cb(oIni);
					}
				}).send();
			},
			loadSetting : function (oIni) {
				_pri.node['able'].checked = oIni.able;
				_pri.node['defaultShowPanel'].checked = oIni.holdPanel;
				_pri.node['saveKeyStatus'].checked = oIni.saveKeyStatus;
				$('input[name=showImgMode][value='+oIni.showImgMode+']').prop('checked', true);
				$('input[name=openJhMode][value='+oIni.openJhMode+']').prop('checked', true);
				$('input[name=showLengthMode][value='+oIni.showLengthMode+']').prop('checked', true);
				$('input[name=renderMode][value='+oIni.renderMode+']').prop('checked', true);
				if(!oIni.hideAdList) {
					_pri.showAd();
				}else{
					_pri.hideAd();
				}
				_pri.setLang(oIni.lang);
				$('body').css('visibility', 'visible');
			},
			setLang : function (sLang) {
				_pri.node['lang'].value = sLang;
				_pri.oLang = $$.lang(sLang);
				_pri.oLang.setPage();
			},
			saveSetting : function (sKey, sValue) {
				var o = {};
				o[sKey] = sValue;
				_pri.setIni.send(o);
			},
			uiEvtCallback : {
				clickOpenJhMode : function () {
					_pri.saveSetting(this.name, this.value);
				},
				clickRenderMode : function () {
					_pri.saveSetting(this.name, this.value);
				},
				clickShowImgMode : function () {
					_pri.saveSetting(this.name, this.value);
				},
				clickCloseAdBtn : function () {
					_pri.hideAd();
				},
				clickAboutAdBtn : function () {
					if($('.ad-help').hasClass('hide')) {
						_pri.showAd();
					}else{
						_pri.hideAd();
					}
				},
				clickAble : function () {
					_pri.saveSetting('able', this.checked);
				},
				clickDefaultShowPanel : function () {
					_pri.saveSetting('holdPanel', this.checked);
				},
				clickShowLengthMode : function () {
					_pri.saveSetting(this.name, this.value);
				},
				clickSaveKeyStatus : function () {
					_pri.saveSetting('saveKeyStatus', this.checked);
				},
				changeLang : function () {
					var sLang = this.value;
					_pri.saveSetting('lang', sLang);
					_pri.oLang.switchLang(sLang).setPage();
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






