/**
 * Created by Administrator on 2019/10/22.
 */
//template数据通过ajax获取
$(function(){
    var currentPage=1;
    var pageSize=5;
    var currentId ;
    var currentIsDelete;
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

    //user.html页面给每个用户禁用/启用加上事件委托，弹出模态框
    $('tbody').delegate('button','click',function(){
        $('#usermodal').modal("show");
        currentId=$(this).parent().data('id');//data()是jq中获取自定义属性data-di='xx'
        currentIsDelete = $(this).hasClass("btn-success") ? 1 : 0;
    })

    //点击更改警用/启用选项，发送数据更新后台，文档查询得到 ajax需要2个参数，用户ID和isDelete
    $('#submitBtn').click(function(){
        $('#usermodal').modal("hide"); 
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:currentId,
                isDelete:currentIsDelete,
            },
            dataType:'json',
            success:function(info) {
                if (info.success) {
                    // 重新渲染
                    render();
                }
            }
        })
    })


})