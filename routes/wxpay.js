/**
 * Created by liujiang on 15/7/7.
 */

var express = require('express');
var router = express.Router();
var util = require('util');

var request = require('request');
var md5 = require('crypto');




// 原生支付回调
router.post('/callback',function(msg, req, res, next){
    // msg: 微信回调发送的数据
    wxpay.useWXCallback(function(msg, req, res, next){
        // msg: 微信回调发送的数据
    });
});

// 支付结果异步通知
router.post('/notify', function(msg, req, res, next){
    wxpay.useWXCallback(function(msg, req, res, next){
        // 处理商户业务逻辑

        // res.success() 向微信返回处理成功信息，res.fail()返回失败信息。
        res.success();
    })
});

var partner	= "1241421902";                                  	//商户号
var key		= "55c776e42d1113f20317defd20150828";					//密钥
var return_url = "http://127.0.0.1:8080/wxpay/callback";			//显示支付结果页面,*替换成payReturnUrl.php所在路径
var notify_url = "http://127.0.0.1:8080/wxpay/notify";              //支付完成后的回调处理页面,*替换成payNotifyUrl.php所在路径
var gateurl="https://gw.tenpay.com/gateway/pay.htm";

function sign(param){

    var querystring = Object.keys(param).filter(function(key){
            return param[key] !== undefined && param[key] !== '' && ['pfx', 'partner_key', 'sign', 'key'].indexOf(key)<0;
        }).sort().map(function(key){
            return key + '=' + param[key];
        }).join("&") + "&key=" + key;

    return md5(querystring).toUpperCase();
}


//请求微信支付
router.post("/payrequest",function(req, res, next){


    /* 获取提交的订单号 */
    var out_trade_no = "DTNUMBER001";
    /* 获取提交的商品名称 */
    var product_name = "问码问题";
    /* 获取提交的商品价格 */
    var order_price = "500";

    var strDate = new Date().toDateString();
    var strTime = new Date().toTimeString();

    /* 商品价格（包含运费），以分为单位 */
    var total_fee = parseInt(100 * order_price);



    var params={};

    //设置支付参数
    //----------------------------------------
    params["partner"]=partner;
    params["out_trade_no"]=out_trade_no;
    params["total_fee"]=total_fee;  //总金额
    params["return_url"]=return_url;
    params["notify_url"]=notify_url;
    params["body"]=product_name;
    params["bank_type"]="WX";		//银行类型
    //用户ip
    params["spbill_create_ip"]=req.connection.remoteAddress;//客户端IP
    params["fee_type"]= "1";               //币种

    //系统可选参数
    params["sign_type"]="MD5";			//签名方式，默认为MD5，可选RSA
    params["service_version"]="1.0";			//接口版本号
    params["input_charset"]=	"UTF-8";			//字符集UTF-8,GBK
    params["sign_key_index"]="1";			//密钥序号

    //业务可选参数
    params["attach"]="";				//附件数据，原样返回就可以了
    params["buyer_id"]="";                //买方财付通帐号
    params["time_start"]= new Date().toLocaleDateString();	//订单生成时间
    params["time_expire"]="";				//订单失效时间
    params["transport_fee"]="0";			//物流费用
    params["product_fee"]= "";				//商品费用
    params["goods_tag"]=	"";				//商品标记

    var querystring = Object.keys(param).filter(function(key){
            return param[key] !== undefined && param[key] !== '' && ['pfx', 'partner', 'sign', 'key'].indexOf(key)<0;
        }).sort().map(function(key){
            return key + '=' + param[key];
        }).join("&");

    //请求的URL
    var reqUrl = gateurl+"?"+querystring;

});


module.exports=router;