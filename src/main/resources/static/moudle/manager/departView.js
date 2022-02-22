layui.config({
    base: '../layui_exts/dtree'
}).extend({
    dtree: 'dtree' //定义该组件模块名
}).use(['layer', 'table', 'element', 'dtree', 'form'], function () {
    const table = layui.table,
        element = layui.element,
        dtree = layui.dtree,
        layer = layui.layer,
        form = layui.form,
        $ = layui.$;

    // 树形渲染
    dtree.render({
        elem: "#demoTree1",  //绑定元素
        url: "../departmentDTree/getDepartmentTreeData",  //异步接口
        headers: {
            token: parent.getAppToken().token
        },
        method: "GET",
        request: {nodeId: "0"},
        initLevel: 1,
        scroll: '#hospital_tree'
    });

    //单击节点 监听事件
    dtree.on("node('demoTree1')", function (object) {
        var data = object.param;
        // layer.msg(JSON.stringify(object));
        var dept_level = data.level;
        var hospital_id = ""
        if (dept_level == '1' || '1'.match(dept_level)) {
            hospital_id = data.nodeId;
            $('#hospital_id').val(hospital_id);
            $('#dept_level').val('1');
            ins1('', '', '1', hospital_id);
        }
        if (dept_level == '2' || '2'.match(dept_level)) {
            var parentParam = object.parentParam;
            hospital_id = parentParam.nodeId;
            $('#hospital_id').val(hospital_id);
            $('#dept_level').val('2');
            ins1('', parentParam.parent_id, '2', hospital_id);
        }
        if (dept_level == '3' || '3'.match(dept_level)) {
            $('#hospital_id').val($('#hospital_id').val());
            $('#dept_level').val('2');
            ins1(data.nodeId, '', '2', $('#hospital_id').val());
        }
    });

    //树加载渲染表格
    var ins1 = function (dept_code, parent_id, dept_level, hospital_id) {
        table.render({
            elem: '#rtTable',
            toolbar: '#toolbarDemo2',
            url: '../ajaxDepartRequest/getAppointmentRegistrationDepartment',
            page: true,
            cellMinWidth: 100,
            cols:
                [
                    [
                        {type: 'radio', fixed: 'left'}
                        , {field: 'dept_code', title: '科室ID', align: 'center', width: 140, sort: true, fixed: true}
                        , {field: 'input_code', title: '名称首拼', width: 100, edit: 'text'}
                        , {field: 'dept_name', title: '科室名称', width: 160, edit: 'text'}
                        , {field: 'dept_level', title: '科室等级', width: 100, edit: 'text'}
                        , {field: 'dept_des', title: '科室简介', width: 220, edit: 'text'}
                        , {field: 'parent_id', title: '父科室ID', width: 120, edit: 'text'}
                        , {field: 'ordernum', title: '排序', width: 100, edit: 'text'}
                        , {field: 'is_delete', title: '启用状态', width: 110, templet: '#deptSwitchTpl', unresize: true}
                        , {field: 'hisdept_code', title: 'HIS科室ID', width: 120}
                        , {fixed: 'right', title: '操作', align: 'center', toolbar: '#barDemo', width: 130}
                    ]
                ],
            id: 'rtTable',
            limit: 15,
            limits: [15, 30, 45, 60, 75, 90],
            where: {dept_code: dept_code, parent_id: parent_id, dept_level: dept_level, hospital_id: hospital_id}
        });

        //表格重载
        var $ = layui.$, active = {
            reload: function () {
                var hospital_id = $('#hospital_id');
                var dept_id = $('#dept_id');
                var dept_name = $('#dept_name');
                var dept_level = $('#dept_level');

                //执行重载
                table.reload('rtTable', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    , where: {
                        dept_id: dept_id.val(),
                        hospital_id: hospital_id.val(),
                        dept_name: dept_name.val(),
                        dept_level: dept_level.val()
                    }
                });
            }
        };

        $('.demoTable .layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

        //监听行单击事件（双击事件为：rowDouble）
        // table.on('rowDouble(rtTable)', function(obj){
        //     var data = obj.data;
        //     layer.alert(JSON.stringify(data), {
        //         title: '当前行数据：'
        //     });
        //     //标注选中样式
        //     obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
        // });

        //监听操作栏工具条
        table.on('tool(rtTable)', function (obj) {
            //定义loading
            var loading = layer.load(2, {shade: [0.3, '#cccccc']});

            var data = obj.data;
            var hospital_id = $('#hospital_id').val();
            var dept_level = $('#dept_level').val();

            if (obj.event === 'saveChange') {
                // layer.alert('编辑行：<br>' + JSON.stringify(data));
                $.ajax({
                    url: '../ajaxDepartRequest/saveDepartmentMessage',
                    type: 'POST',
                    dataType: 'json',
                    data: data,
                    success: function (result) {
                        layer.close(loading);
                        if (result.success) {
                            layer.alert(result.msg);
                            return;
                        } else {
                            layer.alert(result.msg);
                            return;
                        }
                    }
                });

                table.reload('rtTable', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    , where: {
                        hospital_id: hospital_id,
                        dept_level: dept_level
                    }
                });
            }
        });

        //监听头部工具按钮
        table.on('toolbar(rtTable)', function (obj) {
            var checkStatus = table.checkStatus(obj.config.id);
            console.log("行ID：" + checkStatus[0])
            switch (obj.event) {
                case 'add':
                    // layer.msg('添加');
                    var data = checkStatus.data;  //获取选中行数据
                    // layer.alert(JSON.stringify(data));
                    layer.alert('科室新增待研发！');
                    break;
                // case 'delete':
                //     layer.msg('删除');
                //     break;
                // case 'update':
                //     // layer.msg('编辑');
                //     var data = checkStatus.data;  //获取选中行数据
                //     layer.alert(JSON.stringify(data));
                //     break;
            }
            ;
        });


    };

    //表格监听科室状态操作
    form.on('switch(dept_status)', function (obj) {
        var loading = layer.load(2, {shade: [0.3, '#cccccc']});
        // 得到开关的value值，实际是需要修改的ID值。
        const dept_code = this.value;
        var status = this.checked ? '0' : '1';
        var hospital_id = $('#hospital_id').val();
        var dept_level = $('#dept_level').val();
        console.log(dept_code + "  " + status + "" + JSON.stringify(obj));
        var change_date = {
            'hospital_id': hospital_id,
            'dept_code': dept_code,
            'status': status,
            'type': 'deptChangeInfo'
        };
        // updateStatusFunction(change_date);
        $.ajax({
            url: '../departmentDTree/changeStatus',
            type: 'POST',
            dataType: 'json',
            data: change_date,
            success: function (result) {
                layer.close(loading);
                if (result.success) {
                    layer.alert(result.msg);
                } else {
                    layer.alert(result.msg);
                }
            }

        })
        // layer.tips(hospital_id + '  '+this.value + ' ' + this.name + '：'+ status, obj.othis);

        table.reload('rtTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            }
            , where: {
                hospital_id: hospital_id,
                dept_level: dept_level,
                dept_code: dept_code
            }
        });

    });
    //监听单元格编辑
    table.on('edit(rtTable)', function (obj) {
        var value = obj.value //得到修改后的值
            , data = obj.data //得到所在行所有键值
            , field = obj.field; //得到字段
        layer.msg('[科室ID: ' + data.dept_code + '] ，您将' + field + ' 字段更改为：' + value + ',确认信息后请请点击右侧按钮保存您的本次修改');
    });

});