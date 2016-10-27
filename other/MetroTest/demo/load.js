var DemoGrid = {
  currentSize: 4,
  currentResizeElement:null,
  startX:null,
  startY:null,
  startW:null,
  startH:null,
  sizeX:null,
  sizeY:null,
  buildElements: function($gridContainer, items) {
      var colour_array = ['#00AAEF', '#42B618', '#F78E00', '#D62C29', '#630C6B', '#FF75A5', '#39599C', '#FFCB08', 'yellow', 'grey'];

      var item, i;
      item = items[0];
      $item = $(
              '<li>' +
              '<div class="header"><div id="linkurl"></div><div id="MaxSize"></div><div class="removed"></div></div>' +
              '<div class="inner">' +
              '<div class="content" style="background-color: '+ colour_array[0] +'" id="Demo' +1 + '"></div>' +
              '</div>' +
              '<span class="resize-handle"></span>' +
              '</li>'
      );
      $item.attr({
          'data-w': item.w,
          'data-h': item.h,
          'data-x': item.x,
          'data-y': item.y
      });
      $gridContainer.append($item);
    for (i = 1; i < items.length; i++) {
      item = items[i];
      var index = i+1;
      $item = $(
        '<li>' +
          '<div class="header"><div class="removed"></div></div>' +
          '<div class="inner">' +
//            '<div class="controls">' +
//              '<a href="#zoom1" class="resize" data-size="1">1x</a>' +
//              '<a href="#zoom2" class="resize" data-size="2">2x</a>' +
//              '<a href="#zoom3" class="resize" data-size="3">3x</a>' +
//            '</div>' +
            '<div class="content" style="background-color: '+ colour_array[i] +'" id="Demo' + index + '"></div>' +
          '</div>' +
          '<span class="resize-handle"></span>' +
        '</li>'
      );
      $item.attr({
        'data-w': item.w,
        'data-h': item.h,
        'data-x': item.x,
        'data-y': item.y
      });
      $gridContainer.append($item);

//      $('.resize-handle').mousedown(function(e){
//          event.preventDefault();
//          DemoGrid.currentResizeElement = $(e.currentTarget).closest('li');
//          DemoGrid.startX =  e.clientX;
//          DemoGrid.startY =  e.clientY;
//          DemoGrid.startW =  DemoGrid.currentResizeElement.width();
//          DemoGrid.startH =  DemoGrid.currentResizeElement.height();
//          $('.grid-container').bind('mousemove',DemoGrid.mouseMoveResizeHandler);
//          $('.grid-container').bind('mouseup',DemoGrid.mouseUpResizeHandler);
//      });
    }
  },
//  mouseMoveResizeHandler:function(e){
//      event.preventDefault();
//      var width = DemoGrid.startW + e.clientX - DemoGrid.startX;
//      var height = DemoGrid.startH + e.clientY - DemoGrid.startY;
//      DemoGrid.sizeX = parseInt(width/125) +1;
//      DemoGrid.sizeY = parseInt(height/125)+1;
//      $('#grid').gridList('resizeItem', DemoGrid.currentResizeElement, [ DemoGrid.sizeX,DemoGrid.sizeY]);
//      DemoGrid.currentResizeElement.css({
//          width: width,
//          height: height
//      });
//  },
//  mouseUpResizeHandler:function(){
//      event.preventDefault();
//      $('.grid-container').unbind('mousemove',DemoGrid.mouseMoveResizeHandler);
//      $('.grid-container').unbind('mouseup',DemoGrid.mouseUpResizeHandler);
//      $('#grid').gridList('resizeItem', DemoGrid.currentResizeElement, [ DemoGrid.sizeX,DemoGrid.sizeY]);
//  },
  resize: function(size) {
    if (size) {
      this.currentSize = size;
    }
    $('#grid').gridList('resize', this.currentSize);
  },
  flashItems: function(items) {
    // Hack to flash changed items visually
    for (var i = 0; i < items.length; i++) {
      (function($element) {
        $element.addClass('changed')
        setTimeout(function() {
          $element.removeClass('changed');
        }, 0);
      })(items[i].$element);
    }
  }
};

$(window).resize(function() {
  DemoGrid.resize();
});

$(function() {
  DemoGrid.buildElements($('#grid'), fixtures.DEMO);

  $('#grid').gridList({
    rows: DemoGrid.currentSize,
    widthHeightRatio: 264 / 294,
    heightToFontSizeRatio: 0.25,
    onChange: function(changedItems) {
      DemoGrid.flashItems(changedItems);
    }
  },{onResize: function(itemElement){
      setTimeout(
          function(){reflow(itemElement);
//              setTimeout(
//                  function(){reflow(itemElement);
//                      setTimeout(
//                          function(){reflow(itemElement);
//                          },100);
//                  },100);
          },100);
  }});
  $('#grid li .resize').click(function(e) {
    e.preventDefault();
    var itemElement = $(e.currentTarget).closest('li'),
        itemSize = $(e.currentTarget).data('size');
    $('#grid').gridList('resizeItem', itemElement, [itemSize,itemSize]);
  });
  $('.add-row').click(function(e) {
    e.preventDefault();
    DemoGrid.resize(DemoGrid.currentSize + 1);
  });
  $('.remove-row').click(function(e) {
    e.preventDefault();
    DemoGrid.resize(Math.max(1, DemoGrid.currentSize - 1));
  });

  $( "#grid li .inner" ).resizable();

    Metro.init();

    setTimeout(function(){ Demo.BuildChartDemo1();
        Demo.BuildChartDemo2();
        Demo.BuildChartDemo3();
        Demo.BuildChartDemo4();
        Demo.BuildChartDemo5();
        Demo.BuildChartDemo6();
        Demo.BuildChartDemo7();
        Demo.BuildChartDemo8();},500);


//    setTimeout(
//        function(){
//            DemoGrid.resize();
//        },3000);


    $(".addSize,.addSize1").click(function(e){
      e.preventDefault();
      var itemElement = $(e.currentTarget).closest('li');
      var w = parseInt(itemElement.attr("data-w"));
      var h = parseInt(itemElement.attr("data-h"));
      if(h < w)
        h = h+1;
      else
        w = w+1;

      $('#grid').gridList('resizeItem', itemElement, [w,h]);

//      setTimeout(
//          function(){reflow(itemElement);
//          setTimeout(
//              function(){reflow(itemElement);
//                  setTimeout(
//                      function(){reflow(itemElement);
//                      },100);
//              },100);
//      },100);
  });

  $(".removeSize,.removeSize1").click(function(e){
      e.preventDefault();
      var itemElement = $(e.currentTarget).closest('li');
      var w = parseInt(itemElement.attr("data-w"));
      var h = parseInt(itemElement.attr("data-h"));
      if(h >= w)
          h = h-1;
      else
          w = w-1;

      $('#grid').gridList('resizeItem', itemElement, [w,h]);

      setTimeout(
          function(){reflow(itemElement);
//              setTimeout(
//                  function(){reflow(itemElement);
//                      setTimeout(
//                          function(){reflow(itemElement);
//                          },100);
//                  },100);
          },100);

  });


  var removeItem = function(e){
      e.preventDefault();
      var $widget = $(this).parent().parent();
      $widget.remove();
      $('#grid').gridList('deleteItem',$widget);
  };

  $('div.header div.removed').bind('click',removeItem);

  var reflow = function(el){
      var id = el.find("div.content").attr("id");
      if(id!="Demo9")
          eval("Demo." + id + ".reflow()");
      else
          eval("Demo.BuildChart" + id + "()");
  };

//  $("#title").click(function(){
//        var colour_array = ['#00AAEF', '#42B618', '#F78E00', '#D62C29', '#630C6B', '#FF75A5', '#39599C', '#FFCB08', 'yellow', 'grey'];
//
//        $item = $(
//                '<li>' +
//                '<div class="header"><div id="linkurl"></div><div id="MaxSize"></div><div class="removed"></div></div>' +
//                '<div class="inner">' +
//                '<div class="content" style="background-color: '+ colour_array[1] +'" id="Demo' +1 + '">'+1+'</div>' +
//                '</div>' +
//                '<span class="resize-handle"></span>' +
//                '</li>'
//        );
//        $item.attr({
//            'data-w': 1,
//            'data-h': 1,
//            'data-x': 3,
//            'data-y': 2
//        });
//
//
//        $('#grid').append($item);
//
//
//        $('#grid').gridList('addItem',{
//            $element: $item,
//            x: Number( $item.attr('data-x')),
//            y: Number( $item.attr('data-y')),
//            w: Number( $item.attr('data-w')),
//            h: Number( $item.attr('data-h')),
//            id: Number( $item.attr('data-id'))
//        });
//    });
});
