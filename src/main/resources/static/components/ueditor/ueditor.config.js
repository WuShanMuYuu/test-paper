!function () {
    window.UEDITOR_HOME_URL = "../components/ueditor/";
    var s = window.UEDITOR_HOME_URL || l();

    function l(s, l) {
        return function (s, l) {
            var t = l;
            /^(\/|\\\\)/.test(l) ? t = /^.+?\w(\/|\\\\)/.exec(s)[0] + l.replace(/^(\/|\\\\)/, "") : /^[a-z]+:/i.test(l) || (s = s.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, ""), t = s + "" + l);
            return function (s) {
                var l = /^[a-z]+:\/\//.exec(s)[0], t = null, e = [];
                (s = (s = s.replace(l, "").split("?")[0].split("#")[0]).replace(/\\/g, "/").split(/\//))[s.length - 1] = "";
                for (; s.length;) ".." === (t = s.shift()) ? e.pop() : "." !== t && e.push(t);
                return l + e.join("/")
            }(t)
        }(s || self.document.URL || self.location.href, l || (t = document.getElementsByTagName("script"))[t.length - 1].src);
        var t
    }

    window.UEDITOR_CONFIG = {
        UEDITOR_HOME_URL: s,
        // serverUrl: "/api/admin/upload/configAndUpload",
        serverUrl: "/uetest/admin/upload/configAndUpload",
        toolbars: [["fullscreen", "source", "|", "bold", "italic", "underline", "forecolor", "fontfamily", "fontsize", "|", "justifyleft", "justifycenter", "justifyright", "justifyjustify", "|", "insertimage", "inserttable", "gapfilling"]],
        labelMap: {anchor: "", undo: ""},
        enableAutoSave: !1,
        saveInterval: 0,
        elementPathEnabled: !1,
        wordCount: !1,
        maximumWords: 1e5,
        xssFilterRules: !0,
        inputXssFilter: !0,
        outputXssFilter: !0,
        whitList: {
            a: ["target", "href", "title", "class", "style"],
            abbr: ["title", "class", "style"],
            address: ["class", "style"],
            area: ["shape", "coords", "href", "alt"],
            article: [],
            aside: [],
            audio: ["autoplay", "controls", "loop", "preload", "src", "class", "style"],
            b: ["class", "style"],
            bdi: ["dir"],
            bdo: ["dir"],
            big: [],
            blockquote: ["cite", "class", "style"],
            br: [],
            caption: ["class", "style"],
            center: [],
            cite: [],
            code: ["class", "style"],
            col: ["align", "valign", "span", "width", "class", "style"],
            colgroup: ["align", "valign", "span", "width", "class", "style"],
            dd: ["class", "style"],
            del: ["datetime"],
            details: ["open"],
            div: ["class", "style"],
            dl: ["class", "style"],
            dt: ["class", "style"],
            em: ["class", "style"],
            font: ["color", "size", "face"],
            footer: [],
            h1: ["class", "style"],
            h2: ["class", "style"],
            h3: ["class", "style"],
            h4: ["class", "style"],
            h5: ["class", "style"],
            h6: ["class", "style"],
            header: [],
            hr: [],
            i: ["class", "style"],
            img: ["src", "alt", "title", "width", "height", "id", "_src", "loadingclass", "class", "data-latex"],
            ins: ["datetime"],
            li: ["class", "style"],
            mark: [],
            nav: [],
            ol: ["class", "style"],
            p: ["class", "style"],
            pre: ["class", "style"],
            s: [],
            section: [],
            small: [],
            span: ["class", "style"],
            sub: ["class", "style"],
            sup: ["class", "style"],
            strong: ["class", "style"],
            table: ["width", "border", "align", "valign", "class", "style"],
            tbody: ["align", "valign", "class", "style"],
            td: ["width", "rowspan", "colspan", "align", "valign", "class", "style"],
            tfoot: ["align", "valign", "class", "style"],
            th: ["width", "rowspan", "colspan", "align", "valign", "class", "style"],
            thead: ["align", "valign", "class", "style"],
            tr: ["rowspan", "align", "valign", "class", "style"],
            tt: [],
            u: [],
            ul: ["class", "style"],
            video: ["autoplay", "controls", "loop", "preload", "src", "height", "width", "class", "style"]
        }
    }, window.UE = {getUEBasePath: l}
}();