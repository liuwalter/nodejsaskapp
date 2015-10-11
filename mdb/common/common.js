/**
 * Created by liujiang on 15/7/4.
 */
Date.prototype.format =function(format)
{
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (this.getFullYear()+"").substr(4- RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length==1? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}
Array.prototype.contains=function(item)
{
   for( var i=0 ;i<this.length;i++)
   {
       if(this[i]==item)
       {
           return true;
       }
   }
    return false;
};
var siteinfo=
{
    title:"勺光,有光就有希望!"
};
var commonTip=
{
  //登录用户名不存在
    LoginNotExists:"用户名不存在!",
    //数据库访问失败
    SysDBError:"系统问题,请联系管理员",
    //系统登录成功
    LoginSuccess:"登录成功",
    //密码错误
    PasswordError:"密码错误!",
    //注册异常
    RegExists:"注册邮箱或昵称已存在!",
    //注册异常
    RegError:" 注册用户异常!",
    //登录异常（session生成出错）
    LgoinError:" 登录异常,请联系管理员!",
    //操作异常
    OperatorError:"操作异常!"
};

//微信支付
var wxpay={
     partner: "1900000109",                                	//商户号
     key:"8934e7d15453e97507ef794cf7b0519d",				//密钥
     return_url:"http://127.0.0.1/payReturnUrl.php",	    //显示支付结果页面,*return_url所在路径
     notify_url:"http://127.0.0.1/payNotifyUrl.php",       //支付完成后的回调处理页面,*替换成notify_url所在路径
     gateurl:"https://gw.tenpay.com/gateway/pay.htm"        //支付网关
}
var common={
    tip:commonTip,
    authorizationcontrollers:['/admin'],
    siteinfo:siteinfo,
    wxpayconfig:wxpay
}

module.exports=common;