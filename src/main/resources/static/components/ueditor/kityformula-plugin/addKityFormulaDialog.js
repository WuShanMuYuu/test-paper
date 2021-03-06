UE.registerUI("kityformula", function (t, n) {
    var e = new UE.ui.Dialog({
        iframeUrl: t.options.UEDITOR_HOME_URL + "/kityformula-plugin/kityFormulaDialog.html",
        editor: t,
        name: n,
        title: "插入公式 ",
        cssRules: "width:783px; height: 386px;",
        buttons: [{
            className: "edui-okbutton", label: "确定", onclick: function () {
                e.close(!0)
            }
        }, {
            className: "edui-cancelbutton", label: "取消", onclick: function () {
                e.close(!1)
            }
        }]
    });
    t.ready(function () {
        UE.utils.cssRule("kfformula", "img.kfformula{vertical-align: middle;}", t.document)
    });
    var i = t.options.UEDITOR_HOME_URL + "kityformula-plugin/kf-icon.png", l = document.createElement("a");
    l.href = i, l.href = l.href, i = l.href;
    var o = new UE.ui.Button({
        name: "插入" + n,
        title: "插入公式",
        cssRules: 'background: url("' + i + '") !important',
        onclick: function () {
            e.render(), e.open()
        }
    });
    return t.addListener("selectionchange", function () {
        var e = t.queryCommandState(n);
        -1 == e ? (o.setDisabled(!0), o.setChecked(!1)) : (o.setDisabled(!1), o.setChecked(e))
    }), o
});