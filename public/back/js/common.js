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