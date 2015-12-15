/**
 * Created by Administrator on 2014/4/28.
 */
var closeRender = false;

Highcharts.theme = {
    colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    chart: {
        backgroundColor: null,
        style: {
            fontFamily: "Microsoft YaHei"
        }
    },
    title: {
        style: {
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 'normal'
        }
    },
    subtitle: {
        style: {
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 'normal'
        }
    },
    tooltip: {
        borderWidth: 0
    },
    legend: {
        itemStyle: {
            fontWeight: 'normal',
            fontSize: '12px'
        }
    },
    labels: {
        style: {
            fontWeight: 'normal',
            color: '#FFFFFF'
        }
    },
    drilldown: {
        activeAxisLabelStyle: {
            fontWeight: 'normal',
            color: '#FFFFFF'
        },
        activeDataLabelStyle: {
            fontWeight: 'normal',
            color: '#FFFFFF'
        }
    },
    xAxis: {
        gridLineColor: '#FFFFFF',
        labels: {
            style: {
            fontWeight: 'normal',
                color: '#FFFFFF'
            }
        },
        lineColor: '#FFFFFF',
        minorGridLineColor: '#FFFFFF',
        tickColor: '#FFFFFF',
        title: {
            style: {
                fontWeight: 'normal',
                color: '#FFFFFF'

            }
        }
    },
    yAxis: {
        gridLineColor: '#FFFFFF',
        labels: {
            style: {
                fontWeight: 'normal',
                color: '#FFFFFF'
            }
        },
        lineColor: '#FFFFFF',
        minorGridLineColor: '#FFFFFF',
        tickColor: '#FFFFFF',
        tickWidth: 1,
        title: {
            style: {
                fontWeight: 'normal',
                color: '#FFFFFF'
            }
        }
    },
    plotOptions: {
        series: {
            shadow: true
        },
        candlestick: {
            lineColor: '#FFFFFF'
        },
        pie: {
            dataLabels: {
                fontWeight: 'normal',
                color: '#FFFFFF'
            }
        }
    },
    legend: {
        itemStyle: {
            color: '#FFFFFF'
        },
        itemHoverStyle: {
            color: '#CCC'
        },
        itemHiddenStyle: {
            color: '#FFFFFF'
        }
    },
    // Highstock specific
    navigator: {
        xAxis: {
            gridLineColor: '#D0D0D8'
        }
    },
    rangeSelector: {
        buttonTheme: {
            fill: 'white',
            stroke: '#C0C0C8',
            'stroke-width': 1,
            states: {
                select: {
                    fill: '#D0D0D8'
                }
            }
        }
    },
    scrollbar: {
        trackBorderColor: '#C0C0C8'
    }

};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

var Demo = {
    Demo1:null,
    Demo2:null,
    Demo3:null,
    Demo4:null,
    Demo5:null,
    Demo6:null,
    Demo7:null,
    Demo8:null,
    Demo9:null,
    BuildChartDemo1: function(){
        if(closeRender) return;
        var demo = $('#Demo1').highcharts({
            title: {
                text: '历史发展情况',
                x: -20 //center
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: {
                categories: ['一月', '二月', '三月', '四月', '五月', '六月',
                    '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: '2012',
                data: [70.0, 60.9, 90.5, 140.5, 180.2, 210.5, 250.2, 260.5, 230.3, 180.3, 130.9, 90.6]
            }, {
                name: '2013',
                data: [30, 0.8, 50.7, 110.3, 170.0, 202.0, 240.8, 204.1, 200.1, 140.1, 80.6, 20.5]
            }, {
                name: '同比',
                data: [40, 0.6, 30.5, 80.4, 130.5, 170.0, 180.6, 170.9, 140.3, 90.0, 30.9, 10.0]
            }, {
                name: '完成偏差',
                data: [30.9, 40.2, 50.7, 80.5, 101.9, 105.2, 107.0, 106.6, 104.2, 100.3, 60.6, 40.8]
            }]
        });

        Demo.Demo1 = Highcharts.charts[demo.data('highchartsChart')];
    },

    BuildChartDemo2: function(){
        if(closeRender) return;

        var demo = $('#Demo2').highcharts({
            chart: {
                type: 'area'
//                ,events: {click: function(e){alert(1);}}
            },
            title: {
                text: '业务受理量和业务办结量情况'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    formatter: function() {
                        return this.value; // clean, unformatted number for year
                    }
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function() {
                        return this.value / 1000 +'k';
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            plotOptions: {
                area: {
                    pointStart: 1940,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: '业务受理量',
                data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
            }, {
                name: '业务办结量',
                data: [null, null, null, null, null, null, null , null , null ,null,
                    5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                    4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                    15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                    33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                    35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                    21000, 20000, 19000, 18000, 18000, 17000, 16000]
            }]
        });

        Demo.Demo2 = Highcharts.charts[demo.data('highchartsChart')];

    },

    BuildChartDemo3: function(){
        if(closeRender) return;

        var demo = $('#Demo3').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: '业务受理量实时情况'
            },
            xAxis: {
                categories: ['天津', '山西', '辽宁', '龙江', '江苏']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:#000">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },
            series: [{
                name: '表扬',
                data: [5, 3, 4, 7, 2]
            }, {
                name: '投诉',
                data: [2, 2, 3, 2, 1]
            }, {
                name: '意见',
                data: [3, 4, 4, 2, 5]
            }]
        });

        Demo.Demo3 = Highcharts.charts[demo.data('highchartsChart')];

    },

    BuildChartDemo4: function(){
        if(closeRender) return;

        var strVar="";
        strVar += "Browser Version	Total Market Share";
        strVar += "\n";
        strVar += "河北 8.0	26.61%";
        strVar += "\n";
        strVar += "河北 9.0	16.96%";
        strVar += "\n";
        strVar += "上海 18.0	8.01%";
        strVar += "\n";
        strVar += "上海 19.0	7.73%";
        strVar += "\n";
        strVar += "河南 12	6.72%";
        strVar += "\n";
        strVar += "河北 6.0	6.40%";
        strVar += "\n";
        strVar += "河南 11	4.72%";
        strVar += "\n";
        strVar += "河北 7.0	3.55%";
        strVar += "\n";
        strVar += "山东 5.1	3.53%";
        strVar += "\n";
        strVar += "河南 13	2.16%";
        strVar += "\n";
        strVar += "河南 3.6	1.87%";
        strVar += "\n";
        strVar += "山西 11.x	1.30%";
        strVar += "\n";
        strVar += "上海 17.0	1.13%";
        strVar += "\n";
        strVar += "河南 10	0.90%";
        strVar += "\n";
        strVar += "山东 5.0	0.85%";
        strVar += "\n";
        strVar += "河南 9.0	0.65%";
        strVar += "\n";
        strVar += "河南 8.0	0.55%";
        strVar += "\n";
        strVar += "河南 4.0	0.50%";
        strVar += "\n";
        strVar += "上海 16.0	0.45%";
        strVar += "\n";
        strVar += "河南 3.0	0.36%";
        strVar += "\n";
        strVar += "河南 3.5	0.36%";
        strVar += "\n";
        strVar += "河南 6.0	0.32%";
        strVar += "\n";
        strVar += "河南 5.0	0.31%";
        strVar += "\n";
        strVar += "河南 7.0	0.29%";
        strVar += "\n";
//        strVar += "Other	0.29%";
//        strVar += "\n";
        strVar += "上海 18.0 - Maxthon Edition	0.26%";
        strVar += "\n";
        strVar += "上海 14.0	0.25%";
        strVar += "\n";
        strVar += "上海 20.0	0.24%";
        strVar += "\n";
        strVar += "上海 15.0	0.18%";
        strVar += "\n";
        strVar += "上海 12.0	0.16%";
        strVar += "\n";
        strVar += "山西 12.x	0.15%";
        strVar += "\n";
        strVar += "山东 4.0	0.14%";
        strVar += "\n";
        strVar += "上海 13.0	0.13%";
        strVar += "\n";
        strVar += "山东 4.1	0.12%";
        strVar += "\n";
        strVar += "上海 11.0	0.10%";
        strVar += "\n";
        strVar += "河南 14	0.10%";
        strVar += "\n";
        strVar += "河南 2.0	0.09%";
        strVar += "\n";
        strVar += "上海 10.0	0.09%";
        strVar += "\n";
        strVar += "山西 10.x	0.09%";
        strVar += "\n";
        strVar += "河北 8.0 - Tencent Traveler Edition	0.09%";
        Highcharts.data({
            csv: strVar,
            itemDelimiter: '\t',
            parsed: function (columns) {

                var brands = {},
                    brandsData = [],
                    versions = {},
                    drilldownSeries = [];

                // Parse percentage strings
                columns[1] = $.map(columns[1], function (value) {
                    if (value.indexOf('%') === value.length - 1) {
                        value = parseFloat(value);
                    }
                    return value;
                });

                $.each(columns[0], function (i, name) {
                    var brand,
                        version;

                    if (i > 0) {

                        // Remove special edition notes
                        name = name.split(' -')[0];

                        // Split into brand and version
                        version = name.match(/([0-9]+[\.0-9x]*)/);
                        if (version) {
                            version = version[0];
                        }
                        brand = name.replace(version, '');

                        // Create the main data
                        if (!brands[brand]) {
                            brands[brand] = columns[1][i];
                        } else {
                            brands[brand] += columns[1][i];
                        }

                        // Create the version data
                        if (version !== null) {
                            if (!versions[brand]) {
                                versions[brand] = [];
                            }
                            versions[brand].push(['v' + version, columns[1][i]]);
                        }
                    }

                });

                $.each(brands, function (name, y) {
                    brandsData.push({
                        name: name,
                        y: y,
                        drilldown: versions[name] ? name : null
                    });
                });
                $.each(versions, function (key, value) {
                    drilldownSeries.push({
                        name: key,
                        id: key,
                        data: value
                    });
                });

                // Create the chart
                var demo = $('#Demo4').highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: '上月公司累计值及排名情况'
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        type: 'category'
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true,
                                format: '{point.y:.1f}%'
                            }
                        }
                    },

                    tooltip: {
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:#FFF">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                    },

                    series: [{
                        name: 'Brands',
                        colorByPoint: true,
                        data: brandsData
                    }],
                    drilldown: {
                        series: drilldownSeries
                    }
                })

                Demo.Demo4 = Highcharts.charts[demo.data('highchartsChart')];

            }
        });
    },

    BuildChartDemo5: function() {
        if(closeRender) return;

        var demo = $('#Demo5').highcharts({

            chart: {
                type: 'bubble',
                plotBorderWidth: 1,
                zoomType: 'xy'
            },

            title: {
                text: '上月公司计划完成情况'
            },

            xAxis: {
                gridLineWidth: 1
            },

            yAxis: {
                startOnTick: false,
                endOnTick: false
            },

            series: [{
                data: [
                    [9, 81, 63],
                    [98, 5, 89],
                    [51, 50, 73],
                    [41, 22, 14],
                    [58, 24, 20],
                    [78, 37, 34],
                    [55, 56, 53],
                    [18, 45, 70],
                    [42, 44, 28],
                    [3, 52, 59],
                    [31, 18, 97],
                    [79, 91, 63],
                    [93, 23, 23],
                    [44, 83, 22]
                ],
                marker: {
                    fillColor: {
                        radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                        stops: [
                            [0, 'rgba(255,255,255,0.5)'],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
                        ]
                    }
                }
            }, {
                data: [
                    [42, 38, 20],
                    [6, 18, 1],
                    [1, 93, 55],
                    [57, 2, 90],
                    [80, 76, 22],
                    [11, 74, 96],
                    [88, 56, 10],
                    [30, 47, 49],
                    [57, 62, 98],
                    [4, 16, 16],
                    [46, 10, 11],
                    [22, 87, 89],
                    [57, 91, 82],
                    [45, 15, 98]
                ],
                marker: {
                    fillColor: {
                        radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                        stops: [
                            [0, 'rgba(255,255,255,0.5)'],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
                        ]
                    }
                }
            }]

        });

        Demo.Demo5 = Highcharts.charts[demo.data('highchartsChart')];

    },

    BuildChartDemo6: function() {
        if(closeRender) return;

        var demo = $('#Demo6').highcharts({

            chart: {
                polar: true
            },

            title: {
                text: '职工工种分类情况'
            },

            pane: {
                startAngle: 0,
                endAngle: 360
            },

            xAxis: {
                tickInterval: 45,
                min: 0,
                max: 360,
                labels: {
                    formatter: function () {
                        return this.value + '°';
                    }
                }
            },

            yAxis: {
                min: 0
            },

            plotOptions: {
                series: {
                    pointStart: 0,
                    pointInterval: 45
                },
                column: {
                    pointPadding: 0,
                    groupPadding: 0
                }
            },

            series: [{
                type: 'column',
                name: '高级工',
                data: [8, 7, 6, 5, 4, 3, 2, 1],
                pointPlacement: 'between'
            }, {
                type: 'line',
                name: '中级工',
                data: [1, 2, 3, 4, 5, 6, 7, 8]
            }, {
                type: 'area',
                name: '初级工',
                data: [1, 8, 2, 7, 3, 6, 4, 5]
            }]
        });

        Demo.Demo6 = Highcharts.charts[demo.data('highchartsChart')];

    },

    BuildChartDemo7: function() {
        if(closeRender) return;

        var demo = $('#Demo7').highcharts({
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: '职工学历分布情况'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
//                    ,events:{click: Metro.Events.onClick}
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['高中',   45.0],
                    ['本科',       26.8],
                    {
                        name: '专科',
                        y: 12.8,
                        sliced: true,
                        selected: true
                    },
                    ['博士',    8.5],
                    ['研究生',     6.2],
                    ['其他',   0.7]
                ]
            }]
        });

        Demo.Demo7 = Highcharts.charts[demo.data('highchartsChart')];

    },

    BuildChartDemo9: function(id) {
        if(!id)
            id="Demo9"
        if(closeRender) return;
        //return;
        require.config({
            packages: [
                {
                    name: 'echarts',
                    location: 'Resources/echart',
                    main: 'echarts'
                },
                {
                    name: 'zrender',
                    //location: 'http://ecomfe.github.io/zrender/src',
                    location: 'Resources/zrender',
                    main: 'zrender'
                }
            ]
        });
//        return;
        option = {
            title : {
                text: '上月公司当期值及排名情况',
                subtext: '纯属虚构',
                x:'center',
                  textStyle: {
                        fontSize: 14,
                        color: '#000'
                    }
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                x:'left',
                data:['S1','S2','S3']
            },
            dataRange: {
                min: 0,
                max: 2500,
                text:['高','低'],           // 文本，默认为数值文本
                calculable : true
            },
            toolbox: {
                show : false
            },
            series : [
                {
                    name: 'S1',
                    type: 'map',
                    mapType: 'china',
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    data:[
                        {name: '北京',value: Math.round(Math.random()*1000)},
                        {name: '天津',value: Math.round(Math.random()*1000)},
                        {name: '上海',value: Math.round(Math.random()*1000)},
                        {name: '重庆',value: Math.round(Math.random()*1000)},
                        {name: '河北',value: Math.round(Math.random()*1000)},
                        {name: '河南',value: Math.round(Math.random()*1000)},
                        {name: '云南',value: Math.round(Math.random()*1000)},
                        {name: '辽宁',value: Math.round(Math.random()*1000)},
                        {name: '黑龙江',value: Math.round(Math.random()*1000)},
                        {name: '湖南',value: Math.round(Math.random()*1000)},
                        {name: '安徽',value: Math.round(Math.random()*1000)},
                        {name: '山东',value: Math.round(Math.random()*1000)},
                        {name: '新疆',value: Math.round(Math.random()*1000)},
                        {name: '江苏',value: Math.round(Math.random()*1000)},
                        {name: '浙江',value: Math.round(Math.random()*1000)},
                        {name: '江西',value: Math.round(Math.random()*1000)},
                        {name: '湖北',value: Math.round(Math.random()*1000)},
                        {name: '广西',value: Math.round(Math.random()*1000)},
                        {name: '甘肃',value: Math.round(Math.random()*1000)},
                        {name: '山西',value: Math.round(Math.random()*1000)},
                        {name: '内蒙古',value: Math.round(Math.random()*1000)},
                        {name: '陕西',value: Math.round(Math.random()*1000)},
                        {name: '吉林',value: Math.round(Math.random()*1000)},
                        {name: '福建',value: Math.round(Math.random()*1000)},
                        {name: '贵州',value: Math.round(Math.random()*1000)},
                        {name: '广东',value: Math.round(Math.random()*1000)},
                        {name: '青海',value: Math.round(Math.random()*1000)},
                        {name: '西藏',value: Math.round(Math.random()*1000)},
                        {name: '四川',value: Math.round(Math.random()*1000)},
                        {name: '宁夏',value: Math.round(Math.random()*1000)},
                        {name: '海南',value: Math.round(Math.random()*1000)},
                        {name: '台湾',value: Math.round(Math.random()*1000)},
                        {name: '香港',value: Math.round(Math.random()*1000)},
                        {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                },
                {
                    name: 'S2',
                    type: 'map',
                    mapType: 'china',
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    data:[
                        {name: '北京',value: Math.round(Math.random()*1000)},
                        {name: '天津',value: Math.round(Math.random()*1000)},
                        {name: '上海',value: Math.round(Math.random()*1000)},
                        {name: '重庆',value: Math.round(Math.random()*1000)},
                        {name: '河北',value: Math.round(Math.random()*1000)},
                        {name: '安徽',value: Math.round(Math.random()*1000)},
                        {name: '新疆',value: Math.round(Math.random()*1000)},
                        {name: '浙江',value: Math.round(Math.random()*1000)},
                        {name: '江西',value: Math.round(Math.random()*1000)},
                        {name: '山西',value: Math.round(Math.random()*1000)},
                        {name: '内蒙古',value: Math.round(Math.random()*1000)},
                        {name: '吉林',value: Math.round(Math.random()*1000)},
                        {name: '福建',value: Math.round(Math.random()*1000)},
                        {name: '广东',value: Math.round(Math.random()*1000)},
                        {name: '西藏',value: Math.round(Math.random()*1000)},
                        {name: '四川',value: Math.round(Math.random()*1000)},
                        {name: '宁夏',value: Math.round(Math.random()*1000)},
                        {name: '香港',value: Math.round(Math.random()*1000)},
                        {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                },
                {
                    name: 'S3',
                    type: 'map',
                    mapType: 'china',
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    data:[
                        {name: '北京',value: Math.round(Math.random()*1000)},
                        {name: '天津',value: Math.round(Math.random()*1000)},
                        {name: '上海',value: Math.round(Math.random()*1000)},
                        {name: '广东',value: Math.round(Math.random()*1000)},
                        {name: '台湾',value: Math.round(Math.random()*1000)},
                        {name: '香港',value: Math.round(Math.random()*1000)},
                        {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                }
            ]
        };

        require(
            [
                'echarts',
//                'echarts/chart/line',
//                'echarts/chart/bar',
//                'echarts/chart/scatter',
//                'echarts/chart/k',
//                'echarts/chart/pie',
//                'echarts/chart/radar',
//                'echarts/chart/force',
//                'echarts/chart/chord',
                'echarts/chart/map'
            ],
            function(ec) {
                var myChart = ec.init(document.getElementById(id));
                myChart.setOption(option);
            }
        );
    },

    BuildChartDemo8: function() {
        if(closeRender) return;

        var demo = $('#Demo8').highcharts({

            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    viewDistance: 25,
                    depth: 40
                },
                marginTop: 80,
                marginRight: 40
            },

            title: {
                text: '累计值历史发展情况'
            },

            xAxis: {
                categories: ['一月', '二月', '三月', '四月', '五月']
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: 'Number of fruits'
                }
            },

            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '<span style="color:#FFF">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
            },

            plotOptions: {
                column: {
                    stacking: 'normal',
                    depth: 40
                }
            },

            series: [{
                name: '2011',
                data: [5, 3, 4, 7, 2],
                stack: 'male'
            }, {
                name: '2012',
                data: [3, 4, 4, 2, 5],
                stack: 'male'
            }, {
                name: '2013',
                data: [2, 5, 6, 2, 1],
                stack: 'female'
            }, {
                name: '同比',
                data: [3, 0, 4, 4, 3],
                stack: 'female'
            }]
        });

        Demo.Demo8 = Highcharts.charts[demo.data('highchartsChart')];

    }
};
