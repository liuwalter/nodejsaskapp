/**
 * Created by liujiang on 15/7/5.
 */
$(function(){
    //登录窗口
    function show_tip(ele,css,msg)
    {
        var str='<div class="alert alert-'+css+' alert-dismissible" role="alert" style="display:none">  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>'+msg+'</div>'
        if(ele.nextSibling&&ele.nextSibling.attr("role")=="alert")
        {

        }
        else{
            var r=$(str);
            r.insertAfter(ele);

            r.alert();
            r.fadeIn();
            r.on('closed.bs.alert', function () {
               $("button[type=submit]").removeAttr("disabled");
            });
            r.fadeOut(5000,function(){
                r.alert("close");
            });

        }
    }

    $('#loginInform').bootstrapValidator({
        message: '请输入合法的值',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            semail:
            {
                validators: {
                    notEmpty: {
                        message: '电子邮箱不能为空!'
                    },
                    emailAddress: {
                        message: '电子邮箱不合法!'
                    },
                    remote: {
                        url: '/mem/ckemail',
                        message: '该邮箱已被注册!'
                    }
                }
            },
            lemail: {

                validators: {
                    notEmpty: {
                        message: '电子邮箱不能为空!'
                    },
                    emailAddress: {
                        message: '电子邮箱不合法!'
                    }
                }
            },
            pwd: {
                validators: {
                    notEmpty: {
                        message: '请输入密码!'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '密码长度不能少于6位!'
                    }

                }
            },
            nc: {
                validators: {
                    notEmpty: {
                        message: '昵称不能为空!'
                    },
                    remote: {
                        url: '/mem/cknick',
                        message: '昵称已存在!'
                    }
                }
            }
        },
        onError:function(){
            //$("button[type=submit]").removeAttr("disabled");
        },
        onSuccess:function(){
            $('#loginInform').submit(function() {
                $("button[type=submit]").attr("disabled",'disabled');
                // submit the form
                $('#loginInform').ajaxSubmit({

                    success:function(data){

                        if(data.status)
                        {
                            window.location.reload();
                        }else
                        {
                            show_tip($("#frmcontent"),'danger','操作失败，'+ data.message);

                        }
                    },
                    error:function(){
                        show_tip($("#frmcontent"),'danger','操作失败，请稍后重试！');
                    }
                });
                // return false to prevent normal browser submit and page navigation
                return false;
            });


        }
    });


    //登录按钮事件
    $(".open-login").on("click",function(){
        $('#loginModal').modal('show');
        $($("#myModalLabel span")[0]).trigger("click");
    });
    //注册事件
    $(".open-reg").on("click",function(){
        $('#loginModal').modal('show');
        $($("#myModalLabel span")[1]).trigger("click");
    });
    //登出
    $(".open-logout").on("click",function(){

        $.get("/users/logout",function(r){if(r.status){ window.location.reload();}});
    });

    //切换登录注册状态
    $("#myModalLabel span").on("click",function(){
        $("#myModalLabel span").removeClass("on");
        if(!$(this).hasClass("on"))
        {
            $(this).addClass("on");
        }

        //如果是注册
        if($(this).attr("data")=="reg")
        {
            //改变from的action
            $("#loginInform").attr("action","/users/reg");
            $("#semail").removeClass("ng-hide");
            $("#lemail").addClass("ng-hide");

            $("#frmnickname").removeClass("ng-hide");

            $("#frmauto").addClass("ng-hide");


            $("#frmlogin").addClass("ng-hide");
            $("#frmregister").removeClass("ng-hide");
        }
        else if($(this).attr("data")=="login")
        {
            $("#loginInform").attr("action","/users/login");
            $("#semail").addClass("ng-hide");
            $("#lemail").removeClass("ng-hide");

            $("#frmnickname").addClass("ng-hide");

            $("#frmauto").removeClass("ng-hide");


            $("#frmlogin").removeClass("ng-hide");
            $("#frmregister").addClass("ng-hide");
        }
    });

});