/**
 * Created by liujiang on 15/7/7.
 */

var common=require('../common/common');

//创建用户bo
var UserBO= require('./userbo');
var bo=new UserBO();



var filter=function(req, res, next) {
    console.log("进入拦截器...");
     var url = req.originalUrl;
     var err=null;
    if (common.authorizationcontrollers.contains(url) &&req.session && typeof(req.session.user)=='undefined') {
        res.send("未授权的访问!");
    }
    else if(req.session && typeof(req.session.user)!='undefined')
    {
            var to=req.session.user;
            //如果用户是超级管理员
            /*
                if(to.usertype!=3 && url.indexOf("/admin")>=0)
                {
                     err        = new Error('无权访问!');
                     err.status = 403;
                     next(err);
                }
                else
                {
                }
            */

            next();

    }
    else{
        next();
    }




}
module.exports=filter;