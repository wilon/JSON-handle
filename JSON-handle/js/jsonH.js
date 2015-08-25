
JH.mod.add(['jsonH.nav', 'listenResizeWin'], 'jsonH', function (modName, JH, $$) {
    
        var _interface = [];
        
        
    

    

        var _pri_static = {
            langOut : function (key) {
                var sKey = _pri_static.langPack[_pub_static.language][key];
                if(sKey.call) {
                    return sKey.apply(sKey, arguments);
                }else{
                    return sKey;
                }
            },
            // _pri_static.langOut('msg_1')
            // .langID_msg_1
            langPack : {
                'zh-cn' : {
                    'title_1' : '路径:',
                    'title_2' : '键:',
                    'title_3' : '链接',
                    'button_1' : '修改',
                    'button_2' : '-全部收起',
                    'button_3' : '展开到选中节点',
                    'button_4' : '+全部展开',
                    'button_5' : '\u21e6撤销',
                    'button_6' : '前进\u21e8',
                    'button_7' : '跳到选中节点',
                    'button_8' : '保存',
                    'button_9' : '复制',
                    'label_1' : '显示值',
                    'label_2' : '显示图标',
                    'label_3' : '文件夹风格',
                    'msg_1' : '需要选择一个节点',
                    'msg_2' : 'JSON格式错误 : 输入的内容无法被解析 !',
                    'msg_3' : '请输入JSON字符串.....',
                    'msg_4' : 'JSON格式错误', 
                    'msg_5' : function (key, iLine) {
                        return '@第' + iLine + '行';
                    }
                },
                'zh-tw' : {
                    'title_1' : '路徑:',
                    'title_2' : '鍵:',
                    'title_3' : '鏈接',
                    'button_1' : '更改',
                    'button_2' : '-全部收起',
                    'button_3' : '展開到選中節點',
                    'button_4' : '+全部展開',
                    'button_5' : '\u21e6撤銷',
                    'button_6' : '前進\u21e8',
                    'button_7' : '跳到選中節點',
                    'button_8' : '存儲',
                    'button_9' : '复制',
                    'label_1' : '顯示值',
                    'label_2' : '顯示圖標',
                    'label_3' : '資料夾風格',
                    'msg_1' : '需要選擇一個節點',
                    'msg_2' : 'JSON格式錯誤 : 輸入的內容無法被解析 !',
                    'msg_3' : '請輸入JSON字串.....',
                    'msg_4' : 'JSON格式錯誤', 
                    'msg_5' : function (key, iLine) {
                        return '@第' + iLine + '行';
                    }
                },
                'en' : {
                    'title_1' : 'Path:',
                    'title_2' : 'Key:',
                    'title_3' : 'Link',
                    'button_1' : 'modify',
                    'button_2' : '-collapse all',
                    'button_3' : 'expand node',
                    'button_4' : '+expand all',
                    'button_5' : '\u21e6undo',
                    'button_6' : 'redo\u21e8',
                    'button_7' : 'goto node',
                    'button_8' : 'save',
                    'button_9' : 'copy',
                    'label_1' : 'show value',
                    'label_2' : 'show ico',
                    'label_3' : 'folder style',
                    'msg_1' : 'must select a node',
                    'msg_2' : 'JSON format error : Can\'t parse the value of input !',
                    'msg_3' : 'input JSON string.....',
                    'msg_4' : 'JSON format error', 
                    'msg_5' : function (key, iLine) {
                        return '@line ' + iLine;
                    }
                }
            }
        };
    

    
        var _pro_static = {
            
        };
    

    var _pub_static = function (sJson) {
        var _checkArgs, _parseDOM, _init, _uiEvt, _custEvt, _airEvt, _main, _this = this, _args = arguments, _pri = {}, _pro = {}, _pub = {__varyContext_:function (pro, pub) {_pro = pro;_pub = pub;}}, _mod, _base, _parent;
        

        
        _main = function () {
            _pub = JH.mod.init(_pub_static, _this, _pro, _pub, _pro_static, _interface).pub;


            _pro.oTreeNav = $$.jsonH.nav('#jsonNav');

            _pri.oTreeNavListener = JH.event.buildListener(_pub);
            
            _pri.oTreeNavListener.add(_pro.oTreeNav, 'clickElm', function () {
                if(!_pri.holdPanel) {
                    _pub.showPanel();
                }
            });
            
            if(_pri.goEnterInput) {
                _pri.showEnterInputDialog(sJson);
            }else{
                _pro.oTreeNav.build(_pro.oTreeNav.JSON.parse(sJson));
            }
            
            _pub.checkIcoAsFolderBtn($('#icoAsFolder')[0]);
            _pub.checkShowValueInNav($('#showValueInNav')[0]);
            _pub.checkShowIco($('#showIco')[0]);
            
            _pub.resetLang();

            var iSI = setInterval(function() {try{
                if(_pri.sTempShowValue != _pri.node['showValue'].value) {
                    _pri.sTempShowValue = _pri.node['showValue'].value;
                    _pri.node['showValue'].style.color = '#000';
                    $('#msgBox').html('');
                }
            }catch(e) {alert(e);clearInterval(iSI);}},500);
            $$.listenResizeWin.add(_pri.resizeLayout);
            _pri.resizeLayout($$.listenResizeWin.checkResize());
        };
        

        
        _checkArgs = function () {
            if(!sJson) {
                _pri.goEnterInput = true;
            }
        };
        


        
        _parseDOM = function () {

            _pri.node = {
                showValue : JH.e('#showValue'),
                enterValue : JH.e('#enterValue'),
                undoBtn : JH.e('#undoBtn'),
                enterForm : JH.e('#enterForm'),
                minBtn : JH.e('#minBtn'),
                valueAct : JH.e('#valueAct'),
                panel : JH.e('#panel'),
                saveFile : JH.e('#saveFile'),
                enterInputTips : JH.e('#enterInputTips'),
                redoBtn : JH.e('#redoBtn')
            };

        };
        


        
        _uiEvt = function () {
            $('#saveBtn').on('click', _pri.uiEvtCallback.clickSaveBtn);
            $('#copyBtn').on('click', _pri.uiEvtCallback.clickCopyBtn);
            $('#showIco').on('click', _pri.uiEvtCallback.clickShowIco);
            $('#icoAsFolder').on('click', _pri.uiEvtCallback.clickIcoAsFolder);
            $('#expandAll').on('click', _pri.uiEvtCallback.clickExpandAll);
            $('#expandCur').on('click', _pri.uiEvtCallback.clickExpandCur);
            $('#collapseAll').on('click', _pri.uiEvtCallback.clickCollapseAll);
            $('#gotoCur').on('click', _pri.uiEvtCallback.clickGotoCur);
            //$('#saveFile').on('click', _pri.uiEvtCallback.clickSaveFile);
            $('#showValueInNav').on('click', _pri.uiEvtCallback.clickShowValueInNav);
            $(_pri.node['undoBtn']).on('click', _pri.uiEvtCallback.clickUndoBtn);
            $(_pri.node['redoBtn']).on('click', _pri.uiEvtCallback.clickRedoBtn);
            $(_pri.node['minBtn']).on('click', _pri.uiEvtCallback.clickMinBtn);
            $(_pri.node['enterForm']).on('submit', _pri.uiEvtCallback.submitEnterForm);
            $('#closeError').on('click', _pri.uiEvtCallback.clickCloseError);
            $('#sigh').on('click', _pri.uiEvtCallback.clickSigh);
            $('#showValue, #enterValue').on('focus', function () {
                if(!_pri.holdErrorTips) {
                    $('#errorTips').hide();
                }
            });
            

        };
        


        
        _custEvt = function () {
            
        };
        


        
        _airEvt = function () {
            
        };
        

        _pri["request"] = JH.request(_pub);

        _pub["showPanel"] = function (bIni) {
            $(_pri.node['panel']).removeClass('min');
            _pri.node['minBtn'].innerHTML = '◥';
            if(bIni) {
                setTimeout(function() {
                    $(_pri.node['panel']).removeClass('disTransition');
                },500);
            }
        };

        _pub["hidePanel"] = function (bIni) {
            $(_pri.node['panel']).addClass('min');
            _pri.node['minBtn'].innerHTML = '◣';
            if(bIni) {
                setTimeout(function() {
                    $(_pri.node['panel']).removeClass('disTransition');
                },500);
            }
        };

        JH.mergePropertyFrom(_pri, {
            "setIniRequest" : _pri.request.create(JH.request.NS.jsonH, 'setIni'),
            "uiEvtCallback" : {
                clickGotoCur : function () {
                    var eCurr = _pro.oTreeNav.gotoCurrElm();
                },
                clickMinBtn : function () {
                    _pri.holdPanel = true;
                    if($(_pri.node['panel']).hasClass('min')) {
                        _pub.showPanel();
                    }else{
                        _pub.hidePanel();
                    }
                },
                submitEnterForm : function () {
                    var sData = _pri.node['enterValue'].value;
                    var sTxt = _pri.filterStrFormat(sData);
                    _pri.hasError = false;
                    try{
                        _pro.oTreeNav.build(_pro.oTreeNav.JSON.parse(sTxt));
                        _pri.hideEnterInputDialog();
                    }catch(e) {
                        try{
                            var sTempData = sData.slice(sData.indexOf('(')+1, sData.lastIndexOf(')'));
                            _pro.oTreeNav.build(_pro.oTreeNav.JSON.parse(sTempData));
                            _pri.hideEnterInputDialog();
                        }catch(e) {
                            _pri.node['enterInputTips'].style.color = 'red';
                            _pri.showErrorTips(sData);
                            _pri.hasError = true;
                        }
                    }
                    
                    if(!_pri.hasError) {
                        $('#errorTips, #sigh').hide();
                    }else{
                        $('#errorTips, #sigh').show();
                    }
                    
                    
                    return false;
                },
                clickUndoBtn : function () {
                    _pri.historyGoBack();
                },
                clickSaveFile : function () {
                    //this.disabled = false;
                },
                clickRedoBtn : function () {
                    _pri.historyGoForward();
                },
                clickSaveBtn : function () {
                    var sCurId, sEval, eCurId = _pro.oTreeNav.getCur(), oResult;
                    if(!eCurId) {
                        _pri.showMsg(_pri_static.langOut('msg_1'));
                        return false;
                    }
                    sCurId = eCurId.id;
                    var oData = _pro.oTreeNav.getData();
                    var oHistoryData = oData;
                    _pri.hasError = false;
                    try{
                        //eval('(' + $('#showValue').val() + ');');
                        var sTxt = _pri.filterStrFormat($('#showValue').val());
                        oResult = _pro.oTreeNav.JSON.parse(sTxt);
                        //debugger;
                        if($('#showKey').val() !== $('#showKey').attr('oldValue')) {
                            var sNewKey = $('#showKey').val().replace(/\'/g, '\\\'');
                            sEval = 'delete ' + 'oData' + $('#showPath').val().slice(4) + ';' + 'oData' + $('#showPath').attr('parentpath').slice(4) + "['" + sNewKey + "']" ;
                        }else{
                            sEval = $('#showPath').val().slice(5);
                        }


                        _pri.pushToHistory([oHistoryData, sCurId]);
                        _pri.node['undoBtn'].style.visibility = 'visible';
                        _pri.node['redoBtn'].style.visibility = 'hidden';
                        if(sEval) {
                            JH.setTo(oResult, sEval, oData);
                        }else{
                            oData = oResult;
                        }
                        //console.log(sEval+'| '+oResult+'| '+ oData);
                        //eval(sEval);
                        sCurId = _pro.oTreeNav.getCur().id;
                        //debugger;
                        _pro.oTreeNav.build(oData);
                        _pro.oTreeNav.collapseAll();
                        _pro.oTreeNav.expandCur(sCurId);
                        _pri.node['saveFile'].disabled = false;
                    }catch(e) {
                        alert('var')
                        _pri.hasError = true;
                        $('#msgBox').html(_pri_static.langOut('msg_2'));
                        _pri.sTempShowValue = _pri.node['showValue'].value;
                        $('#showValue').css('color', 'red');
                        _pri.showErrorTips(_pri.sTempShowValue);
                    }
                    // if(!_pri.hasError) {
                    //     $('#errorTips, #sigh').hide();
                    // }else{
                    //     $('#errorTips, #sigh').show();
                    // }
                },
                clickCopyBtn : function () {
                    var str
                    try {
                        var obj = $.parseJSON($('#showValue').val());
                        if (typeof obj == 'object') {
                            str = JSON.stringify(obj);
                        } else {
                            str = obj;
                        }
                    } catch(e) {
                        str = $('#showValue').val();
                    }
                    if (copyTextToClipboard(str)) {
                        _pri.showMsg('Copy Success!');
                    } else {
                        _pri.showMsg('Copy Failed');
                    }

                },
                clickShowValueInNav : function () {
                    _pri.setIniRequest.send({
                        showValue : _pub.checkShowValueInNav(this)
                    });
                },
                clickShowIco : function () {
                    _pri.setIniRequest.send({
                        showIco : _pub.checkShowIco(this)
                    });
                },
                clickIcoAsFolder : function () {
                    _pri.setIniRequest.send({
                        showStyle : _pub.checkIcoAsFolderBtn(this) ? 'folder' : ''
                    });
                },
                clickExpandAll : function () {
                    _pro.oTreeNav.expandAll(this);
                },
                clickExpandCur : function () {
                    var eCur = _pro.oTreeNav.getCur();
                    if(eCur) {
                        _pro.oTreeNav.collapseAll();
                        _pro.oTreeNav.expandCur();
                    }else{
                        _pri.showMsg(_pri_static.langOut('msg_1'));
                    }

                },
                clickCollapseAll : function () {
                    _pro.oTreeNav.collapseAll();
                },
                clickCloseError : function () {
                    $('#errorTips').toggle();
                },
                clickSigh : function () {
                    $('#errorTips').toggle();
                    _pri.holdErrorTips = true;
                }
            },
            "resizeLayout" : function (oWH) {
                $('#showValue').height(
                    oWH.height * 0.8
                    - 220
                );
            },
            "filterStrFormat" : function (s) {
                s = s.replace(/^\s+/, '').replace(/\s+$/, '');
                if(s.substr(0, 1) === '"' && s.substr(-1, 1) === '"') {
                    s = s.replace(/\n/g, '\\n').replace(/\r/g, '').replace(/\t/g, '\\t');
                }
                return s;
            },
            "encodeToXMLchar" : function (sValue) {
                return sValue.replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;').replace(/\"/g,'&quot;');
            },
            "pushToHistory" : function (aData) {
                // [oData, sCurId]
                _pri.historyBackData = [_pro.oTreeNav.JSON.parse(_pro.oTreeNav.JSON.stringify(aData[0])), aData[1]];
            },
            "showErrorTips" : function (sJson) {
                var oJsonCheck = oLineCode(sJson);
                if(oJsonCheck.oError) {
                    var s = _pri_static.langOut('msg_4') + _pri_static.langOut('msg_5', oJsonCheck.oError.line+1) + ' : ' + '<span id="errorTarget">'+oJsonCheck.oError.lineText+'</span>';
                    $('#tipsBox').html(s);
                    _pri["holdErrorTips"] = false;
                }else{
                    //alert('ok');
                }
                $('#errorCode').html(oJsonCheck.dom);
            },
            "historyGoBack" : function () {
                if(_pri.historyBackData) {
                    _pri.historyForwardData = [_pro.oTreeNav.getData(), _pro.oTreeNav.getCur().id];
                    _pro.oTreeNav.build(_pri.historyBackData[0]);
                    _pro.oTreeNav.expandCur(_pri.historyBackData[1]);
                    _pri.node['undoBtn'].style.visibility = 'hidden';
                    _pri.node['redoBtn'].style.visibility = 'visible';
                }
            },
            "historyGoForward" : function () {
                if(_pri.historyForwardData) {
                    _pri.historyBackData = [_pro.oTreeNav.getData(), _pro.oTreeNav.getCur().id];
                    _pro.oTreeNav.build(_pri.historyForwardData[0]);
                    _pro.oTreeNav.expandCur(_pri.historyForwardData[1]);
                    _pri.node['undoBtn'].style.visibility = 'visible';
                    _pri.node['redoBtn'].style.visibility = 'hidden';
                }
            },
            "showMsg" : function (sMsg) {
                $('#msgBox').html(sMsg);
                clearTimeout(_pri.showMsg.iS);
                _pri.showMsg.iS = setTimeout(function() {
                    $('#msgBox').html('');
                },4000);
            },
            "showEnterInputDialog" : function (sJson) {
                sJson = sJson || '\u007b\u000d\u000a\u0020\u0020\u0020\u0020\u0022\u006c\u0031\u0022\u003a\u0020\u007b\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0031\u005f\u0031\u0022\u003a\u0020\u005b\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0031\u005f\u0031\u005f\u0031\u0022\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0031\u005f\u0031\u005f\u0032\u0022\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u005d\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0031\u005f\u0032\u0022\u003a\u0020\u007b\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0031\u005f\u0032\u005f\u0031\u0022\u003a\u0020\u0031\u0032\u0031\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u007d\u000d\u000a\u0020\u0020\u0020\u0020\u007d\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0022\u006c\u0032\u0022\u003a\u0020\u007b\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0032\u005f\u0031\u0022\u003a\u0020\u006e\u0075\u006c\u006c\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0032\u005f\u0032\u0022\u003a\u0020\u0074\u0072\u0075\u0065\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0032\u005f\u0033\u0022\u003a\u0020\u007b\u007d\u000d\u000a\u0020\u0020\u0020\u0020\u007d\u000d\u000a\u007d';
                $('#mask').show();
                _pri.node['enterValue'].value = sJson;
            },
            "hideEnterInputDialog" : function () {
                $('#mask').hide();
            }

        });

        JH.mergePropertyFrom(_pro, {
        
            
        
        });

        JH.mergePropertyFrom(_pub, {
        
            
            "resetLang" : function () {
                if(!_pri_static.langPack[_pub_static.language]) {
                    _pub_static.language = 'en';
                }
                JH.forIn(_pri_static.langPack[_pub_static.language], function (o, k) {
                    $('.langID_' + k).html(_pri_static.langPack[_pub_static.language][k]);
                });
            },
            "checkShowIco" : function (elm) {
                if(elm.checked) {
                    $('#jsonNav').removeClass('noIco');
                    $('#showIcoAsFolder').show();
                }else{
                    $('#jsonNav').addClass('noIco');
                    $('#showIcoAsFolder').hide();
                }
                return elm.checked;
            },
            "checkShowValueInNav" : function (elm) {
                if(elm.checked) {
                    $('#jsonNav').addClass('showValueInNav');
                }else{
                    $('#jsonNav').removeClass('showValueInNav');
                }
                return elm.checked;
            },
            "checkIcoAsFolderBtn" : function (elm) {//debugger;
                if(elm.checked) {
                    $('#jsonNav').addClass('folderIco');
                    $('#showIcoAsFolder').show();
                }else{
                    $('#jsonNav').removeClass('folderIco');
                }
                return elm.checked;
            },
            "destroy" : function(){
                if(_pub) {
                    
                    
                    _pri = _pro = _pub = null;
                }
            }
        
        });


        
        _init= function(){
            if(_checkArgs()) {
                return false;
            }
            _parseDOM();
            _main();
            _uiEvt();
            _custEvt();
            _airEvt();
        };
        _init();
        


        return _pub;
        
    };

    return JH.mergePropertyFrom(_pub_static, {
    
        language : 'en'
    
    });
});

function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        var result = document.execCommand('copy');
    } catch (e) {
        var result = false;
    }
    document.body.removeChild(textArea);
    return result;
}