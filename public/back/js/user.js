/**
 * Created by Administrator on 2019/10/22.
 */
//template数据通过ajax获取
$(function(){
    var currentPage=1;
    var pageSize=5;
    //页面用户数据渲染
    render()
    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                //template(模板id,数据对象)
                var htmlstr= template('tpl',info);
                $('tbody').html(htmlstr);
                //页面选择器bootstrapPaginator插件
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:info.page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        //更新当前页
                        currentPage=page;
                        render();
                    }
                });
            }
        })
    }




})