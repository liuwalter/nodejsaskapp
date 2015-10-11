/**
 * Created by liujiang on 15/8/29.
 */

var common=require('../common/common');
//工具类
var utiltools=require('../common/utiltools');
//写义bo
function WxPay()
{

}

function wxsign(param)
{
    var querystring = Object.keys(param).filter(function(key){
            return param[key] !== undefined && param[key] !== '' && ['sign', 'key'].indexOf(key)<0;
        }).sort().map(function(key){
            return key + '=' + param[key];
        }).join("&") + "&key=" + common.wxpayconfig.key;
   console.log(querystring);
    return utiltools.md5(querystring).toUpperCase();
}

//创建支付链接
WxPay.prototype.getpayurl=function(orderinfo)
{

    var params={};
    //设置支付参数
    params["attach"]="";				                       //附件数据，原样返回就可以了
    params["partner"]=common.wxpayconfig.partner;
    params["out_trade_no"]='201509060325085936';//new Date().format("yyyyMMddhhmmss");//orderinfo.out_trade_no;201509060230047229
    params["return_url"]=common.wxpayconfig.return_url;
    params["notify_url"]=common.wxpayconfig.notify_url;
    params["body"]="微信支付测试";//orderinfo.product_name;
    params["bank_type"]="WX";		                            //银行类型

    //用户ip
    params["spbill_create_ip"]="127.0.0.1";                     //orderinfo.clientip;//客户端IP
    params["fee_type"]= "1";                                    //币种

    //系统可选参数
    params["sign_type"]="MD5";			                        //签名方式，默认为MD5，可选RSA
    params["service_version"]="1.0";			                //接口版本号
    params["input_charset"]=	"UTF-8";		                //字符集UTF-8,GBK
    params["sign_key_index"]="1";			                    //密钥序号

    params["buyer_id"]="";                                      //买方财付通帐号
    params["time_expire"]="";                                   //订单失效时间
    params["time_start"]='20150906032618'; //new Date().format("yyyyMMddhhmmss");	//订单生成时间
    params["total_fee"]=orderinfo.total_fee;                //总金额
    params["transport_fee"]="0";			                    //物流费用
    params["product_fee"]= "";				                    //商品费用
    params["goods_tag"]=	"";				                    //商品标记
                                                                //console.log(Object.keys(params).sort());
    params["sign"] = wxsign(params);                            //参数签名
    var query = Object.keys(params).sort().map(function(key){
        return key + '=' + encodeURIComponent(params[key]);
    }).join("&");
    //请求的URL

    var reqUrl = common.wxpayconfig.gateurl+"?"+query;
    return reqUrl;
}
module.exports=WxPay;
