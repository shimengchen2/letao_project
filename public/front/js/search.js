/**
 * Created by Administrator on 2019/11/27.
 */
$(function(){

    //打开页面首先渲染一次
    render()
    //获取本地历史记录localStorage
    function getHistory(){
        var historyJson=localStorage.getItem('search_list');
        var historyStr=JSON.parse(historyJson) || [];//转成Str
        console.log(historyStr);//返回的数组
        return historyStr;
    }

    function render(){
        var historyStr=getHistory()
        //动态渲染在页面
        //template(模板id,对象)
        var htmlStr=template('tpl',{historyStr:historyStr});
        $('.It_history ').html(htmlStr);
    }


    //2.清空历史记录功能
    $('.It_history ').on('click','.btn_empty',function(){
        mui.confirm("是否删除呢？","注意",["取消","确认"],function(e){
            if(e.index===1){
                //清空
                localStorage.removeItem("search_list");
                render()
            }
        })

    })

    //3.删除单个历史记录
    $('.It_history').on('click','.btn_delete',function(){
        //弹出确认框
        var  that=this;
        mui.confirm("是否删除此历史记录？","温馨提示",["取消","确认"],function(e){
            if(e.index===1){
                //删除单个历史记录
                var index=$(that).data('index');
                var historyStr=getHistory();//得到历史记录historyStr，一级转成Str了
                //splice(第几项开始，删除几个，添加的项1，添加的项2，。。。。)
                historyStr.splice(index,1);
                localStorage.setItem("search_list", JSON.stringify(historyStr));
                //重新渲染
                render();
            }
        })

    })

    //4.点击搜索记录浏览历史
    $('.It_search .mui-btn').on('click',function(){
       var content= $('.It_search input').val().trim();
        if(content==''){
            mui.toast('请输入搜索内容');
        }else{
            var history=getHistory();
            //indexOf,返回该数在数组中第一次出现时候的下边index,=-1则不含此数
            var index=history.indexOf(content);
            if(index!=-1){//如果搜索重复
                history.splice(index,1);
            }
            //历史记录只保留6条
            if(history.length>=6){
                history.pop();
            }
            history.unshift(content);
            localStorage.setItem("search_list",JSON.stringify(history));
            render();
            //清空输入框
            $('.It_search input').val('');
            //添加转跳
            location.href='searchList.html?key='+content;
        }

    })
})