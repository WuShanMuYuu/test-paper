/**
 * 组装layui表格Cols模板
 * @param table_name  表名
 * @param type  是否开始单选框与复选框  默认单选框  checkbox：复选框  radio：单选
 */
function assemblyLayUITableColsTemplate(table_name,type,request_uri) {
    var table_name = table_name;
    var columns = "";
    var cols_head =
        "table.render({\n" +
        "            elem: '#rtTable',\n" +
        "            url: '"+request_uri+"',\n" +
        "            page: true,\n" +
        "            cellMinWidth: 100,\n" +
        "            cols: [\n" +
        "                [\n";

    if (type == "checkbox"){
        cols_head = cols_head + "                   {type: 'checkbox', fixed: 'left'}\n";
    }else if(type == "radio") {
        cols_head = cols_head + "                   {type: 'radio', fixed: 'left'}\n";
    }else{
        cols_head = cols_head + "                   {type: 'radio', fixed: 'left'}\n";
    }
    $.ajax({
        url: "/ajaxDataRequest/commonMethodGetTableColumns",//调用后台数据请求接口，获取表格数据
        // headers: {
        //     token: parent.getAppToken().token
        // },
        type: "POST",
        dataType: "json",
        data:"table_name=" + table_name,
        success:function (result_obj) {
            //获取成功
            if (result_obj.code == 2000){
                var dataColums = result_obj.tableColumnsInfos;
                for (let i = 0; i < dataColums.length; i++) {
                    //{field: 'sync_id', title: 'sync_id', width:140, sort: true}
                    columns = columns + ",{field:'" + (dataColums[i].column_name).toLowerCase() + "','title:'" + (dataColums[i].column_name).toLowerCase() + "','width:"+ (dataColums[i].column_name).length*10 + "}\n"

                }
            }else{



            }
            columns = cols_head + columns +
                "                ]\n" +
                "            ],\n" +
                "        });\n";

            return columns;
        }
    });
};

function f() {

}