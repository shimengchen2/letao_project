/**
 * Created by Administrator on 2019/12/9.
 */
$(function(){
    //登录渲染
    $.ajax({
        type:'get',
        dataType:'json',
        url:'/user/queryUserMessage',
        success:function(info){
            console.log(info);
            if(info.error==400){
                //用户未登录
                location.href='login.html';
                return ;
            }
            var htmlStr=template('tpl',info);
            $('#userinfo').html(htmlStr);
        }
    })
    //退出登录
    $('.logout').click(function(){
        $.ajax({
            type:'get',
            dataType:'json',
            url:'/user/logout',
            success:function(info){
                if(info.success){
                    location.href='login.html';
                }
            }
        })
    })
})