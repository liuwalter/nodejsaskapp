/**
 * Created by liujiang on 15/8/5.
 */
define(['jquery','base','table','tablecn'], function($,common,table){

    //初始化
    function init(){
        //处理基础
        common.init();

        //加载列表
        list();

        //绑定组件事件
        $("button[opt]").on("click",function(){
            switch ($(this).attr("opt"))
            {
                case "delete":

                    var selects = $('#tbchannel').bootstrapTable('getSelections');
                    var ids = $.map(selects, function (row) {
                        return  row._id ;
                    });
                    if (ids.length == 0) {
                        common.alert(".containertop", "请选择要删除的数据!");
                        return;
                    }
                    if(confirm("你确定要删除吗?")) {
                        //开始删除
                        var btn = $(this).button('loading');
                        //保存数据
                        common.post("/admin/channel?action=delete", {ids: ids.join(",")}, function (r) {
                            btn.button('reset');
                            if (!r.status) {
                                common.alert(".containertop", "删除成功!");
                            }
                            else {
                                //刷新列表
                                $('#tbchannel').bootstrapTable('refresh', {});
                            }
                        });
                    }
                    //保存数据
                    break;
                case "update":
                    var selects = $('#tbchannel').bootstrapTable('getSelections');
                    var ids = $.map(selects, function (row) {
                        return  row._id ;
                    });
                    if (ids.length != 1) {
                        common.alert(".containertop", "请选择一条要修改的数据!");
                        return;
                    }
                    $('#modal').off('shown.bs.modal');
                    $('#modal').on('shown.bs.modal', function (e)
                    {
                        $("#txtchannelname").val(selects[0].channelname)
                         UE.getEditor('editor').setContent(selects[0].qadesc);
                         window.CurrentRowData=selects[0];
                    }).modal({"show":true,"remote":"/admin/channel/detail"});

                    break;
                case "status":
                    var selects = $('#tbchannel').bootstrapTable('getSelections');
                    var ids = $.map(selects, function (row) {
                        return  row._id ;
                    });
                    if(ids.length==0)
                    {
                        common.alert(".containertop", "请选择要操作的数据!");
                        return;
                    }
                    //开始操作
                    var btn = $(this).button('loading');
                    common.post("/admin/channel?action=status", {ids: ids.join(","),status:btn.attr("status")}, function (r) {
                        btn.button('reset');
                        if (!r.status) {
                            common.alert(".containertop", "操作成功!");
                        }
                        else {
                            //刷新列表
                            $('#tbchannel').bootstrapTable('refresh', {});
                        }
                    });
                    break;
            }
        });


    }
    //列表
    function list() {
        //$('#tbchannel').bootstrapTable('destroy').bootstrapTable();

        //
        $('#tbchannel').bootstrapTable('destroy').bootstrapTable({
            classes:"table table-hover",
            method: 'get',
            url: '/admin/channel/list',
            cache: false,
            //height: 430,
            striped: true,
            pagination: true,
            pageSize: 5,
            pageList: [5, 10],
            search: true,
            showColumns: true,
            showRefresh: true,
            minimumCountColumns: 2,
            clickToSelect: true,
            columns:[
                    {
                        field: 'state',
                        checkbox: true
                    },
                {
                field: 'channelname',
                title: '分类名',
                align: 'left',
                valign: 'middle',
                sortable: true
                },
                {field:"browsercount",title:"浏览次数",align:"left",valign:"middle",sortable:true},
                {field:"articlecount",title:"文章数量",align:"left",valign:"middle",sortable:true},
                {field:"qacount",title:"问题数量",align:"left",valign:"middle",sortable:true},
                {field:"qadesc",title:"分类描述",align:"left",valign:"middle",sortable:true},
                {field:"sortnum",title:"分类排序",align:"left",valign:"middle",sortable:true},
                {field:"status",title:"状态",align:"left",valign:"middle",sortable:true,formatter: function(value, row){
                    if (value == 1) {
                        return '<span class="badge  badge-success">可用</span>';
                    }
                    return '<span class="badge">禁用</span>';
                }},
                {field:"createdate",title:"创建时间",align:"left",valign:"middle",sortable:true,formatter:function(value,row){
                    return new Date(value).format("yyyy-MM-dd hh:mm:ss");
                    /*if (value == null) {
                        return "";
                    }
                    return common.jsonDateFormat(value);*/
                }}]
            });
    }

    //返回对象
    return {
        init : init,
        list:list
    };
});