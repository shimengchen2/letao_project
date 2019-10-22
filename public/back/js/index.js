    /**
     * Created by Administrator on 2019/10/21.
     */
    // 基于准备好的dom，初始化echarts实例

$(function(){

    //柱状图
    var myChart1 = echarts.init(document.querySelector('.echarts_1'));
    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        //y轴刻度根据数据动态生成
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [1500, 2000,2500, 1500, 1800, 1200]
        }]
    };

// 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);

    //饼图
    var myChart2 = echarts.init(document.querySelector('.echarts_2'));
    var option2 = {
        title : {
            text: '热门销售品牌',
            subtext: '2017年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','李宁','花花公子','阿迪王']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '60%',
                center: ['55%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'李宁'},
                    {value:135, name:'花花公子'},
                    {value:1548, name:'阿迪王'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart2.setOption(option2);
})
