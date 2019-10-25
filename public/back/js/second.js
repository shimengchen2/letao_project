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

        //同时更新校验
        $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')
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
            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
        }


    });

    //5.一级分类模态框的表单校验功能
    $('form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields:{
            //form表单中含有的name
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'请选择合适的类'
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:'内容不能为空'
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:'请选择图片'
                    }
                }
            }
        }

    })

    //6.当表单校验成功时，会触发`success.form.bv`事件，
    // 此时会提交表单，这时候，通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$('#form').serialize(),
            dataTpye:'json',
            success:function(info){
                if(info.success){
                    //关闭模态框
                    $('#addmodal').modal('hide');
                    //重新渲染
                    currentPage=1;
                    render();
                    //重置模态框数据
                    $('#form').data('bootstrapValidator').resetForm(true);
                    //因为以上重置只能重置表单元素，所以手动重置文本内容和图片路径
                    $('#dropDownText').text('请选择一级分类');
                    $('#imgBox img').attr('src','./images/default.png');
                }
            }
        })
    });


})