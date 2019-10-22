/**
 * Created by Administrator on 2019/10/22.
 */
//template数据通过ajax获取
$(function(){
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:{
            page:1,
            pageSize:5,
        },
        dataType:'json',
        success:function(info){
            //console.log(info);
            //template(模板id,数据对象)
           var htmlstr= template('tpl',info);
            $('tbody').html(htmlstr);
        }

    })
})