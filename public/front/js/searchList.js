/**
 * Created by Administrator on 2019/11/28.
 */
$(function(){
    //获取页面转跳时候的key的值
    var key=getSearch( "key");
    //搜索框设置为该值
    $('.It_search input').val(key);
    //1.发送ajax请求，获取数据,渲染页面
    render();
    function render(){
        //模拟加载
        $('.It_product ul').html('<div class="loading"></div>');
        //创建一个空数组，传入ajax的data中
        var obj={};
        obj.proName=$('.It_search input').val();
        obj.page=1;
        obj.pageSize=1000;
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
                    console.log(info);
                    var htmlStr=template('tpl',info);
                    $('.It_product ul').html(htmlStr);
                }
            });
        },500)

    }


    //2.点击搜索，实现搜索功能
    $('.It_search   button').on('click',function(){
        render();

        //记录历史记录
        var content= $('.It_search input').val().trim();//获取搜索栏的值
        //如果搜索框未输入值，则提示
        if(content===''){
            mui.toast("亲，别忘记输入内容哦！");
            return
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
    $('.It_sort a[data-type]').click(function(){
        if($(this).hasClass('current')){
            //如果有
            $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
            render();
        }else{
            //如果没有
            $(this).addClass('current').siblings().removeClass('current');
            $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
            render();
        }
    })
})