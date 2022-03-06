/**
 * AdminJ LayuiFormRender
 * @author adminj
 * @date 2021-8
 * @description  实例化拖放完成后的组件和点击后的右则属性， [开源不易，如果可能请留下版权信息]
 * @version 1.0 
 * 
 */
layui.define(['adminJFormRenderCompontsHtml'], function(exports) {

    var adminJFormRenderComponts = {
        init: function(formRender, initConfig) { //所有方法调用之前调用
            var that = this;
            compontsHtml = layui.adminJFormRenderCompontsHtml;
            compontsHtml.init(formRender, initConfig);

            var interceptors = formRender.interceptors.initCompontBeforeIntercepts;
            interceptors[interceptors.length] = that.initCompontBeforeIntercept; //注册拦截器
        },
        initCompontBeforeIntercept: function(formRender, item, initParams) { //对所有的组件初始化拦截
            var cptId = item.attr('cpt_id');
            var divId = item.attr('id');

            var properties = formRender.propertiesMap[divId];
            if (properties != undefined) { //init form
                //INIT公共基本参数
                var label = properties.label;
                var labelWidth = properties.labelWidth;
                var rowWidth = properties.rowWidth;
                var inputWidth = properties.inputWidth;
                var name = properties.name;
                var comment = properties.comment;
                var placeholder = properties.placeholder;
                var defValue = properties.defValue;

                if (!formRender.isEmpty(label)) item.find('.layui-form-label').html(label);
                if (!formRender.isEmpty(comment)) item.find('.layui-word-aux').html(comment);
                if (!formRender.isEmpty(labelWidth) && formRender.config.defaultLabelWidth + '' != labelWidth) item.find('.layui-form-label').css('width', labelWidth + 'px');
                if (!formRender.isEmpty(rowWidth)) item.css('width', rowWidth + '%');
                if (!formRender.isEmpty(inputWidth)) item.find('.layui-form-label').next().css('width', inputWidth + '%');
                if (!formRender.isEmpty(name) && item.attr('rename') != 'false') item.find(':input').attr('name', name);
                if (!formRender.isEmpty(placeholder) && (cptId == 'text' || cptId == 'textarea' || cptId == 'color')) item.find(':input').attr('placeholder', placeholder);
                if (!formRender.isEmpty(defValue) && (cptId == 'text' || cptId == 'hidden' || cptId == 'password' || cptId == 'textarea' || cptId == 'color')) {
                    if (cptId == 'textarea') {
                        item.find(':input').text(formRender.htmlDecode(defValue));
                    } else {
                        item.find(':input').attr('value', formRender.htmlDecode(defValue));
                    }
                }

                formRender.toolProperites.disabledFunc({ item: item }); //如果DISABLE

            } else { //初始化组件的基本属性
                var name = 'name' + new Date().getTime();
                var cptProperties = { id: cptId, name: name };
                if (item.attr('rename') != 'false') {
                    item.find(':input').attr('name', name);
                }
                formRender.propertiesMap[divId] = cptProperties;
            }
            return true;
        },
        initDragOverComponents: function(formRender) { //中间显示的组件
            var initOptions = function(item, selectedArray, selectedString, optionFunc) { // init option array
                var divId = item.attr('id');
                var properties = formRender.propertiesMap[divId];
                var arr = properties.options;
                if (arr != undefined) {
                    var options = '';
                    for (var i = 0; i < arr.length; i++) {
                        var row = arr[i];
                        var selected = '';
                        if (row.isSelect == '0') {
                            selected = selectedString;
                            if (selectedArray != undefined) {
                                selectedArray[selectedArray.length] = row.value;
                            }
                        }
                        options += optionFunc(i, row, selected);
                    }
                    return options;
                }
                return undefined;
            }

            var initSelectOptions = function(item, selectedArray) { // init select option
                var options = initOptions(item, selectedArray, 'selected', function(index, option, selectResult) {
                    return '<option value="{0}" {1}>{2}</option>'.format(option.value, selectResult, option.text);
                });
                if (options != undefined) {
                    item.find('select').html(options);
                }
            }

            var initRadioOrChecxbox = function(item, inputType) {
                var options = initOptions(item, undefined, 'checked', function(index, option, selectResult) {
                    return '<input name="" type="{0}" value="{1}" index="{2}" {3} title="{4}" lay-skin="primary">'.format(inputType, option.value, index, selectResult, option.text);
                });
                if (options != undefined) {
                    item.find('.layui-form-label').next().html(options);
                }
                var divId = item.attr('id');
                var name = formRender.propertiesMap[divId]['name'];
                if (!formRender.isEmpty(name)) {
                    item.find(':input').attr('name', name);
                }

            }

            var uploadImageFile = function(divId, item) {

                var uploadButId = divId + 'd_upload';
                var filterId = 'layui-progress-' + divId;
                item.find('div[flag="upload_div"]').attr('id', uploadButId)
                item.find('.layui-progress').attr('lay-filter', filterId);
                var uploadInst = layui.upload.render({
                    elem: '#' + uploadButId,
                    url: 'https://httpbin.org/post' //改成您自己的上传接口
                        ,
                    before: function(obj) {
                        //预读本地文件示例，不支持ie8
                        var _selectLine = $('#' + uploadButId).parent().parent();
                        _selectLine.find('.bi-cloud-upload').hide();
                        _selectLine.find('.image_src').css('width', '').css('height', '').hide();
                        _selectLine.find('.adminj-upload-image-style').each(function() {
                            $(this).show();
                        });
                        _selectLine.find('.upload_bar_div').show();
                        _selectLine.find('.upload_mask_div').show();
                        obj.preview(function(index, file, result) {
                            _selectLine.find('.image_src').attr('src', result); //图片链接（base64）
                        });

                        layui.element.progress(filterId, '0%'); //进度条复位
                        //layer.msg('上传中', {icon: 16, time: 0});
                        item.find('.layui-icon-upload-drag').removeClass('layui-icon-upload-drag'); //hidden 上传图标
                    },
                    done: function(res) {
                        var _selectLine = $('#' + uploadButId).parent().parent();
                        _selectLine.find('.upload_bar_div').hide();
                        _selectLine.find('.upload_mask_div').hide();
                        //如果上传失败
                        if (res.code > 0) {
                            _selectLine.find('.bi-cloud-upload').show();
                            return layer.msg('上传失败');
                        }
                        //上传成功的一些操作
                        //……
                        var img = _selectLine.find('.image_src');
                        var imgWidth = img.width(),
                            imgHeight = img.height();
                        var _imgHeight = 80 / imgHeight * imgHeight,
                            _imgWidth = 80 / imgHeight * imgWidth;
                        img.css('width', _imgWidth + 'px').css('height', _imgHeight + 'px')
                        _selectLine.find('[update_width="true"]').each(function() {
                            $(this).css('width', _imgWidth + 'px')
                        });

                        _selectLine.find('#adminj-upload-ul').children().css('border', '0px')
                        _selectLine.find('.image_src').show();
                        _selectLine.find('.bi-cloud-upload').hide();


                        // _selectLine.find('#msgText').html(''); //置空上传失败的状态
                        layui.element.progress(filterId, '0%');
                    },
                    error: function() {
                            item.find('.layui-icon-upload-drag').addClass('layui-icon-upload-drag'); //show 上传图标
                            var _selectLine = $('#' + uploadButId).parent().parent();
                            //演示失败状态，并实现重传
                            _selectLine.find('.upload_bar_div').hide();
                            _selectLine.find('.adminj-upload-image-style').each(function() {
                                $(this).hide();
                            });

                        }
                        //进度条
                        ,
                    progress: function(n, index, e) {
                        layui.element.progress(filterId, n + '%'); //可配合 layui 进度条元素使用
                        if (n == 100) {
                            layer.msg('上传完毕', { icon: 1 });
                        }
                    }
                });
            }

            var initDate = function(item, isRange) {
                var divId = item.attr('id');
                var properties = formRender.propertiesMap[divId];
                var ui = 'date';
                if (properties.dateFormat != undefined) {
                    ui = properties.ui;
                } else {
                    properties.ui = ui;
                    properties.dateFormat = 'yyyy-MM-dd';
                }
                var dateInputId = divId + 'd_rang';
                item.find(':input').attr('id', dateInputId);
                layui.laydate.render({
                    elem: '#' + dateInputId,
                    type: ui,
                    range: isRange
                });
            }


            var components = {
                hidden: {
                    exportHTML: function(formRender, rowData, exportMap, params) { //原始item的json数据,导出的所有json数据，参数索引{index:0}
                        var divId = rowData.divId,
                            cptId = rowData.id;
                        var html = $($('#adminj_cpts_items').find("#" + cptId).find('input').get(0).outerHTML);
                        html.attr('id', divId);
                        if (!formRender.isEmpty(rowData.name)) html.attr('name', rowData.name);
                        if (!formRender.isEmpty(rowData.defValue)) html.val(rowData.defValue);
                        return html;
                    }
                },
                switch: {
                    init: function(formRender, item) {
                        var divId = item.attr('id');
                        var properties = formRender.propertiesMap[divId];
                        var layText = 'NO|OFF';
                        if (!formRender.isEmpty(properties['layText'])) layText = properties['layText'];
                        item.find(':input').attr('lay-text', layText);
                    }
                },
                select: {
                    init: function(formRender, item) {
                        initSelectOptions(item);
                    }
                },
                radio: {
                    init: function(formRender, item) {
                        initRadioOrChecxbox(item, 'radio');
                    }
                },
                checkbox: {
                    init: function(formRender, item) {
                        initRadioOrChecxbox(item, 'checkbox');
                        var divId = item.attr('id');
                        var layuiSkin = formRender.propertiesMap[divId]['layuiSkin'];
                        if (layuiSkin == '0') item.find('[type="checkbox"]').removeAttr('lay-skin');
                    }
                },
                groupLayout: {
                    init: function(formRender, item) {
                        item.children().each(function(i, e) {
                            var itemId = 'sub_' + new Date().getTime() + '_' + i;
                            $(this).attr('id', itemId);
                            formRender.createSortable(itemId, {}); //{draggable:'.adminj-col-item'}
                        });
                    },
                    exportJSONItem: function(formRender, i, item, resultArray) { //导出json数据
                        var cptId = item.attr('cpt_id'),
                            divId = item.attr('id');
                        var properties = formRender.propertiesMap[divId];
                        var _arrL1 = { id: cptId, name: properties.name, children: [] };
                        resultArray[resultArray.length] = _arrL1;
                        item.children().each(function(j, e) {
                            if (!$(this).hasClass('action-tools')) {
                                var children = [];
                                _arrL1.children[j] = children;
                                $(this).children().each(function(k, e) {
                                    var child = $(this);
                                    formRender.exportSingleItemJSON(k, child, children);
                                });
                            }
                        });
                        return true;
                    },
                    importJSON: function(formRender, html, rowData, params) { //formRender,上级节点,导入的json数据,导出的所有json数据，参数索引{index:0}
                        var _divId = rowData.divId,
                            cptId = rowData.id;
                        var subItemHtml = $('#adminj_cpts_items').find("#" + cptId).children().get(0).outerHTML;
                        html.html('');
                        var children = rowData.children;
                        if (children != undefined) {
                            for (var i = 0; i < children.length; i++) {
                                var itemHtml = $(subItemHtml);
                                var sortItemId = 'sub_' + new Date().getTime() + '_' + i;
                                itemHtml.attr('id', sortItemId);
                                itemHtml.removeAttr('class').addClass('adminj-group-layout-border adminj-col-item layui-col-md' + (12 / rowData.children.length));
                                html.append(itemHtml);
                                var _arrL1 = children[i];
                                for (var j = 0; j < _arrL1.length; j++) {
                                    var _arrL2 = _arrL1[j];
                                    formRender.createItemBySingleData(itemHtml, _arrL2, params);
                                }
                            }
                        }
                        formRender.createSortableItemUI(html);
                        delete rowData['children']; //子节点无用数据删除
                        return true;

                    },
                    exportHTML: function(formRender, rowData, exportMap, params) { //formRender,原始item的json数据,导出的所有json数据，参数索引{index:0}
                        var divId = rowData.divId,
                            cptId = rowData.id;
                        var html = $($('#adminj_cpts_items').find("#" + cptId).get(0).outerHTML);
                        html.attr('id', divId).attr('cpt_id', cptId);
                        var subItemHtml = $('#adminj_cpts_items').find("#" + cptId).children().get(0).outerHTML;
                        html.html('');
                        var children = rowData.children;
                        if (children != undefined) {
                            for (var i = 0; i < children.length; i++) {
                                var itemHtml = $(subItemHtml);
                                var sortItemId = 'lay_' + new Date().getTime() + '_' + i;
                                itemHtml.attr('id', sortItemId);
                                itemHtml.removeAttr('class').addClass('adminj-group-layout-border adminj-col-item layui-col-md' + (12 / rowData.children.length));
                                html.append(itemHtml);
                                var _arrL1 = children[i];
                                for (var j = 0; j < _arrL1.length; j++) {
                                    var _arrL2 = _arrL1[j];
                                    var childHtml = params.exportFunc(_arrL2, undefined, params);
                                    itemHtml.append(childHtml);
                                }
                            }
                        }
                        html.removeAttr('rename');
                        return html;
                    }
                },
                tab: {
                    init: function(formRender, item) {
                        var divId = item.attr('id');
                        var properties = formRender.propertiesMap[divId];
                        var name = properties.name;
                        var options = properties.options;
                        if (options == undefined) {
                            options = formRender.toolProperites.copyMap(formRender.config.toolsDefOptions);
                            properties.options = options;
                            properties.children = [
                                [],
                                []
                            ];
                        }
                        item.attr('lay-filter', name);
                        item.find('.layui-tab-content').children().each(function(i, e) {
                            var itemId = 'tab_' + new Date().getTime() + '_' + i;
                            $(this).attr('id', itemId);
                            formRender.createSortable(itemId, {}); //{draggable:'.adminj-col-item'}
                        });
                    },
                    exportJSONItem: function(formRender, i, item, resultArray) {
                        var cptId = item.attr('cpt_id'),
                            id = item.attr('id');
                        var pro = formRender.propertiesMap[id];
                        var _arrL1 = { id: cptId, name: pro.name, options: pro.options, children: [] };
                        resultArray[resultArray.length] = _arrL1;
                        item.children().each(function(i, e) {
                            if ($(this).hasClass('layui-tab-content')) {
                                $(this).children().each(function(j, e1) {
                                    var children = [];
                                    _arrL1.children[j] = children;
                                    $(this).children().each(function(k, e) {
                                        formRender.exportSingleItemJSON(k, $(this), children);
                                    });
                                });
                            }
                        });
                        return true;
                    },
                    importJSON: function(formRender, html, rowData, params) { //formRender,上级节点,导入的json数据,导出的所有json数据，参数索引{index:0}
                        //var _divId = rowData.divId,cptId=rowData.id;
                        var titleNodeHtml = html.find('.layui-tab-title');
                        var subItemHtml = titleNodeHtml.children().get(0).outerHTML;
                        titleNodeHtml.html('');
                        var options = rowData.options;
                        var selectIndex = -1;
                        if (options != undefined) {
                            for (var i = 0; i < options.length; i++) {
                                var _data = options[i];
                                var titleItemHtml = $(subItemHtml);
                                titleItemHtml.html(_data.text);
                                if (_data.isSelect == '0') {
                                    selectIndex = i;
                                    titleItemHtml.addClass('layui-this');
                                } else {
                                    titleItemHtml.removeClass('layui-this');
                                }
                                titleNodeHtml.append(titleItemHtml);
                            }
                        }
                        var tabHtml = html.find('.layui-tab-content');
                        subItemHtml = tabHtml.children().get(0).outerHTML;
                        tabHtml.html('');
                        var children = rowData.children;
                        if (children != undefined) {
                            for (var i = 0; i < children.length; i++) {
                                var itemHtml = $(subItemHtml);
                                if (i == selectIndex) {
                                    itemHtml.addClass('layui-show'); //选中tab
                                } else {
                                    itemHtml.removeClass('layui-show');
                                }
                                var sortItemId = 'tabitem_' + new Date().getTime() + '_' + i;
                                itemHtml.attr('id', sortItemId);
                                tabHtml.append(itemHtml);
                                var _arrL1 = children[i];
                                for (var j = 0; j < _arrL1.length; j++) {
                                    var _arrL2 = _arrL1[j];
                                    formRender.createItemBySingleData(itemHtml, _arrL2, params);
                                }
                            }
                        }
                        formRender.createSortableItemUI(html);
                        delete rowData['children']; //子节点无用数据删除
                        return true;
                    },
                    exportHTML: function(formRender, rowData, exportMap, params) { //原始item的json数据,导出的所有json数据，参数索引{index:0}
                        var divId = rowData.divId,
                            cptId = rowData.id;
                        var html = $($('#adminj_cpts_items').find("#" + cptId).get(0).outerHTML);
                        html.attr('id', divId).attr('cpt_id', cptId);
                        var titleNodeHtml = html.find('.layui-tab-title');
                        var subItemHtml = titleNodeHtml.children().get(0).outerHTML;
                        titleNodeHtml.html('');
                        var options = rowData.options;
                        var selectIndex = -1;
                        if (options != undefined) {
                            for (var i = 0; i < options.length; i++) {
                                var _data = options[i];
                                var titleItemHtml = $(subItemHtml);
                                titleItemHtml.html('');
                                titleItemHtml.removeAttr('class')
                                titleItemHtml.append(_data.text);
                                if (_data.isSelect == '0') {
                                    selectIndex = i;
                                    titleItemHtml.addClass('layui-this');
                                }
                                titleNodeHtml.append(titleItemHtml);
                            }
                        }
                        var tabHtml = html.find('.layui-tab-content');
                        subItemHtml = tabHtml.children().get(0).outerHTML;
                        tabHtml.html('');
                        var children = rowData.children;
                        if (children != undefined) {
                            for (var i = 0; i < children.length; i++) {
                                var itemHtml = $(subItemHtml);
                                if (i == selectIndex) {
                                    itemHtml.addClass('layui-show'); //选中tab
                                } else {
                                    itemHtml.removeClass('layui-show')
                                }
                                itemHtml.removeAttr('style');
                                var sortItemId = 'tabitem_' + new Date().getTime() + '_' + i;
                                itemHtml.attr('id', sortItemId);
                                tabHtml.append(itemHtml);
                                var _arrL1 = children[i];
                                if (_arrL1 == undefined) continue;
                                for (var j = 0; j < _arrL1.length; j++) {
                                    var _arrL2 = _arrL1[j];
                                    var childHtml = params.exportFunc(_arrL2, undefined, params);
                                    itemHtml.append(childHtml);
                                }
                            }
                        }
                        return html;
                    }
                },
                date: {
                    init: function(formRender, item) {
                        initDate(item, false);
                    }
                },
                select2: {
                    init: function(formRender, item, initParams) {
                        var isInitJs = initParams.isInitJs;
                        var divId = item.attr('id');
                        item.find("select").attr('id', 'select_' + divId);
                        var selectedArray = [];
                        initSelectOptions(item, selectedArray);
                        if (isInitJs != false) {
                            item.find("select").select2().val(selectedArray);
                        }
                        //closeOnSelect: false
                        //tags: true, tokenSeparators: [',', ' ']
                    }
                },
                dateRange: {
                    init: function(formRender, item) {
                        initDate(item, true);
                        var cptId = item.attr('cpt_id'),
                            id = item.attr('id');
                        var pro = formRender.propertiesMap[id];
                        if (pro.startDateName == undefined) {
                            pro.startDateName = 'dname0' + new Date().getTime();
                            pro.endDateName = 'dname1' + new Date().getTime();
                        }
                    }
                },
                color: {
                    init: function(formRender, item) {
                        var divId = item.attr('id');
                        var inputId = divId + '_c',
                            colorUiId = divId + '_u';
                        item.find('input').attr('id', inputId);
                        item.find('[flag="color_ui_div"]').attr('id', colorUiId);
                        layui.colorpicker.render({
                            elem: '#' + colorUiId,
                            color: '#1c97f5',
                            done: function(color) {
                                $('#' + inputId).val(color);
                            }
                        });
                    }
                },
                uploadImage: {
                    init: function(formRender, item) {
                        var divId = item.attr('id');
                        uploadImageFile(divId, item);
                    }
                },
                uploadImages: {
                    init: function(formRender, item) {
                        var divId = item.attr('id');
                        var item0 = item.find('.adminj-upload-ul').children().eq(0);
                        item0.find('.close_div').children().eq(0).click(function() {
                            $(this).parent().parent().parent().remove()
                        })

                        uploadImageFile(divId, item0);
                        item.find('.adminj-add-upload-div').click(function() {
                            var node = $($('span #uploadImages .adminj-upload-ul').children(':first').get(0).outerHTML)
                            item.find('.adminj-add-upload-div').before(node)
                            uploadImageFile('up_id_' + Date.now(), node)
                            var len = item.find('.adminj-upload-ul').children().length;
                            node.find('.close_div').children().eq(0).click(function() {
                                var delId = $(this).attr('del_id');
                                $(this).parent().parent().parent().remove()
                            })
                        });
                    }
                },
                uploadFile: {
                    init: function(formRender, item) {
                        var divId = item.attr('id');
                        var fileId = divId + 'd_file';
                        item.find('button').attr('id', fileId);
                        layui.upload.render({
                            elem: '#' + fileId,
                            url: 'https://httpbin.org/post',
                            accept: 'file',
                            done: function(res) {
                                layui.layer.msg('上传成功');
                                $('#uploaded_div').html('')
                            },
                            progress: function(n, index, e) {
                                $('#uploaded_div').html(n + '%')
                                if (n == 100) {
                                    layer.msg('上传完毕', { icon: 1 });
                                }
                            }
                        });
                    }
                },

                uploadFiles: {
                    init: function(formRender, item) {
                        var divId = item.attr('id');
                        var fileId = divId + 'u_file',
                            uploadId = divId + 'up_file';
                        item.find('[select_file="true"]').attr('id', fileId);
                        item.find('[upload_file="true"]').attr('id', uploadId);
                        var uploadListIns = layui.upload.render({
                            elem: '#' + fileId,
                            elemList: $('#fileList') //列表元素对象
                                ,
                            url: 'https://httpbin.org/post',
                            accept: 'file',
                            multiple: true,
                            number: 3,
                            auto: false,
                            bindAction: '#' + uploadId,
                            choose: function(obj) {
                                var that = this;
                                var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                                //读取本地文件
                                obj.preview(function(index, file, result) {
                                    var tr = $(['<tr id="upload-' + index + '">', '<td>' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td><div class="layui-progress" lay-filter="progress-upload-' + index + '"><div class="layui-progress-bar" lay-percent=""></div></div></td>', '<td>', '<button class="layui-btn layui-btn-xs upload-reload layui-hide">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger upload-delete">删除</button>', '</td>', '</tr>'].join(''));

                                    //单个重传
                                    tr.find('.upload-reload').on('click', function() {
                                        obj.upload(index, file);
                                    });

                                    //删除
                                    tr.find('.upload-delete').on('click', function() {
                                        delete files[index]; //删除对应的文件
                                        tr.remove();
                                        uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                                    });

                                    that.elemList.append(tr);
                                    layui.element.render('progress'); //渲染新加的进度条组件
                                });
                            },
                            done: function(res, index, upload) { //成功的回调
                                var that = this;
                                //if(res.code == 0){ //上传成功
                                var tr = that.elemList.find('tr#upload-' + index),
                                    tds = tr.children();
                                tds.eq(3).html(''); //清空操作
                                delete this.files[index]; //删除文件队列已经上传成功的文件
                                return;
                                //}
                                this.error(index, upload);
                            },
                            allDone: function(obj) { //多文件上传完毕后的状态回调
                                console.log(obj)
                            },
                            error: function(index, upload) { //错误回调
                                var that = this;
                                var tr = that.elemList.find('tr#upload-' + index),
                                    tds = tr.children();
                                tds.eq(3).find('.upload-reload').removeClass('layui-hide'); //显示重传
                            },
                            progress: function(n, elem, e, index) {
                                layui.element.progress('progress-upload-' + index, n + '%'); //执行进度条。n 即为返回的进度百分比
                            }
                        })
                    }
                },

                slider: {
                    init: function(formRender, item) {
                        var divId = item.attr('id');
                        var inputId = divId + '_slider';
                        item.find('.layui-form-label').next().children().eq(0).attr('id', inputId);
                        var properties = formRender.propertiesMap[divId];
                        var min = parseInt(properties.minValue),
                            max = parseInt(properties.maxValue),
                            val = parseInt(properties.defValue);
                        var showInput = properties.showInput;
                        if (isNaN(min)) {
                            min = 0;
                            properties.minValue = '' + min;
                        }
                        if (isNaN(max)) {
                            max = 100;
                            properties.maxValue = '' + max;
                        }
                        if (isNaN(val)) {
                            val = 0;
                            properties.defValue = '' + val;
                        }
                        if (showInput == undefined) {
                            showInput = '0';
                            properties.showInput = showInput;
                        }
                        var isShowInput = showInput == '0' ? true : false;

                        layui.slider.render({
                            elem: '#' + inputId,
                            input: isShowInput,
                            value: val,
                            min: min,
                            max: max,
                            setTips: function(value) {
                                return value;
                            },
                            change: function(val) {
                                //if(dragCallback!=undefined)dragCallback(val);
                            }
                        });
                    }
                },
                rate: {
                    init: function(formRender, item) {
                        var divId = item.attr('id');
                        var inputId = divId + '_rate';
                        var properties = formRender.propertiesMap[divId];
                        item.find('.layui-form-label').next().children().eq(0).attr('id', inputId);
                        var _value = parseInt(properties.defValue),
                            _rateCount = parseInt(properties.rateCount);
                        if (isNaN(_rateCount)) _rateCount = 5;
                        properties.defValue = _rateCount + '';
                        if (isNaN(_value)) _value = 0;
                        properties.defValue = _value + '';
                        layui.rate.render({
                            elem: '#' + inputId,
                            value: _value,
                            length: _rateCount
                        })
                    }
                },
                editor: {
                    init: function(formRender, item) { //editor
                        var divId = item.attr('id');
                        var cptId = item.attr('cpt_id');
                        var inputId = divId + '_editor';
                        var html = $($('#adminj_cpts_items').find("#" + cptId).find('.layui-form-label').next().html());
                        var editorParentHtml = item.find('.layui-form-label').next();
                        editorParentHtml.html('');
                        editorParentHtml.html(html);
                        editorParentHtml.children().eq(0).attr('id', inputId);

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
                            })
                            .catch(error => {
                                console.error(error);
                            });

                    },
                    exportJSONItem: function(formRender, i, item, resultArray) {
                        var cptId = item.attr('cpt_id'),
                            id = item.attr('id');
                        var pro = formRender.propertiesMap[id];
                        if (pro != undefined) {
                            delete pro['init'];
                            resultArray[resultArray.length] = pro;
                        }
                        return true;
                    },
                    exportHTML: function(formRender, rowData, exportMap, params) { //原始item的json数据,导出的所有json数据，参数索引{index:0}
                        var divId = rowData.divId,
                            cptId = rowData.id;
                        var html = $($('#adminj_cpts_items').find("#" + cptId).get(0).outerHTML);
                        html.attr('id', divId).attr('cpt_id', cptId);
                        html.find('.editor').html('');
                        formRender.createSortableItemUI(html, { isInitJs: false });
                        html.removeAttr('rename');
                        params.createValidateFunc(rowData, html);
                        return html;
                    }
                }

            };


            return components;
        },
        initToolProperites: function(formRender, initConfig) { //右则的属性列表，可配置方式，操作由回调函数回调
            var labels = formRender.config.labels;
            var config = formRender.config;
            var toolProperites = { //inintFunc:undefined  focusoutFunc: undefined,changeFunc:undefined
                base: {
                    base1: [
                        { label: labels.name, type: 'text', id: 'name' },
                        { label: labels.label, type: 'text', id: 'label', changeFunc: function(params) { params.item.find('.layui-form-label').html(params.value); } },
                        { label: labels.comment, type: 'text', id: 'comment', changeFunc: function(params) { params.item.find('.layui-form-mid').html(params.value); } },
                        { label: labels.required, type: 'checkbox', id: 'required', laySkin: 'primary' },
                        { label: labels.disabled, type: 'checkbox', id: 'disabled', laySkin: 'primary', changeFunc: function(params) { toolProperites.disabledFunc(params); } },
                        { label: labels.labelWidth, type: 'slider', id: 'labelWidth', min: config.defaultLabelWidth, max: 300, defValue: config.defaultLabelWidth, valueEnd: 'px', showInput: 0, changeFunc: function(params) { params.item.find('.layui-form-label').css('width', params.value + 'px'); }, initFunc: function(params) { params.item.find('.layui-form-label').css('width', params.val + 'px'); } },
                        { label: labels.rowWidth, type: 'slider', id: 'rowWidth', min: 30, max: 100, defValue: 100, valueEnd: '%', showInput: 0, changeFunc: function(params) { params.item.css('width', params.value + '%'); }, initFunc: function(params) { params.item.css('width', params.value + '%'); } },
                        { label: labels.inputWidth, type: 'slider', id: 'inputWidth', min: 30, max: 99, defValue: 60, valueEnd: '%', showInput: 0, changeFunc: function(params) { params.item.find('.layui-form-label').next().css('width', params.value + '%'); }, initFunc: function(params) { params.item.find('.layui-form-label').next().css('width', params.value + '%'); } },
                        { label: labels.placeholder, type: 'text', id: 'placeholder', changeFunc: function(params) { params.item.find(':input').attr('placeholder', params.value); } },
                        { label: labels.defValue, type: 'text', id: 'defValue', changeFunc: function(params) { params.item.find(':input').val(params.value); } },
                        { label: labels.minLength, type: 'text', id: 'minLength' },
                        { label: labels.maxLength, type: 'text', id: 'maxLength' },
                        { label: labels.validateRule, type: 'select2', id: 'validateRule', options: config.validateRule },
                    ],
                    base2: [
                        { label: labels.uploadUrl, type: 'text', id: 'uploadUrl' },
                        { label: labels.minSize, type: 'text', id: 'minSize' },
                        { label: labels.maxSize, type: 'text', id: 'maxSize' },
                        { label: labels.uploadCount, type: 'text', id: 'uploadCount' },
                    ],
                    base3: [
                        { label: labels.currentTime, type: 'checkbox', id: 'currentTime', laySkin: 'primary' },
                        { label: labels.milliscondFormat, type: 'checkbox', id: 'milliscondFormat', laySkin: 'primary' },
                        { label: labels.minDate, type: 'date', id: 'minDate', ui: 'date', range: '1' },
                        { label: labels.maxDate, type: 'date', id: 'maxDate', ui: 'date', range: '1' },
                    ]
                },
                text: function(item) {
                    return [
                        { isArray: 0, properties: toolProperites.base.base1 },
                        { label: labels.minValue, type: 'text', id: 'minValue' },
                        { label: labels.maxValue, type: 'text', id: 'maxValue' },
                    ];
                },
                hidden: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, showTypes: ['name', 'defValue', 'validateRule'] }]
                },
                password: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, hideTypes: ['placeholder', 'defValue'] }]
                },
                textarea: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, hideTypes: ['comment', 'validateRule'] }]
                },
                date: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, showTypes: ['name', 'label', 'comment', 'required', 'labelWidth', 'rowWidth', 'disabled'] },
                        { label: labels.dateFormat, type: 'select', id: 'dateFormat', range: "1", options: config.toolsDateOptions, changeFunc: toolProperites.dateFormatSelectFunc },
                        { isArray: 0, properties: toolProperites.base.base3 },
                    ]
                },
                switch: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, showTypes: ['name', 'label', 'comment', 'required', 'labelWidth', 'rowWidth', 'disabled'] },
                        { label: labels.isSelect, type: 'checkbox', id: 'isSelect', laySkin: 'primary', defValue: '0', changeFunc: toolProperites.switchChangeFunc, initFunc: toolProperites.switchInitFunc },
                        { label: labels.selectedValue, type: 'text', id: 'selectedValue', defValue: '0' },
                        { label: labels.defValue, type: 'text', id: 'defValue', defValue: '1' },
                    ]
                },
                select: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, showTypes: ['name', 'label', 'comment', 'required', 'labelWidth', 'rowWidth', 'disabled'] },
                        { label: labels.selectDataType, type: 'checkbox', id: 'dataType', laySkin: 'primary' , changeFunc: toolProperites.selectDataTypeChangeFunc, initFunc: toolProperites.selectDataTypeInitFunc},
                        { label: labels.requestURL, type: 'text', id: 'requestURL' },
                        { label: labels.optionsKeyName, type: 'text', id: 'optionsKeyName' },
                        { label: labels.optionsValueName, type: 'text', id: 'optionsValueName' },
                        { label: labels.createSelectItem, type: 'optionsTable', id: '', clickType: 'radio', options: toolProperites.copyMap(config.toolsDefOptions), changeFunc: toolProperites.optionsChangeFunc },
                    ]
                },
                select2: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, showTypes: ['name', 'label', 'required', 'labelWidth', 'rowWidth', 'inputWidth', 'disabled'] },
                        { label: labels.selectDataType, type: 'checkbox', id: 'dataType', laySkin: 'primary' , changeFunc: toolProperites.selectDataTypeChangeFunc, initFunc: toolProperites.selectDataTypeInitFunc},
                        { label: labels.requestURL, type: 'text', id: 'requestURL' },
                        { label: labels.optionsKeyName, type: 'text', id: 'optionsKeyName' },
                        { label: labels.optionsValueName, type: 'text', id: 'optionsValueName' },
                        { label: labels.createSelectItem, type: 'optionsTable', id: '', clickType: 'checkbox', options: toolProperites.copyMap(config.toolsDefOptions), changeFunc: toolProperites.optionsChangeFunc },
                    ]
                },
                radio: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, showTypes: ['name', 'label', 'comment', 'required', 'labelWidth', 'rowWidth', 'disabled'] },
                        { label: labels.createSelectItem, type: 'optionsTable', id: '', clickType: 'radio', options: toolProperites.copyMap(config.toolsDefOptions), changeFunc: toolProperites.optionsChangeFunc },
                    ]
                },
                checkbox: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, showTypes: ['name', 'label', 'comment', 'required', 'labelWidth', 'rowWidth', 'disabled'] },
                        {
                            label: labels.layuiSkin,
                            type: 'checkbox',
                            id: 'layuiSkin',
                            defValue: '1',
                            laySkin: 'primary',
                            changeFunc(params) {
                                if (params.value == '1') { params.item.find(':checkbox').attr('lay-skin', 'primary') } else { params.item.find(':checkbox').removeAttr('lay-skin') }
                                layui.form.render('checkbox');
                            }
                        },
                        { label: labels.createSelectItem, type: 'optionsTable', id: '', clickType: 'checkbox', options: toolProperites.copyMap(config.toolsDefOptions), changeFunc: toolProperites.optionsChangeFunc },
                    ]
                },
                dateRange: function(item) {
                    return [{ label: labels.startDateName, type: 'text', id: 'startDateName' },
                        { label: labels.endDateName, type: 'text', id: 'endDateName' },
                        { isArray: 0, properties: toolProperites.base.base1, showTypes: ['label', 'comment', 'required', 'labelWidth', 'rowWidth', 'disabled'] },
                        { label: labels.dateFormat, type: 'select', id: 'dateFormat', range: "0", options: config.toolsDateRangeOptions, changeFunc: toolProperites.dateFormatSelectFunc },
                        { isArray: 0, properties: toolProperites.base.base3 },
                    ]
                },
                color: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, showTypes: ['name', 'label', 'comment', 'required', 'labelWidth', 'rowWidth', 'placeholder', 'defValue', 'disabled'] }, ]
                },
                editor: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, hideTypes: ['placeholder', 'defValue', 'validateRule', 'inputWidth'] }]
                },
                slider: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, hideTypes: ['placeholder', 'defValue', 'validateRule', 'minLength', 'maxLength'] },
                        { label: labels.showInput, type: 'checkbox', id: 'showInput', laySkin: 'primary', changeFunc: toolProperites.sliderFocusoutFunc },
                        { label: labels.defValue, type: 'text', id: 'defValue', focusoutFunc: toolProperites.sliderFocusoutFunc },
                        { label: labels.minValue, type: 'text', id: 'minValue', focusoutFunc: toolProperites.sliderFocusoutFunc },
                        { label: labels.maxValue, type: 'text', id: 'maxValue', focusoutFunc: toolProperites.sliderFocusoutFunc },
                        { label: labels.suffix, type: 'text', id: 'suffix', focusoutFunc: toolProperites.sliderFocusoutFunc },
                    ]
                },
                rate: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, hideTypes: ['placeholder', 'defValue', 'validateRule', 'minLength', 'maxLength', 'inputWidth'] },
                        { label: labels.defValue, type: 'text', id: 'defValue', focusoutFunc: toolProperites.rateFocusoutFunc },
                        { label: labels.rateCount, type: 'text', id: 'rateCount', focusoutFunc: toolProperites.rateFocusoutFunc }
                    ]
                },
                selectS: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, hideTypes: ['placeholder', 'defValue', 'validateRule', 'minLength', 'maxLength', 'inputWidth'] },
                        { label: labels.requestURL, type: 'text', id: 'requestURL' },
                        { label: labels.createSelectFirst, type: 'optionsTable', id: '', show: { text: '0' }, options: [], changeFunc: toolProperites.optionsChangeFunc },
                    ]
                },
                tab: function(item) {
                    return [{ label: labels.name, type: 'text', id: 'name' },
                        { label: labels.createSelectItem, type: 'optionsTable', id: '', clickType: 'radio', show: { text: '0', click: '0' }, options: [], changeFunc: toolProperites.optionsChangeFunc },
                    ]
                },
                uploadImage: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, hideTypes: ['placeholder', 'defValue', 'validateRule', 'minLength', 'maxLength', 'inputWidth'] },
                        { isArray: 0, properties: toolProperites.base.base2, hideTypes: ['uploadCount'] },
                        { label: labels.validateRule, type: 'select2', id: 'validateRule', options: config.uploadTypes },
                    ]
                },
                uploadImages: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, hideTypes: ['placeholder', 'defValue', 'validateRule', 'minLength', 'maxLength', 'inputWidth'] },
                        { isArray: 0, properties: toolProperites.base.base2 },
                        { label: labels.validateRule, type: 'select2', id: 'validateRule', options: config.uploadTypes },
                    ]
                },
                uploadFile: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, hideTypes: ['placeholder', 'defValue', 'validateRule', 'minLength', 'maxLength', 'inputWidth'] },
                        { isArray: 0, properties: toolProperites.base.base2, hideTypes: ['uploadCount'] },
                        { label: labels.validateRule, type: 'select2', id: 'validateRule', tags: '0', placeholder: labels.fileUploadPlaceholder, options: config.uploadTypes },
                    ]
                },
                uploadFiles: function(item) {
                    return [{ isArray: 0, properties: toolProperites.base.base1, hideTypes: ['placeholder', 'defValue', 'validateRule', 'minLength', 'maxLength', 'inputWidth'] },
                        { isArray: 0, properties: toolProperites.base.base2 },
                        { label: labels.validateRule, type: 'select2', id: 'validateRule', tags: '0', placeholder: labels.fileUploadPlaceholder, options: config.uploadTypes },
                    ]
                },
                groupLayout: function(item) {
                    return [
                        { label: labels.name, type: 'text', id: 'name' },
                        { label: labels.groupCount, type: 'select', id: 'groupCount', defValue: '2', options: config.groupLayoutGroup, changeFunc: toolProperites.groupLayoutFunc },
                    ]
                },
                //-------------function start
                disabledFunc: function(params) { //启用禁用组件
                    var item = params.item;
                    var divId = item.attr('id'),
                        cptId = item.attr('cpt_id');
                    var properties = formRender.propertiesMap[divId];
                    var val = params.value;
                    if (formRender.isEmpty(val)) val = properties.disabled;

                    if (cptId == 'slider') {
                        this.sliderFocusoutFunc(params);
                    } else if (cptId == 'rate') {
                        this.rateFocusoutFunc(params);
                    } else if (cptId == 'uploadImage' || cptId == 'uploadImages' || cptId == 'uploadFile' || cptId == 'uploadFiles') { //不操作
                    } else {
                        if (val == '0') {
                            item.find(':input').addClass('layui-disabled').addClass('layui-unselect').attr('disabled', 'disabled');
                        } else {
                            item.find(':input').removeClass('layui-disabled').removeClass('layui-unselect').removeAttr('disabled');
                        }
                    }

                    layui.form.render();

                },
                groupLayoutFunc: function(params) {
                    var item = params.item;
                    var divId = item.attr('id');
                    var item = $('#' + divId);
                    var countChildFunc = function(obj) { //且计算子一级有 .adminj-col-item 的item数量
                        var count = 0
                        obj.children().each(function() {
                            if ($(this).hasClass('adminj-col-item')) {
                                count++;
                            }
                        });
                        return count;
                    };

                    var initLayoutEvent = function(item) { //递归重置事件
                        formRender.createSortableItemUI(item);
                        item.find('.adminj-col-item').children().each(function(i, e) {
                            initLayoutEvent($(this));
                        });
                    };


                    var currentGroupCount = formRender.propertiesMap[divId].groupCount;
                    if (currentGroupCount == undefined) {
                        currentGroupCount = countChildFunc(item);
                        formRender.propertiesMap[divId].groupCount = currentGroupCount + '';
                    } else {
                        currentGroupCount = parseInt(currentGroupCount);
                    }

                    var val = parseInt(params.value);
                    var count = countChildFunc(item);
                    if (count == val) return;
                    var col = 12 / val;

                    if (val < count) { //删除多的项目
                        var index = 0;
                        var srcHtml = $(item.get(0).outerHTML); //需要COPY整个节点，再重置事件，不然拖动时乱跳
                        srcHtml.children().each(function(i, e) {
                            if ($(this).hasClass('adminj-col-item')) {
                                if (index >= val) {
                                    $(this).remove();
                                } else {
                                    $(this).removeAttr('class').addClass('adminj-group-layout-border adminj-col-item layui-col-md' + col);
                                }
                                index++;
                            }
                        });
                        formRender.propertiesMap[divId]['groupCount'] = val + '';
                        item.after(srcHtml);
                        item.remove();
                        item = srcHtml;
                        initLayoutEvent(item);

                        layui.form.render();

                        return;
                    }

                    var loop = val - count;
                    var _itemHtml = '';
                    var index = val + 1;
                    for (var i = 0; i < loop; i++) {
                        var itemId = 'sub_' + new Date().getTime() + '_' + index;
                        _itemHtml += '    <div class="adminj-group-layout-border adminj-col-item "  id="' + itemId + '"  ></div>\n';
                        index++;
                    }
                    var itemHtml = $(_itemHtml);
                    item.append(itemHtml);

                    index = 0;
                    item.children().each(function(i, e) {
                        if ($(this).hasClass('adminj-col-item')) {
                            $(this).removeAttr('class').addClass('adminj-group-layout-border adminj-col-item layui-col-md' + col);
                            if (index >= count) {
                                var itemId = $(this).attr('id');
                                formRender.createSortable(itemId, {}); //{draggable: '.adminj-col-item'}
                            }
                            index++;
                        }
                    });
                    formRender.propertiesMap[divId]['groupCount'] = val + '';
                    layui.form.render();

                },
                copyMap: function(map) {
                    return JSON.parse(JSON.stringify(map));
                },
                rateFocusoutFunc: function(params) {
                    var item = params.item;
                    var divId = item.attr('id');
                    var properties = formRender.propertiesMap[divId];
                    var disabled = (properties.disabled == '0') ? true : false;
                    var inputId = params.item.attr('id') + '_rate';
                    var _value = parseInt($('#defValue').val()),
                        _rateCount = parseInt($('#rateCount').val());
                    if (isNaN(_rateCount)) _rateCount = 5;
                    if (isNaN(_value)) _value = 0;
                    layui.rate.render({
                        elem: '#' + inputId,
                        value: _value,
                        readonly: disabled,
                        length: _rateCount
                    })
                },
                sliderFocusoutFunc: function(params) {
                    var item = params.item;
                    var divId = item.attr('id');
                    var cptId = item.attr('cpt_id');
                    var properties = formRender.propertiesMap[divId];
                    var showInput = (properties.showInput == undefined || properties.showInput == '0') ? true : false;
                    var disabled = (properties.disabled == '0') ? true : false;
                    var min = parseInt($('#minValue').val()),
                        max = parseInt($('#maxValue').val()),
                        val = parseInt($('#defValue').val());
                    var suffix = $('#suffix').val();
                    if (isNaN(min)) min = 0;
                    if (isNaN(max)) max = 100;
                    if (isNaN(val)) val = 0;

                    var inputId = item.attr('id') + '_slider';
                    item.find('.layui-form-label').next().children().eq(0).attr('id', inputId);
                    var sliderParams = {
                        elem: '#' + inputId,
                        input: showInput,
                        value: val,
                        min: min,
                        max: max,
                        disabled: disabled,
                        setTips: function(value) {
                            return value + suffix;
                        }
                    };

                    layui.slider.render(sliderParams);
                },
                optionsActionFunc: function() {
                    var funcMap = {};
                    var optionsAction = {
                        register: function(name, func) {
                            funcMap[name] = func;
                        },
                        execute: function(params) {
                            var cptId = params.item.attr('cpt_id');
                            var func = funcMap[cptId];
                            if (func != undefined) func(params);
                        }
                    }

                    var base = function(params) { //demo 
                        var index = params.index;
                        var item = params.item;
                        var cptId = item.attr('cpt_id');
                        var divId = item.attr('id');
                        var toolProperties = params.properties;
                        var properties = formRender.propertiesMap[divId];

                        if (params.action == 'add') {} else if (params.action == 'edit') {} else if (params.action == 'delete') {} else if (params.action == 'click') {} else if (params.action == 'init') {}

                    }

                    var tabOptionChangeFunc = function(params) {
                        var index = params.index;
                        var item = $('#' + params.item.attr('id'));
                        var cptId = item.attr('cpt_id');
                        var divId = item.attr('id');
                        var toolProperties = params.properties;
                        var properties = formRender.propertiesMap[divId];
                        if (params.action == 'add') {
                            var option = params.value;
                            var newItemId = 'tab_' + new Date().getTime();
                            item.find(".layui-tab-title").each(function(i, e) {
                                $(this).append('<li>{0}</li>'.format(option.text));
                                return false;
                            })
                            item.find(".layui-tab-content").each(function(i, e) {
                                $(this).append('<div class="layui-tab-item adminj-col-item" id="{0}" style="border: 1px dashed cadetblue;min-height: 200px;"></div>\r\n'.format(newItemId));
                                return false;
                            })
                            formRender.createSortable(newItemId, {});
                        } else if (params.action == 'edit') {
                            item.find('.layui-tab-title').children().eq(index).html(params.form.val());
                        } else if (params.action == 'delete') {
                            var initLayoutEvent = function(item) { //递归重置事件
                                formRender.createSortableItemUI(item);
                                item.find('.adminj-col-item').children().each(function(i, e) {
                                    initLayoutEvent($(this));
                                });
                            };

                            var newItem = $(item.get(0).outerHTML);
                            item.after(newItem);
                            item.remove();
                            item = newItem;
                            item.find('.layui-tab-title').children().each(function(i, e) {
                                if (i == index) {
                                    $(this).remove();
                                    return false;
                                }
                            });
                            item.find('.layui-tab-content').children().each(function(i, e) {
                                if (i == index) {
                                    $(this).remove();
                                    return false;
                                }
                            });

                            initLayoutEvent(item);
                        } else if (params.action == 'click') {
                            item.children().each(function(i, e) {
                                if ($(this).hasClass('layui-tab-title')) {
                                    $(this).children().each(function(i, e) {
                                        if (i == index) { $(this).addClass('layui-this'); } else { $(this).removeClass('layui-this'); }
                                    });
                                } else if ($(this).hasClass('layui-tab-content')) {
                                    $(this).children().each(function(i, e) {
                                        if (i == index) { $(this).addClass('layui-show'); } else { $(this).removeClass('layui-show'); }
                                    });
                                }
                            });
                        }

                        layui.form.render();

                    }



                    var selectOr2ChangeFunc = function(params) {
                        var index = params.index;
                        var item = params.item;
                        var cptId = item.attr('cpt_id');
                        var divId = item.attr('id');
                        var toolProperties = params.properties;
                        var properties = formRender.propertiesMap[divId];

                        var getselectedArray = function(item) {
                            var arr = [];
                            $('[name="isSelect"]').each(function(i, e) {
                                if ($(this).is(':checked')) {
                                    arr[arr.length] = $(this).val();
                                }
                            });
                            return arr;
                        }

                        if (params.action == 'add') {
                            var option = params.value;
                            var selected = option.isSelect == '0' ? 'selected' : '';
                            item.find('select').append('<option value="{0}" {2}>{1}</option>\r\n'.format(option.value, option.text, selected));

                        } else if (params.action == 'edit') {
                            var name = params.form.attr('name'),
                                val = params.form.val();
                            var htmlNode = item.find('select').find('option').eq(index);
                            if (name == 'value') { htmlNode.attr('value', val); } else { htmlNode.text(val); }
                            if (cptId == 'select2') {
                                item.find('select').trigger('destroy').select2();
                            }


                        } else if (params.action == 'delete') {
                            item.find('select').find('option').eq(index).remove();
                        } else if (params.action == 'click') {
                            if (cptId == 'select2') {
                                var arr = getselectedArray();
                                item.find('select').val(arr).trigger('change');
                            } else if (cptId == 'select') {
                                var data = params.value;
                                item.find(':input').val(data.value);
                            }

                        } else if (params.action == 'init') {
                            var arr = getselectedArray();
                            if (arr.length > 0) {
                                if (cptId == 'select') {
                                    item.find('select').val(arr[0]);
                                } else if (cptId == 'select2') {
                                    item.find('select').val(arr).trigger('change');
                                }
                            }
                        }

                    }

                    var checkedChangeFunc = function(params) {
                        var index = params.index;
                        var item = params.item;
                        var cptId = item.attr('cpt_id');
                        var divId = item.attr('id');
                        var toolProperties = params.properties;
                        var properties = formRender.propertiesMap[divId];

                        if (params.action == 'add') {
                            var option = params.value;
                            var skin = properties.layuiSkin,
                                name = properties.name,
                                checked = option.isSelect == '0' ? 'checked' : '';
                            skin = (skin == undefined || skin == '1') ? 'lay-skin="primary"' : '';
                            var html = '<input name="{5}" type="{0}" {1} value="{2}"  title="{3}" {4}>\r\n'.format(cptId, skin, option.value, option.text, checked, name);
                            item.find(':' + cptId).parent().append(html);
                        } else if (params.action == 'edit') {
                            var name = params.form.attr('name'),
                                val = params.form.val();
                            var htmlNode = item.find(':' + cptId).eq(index);
                            if (name == 'value') { htmlNode.val(val); } else { htmlNode.attr('title', val); }

                        } else if (params.action == 'delete') {
                            var htmlNode = item.find(':' + cptId).eq(index);
                            htmlNode.next().remove();
                            htmlNode.remove();
                        } else if (params.action == 'click') {
                            var val = params.value.elem.value,
                                checked = params.value.elem.checked;
                            item.find(':{1}[value="{0}"]'.format(val, cptId)).prop('checked', checked ? 'checked' : '');

                        } else if (params.action == 'init') {

                        }

                    }

                    optionsAction.register('tab', tabOptionChangeFunc);
                    optionsAction.register('select', selectOr2ChangeFunc);
                    optionsAction.register('select2', selectOr2ChangeFunc);
                    optionsAction.register('radio', checkedChangeFunc);
                    optionsAction.register('checkbox', checkedChangeFunc);
                    return optionsAction;
                },
                optionsChangeFunc: function(params) {

                    toolProperites.optionsActionFunc().execute(params);

                    layui.form.render();
                },
                switchInitFunc: function(params) {
                    var properties = formRender.propertiesMap[params.item.attr('id')];
                    properties.isSelect = '0';
                    properties.selectedValue = '0';
                    properties.defValue = '1';
                },
                switchChangeFunc: function(params) {
                    var item = params.item,
                        val = params.value;
                    var properties = formRender.propertiesMap[item.attr('id')];
                    item.find('input').prop('checked', val == '0' ? 'checked' : '');
                    properties.isSelect = val;
                    layui.form.render('checkbox');
                },
                selectDataTypeChangeFunc: function(params) {//
                    var item = params.item,
                        val = params.value;
                    //var properties = formRender.propertiesMap[item.attr('id')];

                   toolProperites.selectDataTypeDisplayFunc(val)
                },
                selectDataTypeDisplayFunc:function (val){
                    if(val!='' && !isNaN(val) && val==0){
                        $('#requestURL').parent().parent().show();
                        $('#optionsKeyName').parent().parent().show();
                        $('#optionsValueName').parent().parent().show();
                        $('#new_line_butt').hide();
                        $('#option_table').hide();
                    }else{
                        $('#requestURL').parent().parent().hide();
                        $('#optionsKeyName').parent().parent().hide();
                        $('#optionsValueName').parent().parent().hide();
                        $('#new_line_butt').show();
                        $('#option_table').show();
                    }
                },
                selectDataTypeInitFunc:function (params) {
                    var item = params.item;
                    var properties = formRender.propertiesMap[item.attr('id')];
                    var dataType=properties.dataType;
                    setTimeout(function () {
                        toolProperites.selectDataTypeDisplayFunc(dataType);
                    },50)
                },
                dateFormatSelectFunc: function(params) { //选择格式时间函数
                    var item = params.item;
                    var range = params.properties.range == '0' ? true : false;
                    var divId = item.attr('id');
                    var dateDivId = item.find('input').attr('id');
                    var index = params.form.find('option[value="{0}"]'.format(params.value)).attr('_index');
                    var ui = params.properties.options[index].ui;
                    var properties = formRender.propertiesMap[divId];
                    properties.ui = ui;

                    var parentHtml = item.find('#' + dateDivId)

                    var resetHtmlFunc = function(parentHtml, resetDivId, range, isSetData) {
                        var selectDiv = parentHtml.parent();
                        var html = selectDiv.html();
                        selectDiv.children().remove();
                        selectDiv.html(html);

                        layui.laydate.render({
                            elem: '#' + resetDivId,
                            type: ui,
                            range: range,
                            done: function(value, date, endDate) {
                                if (isSetData) {
                                    $('#' + resetDivId).val(value)
                                    properties[resetDivId] = value;
                                }
                            }
                        });
                    }

                    resetHtmlFunc(parentHtml, dateDivId, range, false);
                    resetHtmlFunc($('#minDate'), 'minDate', false, true);
                    resetHtmlFunc($('#maxDate'), 'maxDate', false, true);
                }
            }
            return toolProperites;
        }

    }



    exports('adminJFormRenderComponts', adminJFormRenderComponts);
});