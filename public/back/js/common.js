/**
 * Created by Administrator on 2019/10/21.
 */


//开启进度条
$(document).ajaxStart(function(){
    NProgress.start();
})

$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    },1000);
})

//校验 拦截登录
//前后分离，前端不知道用户是否登录，后端知道，发送ajax请求，验证用户状态
//1.用户已登录啥都不做
//2.用户未登录，拦截到登录页
if(location.href.indexOf('login.html')==-1){
    $.ajax({
        type:'get',
        url:'/employee/checkRootLogin',
        dataType:"json",
        success:function(info){
            console.log(info)
            if(info.success){
                console.log('用户已登录')
            };
            if(info.error==400){
                location.href='login.html';
                console.log('拦截');
            }
        }
    })
}

//index页面

$(function(){
    //左侧侧边栏，点击slideDown()和slideUp()事件
    $('.It_aside .category').click(function(){
        $('.It_aside .child').stop().slideToggle();
    })
    //右侧It_topbar点击事件

    $('.It_topbar .icon_menu').click(function(){
        //左侧侧边栏隐藏
        $('.It_aside').toggleClass('hidemenu');
        //右侧主体扩张
        $('.It_main').toggleClass('hidemenu');
        $('.It_topbar').toggleClass('hidemenu');
    })
    //点击弹出模态框
    $('.icon_logout').click(function(){
        $('#logoutmodal').modal("show");
    })


    //点击模态框的退出按钮，实现退出 返回到longin.html页面
    $('#logoutBtn').click(function(){
        $.ajax({
            tpye:'get',
            url:'/employee/checkRootLogin',
            dateType:'json',
            success:function(info){
                if(info.success){
                    location.href='login.html'
                }
            }

        })

    })
})


