/**
 * Created by Administrator on 2019/10/24.
 */
$(function(){
    var currentPage=1;
    var pageSize=5;
    //1.发送ajax请求，渲染查询页面
    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            dataType:'json',
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            success:function(info){
                console.log(info);
                if(info){
                    //模板
                    var htmlStr=template('tpl',info);
                    $('tbody').html(htmlStr);
                    //分页器
                    $('#paginator').bootstrapPaginator({
                        //版本号
                        bootstrapMajorVersion:3,
                        //当前页
                        currentPage:currentPage,
                        //总页数
                        totalPages:Math.ceil(info.total/info.size),
                        onPageClicked:function(a,b,c,page){
                            currentPage=page;
                            render();
                        }
                    })
                }
            }
        })
    }

    //2.点击弹出添加分类框
    $('#addBtn').click(function(){
        $('#addmodal').modal('show');
        //弹框同时获取一级分类数据进行渲染（下拉框区域的）,通过template渲染
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            dataType:'json',
            data:{
                page:1,
                pageSize:100,
            },
            success:function(info){
                console.log(info);
                var htmlStr=template('tpl1',info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    })

    //3.通过事件委托，点击选择一级分类
    $(".dropdown-menu").on('click','a',function(){
        var content=$(this).text();
        $('#dropDownText').text(content);
        //获取选中的一级分类的data-id
        var id=$(this).data("id");
        $('[name="categoryId"]').val(id);
    })
    //4.创建jquery-fileupload模板
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            console.log(data);
            var text=data.result.picAddr;
            console.log(text);
            $('#imgBox img').attr("src",text);
            $('[name="brandLogo"]').val(text);
        }

    });


})