/**
 * Created by Administrator on 2019/10/20.
 */
$(function(){
    // 1. 进行表单校验
    //    校验要求: (1) 用户名不能为空
    //              (2) 密码不能为空, 且必须是 6-12 位
    //2. 指定校验时的图标显示，默认是bootstrap风格

    $('#form').bootstrapValidator({
        //配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',//校验成功
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //    配置字段
        fields:{
            username:{
            //    配置校验规则：
                validators:{
                    notEmpty:{
                        message:"用户名不能为空！"
                    },
                    stringLength:{
                        min:2,
                        max:6,
                        message:"用户名长度必须2-6位"
                    },
                    callback:{
                        message:'用户不存在。。。'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空！"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度必须6-12位"
                    },
                    callback:{
                        message:'密码错误。。。'
                    }


                }
            }
        }
    })

    //阻止浏览器默认提交
    $('#form').on('success.form.bv',function(e){
        e.preventDefault()

        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$('#form').serialize(),//表单序列化
            dataType:'json',
            success:function(info){
                console.log(info);
                if(info.success){
                    //转跳
                    location.href='index.html';
                }
                if(info.error==1000){
                    //alert('用户名不存在')
                    $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
                };
                if(info.error==1001){
                    $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
                }
            }
        })
    })


    //重置按钮 c3选择器
    $('[type="reset"]').click(function(){
        //调用插件方法，进行重置校验状态
        //resetForm(boolean),
        //1.true,重置内容和校验状态
        //2.false,只重置校验状态
        $('#form').data('bootstrapValidator').resetForm();
    })


})