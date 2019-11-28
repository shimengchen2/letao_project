/**
 * Created by Administrator on 2019/11/26.
 */
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

//获得slider插件对象，自动轮播
var gallery = mui('.mui-slider');
gallery.slider({
    interval:3500//自动轮播周期，若为0则不自动播放，默认为0；
});

// 专门通过传递的参数, 可以解析出地址栏的参数值
function getSearch( name ) {
    var search = location.search; // ?name=pp&age=18&desc=%E5%B8%85

    // 解码成中文
    search = decodeURI( search ); // ?name=pp&age=18&desc=帅

    // 将 ? 去掉
    search = search.slice(1);  // name=pp&age=18&desc=帅

    // 根据 & 进行切割
    var arr = search.split( "&" );  // ["name=pp", "age=18", "desc=帅"]
    var obj = {};
    arr.forEach(function( v, i ) {  // v 就是每一项, ["name=pp"]
        var key = v.split("=")[0];
        var value = v.split("=")[1];
        obj[key] = value;
    });
    return obj[name];
}