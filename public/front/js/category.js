/**
 * Created by Administrator on 2019/11/27.
 */

$(function(){

    //一进入页面，进行ajax请求，渲染一级分类数据
    $.ajax({
        type:'get',
        dataType:'json',
        url:'/category/queryTopCategory',
        success:function(info){
            console.log(info);
            var htmlStr=template('tpl1',info);
            $('.It_category_left ul').html(htmlStr);
        //同时渲染一级分类所对应的二级分类
            renderSecondById(info.rows[0].id)

        }
    })
    //同时渲染一级分类所对应的二级分类
    function renderSecondById(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            dataType:'json',
            data:{
                id:id,
            },
            success:function(info){
                console.log(info)
                var htmlStr=template('tpl2',info);
                $('.It_category_right ul').html(htmlStr);
            }
        })

    }
    //注册点击事件，事件委托
    $('.It_category_left ul').on('click','a',function(){
        var id=$(this).data('id');
        $(this).addClass('current').parent().siblings().find('a').removeClass('current');
        renderSecondById(id);
    })
})