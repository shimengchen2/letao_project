/**
 * Created by Administrator on 2019/11/28.
 */
$(function(){
    var currentPage=1;
    var pageSize=2;
    //获取页面转跳时候的key的值
    var key=getSearch("key");
    //搜索框设置为该值
    $('.It_search input').val(key);
    //1.发送ajax请求，获取数据,渲染页面
    //render();

    //注意
    //配置下拉刷新和上拉加载的方法核心：
    //下拉刷新是覆盖，执行html方法
    //上拉加载是在原有结构上进行追加，执行的是append方法

    //下拉刷新&上拉加载
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                //height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                //contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function(){
                    //每次刷新重置
                    currentPage=1;
                    //重新开启上拉加载；

                    render(function(info){
                        console.log(info);
                        var htmlStr=template('tpl',info);
                        $('.It_product').html(htmlStr);
                        //获取数据后终止下拉刷新，看mui文档
                        //注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
                        //没有更多内容了，endPulldown 传入true， 不再执行下拉刷新
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        //console.log(mui('.mui-scroll-wrapper').pullRefresh());寻找原型
                        //重启上拉加载
                        mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
                    });
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            //上拉加载
            up : {
                //height:50,//可选.默认50.触发上拉加载拖动距离
                //auto:true,//可选,默认false.自动上拉加载一次
                //contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                //contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :function(){
                    currentPage++;
                    render(function(info){
                        console.log('执行上拉加载');
                        console.log(info);
                        var htmlStr=template('tpl',info);
                        $('.It_product').append(htmlStr);
                        //获取数据后终止下拉刷新，看mui文档
                        //注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
                        //没有更多内容了，endPulldown 传入true， 不再执行下拉刷新
                        //console.log(mui('.mui-scroll-wrapper').pullRefresh());寻找原型
                        if(info.data.length==0){
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                        }else{
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                        }
                    });
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    $('.It_product').html('<div class="loading"></div>');

    function render(callback){
        //模拟加载
        //$('.It_product').html('<div class="loading"></div>');
        //创建一个空数组，传入ajax的data中
        var obj={};
        obj.proName=$('.It_search input').val();
        obj.page=currentPage;
        obj.pageSize=pageSize;
        //价格和库存
        //price和num ，2升序，1降序
        var $current=$('.It_sort a.current');
        if($current){
            var sortName=$current.data('type');
            //采用三元表达式判断是升序还是降序,1升序，2降序
            var sort=$current.find('i').hasClass('fa-angle-down')? 2:1;
            //添加到data中
            obj[sortName]=sort;
        }
        setTimeout(function(){
            $.ajax({
                type:'get',
                dataType:'json',
                url:'/product/queryProduct',
                data:obj,
                success:function(info){
                    callback&&callback(info);
                    //console.log(info);
                    //var htmlStr=template('tpl',info);
                    //$('.It_product ul').html(htmlStr);
                    ////获取数据后终止下拉刷新，看mui文档
                    ////注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
                    ////没有更多内容了，endPulldown 传入true， 不再执行下拉刷新
                    //mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                    ////console.log(mui('.mui-scroll-wrapper').pullRefresh());寻找原型
                    ////mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh()
                }
            });

        },500)

    }


    //2.点击搜索，实现搜索功能
    $('.It_search button').on('tap',function(){
        //模拟加载loading动画
        $('.It_product').html('<div class="loading"></div>');
        //点击搜索触发一次下拉刷新
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
        render(function(info){
            console.log(info);
            var htmlStr=template('tpl',info);
            $('.It_product').html(htmlStr);
            //获取数据后终止下拉刷新，看mui文档
            //注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
            //没有更多内容了，endPulldown 传入true， 不再执行下拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
            //console.log(mui('.mui-scroll-wrapper').pullRefresh());寻找原型
            //mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
        });

        //记录历史记录
        var content= $('.It_search input').val().trim();//获取搜索栏的值
        //如果搜索框未输入值，则提示
        if(content===''){
            mui.toast("亲，别忘记输入内容哦！");
            return;
        }
        var historyJson=localStorage.getItem("search_list") || [];//获取json字符串
        var historyStr=JSON.parse(historyJson);//转换为Str，

        //1.删除重复项
        var index = historyStr.indexOf(content);
        if(index!=-1){
            historyStr.splice(index,1);
        }
        //2.长度不能超过6
        if(historyStr.length>=6){
            historyStr.pop();
        }
        //将关键字追加到Str数组中
        historyStr.unshift(content);
        //转成json格式，存储到localStorage内
        localStorage.setItem("search_list",JSON.stringify(historyStr));
    })

    //3.实现点击 价格./库存 排序
    //(1)如果自己有current类，实现排序
    //(2)如果自己没有current类，给自己添加，并移除兄弟元素的current类
    $('.It_sort a[data-type]').on('tap',function(){
        console.log(1);
        if($(this).hasClass('current')){
            //如果有
            $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');

        }else{
            //如果没有
            $(this).addClass('current').siblings().removeClass('current');
            $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');

        };
        //执行一次下拉刷新
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
    })

    //4.点击每个商品，实现页面跳转
    $('.It_product').on('tap','a',function(){
        var id=$(this).data('id');
        location.href='product.html?productId='+id;
        console.log(id);
    })
})