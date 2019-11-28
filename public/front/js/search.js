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
        localStorage.removeItem("search_list");
        render()
    })
})