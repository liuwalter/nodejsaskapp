/**
 * Created by liujiang on 15/8/5.
 */
define(['jquery','bootstrap'], function($,bootstrap){


    Date.prototype.format = function(fmt)
    {
        var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    }

    //初始化
    function init(){
        var id= $("#cur").attr("select");
        $("#"+id).parent("li").parent().show();
        $("#"+id).addClass("selactive");
        $("#"+id).attr("style","color:#fff");




        // === Sidebar navigation === //

        $('.submenu > a').click(function(e)
        {
            e.preventDefault();
            var submenu = $(this).siblings('ul');
            var li = $(this).parents('li');
            var submenus = $('#sidebar li.submenu ul');
            var submenus_parents = $('#sidebar li.submenu');
            if(li.hasClass('open'))
            {
                if(($(window).width() > 768) || ($(window).width() < 479)) {
                    submenu.slideUp();
                } else {
                    submenu.fadeOut(250);
                }
                li.removeClass('open');
            } else
            {
                if(($(window).width() > 768) || ($(window).width() < 479)) {
                    submenus.slideUp();
                    submenu.slideDown();
                } else {
                    submenus.fadeOut(250);
                    submenu.fadeIn(250);
                }
                submenus_parents.removeClass('open');
                li.addClass('open');
            }
        });

        var ul = $('#sidebar > ul');

        $('#sidebar > a').click(function(e)
        {
            e.preventDefault();
            var sidebar = $('#sidebar');
            if(sidebar.hasClass('open'))
            {
                sidebar.removeClass('open');
                ul.slideUp(250);
            } else
            {
                sidebar.addClass('open');
                ul.slideDown(250);
            }
        });

        // === Resize window related === //
        $(window).resize(function()
        {
            if($(window).width() > 479)
            {
                ul.css({'display':'block'});
                $('#content-header .btn-group').css({width:'auto'});
            }
            if($(window).width() < 479)
            {
                ul.css({'display':'none'});
                fix_position();
            }
            if($(window).width() > 768)
            {
                $('#user-nav > ul').css({width:'auto',margin:'0'});
                $('#content-header .btn-group').css({width:'auto'});
            }
        });

        if($(window).width() < 468)
        {
            ul.css({'display':'none'});
            fix_position();
        }

        if($(window).width() > 479)
        {
            $('#content-header .btn-group').css({width:'auto'});
            ul.css({'display':'block'});
        }

        // === Tooltips === //
       /* $('.tip').tooltip();
        $('.tip-left').tooltip({ placement: 'left' });
        $('.tip-right').tooltip({ placement: 'right' });
        $('.tip-top').tooltip({ placement: 'top' });
        $('.tip-bottom').tooltip({ placement: 'bottom' });*/


        // === Fixes the position of buttons group in content header and top user navigation === //
        function fix_position()
        {
            var uwidth = $('#user-nav > ul').width();
            $('#user-nav > ul').css({width:uwidth,'margin-left':'-' + uwidth / 2 + 'px'});

            var cwidth = $('#content-header .btn-group').width();
            $('#content-header .btn-group').css({width:cwidth,'margin-left':'-' + uwidth / 2 + 'px'});
        }

        String.format = function () {
            if (arguments.length == 0)
                return null;
            var str = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
                str = str.replace(re, arguments[i]);
            }
            return str;
        };
        $.format = function (source, params) {
            if (arguments.length == 1)
                return function () {
                    var args = $.makeArray(arguments);
                    args.unshift(source);
                    return $.format.apply(this, args);
                };
            if (arguments.length > 2 && params.constructor != Array) {
                params = $.makeArray(arguments).slice(1);
            }
            if (params.constructor != Array) {
                params = [params];
            }
            $.each(params, function (i, n) {
                source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
            });
            return source;
        };

    }

    function alertstr(container,msg)
    {
        var s='<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>警告!</strong><span class="pcontent">'+msg+'</span></div>';
        $(container).prepend(s);
        setTimeout(function(){$(".alert").alert("close");},2000);
    }

    //JSON日期格式化
    function jsonDateFormat (jsonDate) {
        //json日期格式转换为正常格式
        try {
            var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var milliseconds = date.getMilliseconds();
            return date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + "." + milliseconds;
        } catch (ex) {
            return "";
        }
    }

    //提示数据
    function post(url,data,callback)
    {
        $.post(url,data,callback);
    }

    //上传文件
    function uploadfile(ele,posturl,callback) {
        var fileObj =ele.files[0]; // 获取文件对象

        var FileController =posturl;                    // 接收上传文件的后台地址
        // FormData 对象
        var form = new FormData();
        form.append("file", fileObj);                           // 文件对象
        // XMLHttpRequest 对象
        var xhr = new XMLHttpRequest();
        xhr.open("post", FileController, true);
        xhr.onload = function (r) {
            //上传完毕
        };

        xhr.onreadystatechange=function(r)
        {
            try
            {
                if(xhr.readyState ==4)
                {
                    if((xhr.status >= 200 && xhr.status <300) || xhr.status == 304)
                    {

                        var d = window.JSON.parse(xhr.responseText);
                        callback(d.url);
                    }
                    else
                    {
                        alert("上传失败:" + xhr.status);
                    }
                }
            }
            catch (ex)
            { // 假设ontimeout事件处理程序处理
            }

        }

        xhr.send(form);
    }
    //返回对象
    return {
        init : init,
        alert:alertstr,
        post:post,
        jsonDateFormat:jsonDateFormat,
        uploadfile:uploadfile
    };
});