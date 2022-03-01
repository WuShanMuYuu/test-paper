layui.define(['table'], function (exports) {
  "use strict";

  var $ = layui.$
    , table = layui.table

    //模块名
    , MOD_NAME = 'formTable'

    //外部接口
    , modeDemo = {
      config: {}
      , index: layui[MOD_NAME] ? (layui[MOD_NAME].index + 10000) : 0

      //设置全局项
      , set: function (options) {
        var that = this;
        that.config = $.extend({}, that.config, options);
        return that;
      }

      //事件监听
      , on: function (events, callback) {
        return layui.onevent.call(this, MOD_NAME, events, callback);
      }
    }

    //操作当前实例
    , thisModule = function () {
      var that = this
        , options = that.config
        , id = options.id || that.index;

      thisModule.that[id] = that; //记录当前实例对象
      thisModule.config[id] = options; //记录当前实例配置项

      return {
        config: options
        //重置实例
        , reload: function (options) {
          that.reload.call(that, options);
        },
        hide: function (options) {
          that.hide.call(that, options);
        }
      }
    }

    //获取当前实例配置项
    , getThisModuleConfig = function (id) {
      var config = thisModule.config[id];
      if (!config) hint.error('The ID option was not found in the ' + MOD_NAME + ' instance');
      return config || null;
    }

    //字符常量  
    , ELEM = 'layui-modeDemo'


    //主模板
    , TPL_MAIN = ['<div class="ayui-border-box">'

      , '</div>'].join('')

    //构造器
    , Class = function (options) {
      var that = this;
      that.index = ++modeDemo.index;
      that.config = $.extend({}, that.config, modeDemo.config, options);
      that.render();
    };

  //默认配置
  Class.prototype.config = {

  };

  //重载实例
  Class.prototype.reload = function (options) {
    var that = this;

    layui.each(options, function (key, item) {
      if (item.constructor === Array) delete that.config[key];
    });

    that.config = $.extend(true, {}, that.config, options);
    that.render();
  };

  //渲染
  Class.prototype.render = function () {
    var that = this
      , options = that.config;

    //解析模板
    that.elem = $(options.elem);

    var othis = options.elem = $(options.elem);
    if (!othis[0]) return;

    //索引
    that.key = options.id || that.index;

    //插入组件结构
    // othis.html(that.elem);

    that.events(); //事件
  };

  //事件
  Class.prototype.events = function () {
    var that = this,
      elem = that.elem,
      a = that.config;
    elem.on("click", (e) => {
      that.createTable();
    })
    elem.on("input", (e) => {
      that.pullData();
    })
  };
  Class.prototype.createTable = function () {
    var that = this,
        e = that.elem,
        a = that.config;
    if ($("div.formTable").length >= 1) {
      return false;
    }
    if (!that.elem.val()) {
      delete table.cache[tableName];
    }
    var tableDone = a.table.done || function () {};
    var t = e.offset().top + e.outerHeight() + "px";
    var l = e.offset().left + "px";
    var w = a.width ? `width: ${a.width}px;` : '';
    var h = a.height ? `height: ${a.height}px;` : '';
    var tableName = "formTable_table_";
    var tableBox = $(`<div class="formTable layui-anim layui-anim-upbit" style="left: ${l}; top: ${t}; ${w} ${h}
          background-color: #fff;padding:0px 10px 0 10px;position: absolute;z-index:1000;margin: 5px 0;display:none;border: 1px solid #f2f2f2;">
            <table id="${tableName}" lay-filter="${tableName}"></table>
          </div>`);
    $("body").append(tableBox);

    //渲染TABLE
    a.table.elem = "#" + tableName;
    a.table.id = tableName;
    a.table.data = table.cache[tableName] || {};
    a.table.page = a.page || false;
    a.table.limit = a.limit
    
    a.table.done = function (res, curr, count) {
      // defaultChecked(res, curr, count);
      // setChecked(res, curr, count);
      // tableDone(res, curr, count);
    };

    a.table.body = table.render(a.table);

    that.config = $.extend(true, {}, that.config, a);

    //触发事件
    table.on(`tool(${tableName})`, function(obj){
      var data = obj.data;
      var layEvent = obj.event;
      a.table.tool[layEvent](data)
    });

    //触发行双击事件
    table.on(`rowDouble(${tableName})`, function(obj){
      var data = obj.data;
      a.table.rowDouble(data)
    });

    //点击其他区域关闭
    $(document).mouseup(function (event) {
      var userSet_con = $(`${that.elem.selector},.formTable`);
      if (
        !userSet_con.is(event.target) &&
        userSet_con.has(event.target).length === 0
      ) {
        tableBox.remove();
      }
    });
    
  }

  Class.prototype.pullData = function () {
    var i = this,
      a = i.config,
      e = i.elem,
      h = a.table;
    if (((i.startTime = new Date().getTime()), a.url)) {
      var where = {val: $(e).val()};
      if (h.body != undefined) {
        $(`.formTable`).css({'display': ''})
        table.reload(h.body.config.id, {
          url: a.url,
          where: where
        });
      }
      
    }
  }
  Class.prototype.selectTool = function () {
    
  }
  Class.prototype.hide = function () {
    var that = this,
        a = that.config;
    $(".formTable").remove();
    delete table.cache[a.table.id];
  };
  //记录所有实例
  thisModule.that = {}; //记录所有实例对象
  thisModule.config = {}; //记录所有实例配置项

  //重载实例
  modeDemo.reload = function (id, options) {
    var that = thisModule.that[id];
    that.reload(options);
    return thisModule.call(that);
  };
  //核心入口
  modeDemo.render = function (options) {
    var inst = new Class(options);
    return thisModule.call(inst);
  };
  
  exports(MOD_NAME, modeDemo);
});
