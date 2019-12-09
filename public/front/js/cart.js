$(function() {


    // 1. 进入页面, 发送ajax请求, 获取购物车列表, 进行渲染
    function render() {
        setTimeout(function () {
            $.ajax({
                type: "get",
                url: "/cart/queryCart",
                dataType: "json",
                success: function (info) {
                    console.log(info);
                    if (info.error === 400) {
                        // 用户没登陆, 跳转到登录页, 在跳转时, 将页面地址拼接
                        location.href = "login.html?retUrl=" + location.href;
                        return;
                    }

                    // 用户已登录, 通过模板引擎渲染  (需要的是对象, 要将数组包装)
                    var htmlStr = template("tpl", {arr: info});
                    $('.It_main .mui-table-view').html(htmlStr);

                    // 关闭下拉刷新
                    mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                }
            });
        }, 500);
    }

    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",//下拉刷新容器标识
            down: {
                auto: true, // 加载自动下拉刷新一次
                callback: function () {
                    console.log("发送ajax请求, 进行页面刷新");
                    render();
                }
            }
        }
    });


    // 2. 删除功能
    //    (1) 点击事件绑定要通过事件委托绑定, 且要绑定 tap 事件
    //    (2) 获取当前购物车 id
    //    (3) 发送 ajax 请求进行删除
    //    (4) 页面重新渲染
    $('.It_main').on("tap", ".btn_delete", function () {
        // 获取 id
        var id = $(this).data("id");

        // 发送 ajax 请求
        $.ajax({
            type: "get",
            url: "/cart/deleteCart",
            // 注意: 后台要求传递的数组, 虽然这里只删一个, 但是格式还是数组
            data: {
                id: [id]
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    // 页面重新渲染, 触发一次下拉刷新即可
                    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                }
            }
        })

    });
})
