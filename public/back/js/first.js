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
                    totalPages:Math.ceil(info.total/info.size),
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
    //2点击添加分类按钮，显示模态框
    $('#addBtn').click(function(){
        $('#addmodal').modal('show');
    })

    //3使用表单校验插件
    $('#form').bootstrapValidator({
        // 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'内容不能为空'
                    }
                }
            }
        }
    })
    //4.阻止默认提交,进行ajax提交
    $('#form').on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            dataType:'json',
            data:$('#form').serialize(),
            success:function(info){
                console.log(info)
                if(info.success){
                    //关闭模态框
                    $('#addmodal').modal('hide');
                    render();
                    //重置输入框内容
                    $("#form").data('bootstrapValidator').resetForm(true);
                }
            }
        })

    })


})