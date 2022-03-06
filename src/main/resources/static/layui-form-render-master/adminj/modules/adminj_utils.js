var _iframeWin;

//工具方法，在date上定义format 函数
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return format;
}

//在string上定义format函数，可以 '{0}  {1}'.format('a','b') 格式化字符变量
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function (m, i) {
            return args[i];
        });
}

/**
 * 字义ayyay的删除函数,用array.deleteValue(value) 可以删除array数据
 * @param val
 */
Array.prototype.deleteValue = function (val) {
    var arr = this;
    for (var i = 0; i < arr.length; i++) {
        if (val == arr[i]) {
            arr.splice(i, 1);
            break;
        }
    }
}

var request=function(key){
    return (document.location.search.match(new RegExp("(?:^\\?|&)"+key+"=(.*?)(?=&|$)"))||['',null])[1];
}

/**
 * string 转 Date
 * @param str
 * @returns {Date}
 */
function stringToDate(str) {
    str = str.replace(/-/g, '/');
    return new Date(str);
}


/**
 *字符为 string=='' || undefined 返回 true
 * @param str
 * @returns {boolean}
 */
stringIsEmpty = function (str) {
    return str == undefined || str.length == 0;
}

/**
 * ajax请求数据
 * @param params{
 *  method post /get
 *  url
 *  data 发送的数据
 *  success 成功回调函数 succFunc(res)
 *  ajaxConfig 定义返回结果的key 默认格式{resultCode:0,message:'返回成功'}
 *  error error 回调函数 errorFunc(res)
 *  }
 */
function ajaxDataMapParams(params) {
    var method = params.method, url = params.url, formData = params.data, successFunc = params.success,
        ajaxConfig = params.ajaxConfig, errorFunc = params.error;
    if(stringIsEmpty(method))method='get';
    if(formData==undefined)formData={};
    $.ajax({
        url: url,
        type: method,
        contentType: "application/json; charset=utf-8",
        data: formData,
        success: function (data) {
            var resultCodeName = 'resultCode', messageName = 'message';
            if (ajaxConfig != undefined) {
                resultCodeName = ajaxConfig.resultCodeName;
                messageName = ajaxConfig.messageName;
            }
            if (data[resultCodeName] == 0) {
                if(successFunc!=undefined){
                    successFunc(data)
                }
            } else {
                if (errorFunc != undefined) {
                    errorFunc(data)
                } else {
                    var msg = data[messageName];
                    if (msg == undefined) msg = '数据请求出错';
                    layui.layer.msg(msg);
                }

            }
        }, error: function (data) {
            if (errorFunc != undefined) {
                errorFunc(data);
            } else {
                layui.layer.msg('load data error:' + JSON.stringify(data));
            }

        }
    });
}

/**
 * ajax请求数据
 * @param method post /get
 * @param url
 * @param formData 发送的数据
 * @param successFunc 成功回调函数 succFunc(res)
 * @param ajaxConfig 定义返回结果的key 默认格式{resultCode:0,message:'返回成功'}
 * @param errorFunc error 回调函数 errorFunc(res)
 */
function ajaxData(method, url, formData, successFunc, ajaxConfig, errorFunc) {
    ajaxDataMapParams({
        method: method,
        url: url,
        data: formData,
        success: successFunc,
        ajaxConfig: ajaxConfig,
        error: errorFunc
    })
}

/**
 * string.splist(',') 返回arr
 * @param str
 * @returns {*[]|*}
 */
function stringToArray(str) {
    if (stringIsEmpty(str)) return [];
    return str.split(',');
}

/**
 * 把array转成 ,分开的字符
 * @param arr
 * @returns {string}
 */
function arrayToString(arr) {
    if (arr == undefined || arr.length == 0) return '';
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        str += arr[i];
        if (i < arr.length - 1) str += ',';
    }
    return str;
}


function openWin(url, params) {
    //添加数据
    if (params == undefined) params = {};
    var width = '800px', height = '80%';
    if (params.width != undefined) width = params.width;
    if (params.height != undefined) height = params.height;

    var layer = layui.layer;
    layer.open({
        type: 2,
        title: ' ',
        shadeClose: false,
        shade: 0.8,
        area: [width, height],
        content: url //iframe的url
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);
        }, btnAlign: 'c'
        , btn: ['确定', '重置']
        , yes: function (index, layero) {
            //var body = layer.getChildFrame('body', index);
            //body.contents().find("#url").val(111);
            //layer.close(index);
            if (params.yes != undefined) {
                params.yes(index, layero, _iframeWin);
            } else {
                _iframeWin.postData();
            }
        }, btn2: function (index, layero) {
            _iframeWin.resetData();
            return false;
        }, success: function (layero, index) {
            var iframeWin = window[layero.find('iframe')[0]['name']];
            _iframeWin = iframeWin;
            //iframeWin.childSelectIcon('123456');
        }
    });
}

function openBrowseWin(url, params) {
    //添加数据
    if (params == undefined) params = {};
    var width = '800px', height = '80%';
    if (params.width != undefined) width = params.width;
    if (params.height != undefined) height = params.height;

    var layer = layui.layer;
    layer.open({
        type: 2,
        title: ' ',
        shadeClose: false,
        shade: 0.8,
        area: [width, height],
        content: url //iframe的url
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero); //重点2
        }
    });
}

//业务

function initSelectOptions(select,dataArray,selected,keyName,valueName){
    if(dataArray==undefined || select==undefined)return;
    for(var i=0;i<dataArray.length;i++){
        var row=dataArray[i];
        var selected=selected=='true' || selected=='0'?'selected':'';
        var key=(keyName!=undefined)?eval('row.'+keyName):row;
        var value=(valueName!=undefined)?eval('row.'+valueName):row;
        var child='<option value="{0}" {1}>{2}</option>'.format(key,selected,value);
        select.append(child);
    }
}