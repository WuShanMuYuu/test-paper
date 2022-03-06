/**
 * AdminJ LayuiFormRender
 * @author adminj
 * @date 2021-8
 * @description  表单的数据回显 [开源不易，如果可能请留下版权信息]
 * @version 1.0
 *
 */

function AdminJFormData() {
    var that = this;
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g,
            function (m, i) {
                return args[i];
            });
    }
    String.prototype.endsWith = function (oString) {
        var reg = new RegExp(oString + "$");
        return reg.test(this);
    }
    this.propertiesMap = {};
    this.propertiesMapSrc = {};
    //adminj组件字段值
    this.formData = {};
    //要替换最终data里的字段值,用于手动设定某个input值,getData将得到此值
    this.formDataRplace = {};
    //需要触发时就收集数据的组件 radio/checkbox...
    this.resetDataCpt = [];
    //h5edtor object
    this.editorMap = {};
    this.formIdName = 'layui-form-id';
    this.tools = this.createTools(),//工具类
        this.config = {
            ajaxRequestName: {
                resultCodeName: 'resultCode',
                messageName: 'message',
                resultName: 'result'
            },
            messages: {
                username_exp_msg: '不能有特殊字符'
                , username_se_msg: '首尾不能出现下划线\'_\''
                , username_num_msg: '用户名不能全为数字'
                , email_msg: 'Email格式不正确'
                , integer_msg: '必须全部是数字'
                , a_z_msg: '必须全部是字母'
                , a_z0_9_msg: '必须是字母和数字'
                , a_z0_9__msg: '必须是字母和数字'
                , zipcode_msg: '请输入正确的邮编'
                , chinese_msg: '必须输入汉字'
                , minlength_msg: '长度不能少于{0}个字符'
                , maxlength_msg: '长度不能超过{0}个字符'
                , number_must: '必须输入数字'
                , number_min: '值不能小于{0}'
                , number_max: '值不能大于{0}'
                , uplaod_file_maxfile_msg: '已达到最大文件上传数，最大文件上传数量为: {0}'
                , select_date_min_msg: '选择的时间不能小于: {0}'
                , select_date_max_msg: '选择的时间不能大于: {0}'
                , upload_file_success: '上传完毕'
                , upload_file_error: '上传失败'
                , upload_file_minsize_msg: '上传文件不能小于 {0} KB'
                , select_first_label: '选择'
                , validate_required_msg: '必填(选)项不能为空'
            },
            /**
             * 基本layui的验证表达式
             */
            validate: {
                adminJFormData: that,
                username: function (value, item) {
                    if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                        return this.adminJFormData.config.messages.username_exp_msg;
                    }
                    if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                        return this.adminJFormData.config.messages.username_se_msg;
                    }
                    if (/^\d+\d+\d$/.test(value)) {
                        return this.adminJFormData.config.messages.username_num_msg;
                    }
                },
                email: function (value, item) {
                    if (value.length > 0) {
                        if (!new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(value)) {
                            return this.adminJFormData.config.messages.email_msg;
                        }
                    }
                },
                integer: function (value, item) {
                    if (!new RegExp("^[0-9]*$").test(value)) {
                        return this.adminJFormData.config.messages.integer_msg;

                    }
                },
                a_z: function (value, item) {
                    if (!new RegExp("^[A-Za-z]*$").test(value)) {
                        return this.adminJFormData.config.messages.a_z_msg;
                    }
                },
                a_z0_9: function (value, item) {
                    if (!new RegExp("^[A-Za-z0-9]+$").test(value)) {
                        return this.adminJFormData.config.messages.a_z0_9_msg;
                    }
                },
                a_z0_9_: function (value, item) {
                    if (!new RegExp("^[A-Za-z0-9_]+$").test(value)) {
                        return this.adminJFormData.config.messages.a_z0_9__msg;
                    }
                }
                ,
                zipcode: function (value, item) {
                    if (!new RegExp("^\\d{6}$").test(value)) {
                        return this.adminJFormData.config.messages.zipcode_msg;
                    }
                },
                chinese: function (value, item) {
                    if (!new RegExp("^[\u4e00-\u9fa5]{0,}$").test(value)) {
                        return this.adminJFormData.config.messages.chinese_msg;
                    }
                },
                minLength: function (value, item) {
                    if (value.length == 0) return;
                    var name = $(item).attr('name'), formId = $(item).attr(this.adminJFormData.formIdName);
                    var properties = this.adminJFormData.getPropertiesByName(formId, name);
                    if (properties == undefined) return;
                    var minLen = parseInt(properties['minLength'])
                    if (!isNaN(minLen)) {
                        if (value.length < minLen) {
                            return this.adminJFormData.config.messages.minlength_msg.format(minLen);
                        }
                    }
                },
                maxLength: function (value, item) {
                    if (value.length == 0) return
                    var name = $(item).attr('name'), formId = $(item).attr(this.adminJFormData.formIdName);
                    var properties = this.adminJFormData.getPropertiesByName(formId, name);
                    if (properties == undefined) return;
                    var maxLen = parseInt(properties['maxLength'])
                    if (!isNaN(maxLen)) {
                        if (value.length > maxLen) {
                            return this.adminJFormData.config.messages.maxlength_msg.format(maxLen);
                        }
                    }
                }, min: function (value, item) {
                    if (value.length == 0) return
                    var name = $(item).attr('name'), formId = $(item).attr(this.adminJFormData.formIdName);
                    var properties = this.adminJFormData.getPropertiesByName(formId, name);
                    if (properties == undefined) return;
                    var minValue = parseInt(properties['minValue'])
                    var val = parseInt(value)
                    if (isNaN(val)) return this.adminJFormData.config.messages.number_must;
                    if (!isNaN(minValue)) {
                        if (val < minValue) {
                            return this.adminJFormData.config.messages.number_min.format(minValue);
                        }
                    }
                }, max: function (value, item) {
                    if (value.length == 0) return
                    var name = $(item).attr('name'), formId = $(item).attr(this.adminJFormData.formIdName);
                    var properties = this.adminJFormData.getPropertiesByName(formId, name);
                    if (properties == undefined) return;
                    var maxValue = parseInt(properties['maxValue'])
                    var val = parseInt(value)
                    if (isNaN(val)) return this.adminJFormData.config.messages.number_must;
                    if (!isNaN(maxValue)) {
                        if (val > maxValue) {
                            return this.adminJFormData.config.messages.number_max.format(maxValue);
                        }
                    }
                }
            }
        }
    this.initHtml();
}

AdminJFormData.prototype.getPropertiesMap = function () {
    return this.propertiesMap;
}

/**
 * 通过组件的name返回组件属性
 * @param formId
 * @param name
 * @returns {undefined|*}
 */
AdminJFormData.prototype.getPropertiesByName = function (formId, name) {
    var formMap = this.propertiesMap[formId];
    for (divId in formMap) {
        var properties = formMap[divId];
        if (properties.name == name) return properties;
    }
    return undefined;
}

/**
 * 组件绑定layui 事件
 */
AdminJFormData.prototype.addLayuiFormEvent = function () {
    var that = this;

    layui.form.on('switch', function (data) {
        var formId = $(data.elem).attr(that.formIdName);
        var name = data.elem.name;
        var properties = that.getPropertiesByName(formId, name);
        if (properties != undefined) {
            var selectedValue = properties.selectedValue;
            var defValue = properties.defValue;
            that.formData[formId][name] = data.elem.checked ? selectedValue : defValue;
        } else {
            that.formData[formId][name] = data.elem.checked ? 0 : 1;
        }
    });

    layui.form.on('checkbox', function (data) {
        var formId = $(data.elem).attr(that.formIdName);
        var name = data.elem.name;
        //var properties = that.getPropertiesByName(formId,name);

        var arr = that.formData[formId][name];
        if (arr == undefined) arr = [];

        if (data.elem.checked) {
            arr[arr.length] = data.value;
        } else {
            arr.deleteValue(data.value);
        }
        that.formData[formId][name] = arr;

    });

    layui.form.on('radio', function (data) {
        var formId = $(data.elem).attr(that.formIdName);
        var name = data.elem.name;
        that.formData[formId][name] = data.value;

    });

    layui.form.on('select', function (data) {
        var formId = $(data.elem).attr(that.formIdName);
        var name = data.elem.name;
        that.formData[formId][name] = data.value
    });

};

/*
返回验证规则
 */
AdminJFormData.prototype.validateRule = function () {
    return this.config.validate;
}


AdminJFormData.prototype.init = function (_json, layuiFormId) {
    var that = this;
    try {
        this.propertiesMapSrc[layuiFormId] = JSON.parse(_json);
        this.propertiesMap[layuiFormId] = {};
        var that = this;
        this.formData[layuiFormId] = {};

        //扁平化数据结构
        var level1Func = function (data) {
            if (data.id == 'tab' || data.id == 'groupLayout') {
                var children = data.children;
                if (children != undefined) {
                    for (var i = 0; i < children.length; i++) {
                        var _item = children[i];
                        if (_item != undefined) {
                            for (var j = 0; j < _item.length; j++) {
                                var _itemL2 = _item[j];
                                level1Func(_itemL2);
                            }
                        }
                    }
                }

            } else {
                that.propertiesMap[layuiFormId][data.divId] = data;
            }
        }
        for (var divId in that.propertiesMapSrc[layuiFormId]) {
            var data = that.propertiesMapSrc[layuiFormId][divId];
            level1Func(data);
        }

        //console.log(JSON.stringify(this.propertiesMap[layuiFormId]))

        var filter = '[lay-filter="{0}"]'.format(layuiFormId);
        $(filter).find('[cpt_id]').each(function () {
            var cptId = $(this).attr('cpt_id'), divId = $(this).attr('id');
            $(this).attr(that.formIdName, layuiFormId);
            if (!(cptId == 'tab' || cptId == 'groupLayout')) {
                var funcName = 'cpt' + cptId.substring(0, 1).toUpperCase() + cptId.substring(1)
                var func = eval('that.' + funcName)
                if (typeof (func) == 'function') {
                    var item = $(this);
                    var properties = that.propertiesMap[layuiFormId][divId];
                    func(that, item);
                    that.tools.disabledFunc({item: item, formId: layuiFormId, properties: properties})

                }
            }
        })

        $(filter).find(':input').each(function (i, e) {
            $(this).attr(that.formIdName, layuiFormId)
        });

        this.addLayuiFormEvent();

        layui.form.config.verify.email = undefined;//用自定义email验证
        var validateRule = that.validateRule();
        layui.form.verify(validateRule);//设定自定义规则
    } catch (e) {
        console.log(e);
    }

};


//组件部分 start-------------------


AdminJFormData.prototype.cptSwitch = function (that, item) {
    var divId = item.attr('id'), formId = item.attr(that.formIdName);
    var properties = that.propertiesMap[formId][divId];
    var name = properties.name;
    var defValue = properties.defValue;
    var selectedValue = properties.selectedValue;
    var isSelect = properties.isSelect;
    that.formData[formId][name] = isSelect == '0' ? selectedValue : defValue;
    that.resetDataCpt[that.resetDataCpt.length] = 'switch';
}

AdminJFormData.prototype.cptCheckbox = function (that, item) {
    that.initOptionsValue(that, item, false);
    that.resetDataCpt[that.resetDataCpt.length] = 'checkbox';
}

AdminJFormData.prototype.cptRadio = function (that, item) {
    that.initOptionsValue(that, item, true);
    that.resetDataCpt[that.resetDataCpt.length] = 'radio';
}

AdminJFormData.prototype.cptSelect = function (that, item) {
    that.initOptionsValue(that, item, true);
    that.resetDataCpt[that.resetDataCpt.length] = 'select';
}

AdminJFormData.prototype.cptGroupLayout = function (that, item) {

}

AdminJFormData.prototype.cptTab = function (that, item) {

}

AdminJFormData.prototype.cptDate = function (that, item) {
    var divId = item.attr('id'), formId = item.attr(that.formIdName);
    var dateInputId = 'date_' + divId;
    var properties = that.propertiesMap[formId][divId];
    var name = properties.name;
    var defValue = '';
    var currentTime = properties.currentTime;
    var ui = properties.ui, format = properties.dateFormat;
    if (currentTime == '0') {
        defValue = new Date().format(format);
        that.formData[formId][name] = defValue
    }
    var _minDate = properties.minDate;
    var _maxDate = properties.maxDate;

    item.find("input").attr('id', dateInputId);
    layui.laydate.render({
        elem: '#' + dateInputId
        , type: ui
        , value: defValue
        , done: function (value, date, endDate) {
            that.tools.validateDateRangeFunc(value, properties);
            that.formData[formId][name] = value

        }
    });
    that.resetDataCpt[that.resetDataCpt.length] = 'date';
}

/**
 * 初始化select2 select checkbox radio 选项
 * @param that
 * @param item
 * @param isSingle
 */
AdminJFormData.prototype.initOptionsValue = function (that, item, isSingle) {
    var divId = item.attr('id'), formId = item.attr(that.formIdName);
    var properties = that.propertiesMap[formId][divId];
    var name = properties.name;
    var arr = properties.options;
    var arrValue = []
    if (arr != undefined) {
        for (var i = 0; i < arr.length; i++) {
            var row = arr[i];
            if (row.isSelect == '0') {
                if (isSingle) {
                    that.formData[formId][name] = row.value;
                    break;
                } else {
                    arrValue[arrValue.length] = row.value;
                }
            }
        }
    }
    if (!isSingle) that.formData[formId][name] = arrValue;

}

AdminJFormData.prototype.cptSelect2 = function (that, item) {
    var divId = item.attr('id'), formId = item.attr(that.formIdName);
    var name = that.propertiesMap[formId][divId]['name'];

    that.initOptionsValue(that, item, false);

    item.find("select").attr('id', 'select_' + divId);
    item.find("select").select2().on('select2:select', function (e) {
        //console.log('s:' + JSON.stringify(e.params.data.id + '=' + e.params.data.text));
        var arr = that.formData[formId][name];
        if (arr == undefined) {
            arr = [];
            that.formData[formId][name] = arr;
        }
        arr[arr.length] = e.params.data.id;
    }).on('select2:unselect', function (e) {
        //console.log('us:' + JSON.stringify(e.params.data));
        var arr = that.formData[formId][name];
        arr.deleteValue(e.params.data.id);
    });
    that.resetDataCpt[that.resetDataCpt.length] = 'select2';
}

AdminJFormData.prototype.cptSelectS = function (that, item) {
    var divId = item.attr('id'), formId = item.attr(that.formIdName);

    var selectFunc = function (url, item, divId, parentId) {
        var newUrl = url + 'parentId=' + parentId;

        ajaxData('get', newUrl, {}, function (res) {
            if (that.editMode == true) return;
            var list = res[that.config.ajaxRequestName.resultName];
            if (list != undefined && list.length > 0) {
                var len = item.find('select').length;
                that.tools.initSelectS(that, item, formId, divId, list, len);
            } else {
                if (!stringIsEmpty(parentId)) {
                    var name = that.propertiesMap[formId][divId]['name'];
                    that.formData[formId][name] = parentId;
                }
            }

            layui.form.render('select');
        }, that.config.ajaxRequestName);
    }

    var url = that.propertiesMap[formId][divId]['requestURL'];
    if (stringIsEmpty(url)) return false;
    url = url + ((url.indexOf('?') == -1) ? '?' : '&');
    selectFunc(url, item, divId, '');

    that.resetDataCpt[that.resetDataCpt.length] = 'selectS';
}

AdminJFormData.prototype.cptDateRange = function (that, item) {
    var divId = item.attr('id'), formId = item.attr(that.formIdName);
    //var name=that.propertiesMap[divId]['name'];
    var dateDivId = divId + 'd_rang';
    item.find('input').attr('id', dateDivId).attr('name', divId);

    var properties = that.propertiesMap[formId][divId];
    var defValue = '';
    var currentTime = properties.currentTime;
    var ui = properties.ui, format = properties.dateFormat;
    //var _minDate = properties.minDate;
    //var _maxDate = properties.maxDate;

    if (currentTime == '0') {
        var val = new Date().format(format);
        defValue = val + ' - ' + val;
        that.formData[formId][properties.startDateName] = val;
        that.formData[formId][properties.endDateName] = val;
    }

    var setting = {
        elem: '#' + dateDivId
        , type: ui
        , value: defValue
        , range: true
        //, min: _minDate
        //, max: _maxDate //这个值有UBG.. yyyy,MM 会直接取min的值
        , done: function (value, date, endDate) {
            var startValue = '', endValue = '';
            if (value.length > 0) {
                var arr = value.split(' - ');
                startValue = arr[0];
                endValue = arr[1];
            }
            var properties = that.propertiesMap[formId][divId];
            that.tools.validateDateRangeFunc(startValue, properties);
            that.tools.validateDateRangeFunc(endValue, properties);
            that.formData[formId][properties.startDateName] = startValue;
            that.formData[formId][properties.endDateName] = endValue;
        }
    };

    layui.laydate.render(setting);
    that.resetDataCpt[that.resetDataCpt.length] = 'dateRange';
}

AdminJFormData.prototype.cptUploadImage = function (that, item) {
    var divId = item.attr('id');

    that.tools.uploadImageFile(divId, divId, item, false)
    that.resetDataCpt[that.resetDataCpt.length] = 'uploadImage';
}

AdminJFormData.prototype.cptUploadImages = function (that, item) {
    var divId = item.attr('id'), formId = item.attr(that.formIdName);
    var properties = that.propertiesMap[formId][divId];
    var name = properties.name;
    var uploadCount = properties.uploadCount;
    if (isNaN(uploadCount)) uploadCount = 6;

    item.find('.adminj-add-upload-div').prev().remove();
    that.tools.createUploadImages.create(item, properties);

    item.find('.adminj-add-upload-div').click(function () {
        var uploadIndex = $('#' + divId).find('.adminj-add-upload-div').parent().children().length - 1;
        if (uploadIndex + 1 >= uploadCount) {
            $(this).hide();
            layui.layer.msg(that.config.messages.uplaod_file_maxfile_msg.format(uploadCount), {icon: 5});
        }
        that.tools.createUploadImages.create(item, properties);

    });

    that.resetDataCpt[that.resetDataCpt.length] = 'uploadImages';

}

AdminJFormData.prototype.cptUploadFile = function (that, item) {
    var divId = item.attr('id');
    var cptId = item.attr('cpt_id');
    that.tools.uploadSingleFile(divId, cptId, item)
    that.resetDataCpt[that.resetDataCpt.length] = 'uploadFile';
}

AdminJFormData.prototype.cptUploadFiles = function (that, item) {
    var divId = item.attr('id');
    var cptId = item.attr('cpt_id');
    that.tools.uploadFiles(divId, cptId, item)
    that.resetDataCpt[that.resetDataCpt.length] = 'uploadFiles';
}

AdminJFormData.prototype.cptColor = function (that, item) {
    var divId = item.attr('id');
    var inputId = divId + '_c', colorUiId = divId + '_u';
    item.find('input').attr('id', inputId);
    item.find('[flag="color_ui_div"]').attr('id', colorUiId);
    layui.colorpicker.render({
        elem: '#' + colorUiId
        , color: '#1c97f5'
        , done: function (color) {
            $('#' + inputId).val(color);
        }
    });
}


AdminJFormData.prototype.cptSlider = function (that, item) {
    that.initSlider(that, item, undefined);
    that.resetDataCpt[that.resetDataCpt.length] = 'slider';
}

AdminJFormData.prototype.initSlider = function (that, item, initValue) {
    var divId = item.attr('id'), formId = item.attr(that.formIdName);
    var inputId = divId + '_slider';
    item.find('.layui-form-label').next().children().eq(0).attr('id', inputId);
    var properties = that.propertiesMap[formId][divId];
    var min = parseInt(properties.minValue), max = parseInt(properties.maxValue), val = parseInt(properties.defValue),
        suffix = properties.suffix, disabled = properties.disabled;
    var showInput = properties.showInput;
    if (isNaN(min)) min = 0;
    if (isNaN(max)) max = 100;
    if (isNaN(val)) val = 0;
    if (initValue != undefined) val = initValue;
    if (showInput == undefined) showInput = '0';
    var isShowInput = showInput == '0' ? true : false;
    var disabled = disabled == '0' ? true : false;
    if (suffix == undefined) suffix = '';
    that.formData[formId][properties.name] = val;
    layui.slider.render({
        elem: '#' + inputId
        , input: isShowInput
        , value: val
        , min: min
        , max: max
        , disabled: disabled
        , setTips: function (value) {
            return value + suffix;
        }
        , change: function (val) {
            that.formData[formId][properties.name] = val;
        }
    });
}

AdminJFormData.prototype.cptRate = function (that, item) {
    that.initRate(that, item, undefined);
    that.resetDataCpt[that.resetDataCpt.length] = 'rate';
}

AdminJFormData.prototype.initRate = function (that, item, initValue) {
    var divId = item.attr('id'), formId = item.attr(that.formIdName);
    var inputId = divId + '_rate';
    var properties = that.propertiesMap[formId][divId];
    var disabled = properties.disabled;
    item.find('.layui-form-label').next().children().eq(0).attr('id', inputId);
    var _value = parseInt(properties.defValue), _rateCount = parseInt(properties.rateCount);
    if (isNaN(_rateCount)) _rateCount = 5;
    properties.defValue = _rateCount;
    if (isNaN(_value)) _value = 0;
    var disabled = disabled == '0' ? true : false;
    if (initValue != undefined) _value = initValue;
    properties.defValue = _value;
    that.formData[formId][properties.name] = properties.defValue;
    layui.rate.render({
        elem: '#' + inputId,
        value: _value,
        length: _rateCount,
        readonly: disabled
        , choose: function (value) {
            that.formData[formId][properties.name] = value;
        }
    })
}


AdminJFormData.prototype.cptEditor = function (that, item) {
    var divId = item.attr('id');
    var inputId = divId + '_editor';
    item.find('.layui-form-label').next().children().eq(0).attr('id', inputId);
    //document.querySelector('.editor')

    ClassicEditor.create(document.getElementById(inputId), {
        toolbar: {
            items: [
                'heading', '|', 'bold', 'italic', 'blockQuote', 'fontColor', 'link', 'fontBackgroundColor', 'fontSize', '|', 'bulletedList', 'numberedList',
                'outdent', 'indent', '|', 'findAndReplace', 'imageUpload', 'insertTable', 'mediaEmbed', 'CKFinder', 'undo', 'redo'
            ]
        },
        language: 'zh-cn',
        image: {
            toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties']
        },
        licenseKey: '',
    })
        .then(editor => {
            //window.editor = editor;
            that.editorMap[divId] = editor;
        })
        .catch(error => {
            console.error(error);
        });
}


AdminJFormData.prototype.disabled = function (formId, nameArray, disabled) {
    if (nameArray == undefined) return;
    var data = this.propertiesMap[formId];
    for (var i = 0; i < nameArray.length; i++) {
        for (var k in data) {
            var properties = data[k];
            if (properties.name == nameArray[i]) {
                properties.disabled = disabled;
                var item = $('#' + properties.divId)
                this.tools.disabledFunc({item: item, formId: formId, properties: properties, value: disabled});
                break;
            }
        }

    }
}

AdminJFormData.prototype.disabledAll = function (formId, disabled) {//禁掉所有input
    var data = this.propertiesMap[formId];
    for (var k in data) {
        var properties = data[k];
        properties.disabled = disabled;
        var item = $('#' + properties.divId)
        this.tools.disabledFunc({item: item, formId: formId, properties: properties, value: disabled});
    }
}

//组件部分 end-------------------

AdminJFormData.prototype.createTools = function () {//工具类
    var that = this;
    var tools = {
        disabledFunc: function (params) {
            var _that = this;
            var item = params.item;
            var properties = params.properties;
            var divId = properties.divId, cptId = properties.id, formId = params.formId;
            var val = params.value;
            if (stringIsEmpty(val)) val = properties.disabled;

            var disabledItemFunc = function (_item, _val) {
                if (_val == '0') {
                    _item.find(':input').addClass('layui-disabled').addClass('layui-unselect').attr('disabled', 'disabled');
                } else {
                    _item.find(':input').removeClass('layui-disabled').removeClass('layui-unselect').removeAttr('disabled');
                }
            }

            if (cptId == 'slider') {
                that.initSlider(that, item, undefined);
            } else if (cptId == 'rate') {
                that.initRate(that, item, undefined);
            } else if (cptId == 'uploadImage' || cptId == 'uploadImages') {//不操作
                //item.find('div[flag="upload_div"]').show();//去掉事件
                if (cptId == 'uploadImage' || cptId == 'uploadImages') {
                    if (val == '0') {//禁用
                        var _item = $('#' + divId);
                        if (_item.attr('disabled') != undefined) return;//已经禁用
                        _item.attr('disabled', '0');//标为禁用
                        if (cptId == 'uploadImages') {
                            _item.find('.adminj-add-upload-div').hide();
                            _item.find('.close_div').hide();
                        }
                        _item.find('.adminj-upload-ul').children().each(function (i, e) {
                            var _this = $(this);
                            if (!_this.hasClass('adminj-add-upload-div')) {
                                var newItem = $(_this.get(0).outerHTML);
                                newItem.find('div[flag="upload_div"]').css('cursor', 'not-allowed');
                                _this.before(newItem);
                                _this.remove();
                                var img = newItem.find('.image_src');
                                img.on('load', function () {//RESIZE IMAGE
                                    var imgWidth = img.width(), imgHeight = img.height();
                                    var _imgHeight = 80 / imgHeight * imgHeight, _imgWidth = 80 / imgHeight * imgWidth;
                                    img.css('width', _imgWidth + 'px').css('height', _imgHeight + 'px')
                                    newItem.find('[update_width="true"]').each(function () {
                                        $(this).css('width', _imgWidth + 'px')
                                    });
                                });
                            }
                        });
                    } else {//重置 ,需要重设事件
                        var _item = $('#' + divId);
                        if (_item.attr('disabled') == undefined) return;
                        _item.removeAttr('disabled')
                        if (cptId == 'uploadImages') {
                            _item.find('.adminj-add-upload-div').show();
                            _item.find('.close_div').show();
                        }
                        _item.find('.adminj-upload-ul').children().each(function (i, e) {
                            var _this = $(this);
                            _this.attr(that.formIdName, formId);
                            _this.find('div[flag="upload_div"]').css('cursor', '');
                            if (!_this.hasClass('adminj-add-upload-div')) {
                                var uploadId = 'up_id_' + new Date().getTime();
                                _that.uploadImageFile(divId, uploadId, _this, cptId == 'uploadImages' ? true : false);
                                that.tools.createUploadImages.removeImage(_this, properties);
                                //ID重新生成后需要更新
                                var mapData = {};
                                var uploadMap = that.formData[formId][properties.name], uploadArray = [];
                                if (uploadMap != undefined && cptId == 'uploadImages') {
                                    for (var k in uploadMap) {
                                        uploadArray[uploadArray.length] = uploadMap[k];
                                    }
                                    _item.find('div[flag="upload_div"]').each(function (i, e) {
                                        mapData[$(this).attr('id')] = uploadArray[i];
                                    });
                                    that.formData[formId][properties.name] = mapData;//重置数据
                                }

                            }
                        });
                    }
                }
            } else if (cptId == 'editor') {
                var editorFunc = function (_val) {
                    setTimeout(function (_val) {
                        var editor = that.editorMap[divId];
                        if (editor == undefined) {
                            editorFunc(_val);
                        } else {
                            editor.isReadOnly = val == '0' ? true : false;
                        }
                    }, 100);
                }
                editorFunc(val);
            } else if (cptId == 'uploadFiles') {
                disabledItemFunc(item, val);
                setTimeout(function () {//等上传文件初始化完成
                    disabledItemFunc(item.find('table'), val);
                }, 200)
            } else {
                disabledItemFunc(item, val);
            }

        },
        validateDateRangeFunc: function (_date, properties) {
            var _minDate = properties.minDate;
            var _maxDate = properties.maxDate;
            var minDate = (!stringIsEmpty(_minDate)) ? stringToDate(_minDate) : undefined;
            var maxDate = (!stringIsEmpty(_maxDate)) ? stringToDate(_maxDate) : undefined;
            var date = (!stringIsEmpty(_date)) ? stringToDate(_date) : undefined;

            if (date != undefined) {
                if (minDate != undefined) {
                    if (date.getTime() < minDate.getTime()) {
                        layui.layer.msg(that.config.messages.select_date_min_msg.format(_minDate), {icon: 5});
                        return false;
                    }
                }

                if (maxDate != undefined) {
                    if (date.getTime() > maxDate.getTime()) {
                        layui.layer.msg(that.config.messages.select_date_max_msg.format(_maxDate), {icon: 5});
                        return false;
                    }
                }
            }
            return true;

        },
        createUploadImages: {

            removeImage: function (_item, properties) {
                var name = properties.name, formId = _item.attr(that.formIdName), divId = properties.divId;
                _item.find('.close_div').children().eq(0).click(function () {
                    var uploadItem = $(this).parent().parent().parent();
                    var uploadId = uploadItem.find('div[flag="upload_div"]').attr('id');
                    uploadItem.remove()
                    //var uploadIndex = $('#' + divId).find('.adminj-add-upload-div').parent().children().length - 1;
                    $('#' + divId).find('.adminj-add-upload-div').show();
                    if (that.formData[formId][name] != undefined) {
                        if (that.formData[formId][name][uploadId] != undefined) delete that.formData[formId][name][uploadId];
                    }
                    //需要调S删除图片
                })
            },
            create: function (item) {
                var __that = this;
                var divId = item.attr('id'), formId = item.attr(that.formIdName);
                var properties = that.propertiesMap[formId][divId];
                var name = properties.name;
                var uploadFunc = function (_item) {
                    var uploadId = 'up_id_' + Date.now();
                    _item.attr('id', uploadId)
                    that.tools.uploadImageFile(divId, uploadId, _item, true)
                    __that.removeImage(_item, properties);
                };
                var node = $($('span #uploadImages .adminj-upload-ul').children(':first').get(0).outerHTML)
                node.attr(that.formIdName, formId);
                item.find('.adminj-add-upload-div').before(node)
                uploadFunc(node, properties);
            }
        },
        uploadSingleFile: function (divId, cptId, item) {
            var _that = this;
            var formId = item.attr(that.formIdName);
            var properties = that.propertiesMap[formId][divId];
            var uploadUrl = properties.uploadUrl;
            var name = properties.name;
            var uploadMaxSize = properties.maxSize;
            if (isNaN(uploadMaxSize)) uploadMaxSize = 0;
            if (stringIsEmpty(uploadUrl)) uploadUrl = 'https://httpbin.org/post'
            var validateRule = properties.validateRule;
            var uploadTypes = _that.replaceFileSuffix(validateRule);
            var progressId = 'progressId_' + new Date().getTime();
            item.find('.adminj-upload-empty-div').children().eq(0).attr('lay-filter', progressId);//上传进度条

            var fileId = divId + 'd_file';
            item.find('button').attr('id', fileId);
            layui.upload.render({
                elem: '#' + fileId
                , url: uploadUrl
                , exts: uploadTypes
                , accept: 'file'
                , field: name
                , size: uploadMaxSize
                , data: {
                    // 'filename': function () {
                    //     var name = that.propertiesMap[formId][divId]['name']
                    //     var fname = that.formData[formId][name]
                    //     if (fname == undefined) fname = '';
                    //     return fname;
                    // }
                }, choose: function (obj) {
                    item.find('.adminj-upload-empty-div').css('display', 'block')
                }
                , done: function (res) {
                    if (res[that.config.ajaxRequestName.resultCodeName] == undefined) {//如果没有按需求返回结果，则显示demo数据
                        res = {resultCode: 0, result: {filename: new Date().getTime() + '.jpg'}}
                    }
                    if (res[that.config.ajaxRequestName.resultCodeName] > 0) {
                        var msg = res[that.config.ajaxRequestName.messageName];
                        if (msg != undefined) layui.layer.msg(msg, {icon: 5});
                        return;
                    }
                    _that.updateUploadFilename(that, formId, divId, '', res, false)
                }, progress: function (n, elem, res, index) {
                    layui.element.progress(progressId, n + '%');
                    if (n == 100) {
                        layui.layer.msg(that.config.messages.upload_file_success, {icon: 1});
                        setTimeout(function () {
                            layui.element.progress(progressId, '0%');
                            item.find('.adminj-upload-empty-div').css('display', 'none');
                        }, 1000);
                    }
                }
            });
        },
        uploadFiles: function (divId, cptId, item) {
            var _that = this;
            var formId = item.attr(that.formIdName);
            var properties = that.propertiesMap[formId][divId];
            var uploadUrl = properties.uploadUrl;
            var name = properties.name
            var uploadMaxSize = properties.maxSize;
            if (isNaN(uploadMaxSize)) uploadMaxSize = 0;
            var uploadMinSize = properties.minSize;
            if (isNaN(uploadMinSize)) uploadMinSize = 0;
            if (stringIsEmpty(uploadUrl)) uploadUrl = 'https://httpbin.org/post'
            var validateRule = properties.validateRule;
            var uploadTypes = _that.replaceFileSuffix(validateRule);
            var uploadCount = properties.uploadCount;
            if (isNaN(uploadCount)) uploadCount = 2;

            var fileId = divId + 'u_file', uploadId = divId + 'up_file';
            item.find('[select_file="true"]').attr('id', fileId);
            item.find('[upload_file="true"]').attr('id', uploadId);
            var uploadListIns = layui.upload.render({
                elem: '#' + fileId
                , elemList: $('#fileList') //列表元素对象
                , url: uploadUrl
                , exts: uploadTypes
                , accept: 'file'
                , multiple: true
                , number: uploadCount //这里有BUG.....会多一个文件出来
                , auto: false
                , field: name
                , size: uploadMaxSize
                , bindAction: '#' + uploadId
                , choose: function (obj) {
                    var __that = this;
                    var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                    //读取本地文件
                    obj.preview(function (index, file, result) {
                        var fcount = item.find('table').find('tr[id]').length;
                        if (fcount >= uploadCount) {
                            delete files[index];
                            layui.layer.msg(that.config.messages.uplaod_file_maxfile_msg.format(uploadCount), {icon: 5})
                            return;
                        }
                        if (uploadMinSize * 1024 > file.size) {
                            delete files[index];
                            layui.layer.msg(that.config.messages.upload_file_minsize_msg.format(uploadMinSize), {icon: 5})
                            return;
                        }
                        var tr = $(['<tr id="upload-' + index + '">'
                            , '<td>' + file.name + '</td>'
                            , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                            , '<td><div class="layui-progress" lay-filter="progress-upload-' + index + '"  lay-showpercent="true"><div class="layui-progress-bar" lay-percent=""></div></div></td>'
                            , '<td>'
                            , '<button class="layui-btn layui-btn-xs upload-reload layui-hide">重传</button>'
                            , '<button class="layui-btn layui-btn-xs layui-btn-danger upload-delete">删除</button>'
                            , '</td>'
                            , '</tr>'].join(''));

                        if (properties.disabled == '0') tr.find(':input').addClass('layui-disabled').addClass('layui-unselect').attr('disabled', 'disabled');

                        //单个重传
                        tr.find('.upload-reload').on('click', function () {
                            try {
                                var tr = __that.elemList.find('tr#upload-' + index);
                                layui.element.progress('progress-upload-' + index, '0%');
                                tr.children().eq(2).children().show();
                                tr.children().eq(2).find('.adminj-res-text').remove();
                                obj.upload(index, file);
                            } catch (e) {
                                console.log(e)
                            }
                            return false;

                        });

                        //删除
                        tr.find('.upload-delete').on('click', function () {
                            var trUploadId = $(this).parent().parent().attr('id')
                            delete files[index]; //删除对应的文件
                            tr.remove();
                            uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            var fileNames = that.formData[formId][name]
                            if (fileNames != undefined) delete fileNames[trUploadId];
                        });

                        __that.elemList.append(tr);
                        layui.element.render('progress'); //渲染新加的进度条组件
                    });
                }
                , done: function (res, index, upload) { //成功的回调
                    if (res[that.config.ajaxRequestName.resultCodeName] == undefined) {//如果没有按需求返回结果，则显示demo数据
                        res = {resultCode: 0, result: {filename: new Date().getTime() + '.jpg'}}
                    }
                    var __that = this;
                    //if(res.code == 0){ //上传成功
                    var tr = __that.elemList.find('tr#upload-' + index), tds = tr.children();
                    //tds.eq(3).html(''); //清空操作
                    delete this.files[index]; //删除文件队列已经上传成功的文件
                    if (res[that.config.ajaxRequestName.resultCodeName] > 0) {
                        var msg = res[that.config.ajaxRequestName.messageName];
                        if (msg == undefined) msg = tha.config.messages.upload_file_error;
                        layui.layer.msg(msg, {icon: 5});
                        this.error(index, upload);
                        return;
                    }
                    var trUploadId = 'upload-' + index;
                    tr.children().eq(2).children().hide();
                    tr.children().eq(2).append('<li class="adminj-res-text">完成</li>')
                    _that.updateUploadFilename(that, formId, divId, trUploadId, res, true)
                }
                , allDone: function (obj) { //多文件上传完毕后的状态回调
                    console.log(obj)
                }
                , error: function (index, upload) { //错误回调
                    var __that = this;
                    var tr = __that.elemList.find('tr#upload-' + index), tds = tr.children();
                    tds.eq(3).find('.upload-reload').removeClass('layui-hide'); //显示重传
                }
                , progress: function (n, elem, e, index) {
                    layui.element.progress('progress-upload-' + index, n + '%'); //执行进度条。n 即为返回的进度百分比
                }
            })
        }, uploadImageFile: function (divId, uploadId, item, isMulti) {
            var _that = this;
            var formId = item.attr(that.formIdName);
            var properties = that.propertiesMap[formId][divId];
            var uploadUrl = properties.uploadUrl;
            var uploadMaxSize = properties.maxSize;
            if (isNaN(uploadMaxSize)) uploadMaxSize = 0;
            var uploadMinSize = properties.minSize;
            if (isNaN(uploadMinSize)) uploadMinSize = 0;
            var name = properties.name;
            if (stringIsEmpty(uploadUrl)) uploadUrl = 'https://httpbin.org/post'
            var validateRule = properties.validateRule;
            var uploadTypes = _that.replaceFileSuffix(validateRule);


            var uploadButId = uploadId + 'd_upload';
            var filterId = 'layui-progress-' + uploadId;
            item.find('div[flag="upload_div"]').attr('id', uploadButId)
            item.find('.layui-progress').attr('lay-filter', filterId);
            var uploadInst = layui.upload.render({
                elem: '#' + uploadButId
                , url: uploadUrl
                , exts: uploadTypes
                , field: name
                , size: uploadMaxSize
                , data: {
                    // 'filename': function () {
                    //     var fname = '';
                    //     try {
                    //         var fname = that.propertiesMap[formId][divId]['name']
                    //         //fname = that.formData[name][uploadId]
                    //     } catch (e) { }
                    //     if (fname == undefined) fname = '';
                    //     return fname;
                    // }
                }
                , acceptMime: 'image/*'
                , choose: function (obj) {
                    var files = this.files = obj.pushFile();
                    obj.preview(function (index, file, result) {

                    });
                }
                , before: function (obj) {
                    //预读本地文件示例，不支持ie8
                    var selectLine = $('#' + uploadButId).parent().parent();
                    selectLine.find('.bi-cloud-upload').hide();
                    selectLine.find('.image_src').css('width', '').css('height', '').hide();
                    selectLine.find('.adminj-upload-image-style').each(function () {
                        $(this).show();
                    });
                    selectLine.find('.upload_bar_div').show();
                    selectLine.find('.upload_mask_div').show();
                    obj.preview(function (index, file, result) {
                        selectLine.find('.image_src').attr('src', result); //图片链接（base64）
                    });

                    layui.element.progress(filterId, '0%'); //进度条复位
                    //layer.msg('上传中', {icon: 16, time: 0});
                    item.find('.layui-icon-upload-drag').removeClass('layui-icon-upload-drag');//hidden 上传图标
                }
                , done: function (res) {
                    if (res[that.config.ajaxRequestName.resultCodeName] == undefined) {//如果没有按需求返回结果，则显示demo数据
                        res = {resultCode: 0, result: {filename: new Date().getTime() + '.jpg'}}
                    }
                    var selectLine = $('#' + uploadButId).parent().parent();
                    selectLine.find('.upload_bar_div').hide();
                    selectLine.find('.upload_mask_div').hide();
                    //如果上传失败

                    if (res[that.config.ajaxRequestName.resultCodeName] > 0) {
                        var msg = res[that.config.ajaxRequestName.messageName];
                        if (msg == undefined) msg = that.config.messages.upload_file_error;
                        layui.layer.msg(msg, {icon: 5});
                        selectLine.find('.bi-cloud-upload').show();
                        return;
                    }
                    //上传成功的一些操作
                    //……
                    var img = selectLine.find('.image_src');
                    var imgWidth = img.width(), imgHeight = img.height();
                    var _imgHeight = 80 / imgHeight * imgHeight, _imgWidth = 80 / imgHeight * imgWidth;
                    img.css('width', _imgWidth + 'px').css('height', _imgHeight + 'px')
                    selectLine.find('[update_width="true"]').each(function () {
                        $(this).css('width', _imgWidth + 'px')
                    });

                    selectLine.find('#adminj-upload-ul').children().css('border', '0px')
                    selectLine.find('.image_src').show();
                    selectLine.find('.bi-cloud-upload').hide();


                    _that.updateUploadFilename(that, formId, divId, uploadButId, res, isMulti)
                    layui.element.progress(filterId, '0%');
                }
                , error: function () {
                    item.find('.layui-icon-upload-drag').addClass('layui-icon-upload-drag');//show 上传图标
                    var _selectLine = $('#' + uploadButId).parent().parent();
                    //并实现重传
                    _selectLine.find('.upload_bar_div').hide();
                    _selectLine.find('.adminj-upload-image-style').each(function () {
                        $(this).hide();
                    });

                }
                //进度条
                , progress: function (n, index, e) {
                    layui.element.progress(filterId, n + '%'); //可配合 layui 进度条元素使用
                    if (n == 100) {
                        layer.msg('上传完毕', {icon: 1});
                    }
                }
            });
        }, updateUploadFilename: function (that, formId, divId, uploadId, res, isMulti) {
            try {
                var rn = that.config.ajaxRequestName;
                var data = res[rn.resultName];
                if (data != undefined && data.filename != undefined) {
                    var name = that.propertiesMap[formId][divId]['name']
                    if (isMulti) {
                        var files = that.formData[formId][name]
                        if (files == undefined) files = {}
                        files[uploadId] = data.filename
                        that.formData[formId][name] = files
                    } else {
                        that.formData[formId][name] = data.filename
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }, replaceFileSuffix: function (arr) {
            if (arr == undefined) return '';
            var str = ''
            for (i = 0; i < arr.length; i++) {
                str += arr[i]
                if (i < arr.length - 1) {
                    str += '|'
                }
            }
            return str.replaceAll('.', '')
        }, initSelectS: function (that, item, formId, divId, selectArray, index) {
            var _that = this;
            if (selectArray == undefined || selectArray.length == 0) return;
            if (item == undefined) item = $('#' + divId);
            var name = that.propertiesMap[formId][divId]['name'];
            var options = that.propertiesMap[formId][divId]['defOptions'];
            var defText = that.config.messages.select_first_label;
            if (options != undefined && options.length > index) defText = options[index];
            var selectId = 'selects_id_' + index;
            var _html = '<div class="layui-input-inline"><select id="{0}" lay-filter="{0}"><option value="">{1}</option>'.format(selectId, defText);
            for (var i = 0; i < selectArray.length; i++) {
                var row = selectArray[i];
                var selected = row.isSelect == '0' ? 'selected' : '';
                _html += '<option value="{0}" {1}>{2}</option>'.format(row.value, selected, row.text);
            }
            _html += '</select></div>';
            var html = $(_html);
            item.find('.layui-form-mid').before(html);

            layui.form.on('select(' + selectId + ')', function (data) {
                var selectId = $(data.elem).attr('id');
                $('#' + selectId).parent().nextAll().each(function (i, e) {
                    if ($(this).attr('class').indexOf('layui-input-inline') != -1) {
                        $(this).remove();
                    }
                });
                that.formData[formId][name] = '';

                var url = that.propertiesMap[formId][divId]['requestURL'];

                if (stringIsEmpty(url)) return false;
                url = url + ((url.indexOf('?') == -1) ? '?' : '&');
                var newUrl = url + 'parentId=' + data.value;

                ajaxData('get', newUrl, {}, function (res) {
                    var list = res[that.config.ajaxRequestName.resultName];
                    if (list == undefined || list.length == 0) return;
                    var len = item.find('select').length;
                    _that.initSelectS(that, item, formId, divId, list, len);
                    layui.form.render('select')
                }, that.config.ajaxRequestName);

            });
        }, validateFileType: function (types, filename) {//验证文件类型
            if (types == undefined || types.length == 0) return true;
            for (var i = 0; i < types.length; i++) {
                if (filename.endsWith(types[i])) return true;
            }
            return false;
        }
    }

    return tools;
}

/**
 * 显示错误信息
 * @param divId div id
 * @param msg
 */
AdminJFormData.prototype.showValidateMessage = function (divId, msg) {
    var showErrorFunc = function (divId, msg) {
        if (!stringIsEmpty(msg)) layui.layer.msg(msg, {icon: 5});
        $('#' + divId).addClass('adminj-validate-error');
        setTimeout(function () {
            $('#' + divId).removeClass('adminj-validate-error');
        }, 1000);
    }
    showErrorFunc(divId, msg);
}

/**
 * 显示错误信息
 * @param field 字段名
 * @param msg
 */
AdminJFormData.prototype.showValidateMessageByField = function (field, msg) {
    var that = this;
    var showMsg = false;
    if (field != undefined) {
        $('[name="' + field + '"]').parents().find('.layui-form-item').each(function (i, e) {
            var len = $(this).find('[name="' + field + '"]').length;
            if (len > 0) {
                var id = $(this).attr('id');
                that.showValidateMessage(id, msg)
                showMsg = true;
                return false;
            }
        });
    }

    if (!showMsg) layui.layer.msg(msg, {icon: 5});
}

/**
 * 验证
 * @param formId
 * @returns {boolean} 通过返回true
 */
AdminJFormData.prototype.validate = function (formId) {//对一部分不能直接用layui验证的功能手动验证,成功返回true,失败false
    var that = this;
    var data = that.getData(formId);
    console.log('validate formData:' + JSON.stringify(that.formData[formId]))
    console.log('validate:' + JSON.stringify(data))
    var formMap = that.propertiesMap[formId];

    var showErrorFunc = function (divId, msg) {
        that.showValidateMessage(divId, msg)
    }

    for (divId in formMap) {
        var properties = formMap[divId];
        var cptId = properties.id
        var name = properties.name;
        var label = properties.label;
        var required = properties.required;
        var value = data[name];
        if (label == undefined) label = '';

        if (cptId == 'uploadFiles' || cptId == 'uploadImages' || cptId == 'uploadFile' || cptId == 'uploadImage') {
            if (required == '0') {
                if (value == undefined || value.length == 0) {
                    showErrorFunc(divId, that.config.messages.validate_required_msg);
                    return false;
                }

            }

        } else if (cptId == 'date') {
            var res = that.tools.validateDateRangeFunc(value, properties);
            if (!res) {
                showErrorFunc(divId, '');
                return false;
            }
        } else if (cptId == 'dateRange') {
            var startDate = data[properties.startDateName];
            var endDate = data[properties.endDateName];
            var res = that.tools.validateDateRangeFunc(startDate, properties);
            if (!res) {
                showErrorFunc(divId, '');
                return false;
            }
            res = that.tools.validateDateRangeFunc(endDate, properties);
            if (!res) {
                showErrorFunc(divId, '');
                return false;
            }
        } else if (cptId == 'select2' || cptId == 'checkbox') {
            if (required == '0' && (value == undefined || value.length == 0)) {
                showErrorFunc(divId, that.config.messages.validate_required_msg);
                return false;
            }
        } else if (cptId == 'editor') {
            var val = that.editorMap[divId].getData();
            if (required == '0' && (val == undefined || val.length == 0)) {
                showErrorFunc(divId, that.config.messages.validate_required_msg);
                return false;
            }
            var minLength = properties.minLength, maxLength = properties.maxLength;
            if (!isNaN(minLength) && val.length < minLength) {
                showErrorFunc(divId, that.config.messages.minlength_msg.format(minLength));
                return false;
            }
            if (!isNaN(maxLength) && val.length > maxLength) {
                showErrorFunc(divId, that.config.messages.maxlength_msg.format(maxLength));
                return false;
            }
        } else if (cptId == 'slider' || cptId == 'rate') {
            if (required == '0' && (isNaN(value) || value < 1)) {
                showErrorFunc(divId, that.config.messages.validate_required_msg);
                return false;
            }
        } else if (cptId == 'selectS') {
            if (required == '0' && (value == undefined || value.length == 0)) {
                showErrorFunc(divId, that.config.messages.validate_required_msg);
                return false;
            }
        }
        return true;
    }
}

/**
 * 获取数据
 * @param formId
 * @returns {*}
 */
AdminJFormData.prototype.getData = function (formId) {
    var that = this;
    var data = layui.form.val(formId);
    var formMap = that.propertiesMap[formId];
    for (divId in formMap) {
        var properties = formMap[divId];
        var cptId = properties.id
        var name = properties.name;
        var defValue = properties.defValue;
        var required = properties.required;
        var isReplaceData = false;
        for (var i = 0; i < that.resetDataCpt.length; i++) {
            var _cptId = that.resetDataCpt[i];
            if (_cptId == cptId) {
                isReplaceData = true;
                break;
            }
        }

        if (isReplaceData) {
            switch (cptId) {
                case 'dateRange':
                    var milliscondFormat = properties.milliscondFormat;
                    var startDate = that.formData[formId][properties.startDateName],
                        endDate = that.formData[formId][properties.endDateName];
                    if (!stringIsEmpty(startDate)) {
                        if (milliscondFormat == '0') {
                            data[properties.startDateName] = stringToDate(startDate).getTime();
                            data[properties.endDateName] = stringToDate(endDate).getTime();
                        } else {
                            data[properties.startDateName] = startDate;
                            data[properties.endDateName] = endDate;
                        }
                    }
                    break;
                case 'date':
                    var milliscondFormat = properties.milliscondFormat;
                    var date = that.formData[formId][properties.name];
                    var _defDate = data[properties.name];
                    if (stringIsEmpty(date) && !stringIsEmpty(_defDate)) date = _defDate;//如果是默认值为当前时间，用户又没选择
                    if (!stringIsEmpty(date)) {
                        if (milliscondFormat == '0') {
                            data[properties.name] = stringToDate(date).getTime();
                        } else {
                            data[properties.name] = date;
                        }
                    }
                    break;
                default:
                    data[name] = that.formData[formId][name];
            }
        }

        if (cptId == 'editor') {
            data[name] = that.editorMap[divId].getData();
        }

        if (!stringIsEmpty(defValue) && stringIsEmpty(data[name])) {
            data[name] = defValue;
        }

        if (cptId == 'uploadFiles' || cptId == 'uploadImages') {
            var uploadRes = data[name];
            if (uploadRes != undefined) {
                var arr = [];
                for (k in uploadRes) {
                    arr[arr.length] = uploadRes[k];
                }
                data[name] = arr;
            }

        }


    }

    var formDataRplace = that.formDataRplace[formId];
    if(formDataRplace!=undefined){
        for(var k in formDataRplace){
            data[k]=formDataRplace[k];
        }
    }

    return data;

}

/**
 * 设定指定字段的值,最终getData 里将返回此值
 * @param formId
 * @param fieldName 字段名
 * @param value
 */
AdminJFormData.prototype.setSingleFormData = function (formId, fieldName, value) {
    var that = this;
    var form = that.formDataRplace[formId];
    if (form == undefined) {
        form = {};
        that.formDataRplace[formId] = form;
    }
    that.formDataRplace[formId][fieldName] = value;
}

/**
 * 设置值
 * @param formId
 * @param data
 * @param params {booleanFieldArray:[],booleanFunc:function(field,val){}} ,把值转为boolean, booleanFieldArray要操作的字段array,booleanFunc 转换为boolean值(返回true/false)
 * @returns {boolean}
 */
AdminJFormData.prototype.setData = function (formId, data, params) {
    var that = this;
    that.editMode = true;
    if (params == undefined) params = {};

    var formMap = that.propertiesMap[formId];
    var loadImageFunc = function (item, initValue) {
        if (!stringIsEmpty(initValue)) {
            var selectLine = item.find('div[flag="upload_div"]').parent().parent();
            selectLine.find('.upload_bar_div').hide();
            selectLine.find('.upload_mask_div').hide();
            var img = selectLine.find('.image_src');
            img.attr('src', initValue);
            img.on('load', function () {
                var imgWidth = img.width(), imgHeight = img.height();
                var _imgHeight = 80 / imgHeight * imgHeight, _imgWidth = 80 / imgHeight * imgWidth;
                img.css('width', _imgWidth + 'px').css('height', _imgHeight + 'px')
                selectLine.find('[update_width="true"]').each(function () {
                    $(this).css('width', _imgWidth + 'px')
                });
            });
            selectLine.find('#adminj-upload-ul').children().css('border', '0px')
            selectLine.find('.image_src').show();
            selectLine.find('.bi-cloud-upload').hide();
        }
    }

    for (divId in formMap) {
        var properties = formMap[divId];
        var cptId = properties.id
        var name = properties.name;
        var initValue = data[name];
        //var defValue=properties.defValue;//由提交时替换
        var item = $('#' + divId);
        if (initValue == undefined) continue;

        switch (cptId) {
            case 'date':
                var milliscondFormat = properties.milliscondFormat, currentTime = properties.currentTime;
                var dateFormat = properties.dateFormat;
                var val = initValue;
                if (milliscondFormat == '0' && !isNaN(initValue)) {
                    val = new Date(parseInt(initValue)).format(dateFormat);
                }
                if (stringIsEmpty(val) && currentTime == '0') {
                    val = new Date().format(dateFormat);
                }

                data[name] = val;
                break;
            case 'dateRange':
                var startDateName = properties.startDateName, endDateName = properties.endDateName;
                var milliscondFormat = properties.milliscondFormat, currentTime = properties.currentTime;
                var startDate = data[startDateName], endDate = data[endDateName];
                var _startDate = undefined, _endDate = undefined;
                var dateFormat = properties.dateFormat;
                var val = '';
                if (milliscondFormat == '0') {
                    if (!isNaN(startDate)) {
                        _startDate = new Date(parseInt(startDate)).format(dateFormat);
                        data[startDateName] = _startDate;
                        val = _startDate;
                    }
                    if (!isNaN(endDate)) {
                        _endDate = new Date(parseInt(endDate)).format(dateFormat);
                        data[endDateName] = _endDate;
                        val = val + ' - ' + _endDate;
                    }
                }

                if (stringIsEmpty(val) && currentTime == '0') {
                    var date = new Date().format(dateFormat);
                    val = date + ' - ' + date;
                    data[startDateName] = date;
                    data[endDateName] = date;
                }

                data[divId] = val;

                break;
            case 'editor':
                $('#' + divId).find('.editor').html(initValue);
                break;
            case 'select2':
                $('#' + divId).find('select').val(initValue).trigger('change');
                break;
            case 'slider':
                var val = parseInt(initValue);
                if (isNaN(val)) val = undefined;
                that.initSlider(that, $('#' + divId), val);
                break;
            case 'rate':
                var val = parseInt(initValue);
                if (isNaN(val)) val = undefined;
                that.initRate(that, $('#' + divId), val);
                break;
            case 'checkbox':
                if (initValue != undefined) {
                    $('#' + divId).find('input[type="checkbox"]').each(function (i, e) {
                        var _val = $(this).val();
                        var checked = '';
                        for (var j = 0; j < initValue.length; j++) {
                            if (_val == initValue[j]) {
                                checked = 'checked';
                                break;
                            }
                        }
                        $(this).prop('checked', checked);
                    });

                }
                layui.form.render('checkbox')
                break;
            case 'uploadImage':
                loadImageFunc(item, initValue);
                break;
            case 'uploadImages':
                if (initValue != undefined && initValue.length > 0) {
                    var uploadCount = properties.uploadCount;
                    if (isNaN(uploadCount)) uploadCount = 5;
                    item.find('.adminj-add-upload-div').prev().remove();//删除默认一个上传框
                    if (initValue.length >= uploadCount) item.find('.adminj-add-upload-div').hide();//hide + 号
                    for (var i = 0; i < initValue.length; i++) {//绘制图片上传框
                        that.tools.createUploadImages.create(item);
                    }
                    item.find('.adminj-add-upload-div').parent().children().each(function (i, e) {//显示图片内容
                        loadImageFunc($(this), initValue[i]);
                    });
                    var mapData = {};
                    item.find('div[flag="upload_div"]').each(function (i, e) {
                        mapData[$(this).attr('id')] = initValue[i];
                    });
                    data[name] = mapData;//重置数据
                }
                break;
            case 'uploadFiles':
                var deleteFunc = function (tr, formId, divId) {
                    var pro = that.propertiesMap[formId][divId];
                    var name = pro.name;
                    tr.find('.upload-delete').on('click', function () {
                        try {
                            var trUploadId = $(this).parent().parent().attr('id')
                            tr.remove();
                            var fileNames = that.formData[formId][name]
                            if (fileNames != undefined) delete fileNames[trUploadId];
                        } catch (e) {
                            console.log(e)
                        }
                        return false;
                    });
                }
                if (initValue != undefined && initValue.length > 0) {
                    var fileMap = {};
                    for (var i = 0; i < initValue.length; i++) {
                        var index = new Date().getTime() + '-' + i;
                        var tr = $(['<tr id="upload-{0}">'
                            , '<td>{1}</td>'
                            , '<td>{2}KB</td>'
                            , '<td><div class="layui-progress" lay-filter="progress-upload-{0}"  lay-showpercent="true"><div class="layui-progress-bar" lay-percent=""></div></div></td>'
                            , '<td>'
                            , '<button class="layui-btn layui-btn-xs upload-reload layui-hide">重传</button>'
                            , '<button class="layui-btn layui-btn-xs layui-btn-danger upload-delete">删除</button>'
                            , '</td>'
                            , '</tr>'].join('').format(index, initValue[i], ''));
                        //删除
                        deleteFunc(tr, formId, divId);
                        if (properties.disabled == '0') tr.find(':input').addClass('layui-disabled').addClass('layui-unselect').attr('disabled', 'disabled');
                        tr.children().eq(2).children().hide()

                        fileMap['upload-{0}'.format(index)] = initValue[i];

                        item.find('table').append(tr);

                    }
                    data[name] = fileMap;
                }

                break;
            case 'switch':
                if (initValue != undefined) {
                    var selectedValue = properties['selectedValue'], defValue = properties['defValue'];
                    $('#' + divId).find('[type="checkbox"]').prop('checked', initValue == selectedValue ? 'checked' : '');
                }
                break;
            case 'selectS':
                var name = that.propertiesMap[formId][divId]['name'];

                var selectFunc = function (url, divId, selectId) {
                    var newUrl = url + 'selectId=' + selectId;

                    ajaxData('get', newUrl, {}, function (res) {
                        var list = res[that.config.ajaxRequestName.resultName];
                        if (list != undefined && list.length > 0) {
                            for (var j = 0; j < list.length; j++) {
                                var selectArray = list[j];
                                that.tools.initSelectS(that, undefined, formId, divId, selectArray, j);
                            }
                        }

                        layui.form.render('select');
                    }, that.config.ajaxRequestName);
                }

                var url = that.propertiesMap[formId][divId]['requestURL'];
                if (stringIsEmpty(url)) return false;
                url = url + ((url.indexOf('?') == -1) ? '?' : '&');
                selectFunc(url, divId, initValue);

                break;
        }

    }


    for (divId in formMap) {
        var properties = formMap[divId];
        var cptId = properties.id
        var name = properties.name;

        that.formData[formId][name] = data[name];
        if (cptId == 'uploadFile' || cptId == 'uploadImage' || cptId == 'uploadFiles' || cptId == 'uploadImages' || cptId == 'checkbox') delete data[name];//删除原始数据

    }

    //对未注册的字段(_json里没有的字段)boolean 进行转换,目前系统为: 0 true,1 false，layui 值 为true/1时才会选中checkbox
    if (params.setLayuiDataBeforeInterceptor != undefined) {
        params.setLayuiDataBeforeInterceptor(data);
    }

    layui.form.val(formId, data);
    layui.form.render();


}

/**
 * 文件上传点+号后动态生成的上传html
 */
AdminJFormData.prototype.initHtml = function () {
    var html = '<span style="display: none">\n' +
        '        <div id="uploadImages">\n' +
        '            <ul class="adminj-upload-ul">\n' +
        '                <li>\n' +
        '                    <div class="adminj-upload-image-style" update_width="true">\n' +
        '                        <div class="adminj-upload-image-style" style="position:absolute;z-index: 597;" flag="upload_div">\n' +
        '                            <div class="layui-upload-list" style="text-align: center;line-height: 60px;">\n' +
        '                                <i class="layui-icon layui-icon-upload-drag adminj-upload-icon"\n' +
        '                                    style="font-size: 1.8em;color: #1d6fa5;"></i>\n' +
        '                                <p id="msgText" style="display: none"></p>\n' +
        '                            </div>\n' +
        '                            <div class="upload_bar_div" style="top:45%;width: 100%; display: none;position:absolute;"\n' +
        '                                update_width="true">\n' +
        '                                <div class="layui-progress " lay-showpercent="yes" lay-filter="layui-progress">\n' +
        '                                    <div class="layui-progress-bar" lay-percent=""></div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="adminj-upload-image-style" id="upload_image_div"\n' +
        '                            style="position:absolute;z-index: 598;border:dashed 0px red;pointer-events: none;"\n' +
        '                            update_width="true">\n' +
        '                            <img class="layui-upload-img image_src"\n' +
        '                                style="wdith:100%;height: 100px;pointer-events: none;display: none;">\n' +
        '                        </div>\n' +
        '                        <div class="adminj-upload-image-style upload_mask_div" \n' +
        '                            style="position:absolute;z-index: 599;pointer-events: auto; display: none"\n' +
        '                            update_width="true">\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="close_div adminj-upload-tools-div adminj-upload-image-style"\n' +
        '                            style="pointer-events: none;position:absolute;z-index: 600;border:dotted 0px red; "\n' +
        '                            update_width="true">\n' +
        '                            <div\n' +
        '                                style="position:absolute;pointer-events: auto;cursor:pointer;background-color:#1d6fa5;top:-8px;right: -10px;border-radius:10px;height: 18px;width: 18px;line-height: 18px;">\n' +
        '                                <i class="layui-icon layui-icon-close"\n' +
        '                                    style="font-size: 15px; color:#ffffff;padding: 1px;"></i>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '\n' +
        '                    </div>\n' +
        '\n' +
        '\n' +
        '                </li>\n' +
        '\n' +
        '            </ul>\n' +
        '        </div>\n' +
        '    </span>';

    $('body').append(html);
}

layui.link(layui.cache.base + 'adminJFormData.css')
layui.define('all', function (exports) {
    exports('adminJFormData', new AdminJFormData());
})




