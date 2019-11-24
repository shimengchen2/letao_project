/**
 * Created by Administrator on 2019/10/30.
 */
$(function(){
    var pageSize= 2;
    var currentPage=1;
    //定义一个空数组，为了使图片只显示三张
    var picArr=[];
    //看文档发送ajax请求，获取参数
    //1.进入页面进行数据获取，渲染页面
    render()
    function render(){
        $.ajax({
            url:'/product/queryProductDetailList',
            type:"get",
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            dataType:'json',
            success:function(info){
                //console.log(info);
                var htmlStr=template('pdt',info);
                $('.It_content tbody').html(htmlStr);

                //分页器，使用插件bootstrap-paginator
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    // first 首页 last 尾页, prev 上一页, next 下一页, page 普通页码
                    // page 是当前按钮指向第几页
                    // current 是指当前是第几页 (相对于整个分页来说的)
                    //配置文本
                    itemTexts:function(type,page,current){
                        //console.log(arguments);
                        //switch case
                        switch(type){
                            case 'first':
                                return "首页";
                            case "last":
                                return "尾页";
                            case "prev":
                                return "上一页";
                            case 'next':
                                return "下一页";
                            case 'page':
                                return page;
                            case "current":
                                return page;
                        }
                    },
                    //设置操作按钮的title属性
                    tooltipTitles:function(type,page,current){
                        switch(type){
                            case 'first':
                                return "前往首页";
                            case "last":
                                return "前往尾页";
                            case "prev":
                                return "上一页";
                            case 'next':
                                return "下一页";
                            case 'page':
                                return "前往第"+page+"页";
                            case "current":
                                return page;
                        }
                    },
                    useBootstrapTooltip:true,
                    onPageClicked:function(a,b,c,page){
                        currentPage=page;
                        render()
                    }

                })
            }
        })
    }
    //2.点击“添加商品”弹出模态框，同时渲染好模态框下拉框的内容
    $('#addBtn').click(function(){
        $('#addmodal').modal('show');
        //同时渲染好模态框下拉框的内容
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type:'get',
            dataType:'json',
            data:{
                page:1,
                pageSize:100,
            },
            success:function(info){
                //console.log(info.rows[0].categoryName)
                var htmlStr=template("pdt1",info);
                $(".dropdown-menu").html(htmlStr)
            }
        })
    })

    //3.给下拉框中的a注册点击事件，采用事件委托
    $('.dropdown-menu').on("click","a",function(e){
        e.preventDefault();
        var txt=$(this).text();
        var id = $(this).data('id');
        //console.log(txt)
        $("#dropDownText").text(txt);
        $('[name="categoryId"]').val(id);

        //输入数据重置校验状态
        $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')
    })

    //4.文件上传，文件上传时，插件会遍历文件，发送多次请求，done相当于成功时的回调函数
    $('#fileupload').fileupload({
        dataType:'json',
        //e：事件对象
        //data：图片上传后的对象，通过 data.result.picAddr 可以获取上传后的图片地址
        done:function (e, data) {
            //在id为imgBox内添加img元素
            var picObj=data.result;
            var addr=picObj.picAddr;
            picArr.unshift(picObj);
            $('#imgBox').prepend('<img src="'+addr+'" width="100" height="70" alt="">')
            if(picArr.length>3) {
                picArr.pop();
                console.log(picArr);
                $('#imgBox img:last-of-type').remove();
            };
            if(picArr.length==3){
                $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID')
            }

        }
    })

    //5.表单校验
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择二级分类'
                    },
                },
            },
            //校验用户名，对应name表单的name属性
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '二级分类内容不能为空'
                    },
                },
            },
            proDesc:{
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '产品描述不能为空'
                    },
                },
            },
            num:{
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '产品库存不能为空'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[1-9]\d*/,
                        message: '产品库存只能为非0开头的数字'
                    }
                },
            },
            size:{
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '产品尺码不能为空'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '产品尺码必须是xx-xx的格式,例如：32-39'
                    }
                },
            },
            oldPrice:{
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '产品原价不能为空'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\d{0,10000}/,
                        message: '产品原价只能为非0开头的数字'
                    }
                },
            },
            price:{
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '产品现价不能为空'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\d{0,10000}/,
                        message: '产品现价只能为非0开头的数字'
                    }
                },
            },
            picStatus:{
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '图片不能为空'
                    },
                },
            }
        }
    })

    //6.bootstrapValidator插件校验表单成功是会默认提交、阻止默认提交,采用ajax提交
    $('#form').on('success.form.bv',function(e){
        e.preventDefault();
        var paramStr=$('#form').serialize();
        console.log(picArr);
        paramStr+="&pciName1="+picArr[0].pciAddr+"&picAddr1="+picArr[0].pciName;
        paramStr+="&pciName2="+picArr[1].pciAddr+"&picAddr2="+picArr[1].pciName;
        paramStr+="&pciName3="+picArr[2].pciAddr+"&picAddr3="+picArr[2].pciName;
        $.ajax({
            type:'post',
            url:'/product/addProduct',
            dataType:'json',
            data:paramStr,
            success:function(info){
                if(info.success){
                    //添加成功
                    //关闭模态框
                    $('#addmodal').modal('hide');
                    //重新渲染
                    currentPage=1;
                    render();
                    //重置表单
                    var validator = $("#form").data('bootstrapValidator');  //获取表单校验实例
                    validator.resetForm(true);//重置表单，并且会隐藏所有的错误提示和图标
                    //因为选择的二级分类li和图片上传预览不是表单元素，所以在这里手动重置
                    $('#dropDownText').text('请选择二级分类');
                    $('#imgBox img').remove();
                }
            }
        })
    })
})
