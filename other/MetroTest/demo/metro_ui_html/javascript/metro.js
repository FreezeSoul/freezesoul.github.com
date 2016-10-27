var docCookies = {
    getItem: function(b) {
        return ! b || !this.hasItem(b) ? null: unescape(document.cookie.replace(RegExp("(?:^|.*;\\s*)" + escape(b).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"))
    },
    setItem: function(b, a, c, e, g, d) {
        if (b && !/^(?:expires|max\-age|path|domain|secure)$/i.test(b)) {
            var f = "";
            if (c) switch (c.constructor) {
            case Number:
                f = Infinity === c ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT": "; max-age=" + c;
                break;
            case String:
                f = "; expires=" + c;
                break;
            case Date:
                f = "; expires=" + c.toGMTString()
            }
            document.cookie = escape(b) + "=" + escape(a) + f + (g ? "; domain=" + g: "") + (e ? "; path=" + e: "") + (d ? "; secure": "")
        }
    },
    removeItem: function(b, a) {
        b && this.hasItem(b) && (document.cookie = escape(b) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (a ? "; path=" + a: ""))
    },
    hasItem: function(b) {
        return RegExp("(?:^|;\\s*)" + escape(b).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
    }
},
Metro = {
    window_width: 0,
    window_height: 0,
    scroll_container_width: 0,
    widget_preview: null,
    widget_sidebar: null,
    widgets: null,
    widget_scroll_container: null,
    widget_containers: null,
    widget_open: !1,
    dragging_x: 0,
    left: 60,
    currentwidget:null,
    currentwidgetparent:null,
    currentwidgetindex:0,
    lastwidgetindex:0,
    widget_page_data: [],
    is_touch_device: !1,
    title_prefix: "MelonHTML5 - ",
    data: [],
    init: function() {
        Metro.HTML._build();
        Metro.is_touch_device = "ontouchstart" in document.documentElement ? !0 : !1;
        Metro.cacheElements();
        $('#MaxSize').unbind("click",Metro.Events.onClick);
        $('#MaxSize').bind("click",Metro.Events.onClick);
        Metro.widget_sidebar.children("div").children("div").click(Metro.Events.sidebarClick);
//        if ("" !== window.location.hash) {
//            var b = window.location.hash.replace(/[#!\/]/g, ""),
//            b = Metro.widgets.filter('[data-name="' + b + '"]');
//            b.length && Metro.openWidget(b)
//        }
        $(document.body).addClass("loaded");

    },
    Events: {
        onClick: function(b) {
            Metro.openWidget($('#Demo1'));
        },
        sidebarClick: function(b) {
            b.stopPropagation();
            b.preventDefault();
            switch ($(b.target).attr("class")) {
            case "cancel":
                Metro.closeWidget(b);
                break;
            case "refresh":
                Metro.refreshWidget(b);
                break;
            case "download":
                window.open("http://codecanyon.net/user/leli2000", "_blank");
                break;
            case "back":
                Metro.previousWidget(b);
                break;
            case "next":
                Metro.nextWidget(b)
            }
        }
    },
    HTML: {
        _build: function() {
            var a = '<div id="widget_sidebar"><div>';
            a += '<div class="cancel"><span>Close</span></div>';
            a += '<div class="back"><span>Back</span></div>';
            a += '<div class="next"><span>Next</span></div>';
            a += "</div>";
            a += "</div>";
            $("<div>").attr("id", "widget_preview").html(a).appendTo($(document.body))
        },
        addContainer: function(b) {
            Metro.data.push(b)
        }
    },
    cacheElements: function() {
        Metro.widgets = $("div.widget");
        Metro.widget_containers = $("div.widget_container");
        Metro.widget_scroll_container = $("#root");
        Metro.widget_preview = $("#widget_preview");
        Metro.widget_sidebar = $("#widget_sidebar");
        Metro.scroll_container_width = Metro.widget_scroll_container.width()
    },
    openWidget: function(b) {
        $("#widget_preview_content").remove();
        Metro.widget_preview.addClass("open").css("background-color", b.css("background-color"));
        Metro.widget_scroll_container.hide();
        Metro.currentwidgetindex = 1;
        Metro._loadWidget("Demo1");
    },
    closeWidget: function() {
        Metro.widget_scroll_container.show();
        Metro.widget_preview.removeClass("open");
        Metro.widget_open = !1;
        Metro.currentwidget.appendTo( Metro.currentwidgetparent);
        Demo.Demo1.reflow();
        Demo.Demo2.reflow();
        Demo.Demo3.reflow();
        Demo.Demo4.reflow();
        Demo.Demo5.reflow();
        Demo.Demo6.reflow();
        Demo.Demo7.reflow();
        Demo.Demo8.reflow();


        $('#Demo1 svg').click(ChartClickEvent);

        setTimeout(function() {
            $("#widget_preview_content").remove()
        },
        300)
        Metro.currentwidget = null;
    },
    refreshWidget: function() {
    },
    previousWidget: function(b) {
        Metro.lastwidgetindex = Metro.currentwidgetindex;
        if(Metro.currentwidgetindex<=1)
            Metro.currentwidgetindex=8;
        Metro.currentwidgetindex = Metro.currentwidgetindex-1;
        var str = "Demo" + Metro.currentwidgetindex;
        Metro._loadWidget(str);
        Metro.widget_preview.css("background-color", $("#"+str).css("background-color"));
    },
    nextWidget: function(b) {
        Metro.lastwidgetindex = Metro.currentwidgetindex;
        if(Metro.currentwidgetindex>=7)
            Metro.currentwidgetindex=0;
        Metro.currentwidgetindex = Metro.currentwidgetindex+1;
        var str = "Demo" + Metro.currentwidgetindex;
        Metro._loadWidget(str);
        Metro.widget_preview.css("background-color", $("#"+str).css("background-color"));
    },
    _loadWidget: function(s) {
        if(Metro.currentwidget) {
            Metro.currentwidget.appendTo(Metro.currentwidgetparent);
//            var str = "Demo" + Metro.lastwidgetindex;
//            eval("Demo.BuildChart"+str+"()");
        }
        Metro.widget_preview.children("div.dot").remove();
        for (var d = 1; 7 >= d; d++) $("<div>").addClass("dot").css("transition", "right " + (0.6 + d / 10).toFixed(1) + "s ease-out").prependTo(Metro.widget_preview);
        var f = function() {
            var a = $("div.dot");
            a.length && (a.toggleClass("open"), setTimeout(f, 1300))
        },
        g = (new Date).getTime();
       var h = function(a) {
            var b = (new Date).getTime() - g;
            1300 < b ? (Metro.widget_preview.children("div.dot").remove(), "undefined" !== typeof a && a()) : setTimeout(function() {
                Metro.widget_preview.children("div.dot").remove();
                "undefined" !== typeof a && a()
            },
            1300 - b)
        };
        Metro.widget_preview.width();
        f();
        if($("#widget_preview_content").length ==0)
            $("<div>").attr("id", "widget_preview_content").insertAfter(Metro.widget_sidebar);
        var r = function(){
            Metro.currentwidget = $("#" + s);
            Metro.currentwidgetparent = $("#" + s).parent();
            Metro.currentwidget.appendTo($("#widget_preview_content"));
            //eval("Demo.BuildChart"+s+"()");
            eval("Demo." + s + ".reflow()");
            h();
        };
        setTimeout(r,1000);
    }
};
