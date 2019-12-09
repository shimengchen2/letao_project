/**
 * Created by Administrator on 2019/12/3.
 */
$(function(){
    var productId=getSearch('productId');
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        typeDate:'json',
        data:{
            id:productId,
        },
        success:function(info){
            console.log(info);
            var htmlStr=template('tpl',info);
            $('.It_main .mui-scroll').html(htmlStr);
            //因为轮播图是动态渲染的，所以要是手动启动mui轮播设置；
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            //同样手动初始化，数量输入框
            mui('.mui-numbox').numbox()
        }
    });

    //给尺码注册点击事件，事件委托
    $('.It_main').on('tap','.It_size span',function(){
        $(this).addClass('current').siblings().removeClass('current');
    });
    //点击加入购物车
    $('#addCart').click(function(){
        //获取尺码
        var size=$('.It_size span.current').text();
        //获取数量
        var num=$('.mui-numbox-input').val();
        console.log(size);
        if(!size){
            mui.toast('请选择尺码');
            return;
        };

        //ajax
        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:{
                productId:productId,
                num:num,
                size:size,
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                if(info.error===400){
                    //表示未登录
                    location.href='login.html?retUrl='+location.href;
                };
                if(info.success){
                    mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
                        if(e.index==0){
                            location.href='cart.html'
                        }
                    })
                };
            }
        })
    })
})