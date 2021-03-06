UE.plugins.defaultfilter = function () {
    var n = this;
    n.setOpt({allowDivTransToP: !0, disabledTableInTable: !0, rgb2Hex: !0}), n.addInputRule(function (e) {
        var s, d = this.options.allowDivTransToP;
        e.traversal(function (i) {
            if ("element" == i.type) {
                if (!UE.dom.dtd.$cdata[i.tagName] && n.options.autoClearEmptyNode && UE.dom.dtd.$inline[i.tagName] && !UE.dom.dtd.$empty[i.tagName] && (!i.attrs || UE.utils.isEmptyObject(i.attrs))) return void (i.firstChild() ? "span" != i.tagName || i.attrs && !UE.utils.isEmptyObject(i.attrs) || i.parentNode.removeChild(i, !0) : i.parentNode.removeChild(i));
                switch (i.tagName) {
                    case"style":
                    case"script":
                        i.setAttr({
                            cdata_tag: i.tagName,
                            cdata_data: i.innerHTML() || "",
                            _ue_custom_node_: "true"
                        }), i.tagName = "div", i.innerHTML("");
                        break;
                    case"a":
                        (s = i.getAttr("href")) && i.setAttr("_href", s);
                        break;
                    case"img":
                        i.setAttr("_src", i.getAttr("src"));
                        break;
                    case"span":
                        UE.browser.webkit && (s = i.getStyle("white-space")) && /nowrap|normal/.test(s) && (i.setStyle("white-space", ""), n.options.autoClearEmptyNode && UE.utils.isEmptyObject(i.attrs) && i.parentNode.removeChild(i, !0)), (s = i.getAttr("id")) && /^_baidu_bookmark_/i.test(s) && i.parentNode.removeChild(i);
                        break;
                    case"p":
                        (s = i.getAttr("align")) && (i.setAttr("align"), i.setStyle("text-align", s)), UE.utils.each(i.children, function (e) {
                            if ("element" == e.type && "p" == e.tagName) {
                                var t = e.nextSibling();
                                i.parentNode.insertAfter(e, i);
                                for (var a = e; t;) {
                                    var r = t.nextSibling();
                                    i.parentNode.insertAfter(t, a), a = t, t = r
                                }
                                return !1
                            }
                        }), i.firstChild() || i.innerHTML(UE.browser.ie ? "&nbsp;" : "<br/>");
                        break;
                    case"div":
                        if (i.getAttr("cdata_tag")) break;
                        if ((s = i.getAttr("class")) && /^line number\d+/.test(s)) break;
                        if (!d) break;
                        for (var e, t = UE.uNode.createElement("p"); e = i.firstChild();) "text" != e.type && UE.dom.UE.dom.dtd.$block[e.tagName] ? t.firstChild() ? (i.parentNode.insertBefore(t, i), t = UE.uNode.createElement("p")) : i.parentNode.insertBefore(e, i) : t.appendChild(e);
                        t.firstChild() && i.parentNode.insertBefore(t, i), i.parentNode.removeChild(i);
                        break;
                    case"dl":
                        i.tagName = "ul";
                        break;
                    case"dt":
                    case"dd":
                        i.tagName = "li";
                        break;
                    case"li":
                        var a = i.getAttr("class");
                        a && /list\-/.test(a) || i.setAttr();
                        var r = i.getNodesByTagName("ol ul");
                        UE.utils.each(r, function (e) {
                            i.parentNode.insertAfter(e, i)
                        });
                        break;
                    case"td":
                    case"th":
                    case"caption":
                        i.children && i.children.length || i.appendChild(UE.browser.ie11below ? UE.uNode.createText(" ") : UE.uNode.createElement("br"));
                        break;
                    case"table":
                        n.options.disabledTableInTable && function (e) {
                            for (; e && "element" == e.type;) {
                                if ("td" == e.tagName) return 1;
                                e = e.parentNode
                            }
                        }(i) && (i.parentNode.insertBefore(UE.uNode.createText(i.innerText()), i), i.parentNode.removeChild(i))
                }
            }
        })
    }), n.addOutputRule(function (e) {
        var a;
        e.traversal(function (e) {
            if ("element" == e.type) {
                if (n.options.autoClearEmptyNode && UE.dom.dtd.$inline[e.tagName] && !UE.dom.dtd.$empty[e.tagName] && (!e.attrs || UE.utils.isEmptyObject(e.attrs))) return void (e.firstChild() ? "span" != e.tagName || e.attrs && !UE.utils.isEmptyObject(e.attrs) || e.parentNode.removeChild(e, !0) : e.parentNode.removeChild(e));
                switch (e.tagName) {
                    case"div":
                        (a = e.getAttr("cdata_tag")) && (e.tagName = a, e.appendChild(UE.uNode.createText(e.getAttr("cdata_data"))), e.setAttr({
                            cdata_tag: "",
                            cdata_data: "",
                            _ue_custom_node_: ""
                        }));
                        break;
                    case"a":
                        (a = e.getAttr("_href")) && e.setAttr({href: UE.utils.html(a), _href: ""});
                        break;
                    case"span":
                        if ((a = e.getAttr("id")) && /^_baidu_bookmark_/i.test(a) && e.parentNode.removeChild(e), n.getOpt("rgb2Hex")) {
                            var t = e.getAttr("style");
                            t && e.setAttr("style", t.replace(/rgba?\(([\d,\s]+)\)/g, function (e, t) {
                                var a = t.split(",");
                                if (3 < a.length) return "";
                                t = "#";
                                for (var r, i = 0; r = a[i++];) t += 1 == (r = parseInt(r.replace(/[^\d]/gi, ""), 10).toString(16)).length ? "0" + r : r;
                                return t.toUpperCase()
                            }))
                        }
                        break;
                    case"img":
                        (a = e.getAttr("_src")) && e.setAttr({src: e.getAttr("_src"), _src: ""})
                }
            }
        })
    })
};