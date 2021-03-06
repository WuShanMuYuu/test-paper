layui.define(['layer'], function (exports) {
    var field = {
        input: {
            id:'-1',
            index:'-1',
            label: "单行文本",
            tag: "input",
            tagIcon: 'input',
            placeholder: "请输入",
            defaultValue: null,
            labelWidth: null,
            width:"100%",
            clearable: true,
            maxlength: null,
            showWordLimit: false,
            readonly: false,
            disabled: false,
            required: true,
            expression:"",
            document: ''
        },
        password: {
            id:'-1',
            index:'-1',
            label: "密码框",
            tag: "password",
            tagIcon: 'password',
            placeholder: "请输入",
            defaultValue: null,
            labelWidth: null,
            width:"100%",
            clearable: true,
            maxlength: null,
            showWordLimit: false,
            readonly: false,
            disabled: false,
            required: true,
            document: ''
        },
        select: {
            id:'-1',
            index:'-1',
            label: "下拉框",
            tag: "select",
            tagIcon: 'select',
            labelWidth: null,
            width:"100%",
            disabled: false,
            required: true,
            document: '',
            datasourceType: 'local',
            remoteUrl: 'http://',
            remoteMethod: 'post',
            remoteOptionText:'options.data.dictName',//映射到text
            remoteOptionValue:'options.data.dictId',//映射到value text和value可以是一样的
            remoteDefaultValue:'12',//表示对应的remoteOptionValue的值
            options: [
                {
                    text: 'option1',
                    value: 'value1',
                    checked: true,
                },
                {
                    text: 'option2',
                    value: 'value2',
                    checked: false,
                },
                {
                    text: 'option3',
                    value: 'value3',
                    checked: false,
                },
            ]
        },
        radio: {
            id:'-1',
            index:'-1',
            label: "单选组",
            tag: "radio",
            tagIcon: 'radio',
            labelWidth: null,
            disabled: false,
            document: '',
            datasourceType: 'local',
            remoteUrl: 'http://',
            remoteMethod: 'post',
            remoteOptionText:'options.data.dictName',//映射到text
            remoteOptionValue:'options.data.dictId',//映射到value text和value可以是一样的
            options: [
                {
                    text: 'option1',
                    value: 'value1',
                    checked: true,
                },
                {
                    text: 'option2',
                    value: 'value2',
                    checked: false,
                },
                {
                    text: 'option3',
                    value: 'value3',
                    checked: false,
                },
            ]
        },
        checkbox: {
            id:'-1',
            index:'-1',
            label: "复选组",
            tag: "checkbox",
            tagIcon: 'checkbox',
            labelWidth: null,
            disabled: false,
            required: true,
            document: '',
            datasourceType: 'local',
            remoteUrl: 'http://',
            remoteMethod: 'post',
            remoteOptionText:'options.data.dictName',//映射到text
            remoteOptionValue:'options.data.dictId',//映射到value text和value可以是一样的
            options: [
                {
                    text: 'option1',
                    value: 'value1',
                    checked: true,
                },
                {
                    text: 'option2',
                    value: 'value2',
                    checked: true,
                },
                {
                    text: 'option3',
                    value: 'value3',
                    checked: false,
                },
            ]
        },
        switch: {
            id:'-1',
            index:'-1',
            label: "开关",
            tag: "switch",
            tagIcon: 'switch',
            labelWidth: null,
            switchValue: false,
            showWordLimit: false,
            disabled: false,
            document: '',
        },
        slider: {
            id:'-1',
            index:'-1',
            label: "滑块",
            tag: "slider",
            tagIcon: 'slider',
            labelWidth: null,
            width:"100%",
            defaultValue: 10,
            maxValue: 100,
            minValue: 1,
            stepValue: 2,
            isInput:true,
            disabled: false,
            required: true,
            document: '',
        },
        numberInput: {
            id:'-1',
            index:'-1',
            label: "排序文本框",
            tag: "numberInput",
            tagIcon: 'numberInput',
            labelWidth: null,
            width:"100%",
            defaultValue: 0,
            maxValue: 100,
            minValue: 0,
            stepValue: 1,
            disabled: false,
            document: '',
        },
        iconPicker: {
            id:'-1',
            index:'-1',
            label: "图标选择器",
            tag: "iconPicker",
            tagIcon: 'iconPicker',
            labelWidth: null,
            width:"100%",
            defaultValue: '',
            iconPickerSearch: true,
            iconPickerPage: true,
            iconPickerLimit: 12,
            iconPickerCellWidth: '43px',
            disabled: false,
            document: '',
        },
        cron: {
            id:'-1',
            index:'-1',
            label: "Cron表达式",
            tag: "cron",
            tagIcon: 'cron',
            placeholder: "请输入cron表达式,如:0 0 12 * * ?",
            labelWidth: null,
            width:"100%",
            defaultValue: '* * * * * ?',
            cronUrl: '',
            disabled: false,
            document: '',
        },
        date: {
            id:'-1',
            index:'-1',
            label: "日期",
            tag: "date",
            tagIcon: 'date',
            labelWidth: null,
            width:"100%",
            clearable: true,
            maxlength: null,
            dateDefaultValue: '2021-05-25',
            datetype: "date",//year month date time datetime
            range: false,
            dateformat: "yyyy-MM-dd",
            isInitValue: false,
            dataMaxValue: "2088-12-31",
            dataMinValue: "1900-01-01",
            trigger: null,//自定义弹出控件的事件
            position: "absolute",//fixed,static,abolute
            theme: "default",
            mark: null,//每年的日期	{'0-9-18': '国耻'}	0 即代表每一年
            showBottom: true,
            zindex:66666666,
            disabled: false,
            required: true,
            document: '',
        },
        dateRange: {
            id:'-1',
            index:'-1',
            label: "日期范围",
            tag: "dateRange",
            tagIcon: 'dateRange',
            labelWidth: null,
            //width:"100%",
            dateRangeDefaultValue: "2021-06-19 - 2021-07-17",
            clearable: true,
            maxlength: null,
            datetype: "date",//year month date time datetime
            dateformat: "yyyy-MM-dd",
            isInitValue: true,
            dataMaxValue: "2088-12-31",
            dataMinValue: "1900-01-01",
            trigger: null,//自定义弹出控件的事件
            position: "absolute",//fixed,static,abolute
            theme: "default",
            mark: null,//每年的日期	{'0-9-18': '国耻'}	0 即代表每一年
            showBottom: true,
            zindex:66666666,
            disabled: false,
            required: true,
            document: '',
        },
        rate: {
            id:'-1',
            index:'-1',
            label: "评分",
            tag: "rate",
            tagIcon: 'rate',
            labelWidth: null,
            defaultValue: 0,
            rateLength: 5,//星星长度
            half: false,
            text: false,
            theme: "default",
            showBottom: true,
            readonly: false,
            required: true,
            document: '',
        },
        carousel: {
            id:'-1',
            index:'-1',
            label: "轮播图",
            tag: "carousel",
            tagIcon: 'carousel',
            width: "100%",
            height: "500px",
            full: false,//是否全屏
            anim: "default", //轮播切换动画方式,
            interval: 3000,//切换时间 毫秒
            startIndex: 0,//初始索引
            arrow: "hover",//切换箭头默认显示状态
            autoplay: true,//是否自动切换
            document: '',
            datasourceType: 'local',
            remoteUrl: 'http://',
            remoteMethod: 'post',
            remoteOptionText:'options.data.dictName',//映射到text
            remoteOptionValue:'options.data.dictId',//映射到value text和value可以是一样的
            options: [
                {
                    text: 'banner1',
                    value: './ayq/images/banner1.PNG',
                    checked: true,
                },
                {
                    text: 'banner2',
                    value: './ayq/images/banner2.PNG',
                    checked: false,
                },
                {
                    text: 'banner3',
                    value: './ayq/images/banner3.PNG',
                    checked: false,
                },
            ]
        },
        colorpicker: {
            id:'-1',
            index:'-1',
            label: "颜色选择器",
            tag: "colorpicker",
            tagIcon: 'colorpicker',
            labelWidth: null,
            defaultValue: '#000000',
            colorformat: "#fff",
            alpha: false,
            colors: [],
            size: "",
            showBottom: true,
            document: '',
        },
        image: {
            id:'-1',
            index:'-1',
            label: "上传图片",
            tag: "image",
            tagIcon: 'image',
            placeholder: "请输入",
            defaultValue: null,
            labelWidth: null,
            disabled: false,
            required: true,
            document: '',
            uploadUrl: '',
        },
        file: {
            id:'-1',
            index:'-1',
            label: "上传文件",
            tag: "file",
            tagIcon: 'file',
            placeholder: "请输入",
            defaultValue: null,
            labelWidth: null,
            disabled: false,
            required: true,
            document: '',
            uploadUrl: '',
        },
        textarea: {
            id:'-1',
            index:'-1',
            label: "多行文本",
            tag: "textarea",
            tagIcon: 'textarea',
            placeholder: "请输入",
            defaultValue: null,
            labelWidth: null,
            width:"100%",
            readonly: false,
            disabled: false,//这里就是readonly的医生
            required: true,
            document: ''
        },
        editor: {
            id:'-1',
            index:'-1',
            label: "编辑器",
            tag: "editor",
            tagIcon: 'editor',
            width:"100%",
            labelWidth: null,
            clearable: true,
            maxlength: null,
            showWordLimit: false,
            menu: ['backColor', 'fontSize', 'foreColor', 'bold', 'italic', 'underline', 'strikeThrough', 'justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', 'superscript', 'subscript', 'createLink', 'unlink', 'hr', 'face','table', 'files', 'music', 'video', 'insertImage', 'removeFormat', 'code', 'line'],
            height: "200px",
            uploadUrl: '/upload/',
            disabled:false,
            document: ''
        },
        grid:{
            id:'-1',
            index:'-1',
            tag: 'grid',
            span: 2,
            columns: [
                {
                    span: 12,
                    list: [],
                },
                {
                    span: 12,
                    list: [],
                }
            ]
        }
        ,c1:{
            name:"输入型组件(基于layui)",
            list:['input','password','textarea']
        }
        ,c2:{
            name:"选择型组件(基于layui)",
            list:['select','radio','checkbox','switch','slider','date','rate','carousel','colorpicker','image','file','dateRange']
        }
        ,c3:{
            name:"布局型组件(基于layui)",
            list:['grid']
        },
        c4:{
            name:"扩展组件(基于layui)",
            list:['numberInput','iconPicker','cron']
        }
        ,
        c5:{
            name:"扩展组件(外部)",
            list:['editor']
        }

    };
    exports('formField', field);

});