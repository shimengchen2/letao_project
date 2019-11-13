/**
 * Created by Administrator on 2019/10/30.
 */
$(function(){
    var pageSize= 2;
    var currentPage=1;
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
                console.log(info)
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
    })
})
