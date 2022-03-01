layui.config({
    base: '../layui_exts/dtree'
}).extend({
    dtree: 'dtree' //定义该组件模块名
}).use(['layer', 'table','element','form','upload'], function () {
    const table = layui.table,
        element = layui.element,
        dtree = layui.dtree,
        layer = layui.layer,
        form = layui.form,
        upload = layui.upload,
        $ = layui.$;


    //定义查询医生信息对象
    var search_doctorInfo = {
        hospital_id:'',
        dept_code:'',
        doctor_no:'',
        doctor_name:'',
        his_doctor_no:'',
        dept_name:'',
        dept_level:''
    };

    if (($('#hospital_id').val()).length > 0){
        search_doctorInfo.hospital_id = $('#hospital_id').val();
    }

    // 树形渲染
    dtree.render({
        elem: "#demoTree1",  //绑定元素
        url: "../departmentDTree/getDepartmentTreeData",  //异步接口
        headers: {
            token: parent.getAppToken().token
        },
        method:"GET",
        request:{nodeId:"0"},
        initLevel:1,
        scroll:'#hospital_tree'
    });

    //单击节点 监听事件
    dtree.on("node('demoTree1')" ,function(object){
        var  data = object.param;
        // layer.msg(JSON.stringify(object));
        console.log(JSON.stringify(object));
        var dept_level = data.level;
        var hospital_id = ""
        if (dept_level == '1' || '1'.match(dept_level)){
            $('#hospital_id').val(data.nodeId);
            hospital_id = data.nodeId;
            search_doctorInfo.hospital_id = data.nodeId;

            ins1('','','1',data.nodeId,search_doctorInfo);
        }
        if (dept_level == '2' || '2'.match(dept_level)){
            var parentParam = object.parentParam;
            // hospital_id = parentParam.nodeId;
            $('#hospital_id').val(parentParam.nodeId);

            search_doctorInfo.hospital_id = parentParam.nodeId;
            search_doctorInfo.dept_code = data.nodeId;

            ins1('',parentParam.parent_id,'2',parentParam.nodeId,search_doctorInfo);
        }
        if (dept_level == '3' || '3'.match(dept_level)){
            $('#hospital_id').val($('#hospital_id').val());
            search_doctorInfo.hospital_id = '';
            search_doctorInfo.dept_code = data.nodeId;

            ins1(data.nodeId,'','2',$('#hospital_id').val(),search_doctorInfo);
        }
    });

    //树加载渲染表格
    var ins1 = function (dept_code,parent_id,dept_level,hospital_id,search_doctorInfo_x){
        table.render({
            elem: '#rtTable',
            toolbar: '#toolbarDemo2',
            url: '../ajaxDoctorRequest/getAppointmentRegistrationDoctor',
            headers: {
                token: parent.getAppToken().token
            },
            event: true,
            cols:
                [
                    [
                        {type: 'radio', fixed: 'left'}
                        ,{field: 'doctor_name', title: '医生姓名', align:'center', width:120,edit:'text',fixed: true}
                        ,{field: 'doctor_no', title: '医生标识', align:'center', width:140,sort: true}
                        // ,{field: 'dept_code',title: '科室ID',align:'center',width:120}
                        ,{field: 'input_code', title: '首拼', align:'center', width:80,edit:'text'}
                        // ,{field: 'smallphoto_url', title: '头像地址',align:'center',  width:120}
                        // ,{field: 'smallphoto_url', title: '头像',align:'center',  width:120,templet:'#viewDoctorImg'}
                        ,{field: 'doctor_title', title: '职称', align:'center', width:110,edit:'text'}
                        ,{field: 'specialty', title: '专长', align:'center', width:260,edit:'text'}
                        ,{field: 'doctor_des', title: '简介',align:'center',  width:340,edit:'text'}
                        ,{field: 'ordernum', title: '排序', align:'center',width: 70,edit:'text'}
                        // ,{field: 'doctorsex', title: '性别',align:'center',width: 90,templet:'#sexSwitchTpl',unresize: true}
                        ,{field: 'is_delete', title: '状态', align:'center', width: 100,templet:'#doctorSwitchTpl',unresize: true}
                        // ,{field: 'hisdept_code', title: 'HIS科室ID', width: 120}
                        // ,{field: 'hisdoctor_no', title: 'HIS医生ID', width: 120}
                        // ,{field: 'doctor_no', title: '查看头像',align:'center',toolbar:'#viewDoctorBar', width: 100}
                        ,{fixed: 'right', title:'操作',align:'center',toolbar: '#barDemo', width:216}
                    ]
                ],
            id:'rtTable',
            // where: {dept_code: dept_code,parent_id:parent_id,dept_level:dept_level,hospital_id:hospital_id}
            where: {doctorInfo: search_doctorInfo_x},
            page:{
                limit:15,
                curr:1,
                limits:[15,30,45,60,100],
                layout: ['count', 'prev', 'page', 'next', 'limit']
            }, done:function (res, curr, count) {
                //把当前分页条数存入cache，在export及重载时取出
                layui.laypage.pageNum = res.curr;
                layui.laypage.pageSize = res.limit;
                var tableElem = this.elem;
                //table render出来实际显示的table组件
                var tableViewElem = tableElem.next();

                upload.render({
                    elem: tableViewElem.find('.upload_btn')
                    ,url: '/admin/people/uploadPhoto'//这里是自己的上传的url
                    ,accept: 'file'
                    ,before: function(obj) { //obj包含信息，跟choose回调完全一致。在传值之前先获取id
                        var tableElem = this.item;
                        uploadParam = tableElem.attr('ID');
                        layer.load(); //上传loading
                    },
                    data:{
                        odd_number: function () {//data中写值的时候，要用动态获取的方式，即写个function的方式，不然直接写获取不到相应的值。
                            return uploadParam;
                        }
                    },
                    done: function (res) {
                        var tableElem = this.item;
                        var id= tableElem.attr('ID');
                        var imageUrl=res.imgUrl;
                        //上传完成后 修改这条数据储存的图片url
                        //异步修改图片
                        var data = {};
                        data['model.ID']=id;
                        data['model.ZP']=imageUrl;
                        $.ajax({
                            url: '/admin/people/updateImg'//这里是更新文件路径方法
                            ,data:data
                            ,success:function (res) {
                                if (res.state=='ok'){
                                    layer.closeAll('loading'); //关闭loading
                                    layer.msg('上传成功');
                                }else{
                                    layer.closeAll('loading'); //关闭loading
                                    layer.msg('上传失败，请重试');
                                }
                            }
                            ,error:function (res) {
                                layer.closeAll('loading'); //关闭loading
                                layer.msg('上传失败，请重试');
                            }
                        });
                    }
                    ,error: function(index, upload){
                        layer.closeAll('loading'); //关闭loading
                        layer.msg('上传失败，请重试');
                    }
                });
            }
            , text: "对不起，加载出现异常！"
        });

        //表格重载
        var $ = layui.$, active = {
            reload: function(){
                search_doctorInfo.hospital_id = $('#hospital_id').val();
                search_doctorInfo.dept_level = $('#dept_level').val();
                search_doctorInfo.dept_name = $('#dept_name').val();
                search_doctorInfo.dept_code = $('#dept_code').val();
                search_doctorInfo.doctor_no = $('#doctor_no').val();
                search_doctorInfo.doctor_name = $('#doctor_name').val();
                search_doctorInfo.his_doctor_no = $('#his_doctor_no').val();
                //执行重载
                table.reload('rtTable', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    ,where:{doctorInfo:search_doctorInfo}
                    // ,where: {
                    //     dept_id: dept_id.val(),
                    //     hospital_id:hospital_id.val(),
                    //     dept_name :dept_name.val(),
                    //     dept_level:dept_level.val(),
                    //     dept_code: dept_code.val(),
                    //     doctor_no: doctor_no.val(),
                    //     doctor_name: doctor_name.val(),
                    //     his_doctor_no: his_doctor_no.val()
                    // }
                });
            }
        };

        $('.demoTable .layui-btn').on('click', function(){
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
        table.on('tool(rtTable)', function(obj){
            //定义loading
            var loading=layer.load(2, { shade: [0.3, '#cccccc'] });

            var data = obj.data;
            var hospital_id = $('#hospital_id').val();
            var dept_level = $('#dept_level').val();

            if(obj.event === 'saveChange') {
                // layer.alert('编辑行：<br>' + JSON.stringify(data));
                $.ajax({
                    url:'../ajaxDoctorRequest/saveDoctorMessage',
                    headers: {
                        token: parent.getAppToken().token
                    },
                    type:'POST',
                    dataType:'json',
                    data:data,
                    success:function (result) {
                        layer.close(loading);
                        if (result.success){
                            layer.alert(result.msg);
                            return;
                        }else{
                            layer.alert(result.msg);
                            return;
                        }
                    }
                });

                table.reload('rtTable', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    ,where: {
                        hospital_id:hospital_id,
                        dept_level :dept_level
                    }
                });
            }else if(obj.event === 'viewDoctorBar'){
                layer.close(loading);
                // layer.alert('编辑行：<br>'+ JSON.stringify(data));

                layer.open({
                    title: '【'+ data.doctor_name +'】的详情',
                    type: 2,
                    anim: 2,
                    offset: 'r',
                    area: ['48%', '100%'],
                    content:'../DataSourceManager/ViewDoctorImg?hospital_id='+data.hospital_id+'&doctor_no='+data.doctor_no+'&doctor_name='+data.doctor_name+'&doctor_title='+data.doctor_title+'&specialty='+data.specialty+'&doctor_des='+data.doctor_des+'&input_code='+data.input_code+'&smallphoto_url='+data.smallphoto_url+'&hisdoctor_no='+data.hisdoctor_no+'&is_delete='+data.is_delete+'&doctorsex='+data.doctorsex+'&ordernum='+data.ordernum+'&dept_code='+data.dept_code+'&hisdept_code='+data.hisdept_code+'&doctor_title='+data.doctor_title
                });


                // table.reload('rtTable', {
                //     page: {
                //         curr: 1 //重新从第 1 页开始
                //     }
                //     ,where: {
                //         hospital_id:hospital_id,
                //         dept_level :dept_level
                //     }
                // });
            }else if(obj.event === 'updateDoctorBar'){
                layer.close(loading);
                layer.open({
                    title: '修改【'+ data.doctor_name +'】的信息',
                    type: 2,
                    anim: 2,
                    offset: 'r',
                    area: ['48%', '100%'],
                    content:'../DataSourceManager/updateDoctor?hospital_id='+data.hospital_id+'&doctor_no='+data.doctor_no+'&doctor_name='+data.doctor_name+'&doctor_title='+data.doctor_title+'&specialty='+data.specialty+'&doctor_des='+data.doctor_des+'&input_code='+data.input_code+'&smallphoto_url='+data.smallphoto_url+'&hisdoctor_no='+data.hisdoctor_no+'&is_delete='+data.is_delete+'&doctorsex='+data.doctorsex+'&ordernum='+data.ordernum+'&dept_code='+data.dept_code+'&hisdept_code='+data.hisdept_code+'&doctor_title='+data.doctor_title
                });


            }



        });

        //监听头部工具按钮
        table.on('toolbar(rtTable)', function(obj){
            var checkStatus = table.checkStatus(obj.config.id);
            console.log("行ID："+checkStatus[0]);
            switch(obj.event){
                case 'add':
                    // layer.msg('添加');
                    var data = checkStatus.data;  //获取选中行数据
                    // layer.alert(JSON.stringify(data));

                    layer.open({
                        title: '新增预约医生',
                        type: 2,
                        anim: 2,
                        offset: 'auto',
                        area: ['48%', '100%'],
                        // content:'../DataSourceManager/addDoctor?hospital_id='+hospital_id+'&token='+parent.getAppToken().token
                        content:'../DataSourceManager/addDoctor?hospital_id='+hospital_id
                    });

                    break;
                // case 'delete':
                //     layer.msg('删除');
                //     break;
                // case 'update':
                //     // layer.msg('编辑');
                //     var data = checkStatus.data;  //获取选中行数据
                //     layer.alert(JSON.stringify(data));
                //     break;
            };
        });



    };

    //表格监听医生状态操作
    form.on('switch(doctor_status)', function(obj){
        var loading=layer.load(2, { shade: [0.3, '#cccccc'] });
        // 得到开关的value值，实际是需要修改的ID值。
        var doctor_no = this.value;
        var status = this.checked ? '0' : '1';
        var hospital_id = $('#hospital_id').val();
        var dept_level = $('#dept_level').val();
        console.log(doctor_no + "  "+status+""+JSON.stringify(obj));
        var change_date = {'hospital_id':hospital_id,'dept_code':'','status':status,'type':'doctorChangeInfo','doctor_code':doctor_no};

        $.ajax({
            url:'../departmentDTree/changeStatus',
            headers: {
                token: parent.getAppToken().token
            },
            type:'POST',
            dataType:'json',
            data:change_date,
            success:function (result) {
                layer.close(loading);
                if (result.success){
                    layer.alert(result.msg);
                }else{
                    layer.alert(result.msg);
                }
            }

        })
        // layer.tips(hospital_id + '  '+this.value + ' ' + this.name + '：'+ status, obj.othis);

        table.reload('rtTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            }
            ,where: {
                hospital_id:hospital_id,
                dept_level :dept_level,
                dept_level :dept_level,
                dept_level :dept_level,


            }
        });

    });

    //表格监听医生性别操作
    form.on('switch(doctor_sex)', function(obj){
        var loading=layer.load(2, { shade: [0.3, '#cccccc'] });
        // 得到开关的value值，实际是需要修改的ID值。
        var doctor_no = this.value;
        var status = this.checked ? '0' : '1';
        var hospital_id = $('#hospital_id').val();
        var dept_level = $('#dept_level').val();
        console.log(doctor_no + "  "+status+""+JSON.stringify(obj));
        var change_date = {'hospital_id':hospital_id,'status':status,'doctor_code':doctor_no};

        $.ajax({
            url:'../ajaxDoctorRequest/changeDoctorSex',
            headers: {
                token: parent.getAppToken().token
            },
            type:'POST',
            dataType:'json',
            data:change_date,
            success:function (result) {
                layer.close(loading);
                if (result.success){
                    layer.alert(result.msg);
                }else{
                    layer.alert(result.msg);
                }
            }

        })
        // layer.tips(hospital_id + '  '+this.value + ' ' + this.name + '：'+ status, obj.othis);

        table.reload('rtTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            }
            ,where: {
                hospital_id : hospital_id,
                dept_level : dept_level,
                dept_code: $('#dept_code').val(),
                dept_name: $('#dept_name').val(),
                doctor_no: $('#doctor_no').val(),
                doctor_name: $('#doctor_name').val(),
                his_doctor_name: $('#his_doctor_name').val()
            }
        });

    });


    //监听单元格编辑
    table.on('edit(rtTable)', function(obj){
        var value = obj.value //得到修改后的值
            ,data = obj.data //得到所在行所有键值
            ,field = obj.field; //得到字段
        console.log(JSON.stringify(obj));
        layer.msg('[科室ID: '+ data.dept_code +'] ，您将' + field + ' 字段更改为：'+ value + ',确认信息后请请点击右侧按钮保存您的本次修改');
    });



    // form.on('click(viewDoctorImage)',function (object){
    //     var checkStatus = table.checkStatus('rtTable');
    //     if (checkStatus.data.length < 1) {
    //         layer.alert("未选中任何行！")
    //     } else {
    //         layer.open({
    //             content: ['../DataSourceManager/ViewDoctorImg'+checkStatus.data, 'no']
    //
    //
    //
    //         })
    //     }
    // });






});


