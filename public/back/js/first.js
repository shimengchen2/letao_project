/**
 * Created by Administrator on 2019/10/24.
 */
$(function(){
    //ajax
    var currentPage=1;
    var pageSize=5;
    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            dataType:'json',
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            success:function(info){
                console.log(info);
                var htmlStr=template('tpl',info);
                $('tbody').html(htmlStr);
                //分页器
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPage:Math.ceil(info.total/info.size),
                    size:'small',
                    onPageClicked:function(event, originalEvent, type,page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        //更新当前页
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

})