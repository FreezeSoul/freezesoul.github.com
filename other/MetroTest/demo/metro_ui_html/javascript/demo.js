$(document).ready(function() {
    var colour_array = ['blue', 'orange', 'red', 'green', 'darkgreen', 'purple', 'darkred', 'darkblue', 'yellow', 'grey'];

    var header_html = '';
    header_html += '<div id="removeWidget"></div>';
    header_html += '<div id="addWidget"></div>';
    header_html += '<div id="settings"></div>';
    header_html += '<div id="theme_picker" class="content1">';
    header_html +=     '<span>切换主题:</span>';
    header_html +=     '<div class="selected">';
    header_html +=         '<div class="square default"></div>';
    header_html +=         '<label class="text_shadow">custom</label>';
    header_html +=      '</div>';

    $(colour_array).each(function(index, colour) {
        header_html += '<div>';
        header_html +=     '<div class="square ' + colour + '"></div>';
        header_html +=     '<label class="text_shadow">' + colour + '</label>';
        header_html += '</div>';
    });

    header_html += '</div>';

    header_html += '<div class="content2">';
    header_html +=     '<span>选择指标:</span>';
    header_html +=     '<div class="indexContent">';
    header_html +=          '<div><img src="images/map.png"/></div>';
    header_html +=          '<div class="label">上月省（市）公司排名情况</div>';
    header_html +=     '</div>';
    header_html += '</div>';

    var header2_html = '';

    header2_html += '<div id="Widget_picker">';
    header2_html +=     '<span>Widget:</span>';

    header2_html += '<div class="widget_div" data="Demo7" >';
    header2_html +=     '<image class="widget_image" src="images/red.png"></image>';
    header2_html += '</div>';

    header2_html += '<div class="widget_div" data="Demo3" >';
    header2_html +=     '<image class="widget_image" src="images/blue.png"></image>';
    header2_html += '</div>';

    header2_html += '</div>';

    $('<header>').html(header_html).prependTo($(document.body));

    $('<header2>').html(header2_html).prependTo($(document.body));



    var links = document.querySelectorAll('div.widget_div'), el = null;
    for (var i = 0; i < links.length; i++) {
        el = links[i];

        el.setAttribute('draggable', 'true');

        addEvent(el, 'dragstart', function (e) {
            e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
            e.dataTransfer.setData('id', this.data); // required otherwise doesn't work
        });
    }


    var bin = document.querySelector('div.gridster');

    addEvent(bin, 'dragover', function (e) {
        if (e.preventDefault) e.preventDefault(); // allows us to drop
        e.dataTransfer.dropEffect = 'copy';
        return false;
    });

    // to get IE to work
    addEvent(bin, 'dragenter', function (e) {
    });

    addEvent(bin, 'dragleave', function () {
    });

    addEvent(bin, 'drop', function (e) {
        var isAdded = false;
        widgetArray.forEach(function(value,index){
            var exsit = false;
            if(isAdded) return;
            $("ul li").each(function (index, domEle){
                if(exsit) return;
                var idValue = $(domEle).find(".content").attr("id");
                if(idValue == value.id)
                    exsit = true;
            });
            if(!exsit)
            {
                gridster.add_widget.apply(gridster, value.data);
                eval("Demo.BuildChart"+value.id+"()");
                if(value.id == "Demo1")
                {
                    $('#Demo1 svg').click(ChartClickEvent);
                    $('#MaxSize').click(Metro.Events.onClick);
                }
                var left = 50 + value.data[3]*80;
                $('body')[0].scrollLeft = left;
                $('#' + value.id).parent().find("div.header div.removed").click(removedWidgetClick);
                var flag = $("#removeWidget").data("flag");
                if(flag && flag == "1")
                {
                    $(".removed").show();
                }
                else
                {
                    $(".removed").hide();
                }

                var b = $('#' +value.id);
                //b.addClass("unloaded").addClass("animation");
                setTimeout(function() {
                        b.removeClass("unloaded");
                        setTimeout(function() {
                                b.removeClass("animation")
                            },
                            300)
                    },
                        100 * 1)
                isAdded = true;
            }
        });
        if(isAdded == false)
        {
            alert("要演示添加新指标，请先移除一个指标。")
        }
        return false;
    });

    var settingClick = function() {

        $(".content1").show();
        $(".content2").hide();
        $(document.body).toggleClass('open');
        $(document.body).removeClass('open1');
    };

    var widgetArray = new Array();
    var parseWidgetArray = function(){
        widgetArray = new Array();
        $("ul li").each(function (index, domEle){
            var idValue = $(domEle).find(".content").attr("id");
            var data = domEle.outerHTML;
            var x = parseInt($(domEle).attr("data-row"));
            var y = parseInt($(domEle).attr("data-col"));
            widgetArray.push({id:idValue,data:[data, 4, 3,y,x]});
        });
        var widget =  ['<li><div class="header"><div class="removed"></div></div><div class="content" id="Demo9" style="background-color: Grey;"></div></li>', 4, 3,21,1];
        widgetArray.push({id:"Demo9",data:widget})
    };
    parseWidgetArray();

    var addWidgetClick = function() {

//        if($(document.body).hasClass("open1"))
//        {
//            $(document.body).removeClass('open');
//        }
//        else
//        {
//            $(document.body).addClass('open');
//        }
//        $(document.body).toggleClass('open1');
//        return;
        var isAdded = false;
        widgetArray.forEach(function(value,index){
            var exsit = false;
            if(isAdded) return;
            $("ul li").each(function (index, domEle){
                if(exsit) return;
                var idValue = $(domEle).find(".content").attr("id");
                if(idValue == value.id)
                    exsit = true;
            });
            if(!exsit)
            {
                gridster.add_widget.apply(gridster, value.data);
                eval("Demo.BuildChart"+value.id+"()");
                if(value.id == "Demo1")
                {
                    $('#Demo1 svg').click(ChartClickEvent);
                    $('#MaxSize').click(Metro.Events.onClick);
                }
                var left = 50 + value.data[3]*80;
                $('body')[0].scrollLeft = left;
                $('#' + value.id).parent().find("div.header div.removed").click(removedWidgetClick);
                var flag = $("#removeWidget").data("flag");
                if(flag && flag == "1")
                {
                    $(".removed").show();
                }
                else
                {
                    $(".removed").hide();
                }

                var b = $('#' +value.id);
                //b.addClass("unloaded").addClass("animation");
                setTimeout(function() {
                        b.removeClass("unloaded");
                        setTimeout(function() {
                                b.removeClass("animation")
                            },
                            300)
                    },
                        100 * 1)
                isAdded = true;
            }
        });
        if(isAdded == false)
        {
            alert("要演示添加新指标，请先移除一个指标。")
        }
    };

    var removedWidgetClick = function(){
        var widget = $(this).parent().parent();
        gridster.remove_widget.apply(gridster, widget);
        isAdded = false;
    };

    var removeWidgetClick = function(){
        var flag = $("#removeWidget").data("flag");
        if(flag && flag == "1")
        {
            $(".removed").hide();
            $("#removeWidget").data("flag","0");
        }
        else
        {
            $(".removed").show();
            $("#removeWidget").data("flag","1");
        }
    };
    var currentTheme = null;
    var themeClick = function(e) {

        var theme = $(this).children('div.square').attr('class');
        currentTheme = theme;
        $.each(colour_array, function(index, value) {
            $('div.content').removeClass(value);
        });

        if (theme !== 'default') {
            $('div.content').addClass(theme);
        }

        $('#theme_picker').children('div.selected').removeClass('selected');
        $(this).addClass('selected');
    };

    $('#theme_picker').children('div').click(themeClick);
    $('#settings').click(settingClick);
//    $('#addWidget').click(addWidgetClick);
    $('#removeWidget').click(removeWidgetClick);
    $('div.header div.removed').click(removedWidgetClick);

    $('.js-seralize').on('click', function() {
        var s = gridster.serialize();
        $('#log').val(JSON.stringify(s));
    })

    var isAddedIndex = false;
    var idIndex = 9;
    $(".indexContent").click(function(){
        if(isAddedIndex == true)
        {
            alert("指标已添加！");
            return;
        }
        var id="Demo" + idIndex++;

        var colour_array = ['#00AAEF', '#42B618', '#F78E00', '#D62C29', '#630C6B', '#FF75A5', '#39599C', '#FFCB08', 'yellow', 'grey'];
        $item = $(
                '<li>' +
                '<div class="header"><div class="removed"></div></div>' +
                '<div class="inner">' +
                //'<div class="content" style="background-color: '+ colour_array[Math.floor((Math.random() * 10) + 1)] +'" id="Demo9">'+'新增指标'+'</div>' +
                '<div class="content" style="background-color: #FFF" id="' + id + '"></div>' +
                '</div>' +
                '<span class="resize-handle"></span>' +
                '</li>'
        );
        $item.attr({
            'data-w': 4,
            'data-h': 2,
            'data-x': 0,
            'data-y': 0
        });


        $('#grid').append($item);


        $('#grid').gridList('addItem',{
            $element: $item,
            x: Number( $item.attr('data-x')),
            y: Number( $item.attr('data-y')),
            w: Number( $item.attr('data-w')),
            h: Number( $item.attr('data-h')),
            id: Number( $item.attr('data-id'))
        });

        var removeItem = function(e){
            e.preventDefault();
            var $widget = $(this).parent().parent();
            $widget.remove();
            $('#grid').gridList('deleteItem',$widget);
            removeWidgetClick();
            isAddedIndex = false;
        };

        $('div.header div.removed').unbind('click',removeItem);
        $('div.header div.removed').bind('click',removeItem);
         setTimeout(
          function(){
                Demo.BuildChartDemo9(id);
          },200);


        $.each(colour_array, function(index, value) {
            $('div.content').removeClass(value);
        });

        if (currentTheme && currentTheme !== 'default') {
            $('div.content').addClass(currentTheme);
        }

        isAddedIndex = true;
    });

    $("#addWidget").click(function(){
        $(".content1").hide();
        $(".content2").show();
        $(document.body).toggleClass('open');
        $(document.body).removeClass('open1');
        return;


    });

});