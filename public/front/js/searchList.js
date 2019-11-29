/**
 * Created by Administrator on 2019/11/28.
 */
$(function(){
    //获取页面转跳时候的key的值
    var key=getSearch( "key");
    //搜索框设置为该值
    $('.It_search input').val(key);
    //1.发送ajax请求，获取数据
    get();
    function get(){
        $.ajax({
            type:'get',
            dataType:'json',
            url:'/product/queryProduct',
            data:{
                proName:$('.It_search input').val(),
                page:1,
                pageSize:1000,
            },
            success:function(info){
                console.log(info);
                var htmlStr=template('tpl',info);
                $('.It_product ul').html(htmlStr);
            }
        })
    }


    //2.点击搜索，实现搜索功能
    $('.It_search   button').on('click',function(){
        get();
        //记录历史记录
        var content= $('.It_search input').val();//获取搜索栏的值
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
})