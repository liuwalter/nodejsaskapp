/**
 * Created by liujiang on 15/7/4.
 */
var log = require('fsr-logger').create_logger({filename: './log/activity.log', frequency: '12h', verbose: false,date_format: "YYYY-MM-DD"});
var error = require('fsr-logger').create_logger({filename: './log/error.log', frequency: '12h', verbose: false,date_format: "YYYY-MM-DD"});
var loghelper=
{
    info:function(msg){
        //如果是开发环境就写info日志
        if(process.env.NODE_ENV=='development') {
            log(msg);
        }
    },
    error:function(e)
    {
        error(e);
    }
};
module.exports=loghelper;

