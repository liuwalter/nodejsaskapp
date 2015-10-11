/**
 * Created by liujiang on 15/8/6.
 */
define(['base'], function(base){

    //初始化
    function init()
    {
        //保存数据
        $("#btnsave").on("click",function(){
            var name=$("#name").val().trim();

            if(name.length==0)
            {
                base.alert(".row","标签名不能为空");
                return;
            }

            var btn = $(this).button('loading');
            var url="/admin/tags?action=add";
            if(typeof(window.CurrentRowData)!="undefined"&&typeof(window.CurrentRowData._id)!="undefined"&&window.CurrentRowData._id.length>0)
            {
                url="/admin/tags?action=update";
            }
            else
            {
                window.CurrentRowData={};
            }
            window.CurrentRowData.tagname=name;
            //保存数据
            base.post("/admin/tags?action=save",window.CurrentRowData,function (r) {

                btn.button('reset');
                if(!r.status)
                {
                    base.alert(".row",r.message);
                }
                else{
                    window.CurrentRowData={};
                    $('#modal').modal('toggle');
                    //刷新列表
                    $('.data-table').bootstrapTable('refresh', {});
                }
            });
        });


    }

    //返回对象
    return {
        init : init
    };
});
