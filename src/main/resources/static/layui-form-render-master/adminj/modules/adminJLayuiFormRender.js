/**
 * AdminJ LayuiFormRender
 * @author adminj
 * @date 2021-8
 * @description  框架类:只定义各种操作， [开源不易，如果可能请留下版权信息]
 * @version 1.0 
 * 
 */
layui.define(['all', 'adminJFormRenderComponts'], function (exports) {

  var adminJLayuiFormRender = {
    propertiesMap: {},//存放组件属性数据
    interceptors: {//
      initCompontBeforeIntercepts: []//拖放后组件初始前拦截器initCompontBeforeIntercept(this, item, initParams)，返回true不中断当前组件执行,params:(that, 组件html item(jquery), initParams(map))
      , initToolCompontBeforeIntercepts: [] //每一次实例右则的属性组件前都会调用，返回true不中断当前组件执行,params:(that, 组件html item(jquery), map(属性组件的属性))
      , initToolCompontAfterIntercepts: [] //每一次实例右则的属性组件完成后都会调用，参数同initToolCompontBeforeIntercepts
    },
    config: {
      dragName: "adminjForm", defaultLabelWidth: 80,
      ajaxRequestName: {
        resultCodeName: 'resultCode',
        messageName: 'message',
        resultName: 'result'
      },
      labels: {
        label: 'label',
        name: 'input的唯一名称',
        labelWidth: 'label列宽',
        rowWidth: '行宽%',
        inputWidth: '输入框宽%',
        validateRule: '验证规则',
        comment: '输入框后的说明',
        required: '必填(选)',
        disabled: '禁用',
        placeholder: 'placeholder',
        defValue: '默认值',
        minValue: '最小值',
        maxValue: '最大值',
        minLength: '最小长度',
        maxLength: '最大长度',
        options: '选择项',
        layuiSkin: 'layui样式显示',
        dateFormat: '时间格式化样式',
        currentTime: '当前时间为初始值',
        isSelect: '默认选中',
        selectedValue: '选中值',
        optionDefText: '选项',
        createSelectItem: '添加新项',
        milliscondFormat: '提交数据时格式化为毫秒',
        minDate: '最小日期',
        maxDate: '最大日期',
        startDateName: '开始时间Name',
        endDateName: '结束时间Name',
        showInput: '滑块是否显示输入框',
        suffix: '滑块拖动时显示的后缀',
        rateCount: '评分显示的星星总数',
        requestURL: 'AJAX数据URL',
        selectDataType: 'Ajax请求数据',
        optionsKeyName: '数据显示字段',
        optionsValueName: '数据存储字段',
        createSelectFirst: '添加Select默认选项',
        uploadType: '文件上传的类型',
        minSize: '文件上传最小大小[KB]',
        maxSize: '文件上传最大大小[KB]',
        uploadUrl: '文件上传地址',
        uploadCount: '最大文件上传数',
        groupCount: '多组布局的例数量',
        cptType: '组件类型',
        fileUploadPlaceholder: '输入后缀后回车,比如 .zip'
      }
      , componts: {
        '基础组件': {
          'text': '输入框',
          'hidden': '隐藏域',
          'password': '密码框',
          'textarea': '文本域',
          'date': '日期选择',
          'switch': '选择开关',
          'select': '下拉选项',
          'select2': '下拉多选',
          'radio': '单选框',
          'checkbox': '多选框',
          'dateRange': '日期范围',
          'color': '颜色选择器',
          'editor': '文本编辑器',
          'slider': '滑块',
          'rate': '评分',
          'selectS': '无限级联动',
          'tab': '选项卡',
          'submitData': '提交数据'
        }, '文件上传': { 'uploadImage': '单图上传', 'uploadImages': '多图上传', 'uploadFile': '文件上传', 'uploadFiles': '多文件上传' }, '布局': { 'groupLayout': '多组布局' }
      },
      validateRule: {
        'a_z': '字母', 'integer': '整数', 'number': '数字', 'chinese': '中文', 'a_z0_9': '英文和整数', 'a_z0_9_': '英文和整数下划线', 'username': '用户名',
        'phone': '手机号', 'email': '邮箱', 'identity': '身份证号', 'zipcode': '邮编'
      },
      toolsDateOptions: [{ value: 'yyyy-MM-dd', ui: 'date', text: 'yyyy-MM-dd' },
      { value: 'yyyy-MM', ui: 'month', text: 'yyyy-MM' },
      { value: 'yyyy', ui: 'year', text: 'yyyy' },
      { value: 'HH:mm', ui: 'time', text: 'HH:mm' },
      { value: 'yyyy-MM-dd HH:mm:ss', ui: 'datetime', text: 'yyyy-MM-dd HH:mm:ss' },],
      toolsDateRangeOptions: [{ value: 'yyyy-MM-dd', ui: 'date', text: 'yyyy-MM-dd' },
      { value: 'yyyy', ui: 'year', text: 'yyyy' },
      { value: 'MM', ui: 'month', text: 'MM' },
      { value: 'HH:mm', ui: 'time', text: 'HH:mm' },
      { value: 'yyyy-MM-dd HH:mm:ss', ui: 'datetime', text: 'yyyy-MM-dd HH:mm:ss' },],
      toolsDefOptions: [{ value: '0', text: '选择', isSelect: '0' }, { value: '1', text: '选项1', isSelect: '1' }],
      uploadTypes: ['.jpg', '.png', '.jpeg', '.gif'],
      groupLayoutGroup: ['1', '2', '3', '4']
    },
    isEmpty: function (str) {
      return str == undefined || str.length == 0;
    },
    render: function (initConfig) {
      var that = this;
      if (initConfig == undefined) initConfig = {};
      if (initConfig.componts != undefined) that.config.componts = initConfig.componts; //自定义左则拖动按钮
      String.prototype.format = function () {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g,
          function (m, i) {
            return args[i];
          });
      }


      this.renderComponts = layui.adminJFormRenderComponts;//组件类
      this.renderComponts.init(that, initConfig);//初始化基本的HTML 组件代码
      this.dragOverComponents = this.renderComponts.initDragOverComponents(this);//拖动放开后生成的组件
      this.propertiesComponents = this.initPropertiesComponents();//统一绘制右则单个属性组件
      this.toolProperites = this.renderComponts.initToolProperites(this, initConfig);//拖放完后的组件属性描述处理(点击组件后生成的右边属性组)
      this.initLeftDragButtons();
      if (initConfig.customRender != undefined) {//可以在这里实现外部自定义组件
        initConfig.customRender({ formRender: that, dragOverComponents: that.dragOverComponents, toolProperites: that.toolProperites });
      }
      this.createSortable('sortable', {});
    }
    ,
    clean:function () {
      this.propertiesMap={}
      $('#sortable').html('')
    }
    , createSortable: function (id, params) {
      var that = this;
      var draggable = params.draggable;
      if (draggable == undefined) draggable = '.adminj-sort-item';
      //var dv=document.getElementById(id)
      //$('#'+id).sortable({
      //new Sortable(dv,{
      $('#' + id).sortable({
        group: that.config.dragName,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        animation: 150,
        handle: '.layui-icon-screen-full',
        draggable: draggable,
        sort: true,
        onEnd: function (/**Event*/evt) {
          that.createSortableItem(evt);
        }
      });

    }
    , initLeftDragButtons: function () {//初始化左边的拖动按钮
      var that = this;

      var buttonDataList = [];
      var i = 0;
      for (compont in that.config.componts) {
        var cptMap = that.config.componts[compont];
        var cptArray = [], j = 0;
        for (cptId in cptMap) {
          cptArray[j] = { id: cptId, name: cptMap[cptId] }
          j++;
        }
        buttonDataList[i] = { groupName: compont, list: cptArray }
        i++;
      }
      var tlp = $('#leftButtonTemplate').html();
      var html = layui.laytpl(tlp).render({
        list: buttonDataList
      });
      var leftButtons = $('#leftDragButtons');
      leftButtons.html(html);
      leftButtons.find('.layui-row').each(function (i, e) {
        $(this).sortable({
          group: {
            name: that.config.dragName,
            pull: 'clone',
            put: false
          },
          animation: 150,
          fallbackOnBody: true,
          swapThreshold: 0.65,
          sort: false,
          onEnd: function (/**Event*/evt) {
            that.createSortableItem(evt);
          }
        });
      });
    },
    createSortableItem: function (evt) {//初始化拖放完成后的单个组件
      var _class = evt.to.getAttribute('class');
      if (evt.to == undefined || !(evt.to.getAttribute('id') == 'sortable' || (_class != undefined && (_class.indexOf('adminj-sort-item') != -1 || _class.indexOf('adminj-col-item') != -1)))) return;
      var item = $(evt.item);
      if (!item.find('button').hasClass('adminj-left-darg-button')) return;
      var divId = 'did_' + Date.now();
      evt.item.setAttribute('id', divId);
      var cptId = '';
      item.find(':input').each(function (i, e) {
        cptId = $(this).attr('cpt_id');
      });
      var html = $($('#adminj_cpts_items').find("#" + cptId).get(0).outerHTML);
      html.attr('id', divId + '0').attr('cpt_id', cptId);

      $('#' + divId).after(html);
      $('#' + divId).remove();

      this.createSortableItemUI(html, {});
      layui.form.render();
    }
    , createSortableItemUI: function (item, initParams) {//初始化item UI 和 个性化事件
      var that = this;
      var beforeInterceptors = this.interceptors.initCompontBeforeIntercepts;
      for (var i = 0; i < beforeInterceptors.length; i++) {
        var res = beforeInterceptors[i](that, item, initParams);
        if (!res) return;//不返回true则中断执行
      }

      this.initSortabletemMouseEvent(item);
      var componentId = item.attr('cpt_id');
      var func = undefined;
      try {
        func = eval('this.dragOverComponents.{0}.init'.format(componentId));
      } catch (e) { }
      if (func != undefined && typeof (func) == 'function') {
        if (initParams == undefined) initParams = {};
        func(this, item, initParams)
      }

    },
    initSortabletemMouseEvent: function (item) {//初始化中间的组件事件
      var that = this;
      item.mouseover(function () {
        if ($(this).hasClass('adminj-group-layout-border')) {
          $(this).attr('removeClass', 'adminj-group-layout-border');
          $(this).removeClass('adminj-group-layout-border');
        }
        $(this).addClass('adminj-mouse-hover-color');
      }).mouseout(function () {
        if ($(this).attr('cpt_id') == 'groupLayout') {
          if ($(this).hasClass('adminj-select-sort-item')) {//如果被选中了则不恢复
            return;
          }
          $(this).removeClass('adminj-mouse-hover-color');
        } else {
          $(this).removeClass('adminj-mouse-hover-color');
          if ($(this).attr('removeClass') != undefined) {
            $(this).addClass($(this).attr('removeClass'))
          }
        }
      }).click(function () {
        if ($(this).hasClass('adminj-select-sort-item')) return;

        $('#sortable').find('.adminj-select-sort-item').each(function () {//删除其它选中层
          $(this).removeClass('adminj-select-sort-item');
          if ($(this).attr('cpt_id') == 'groupLayout') {
            $(this).removeClass('adminj-mouse-hover-color');
          }
          $(this).find('.action-tools').each(function (i, e) {
            $(this).remove();
          });
        });
        var html = $(layui.laytpl($('#toolsTemplate').html()).render({}));
        $(this).addClass('adminj-select-sort-item');
        var id = $(this).attr('id');
        html.find('.adminj-item-top-left-tools').addClass(id);
        html.find('.layui-icon-delete').click(function () {//delete
          $('#sortable').find('.adminj-select-sort-item').remove();
          $('#propertiesDiv').html('');
        });
        html.find('.layui-icon-layer').click(function () {//copy
          var copyNode = $('#sortable').find('.adminj-select-sort-item');
          var copyId = copyNode.attr('id');
          var newDivId = 'did_' + Date.now() + "_0";
          var resultArray = [];
          that.exportSingleItemJSON(0, copyNode, resultArray);
          var newProperties = JSON.parse(JSON.stringify(resultArray[0]));
          that.propertiesMap[newDivId] = newProperties;
          var params = { index: 0, copyNode: copyNode, divId: newDivId };

          that.createItemBySingleData($('#sortable'), newProperties, params);
        });
        $(this).append(html);

        that.propertiesComponents.render($(this));

        return false;
      });
    },
    htmlEncode: function (s) {
      if (s == undefined || s == '') return '';
      s = s.replace(/&/g, "&amp;");
      s = s.replace(/</g, "&lt;");
      s = s.replace(/>/g, "&gt;");
      s = s.replace(/ /g, "&nbsp;");
      s = s.replace(/\'/g, "&#39;");
      s = s.replace(/\"/g, "&quot;");
      return s;
    }, htmlDecode: function (s) {
      if (s == undefined || s.length == 0) return '';
      s = s.replace(/&amp;/g, "&");
      s = s.replace(/&lt;/g, "<");
      s = s.replace(/&gt;/g, ">");
      s = s.replace(/&nbsp;/g, " ");
      s = s.replace(/&#39;/g, "\'");
      s = s.replace(/&quot;/g, "\"");
      return s;
    },
    renderComponent: function (src, item, initParams, excFunc) {//执行组件的render
      var componentId = item.attr('cpt_id');
      var funcName = src + '.' + componentId;
      var func = eval(funcName);
      if (typeof (func) == 'function') {
        excFunc(func, item, initParams);
      }
    },
    initPropertiesComponents: function () {//绘制右边的属性栏
      var that = this;
      var tools = {}
      tools.rootNode = undefined;
      tools.render = function (item) {

        $('#propertiesDiv').html('');
        tools.rootNode = $('#propertiesDiv');

        var cptHtml = tools.renderRow(that.config.labels.cptType, '<span style="font-size: 15px; font-weight: bold">{0}</span>').format(item.attr('cpt_id'));
        tools.rootNode.append(cptHtml);

        this.renderForm(item);
        that.renderComponent('this.propertiesComponents', item, undefined, function (func, item, initParams) {
          func(item);
        });
      }

      tools.renderForm = function (item) {
        var cptId = item.attr('cpt_id');
        var callFunc = eval('that.toolProperites.' + cptId);
        if (typeof (callFunc) != 'function') return;
        var cptProperties = callFunc(item);
        var forFunc = function (arr, showTyps, hideTypes) {
          if(arr==undefined)return;
          for (var i = 0; i < arr.length; i++) {
            var typeData = arr[i];
            if(typeData==undefined)continue;
            if (typeData.isArray == '0') {
              forFunc(typeData.properties, typeData.showTypes, typeData.hideTypes);
            } else {
              if (showTyps != undefined) {
                for (var j = 0; j < showTyps.length; j++) {
                  if (showTyps[j] == typeData.id) {
                    tools.renderFormItemInterceptor(item, typeData);
                  }
                }
              } else if (hideTypes != undefined) {
                var isCreate = true;
                for (var j = 0; j < hideTypes.length; j++) {
                  if (hideTypes[j] == typeData.id) {
                    isCreate = false;
                    break;
                  }
                }
                if (isCreate) {
                  tools.renderFormItemInterceptor(item, typeData);
                }
              } else {
                tools.renderFormItemInterceptor(item, typeData);
              }

            }
          }
        }
        forFunc(cptProperties, undefined, undefined);
      }

      tools.renderFormItemInterceptor = function (item, cptProperties) {
        var beforeInterceptors = that.interceptors.initToolCompontBeforeIntercepts;
        for (var i = 0; i < beforeInterceptors.length; i++) {
          var res = beforeInterceptors[i](that, item, cptProperties);
          if (!res) return;//不返回true则中断执行
        }

        tools.renderFormItem(item, cptProperties);

        var afterInterceptors = that.interceptors.initToolCompontAfterIntercepts;
        for (var i = 0; i < afterInterceptors.length; i++) {
          afterInterceptors[i](that, item, cptProperties);
        }
      }

      //{ label: labels.name, type: 'text', name: 'name', id: 'name',defValue:'' },
      tools.renderFormItem = function (item, cptProperties) {
        var type = cptProperties.type;
        var cptId = item.attr('cpt_id');
        var divId = item.attr('id');
        var defValue = cptProperties.defValue;
        var label = cptProperties.label;
        var _id = cptProperties.id;
        var properties = that.propertiesMap[divId];
        var initFunc = cptProperties.initFunc, changeFunc = cptProperties.changeFunc, focusoutFunc = cptProperties.focusoutFunc;
        if (defValue == undefined) defValue = '';



        switch (type) {
          case 'text':
            var _html = '<input type="text" id="{0}"  class="layui-input"   value="{1}" >'.format(_id, defValue);
            _html = tools.renderRow(label, _html);
            var html = $(_html);
            tools.rootNode.append(html);
            var input = html.find('input');

            if (properties[_id] != undefined) input.val(properties[_id])
            if (initFunc != undefined) initFunc({ item: item, form: html, properties: cptProperties });
            if (changeFunc != undefined) {
              input.keyup(function () {
                var val = $(this).val();
                if (changeFunc != undefined) changeFunc({ item: item, form: $(this), properties: cptProperties, value: val });
                properties[$(this).attr('id')] = that.htmlEncode(val);
              })
            }
            if (focusoutFunc != undefined || (focusoutFunc == undefined && changeFunc == undefined)) {
              input.focusout(function () {
                var val = $(this).val();
                if (focusoutFunc != undefined) focusoutFunc({ item: item, form: $(this), properties: cptProperties, value: val });
                properties[$(this).attr('id')] = that.htmlEncode(val);
              })
            }

            break;
          case 'slider':
            var min = cptProperties.min;
            var max = cptProperties.max;
            var valueEnd = cptProperties.valueEnd;
            var showInput = cptProperties.showInput;

            var html = '<ul class="adminj-propertiesdiv-sp"><li style="margin-top: 10px;margin-bottom: 8px;">{0}</li>\n<li><div id="{1}" ></div></li></ul>'.format(label, _id);
            tools.rootNode.append(html);

            if (properties[_id] == undefined) {
              properties[_id] = defValue;
            } else {
              defValue = properties[_id];
            }
            if (initFunc != undefined) initFunc({ item: item, properties: cptProperties, value: defValue });
            layui.slider.render({
              elem: '#' + _id
              , input: showInput == '0' ? true : false
              , value: defValue
              , min: min
              , max: max
              , setTips: function (value) {
                return value + valueEnd;
              }
              , change: function (val) {
                if (changeFunc != undefined) changeFunc({ item: item, properties: cptProperties, value: val });
                properties[_id] = val;
              }
            });

            break;
          case 'checkbox':
            var check = defValue == '0' ? 'checked' : '';
            if (properties[_id] != undefined) {
              check = properties[_id] == '0' ? 'checked' : '';
            } else {
              properties[_id] = defValue;
            }
            var laySkin = cptProperties.laySkin;
            var _laySkin = '';
            if (laySkin != undefined) _laySkin = 'lay-skin="{0}"'.format(laySkin);

            var html = '<ul class="adminj-propertiesdiv-sp">' +
              '<li style="margin-top: 15px; margin-bottom: 15px;">' +
              '<input type="checkbox" name="{0}" id="{0}" title="{1}" lay-filter="{0}" {2} {3}>' +
              '</li>' +
              '</ul>';
            html = html.format(_id, label, check, _laySkin);
            tools.rootNode.append(html);
            if (initFunc != undefined) initFunc({ item: item, properties: cptProperties, value: properties[_id] });
            layui.form.on('checkbox(' + _id + ')', function (data) {
              var val = data.elem.checked ? '0' : '1';
              properties[$(this).attr('id')] = data.elem.checked ? '0' : '1';
              if (changeFunc != undefined) changeFunc({ item: item, properties: cptProperties, data: data, value: val });
            });

            layui.form.render('checkbox');
            break;
          case 'select2':
            var tags = cptProperties.tags == '0' ? true : false;
            var options = tags ? properties[_id] : cptProperties.options;
            if (options == undefined) options = [];
            var placeholder = cptProperties.placeholder;
            if (placeholder == undefined) placeholder = '';
            var _html = '<select lay-ignore id="{0}" class="select2" multiple="multiple" data-placeholder="{1}" data-dropdown-css-class="select2-purple" style="width: 100%;">\n'.format(_id, placeholder);

            if (Array.prototype.isPrototypeOf(options)) {
              for (var i = 0; i < options.length; i++) {
                var text = options[i];
                _html += '<option value="{0}">{0}</option>\n'.format(text);
              }
            } else {
              for (var k in options) {
                var text = options[k];
                _html += '<option value="{0}">{1}</option>\n'.format(k, text);
              }
            }


            _html += '</select>';
            _html = tools.renderRow(label, _html);
            var html = $(_html);
            tools.rootNode.append(html);
            var select = html.find('select');

            select.select2({ tags: tags, closeOnSelect: tags });
            if (properties[_id] != undefined) {
              select.val(properties[_id]);
              select.trigger('change');
            } else {
              properties[_id] = [];
            }
            if (initFunc != undefined) initFunc({ item: item, form: select, properties: cptProperties, value: properties[_id] });
            select.on('select2:select', function (e) {
              properties[_id] = select.select2("val");
            }).on('select2:unselect', function (e) {
              properties[_id] = select.select2("val");
            });
            break;
          case 'select':
            var options = cptProperties.options;
            var _html = '<select lay-ignore name="{0}" id="dateFormat" style="height: 30px;width:99%;border-color: #eee">'.format(_id);
            for (var i = 0; i < options.length; i++) {
              var row = options[i];
              if (row.value == undefined) {
                _html += '<option value="{0}" _index="{1}">{0}</option>'.format(row, i)
              } else {
                _html += '<option value="{0}" _index="{2}">{1}</option>'.format(row.value, row.text, i)
              }

            }
            _html += '</select>';
            _html = tools.renderRow(label, _html);
            var html = $(_html);
            tools.rootNode.append(html);
            var select = html.find('select');

            if (properties[_id] != undefined) {
              select.val(properties[_id]);
            } else if (defValue != '') {
              select.val(defValue);
            }
            if (initFunc != undefined) initFunc({ item: item, form: select, properties: cptProperties, value: properties[_id] });
            select.change(function () {
              var val = $(this).val();
              if (changeFunc != undefined) changeFunc({ item: item, form: $(this), properties: cptProperties, value: val });
              properties[_id] = val;
            })

            break;
          case 'optionsTable':
            var options = [];
            if (typeof (cptProperties.options) == 'function') {
              options = cptProperties.options();
            } else {
              options = cptProperties.options;
            }
            var _options = properties.options;
            if (_options == undefined) {
              options = JSON.parse(JSON.stringify(options));
              properties.options = options;
            } else {
              options = _options;
            }
            var show = cptProperties.show;
            if (show == undefined) show = { click: '0', value: '0', text: '0' };
            var createTableItemFunc = function (i, _cptId, _clickType, optionItem) {
              var selected = optionItem.isSelect == '0' ? 'checked' : '';
              tr = '    <tr index="{4}">\n';
              if (show.click == '0' && _clickType != undefined) {
                tr += '<td><input type="{0}" name="isSelect"  lay-skin="primary" lay-filter="isSelect" value="{1}" index="{4}" {3}></td>\n';
              }
              if (show.value == '0' && optionItem.value != undefined) {
                tr += '<td style="padding-top: 3px;"><input type="text" name="value" value="{1}" index="{4}" class="layui-input"></td>\n';
              }
              if (show.text == '0') {
                tr += '<td style="padding-left: 3px;padding-top: 3px;"><input type="text" name="text" index="{4}" value="{2}" class="layui-input"></td>\n' +
                  '<td align="center"><i class="layui-icon layui-icon-close-fill" style="font-size: 2em;color: #c7ced5;cursor:pointer"></i></td>\n';
              }
              tr += '</tr>\n';
              tr = tr.format(_clickType, optionItem.value, optionItem.text, selected, i);
              return tr;
            }
            var _html = '<br><br>' +
              '<button class="layui-btn layui-btn-primary layui-border-blue layui-btn-sm" id="new_line_butt">' +
              '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 16px;"></i> {0}</button>' +
              '<table width="100%" border="0" style="margin-top: 5px;" id="option_table" count="{1}">{2}</table>\n';
            var trs = '';
            var clickType = cptProperties.clickType;

            for (var i = 0; i < options.length; i++) {
              if (options[i] == undefined) continue;
              trs += createTableItemFunc(i, cptId, clickType, options[i]);
            }
            _html = _html.format(label, options.length, trs)
            var html = $(_html)
            tools.rootNode.append(html);

            var queryIndex = function (trIndex) {//得到当前tr在数组的index
              var index = 0;
              html.find('.layui-icon-close-fill').parent().parent().each(function (i, e) {
                var _index = $(this).attr('index');
                if (_index == trIndex) {
                  index = i;
                  return false;
                }
              });
              return index;
            };

            var eventFunc = function (item, html) {
              html.find('.layui-icon-close-fill').each(function (i, e) {
                $(this).click(function () {//delete
                  var index = $(this).parent().parent().attr('index');
                  var arrayIndex = queryIndex(index);
                  options.splice(arrayIndex, 1);//删除数据
                  if (changeFunc != undefined) changeFunc({ item: item, form: $(this), action: 'delete', properties: cptProperties, index: arrayIndex });
                  $(this).parent().parent().remove();
                  layui.form.render();
                });
              });
              html.find('[type="text"]').each(function (i, e) {
                $(this).focusout(function () {
                  var _form = $(this);
                  var index = _form.attr('index');
                  var arrayIndex = queryIndex(index);
                  if (_form.attr('name') == 'value') {
                    options[arrayIndex].value = _form.val();
                  } else {
                    options[arrayIndex].text = _form.val();
                  }
                  if (changeFunc != undefined) changeFunc({ item: item, form: _form, action: 'edit', properties: cptProperties, index: arrayIndex });
                })
              });
            };

            layui.form.on('radio(isSelect)', function (data) {
              for (var i = 0; i < options.length; i++) {
                options[i].isSelect = (options[i].value == data.value ? '0' : '1');
              }
              var index = $(data.elem).attr('index');
              var arrayIndex = queryIndex(index);
              if (changeFunc != undefined) changeFunc({ item: item, action: 'click', properties: cptProperties, index: arrayIndex, value: data });

            });

            layui.form.on('checkbox(isSelect)', function (data) {//option属性前如里是checkbox
              var selected = data.elem.checked ? '0' : '1';
              var index = $(data.elem).attr('index');
              var arrayIndex = queryIndex(index);

              if (changeFunc != undefined) changeFunc({ item: item, action: 'click', properties: cptProperties, index: arrayIndex, value: data });

              options[arrayIndex]['isSelect'] = selected;
            });

            eventFunc(item, html);
            $('#new_line_butt').click(function (data) {
              try {
                var count = parseInt($('#option_table').attr('count'));
                var arrItem = { value: count, text: that.config.labels.optionDefText + count, isSelect: '1' };
                options[options.length] = arrItem;
                var tr = createTableItemFunc(count, cptId, clickType, arrItem);
                var jqueryTr = $(tr)
                eventFunc(item, jqueryTr);
                $('#option_table').append(jqueryTr);
                count++;
                $('#option_table').attr('count', count);

                if (changeFunc != undefined) changeFunc({ item: item, action: 'add', properties: cptProperties, value: arrItem });

                layui.form.render();
              } catch (e) {
                console.log(e);
              }
              return false;
            });
            if (changeFunc != undefined) changeFunc({ item: item, action: 'init', properties: cptProperties });

            layui.form.render();
            break;

          case 'date':
            var ui = properties.ui;
            if (properties[_id] != undefined) {
              defValue = properties[_id];
            }
            if (ui == undefined) ui = cptProperties.ui;
            var _html = '<input type="text" id="{0}" value="{1}" class="layui-input" >'.format(_id, defValue);
            _html = tools.renderRow(label, _html);
            var html = $(_html);
            tools.rootNode.append(html);

            if (initFunc != undefined) initFunc({ item: item, form: select, properties: cptProperties, value: defValue });
            layui.laydate.render({
              elem: '#' + _id
              , type: ui
              , value: $('#' + _id).val()
              , range: cptProperties.range == '0' ? true : false
              , done: function (value, date, endDate) {
                $('#' + _id).val(value)
                properties[_id] = value;
                if (changeFunc != undefined) changeFunc({ item: item, form: html, properties: cptProperties, value: value });
              }
            });
            break;
          default://如果没有的类型，如果有函数则执行函数
            var defaultFunc=cptProperties.defaultFunc;//默认值函数
              if(defaultFunc!=undefined)defaultFunc({item:item});
            break;
        }


      }

      tools.renderRow = function (label, input) {
        var html = '<ul class="adminj-propertiesdiv-sp"><li style="margin-top: 0px;">{0}</li>\n<li>{1}</li></ul>'.format(label, input);
        return html;
      }
      return tools;
    },

    //----------------以下为导入导出等功能..
    createItemBySingleData: function (parentNode, rowData, params) {//从JSON DATA生成单个的ITEM
      var that = this;
      var copyNode = params.copyNode;//如果的COPY的则传被COPY的节点
      var _divId = params.divId;
      var cptId = rowData.id;
      var divId = params.index == 0 && _divId != undefined ? _divId : 'did_' + Date.now() + "_" + params.index;
      rowData.divId = divId;

      var html = $($('#adminj_cpts_items').find("#" + cptId).get(0).outerHTML);
      html.attr('id', divId).attr('cpt_id', cptId);
      that.propertiesMap[divId] = rowData;
      if (copyNode != undefined && params.index == 0) {//如果是copy的则放到copy节点的后面
        copyNode.after(html);
      } else {
        parentNode.append(html);
      }

      params.index++;

      var func = undefined;
      try {
        func = eval('that.dragOverComponents.{0}.importJSON'.format(cptId));//执行函数如果返回true则中断执行
      } catch (e) { }
      var exeResult = false;
      if (func != undefined && typeof (func) == 'function') {
        exeResult = func(that, html, rowData, params)
      }
      if (!exeResult) {
        that.createSortableItemUI(html, {});
      }

    },
    importJSON: function (obj) {//导入json生成form
      var that = this;
      var json = undefined;
      if(Array.isArray(obj)) {
        json=obj;
      }else{
        if (str.length < 2) return;
        try {
          json = JSON.parse(str);
        } catch (e) {
          layui.layer.msg(e);
          return;
        }
      }

      that.propertiesMap = {};
      $('#sortable').html('');
      $('#propertiesDiv').html('');


      var params = { index: 0 };
      var parentNode = $('#sortable');
      for (var i = 0; i < json.length; i++) {
        var row = json[i];
        that.createItemBySingleData(parentNode, row, params);
      }

      layui.form.render();
    },
    importHtmlJSON: function (str) {//导入html里的json生成form
      var that = this;
      if (str.length < 2) return;
      var json = undefined;
      try {
        json = JSON.parse(str);
      } catch (e) {
        console.log(e);
        return;
      }
      that.propertiesMap = {};
      $('#sortable').html('');
      $('#propertiesDiv').html('');


      var params = { index: 0 };
      var parentNode = $('#sortable');
      for (var divId in json) {
        var row = json[divId];
        that.createItemBySingleData(parentNode, row, params);
      }

      layui.form.render();
    },
    exportSingleItemJSON: function (i, item, resArr) {//导出单条ITEM结构为JSON
      var that = this;
      var cptId = item.attr('cpt_id'), id = item.attr('id');
      var func = undefined;
      try {
        func = eval('that.dragOverComponents.{0}.exportJSONItem'.format(cptId));//执行函数如果返回true则中断执行
      } catch (e) { }
      var exeResult = false;
      if (func != undefined && typeof (func) == 'function') {
        exeResult = func(that, i, item, resArr)
      }
      if (!exeResult) {
        var pro = that.propertiesMap[id];
        if (pro != undefined) {
          resArr[resArr.length] = pro;
        }
      }
    },
    exportJSON: function () {//导出结构为JSON
      var that = this;
      var resArr = [];
      $('#sortable').children().each(function (i, e) {
        var item = $(this);
        that.exportSingleItemJSON(i, item, resArr);

      });
      var str = JSON.stringify(resArr);
      return str;
    },
    exportToHTML: function () {//EXPORT HTML
      var that = this;
      var createValidateFunc = function (rowData, item) {//生成验证代码
        var isReq = rowData.required;
        var rule = rowData.validateRule;
        var validateStr = '';
        if (rule != undefined) {
          for (var i = 0; i < rule.length; i++) {
            validateStr += rule[i];
            if (i < rule.length - 1) validateStr += '|';
          }
        }

        var appendValidateRuleFunc = function (validateName) {
          validateStr += validateStr.length > 0 ? '|' : '';
          validateStr += validateName;
        }

        var appendIntValidateRuleFunc = function (validateName, dataKey) {
          var val = parseInt(rowData[dataKey]);
          if (!isNaN(val)) {
            appendValidateRuleFunc(validateName);
          }
        }

        appendIntValidateRuleFunc('minLength', 'minLength');
        appendIntValidateRuleFunc('maxLength', 'maxLength');
        appendIntValidateRuleFunc('min', 'minValue');
        appendIntValidateRuleFunc('max', 'maxValue');

        if (isReq == '0') {
          appendValidateRuleFunc('required');
        }

        var rename = item.attr('rename');
        item.removeAttr('rename');
        if (validateStr.length > 0 && rename != 'false') {
          var inputArr = ['input', 'select', 'textarea'];
          for (var i = 0; i < inputArr.length; i++) {
            item.find(inputArr[i]).each(function (j, e) {//只对text类型的进行验证
              var type = $(this).attr('type');
              var tagName = $(this).get(0).tagName;
              if (type == 'text' || type == 'password' || tagName.toLowerCase() == 'select' || tagName.toLowerCase() == 'textarea') {
                $(this).attr('lay-verify', validateStr);
              }
            });
          }

        }
      }
      var exportFunc = function (rowData, exportMap, params) {
        var cptId = rowData.id;
        var divId = 'did_' + Date.now() + "_" + params.index;

        rowData['divId'] = divId;
        if (exportMap != undefined) exportMap[divId] = rowData;
        that.propertiesMap[divId] = rowData;

        params.index++;

        var html = undefined;
        var func = undefined;
        try {
          func = eval('that.dragOverComponents.{0}.exportHTML'.format(cptId));
        } catch (e) { }
        if (func != undefined && typeof (func) == 'function') {
          var res = func(that, rowData, exportMap, params);
          if (res != undefined) return res;
        }

        html = $($('#adminj_cpts_items').find("#" + cptId).get(0).outerHTML);
        html.attr('id', divId).attr('cpt_id', cptId);
        that.createSortableItemUI(html, { isInitJs: false });
        //html.removeAttr('rename');
        createValidateFunc(rowData, html);
        return html;
      }

      var exportMap = {};//按ID为KEY导出属性
      var params = { index: 0, createValidateFunc: createValidateFunc, exportFunc: exportFunc }, resHtml = $('<form class="layui-form" id="form" lay-filter="form" action=""></form>');
      var exportJSON = that.exportJSON();
      if (exportJSON == '') return '';
      var json = JSON.parse(exportJSON);
      for (var i = 0; i < json.length; i++) {
        var rowData = json[i];
        var itemHtml = exportFunc(rowData, exportMap, params);
        resHtml.append(itemHtml);
      }
      var js = JSON.stringify(exportMap);
      //js=js.replaceAll("'","\\'");
      js = "<script>var _json='" + js + "';<\/script>\r\n";

      return js + resHtml.get(0).outerHTML;
    }


  }


  exports('adminJLayuiFormRender', adminJLayuiFormRender);
});