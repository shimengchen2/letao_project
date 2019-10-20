/**
 * Created by Administrator on 2019/10/20.
 */
$(function(){
    // 1. 进行表单校验
    //    校验要求: (1) 用户名不能为空
    //              (2) 密码不能为空, 且必须是 6-12 位

    $('#form').bootstrapValidator({
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
                    }

                }
            }
        }
    })
})