/**
 * Created by liujiang on 15/8/6.
 */
define(['base','ueditorconfig','ueditor','ueditorzh-cn','select2'], function(base,config){

    //初始化
    function init()
    {
        UE.delEditor("editor");
        //实例化编辑器
        //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
        var ue = UE.getEditor('editor');
        $("select").select2({
        minimumResultsForSearch: -1,
         placeholder: "请选择..."
        });

        //文件上传
        $("input[type=file]").on("change",function(){
            base.uploadfile(this,"/admin/imgupload",function(url){
                $("#dvpreview img").attr("src",url);
                $("#dvpreview img").attr("data",url);
            });
        });

       // debugger;
        setTimeout(function(){
            //设置数据
            ue.setContent($("#editorcontent").val());
        },1000);



        //保存数据
        $("#btnsave").on("click",function(){
            //获取文章分类
            var articletype=$("#articletype").select2("val");
            var title=$("#title").val().trim();
            var summary=$("#summary").val().trim();
            var content=UE.getEditor('editor').getContent().trim();
            var lbls=$("#select1").select2("val");
            var img=$("#dvpreview img").attr("src");
            var id=$("#articleid").val();

            if(articletype.trim().length==0)
            {
                base.alert(".row","分类名不能为空!");
                return;
            }
            if(title.length==0)
            {
                base.alert(".row","文章标题不能为空!");
                return;
            }
            if(summary.length==0)
            {
                base.alert(".row","文章摘要不能为空!");
                return;
            }
            if(content.length==0)
            {
                base.alert(".row","请输入文章内容!");
                return;
            }
            if(lbls==null || lbls.length==0)
            {
                base.alert(".row","请选择标签!");
                return;
            }

            var btn = $(this).button('loading');

            //保存数据
            base.post("/admin/article?action=save",
                {
                    articletype:articletype,
                    title:title,
                    summary:summary,
                    content:content,
                    lbls:lbls.join(","),
                    img:img,
                    _id:id
                },function (r)
                {
                    btn.button('reset');
                    if(!r.status)
                    {
                        base.alert(".row",r.message);
                    }
                    else
                    {
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
