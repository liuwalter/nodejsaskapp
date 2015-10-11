/**
 * Created by liujiang on 15/8/5.
 */
require.config({
    shim: {
        'bootstrap': ['jquery'],
        'table': ['jquery'],
        'tablecn': ['jquery','table'],
        'ueditorconfig':['jquery'],
        'ueditor':['jquery','ueditorconfig','zeroClipboard'],
        'ueditorzh-cn':['jquery','ueditorconfig','ueditor'],
        'select2': ['jquery'],
    },
    paths: {
        "jquery": "../lib/jquery.min",
        "bootstrap": "../lib/bootstrap.min",
        "table": "../lib/bootstrap-table",
        'tablecn':"../lib/bootstrap-table-zh-CN",
        'ueditorconfig':"/ueditor/ueditor.config",
        'ueditor':"/ueditor/ueditor.all",
        'ueditorzh-cn':"/ueditor/lang/zh-cn/zh-cn",
        'zeroClipboard':"/ueditor/third-party/zeroclipboard/ZeroClipboard",
        'select2':"../lib/select2.min",

    }
});
