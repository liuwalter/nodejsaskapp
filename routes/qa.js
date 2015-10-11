/**
 * Created by liujiang on 15/7/2.
 */
var express = require('express');
var util = require('util');
var router = express.Router();
//异步处理
var async = require('async');

var loghelper=require('../mdb/common/loghelper');
var common=require('../mdb/common/common');

var QaChannelBO= require('../mdb/bll/qachannelbo');
var bo=new QaChannelBO();

var QaBO= require('../mdb/bll/qabo');
var qabo=new QaBO();

var WxPay= require('../mdb/bll/wxpay');
var wxpaybo=new WxPay();




var http = require('http');
var url  = require('url');
var request = require('request');
var fs = require('fs');
var BufferHelper = require('bufferhelper')



//后台文章列表管理

//问题频道
router.get('/', function(req, res, next) {
    //调用bo
    async.series([bo.getenablelist],function(error,docs){
        if(error!=null)
        {
            loghelper.error(util.inspect(error));
        }
        res.render('qa', { title:common.siteinfo.title,channels:docs[0],user:req.session.user,currentchannel:req.query.channel_id});
    });
});

//发布新问题
router.get('/new', function(req, res, next)
{
  /* if(typeof(req.session.user)=="undefined")
   {
       //去登录页
       res.render('login', { title:common.siteinfo.title});
   }
   else
   {*/
       //去发布问题
       async.series([bo.getenablelist],function(error,docs){
           if(error!=null)
           {
               loghelper.error(util.inspect(error));
           }
           res.render('qanew', { title:common.siteinfo.title,channels:docs[0],user:req.session.user,currentchannel:req.query.channel_id});
       });
  // }
});
router.post('/new', function(req, res, next)
{
    console.log(req.body);

    var data={
        title: req.body.title,
        quoteprice:req.body.money,
        channel:req.body.channel,
        content:req.body.content,
        askvector:"559a65b769e8b9de0af3dc29",//发问题的人
        createdate:new Date(),
        sortnum:0,
        browsecount:87,
        istop:false,
        isnew:true,
        replycount:0,
        lastreplydate:"",
        isessence:false,
        comments: [],
        tags: []
    };
    qabo.insert(data,function(error,doc){
        if (error != null) {
            //获取问题编号(订单号)
            console.log(util.inspect(error));
            loghelper.error(util.inspect(error));
            res.send({status: false, message: common.tip.OperatorError});
        }
        else
        {
            var orderid=doc._id;
            var orderinfo={
                out_trade_no:orderid,
                total_fee:parseInt(data.quoteprice),
                product_name:data.title
            }
            //获取gateurl
           var gateurl= wxpaybo.getpayurl(orderinfo);
            console.log(gateurl);

            res.send({status: true,gateurl:gateurl});
        }
    });

});



module.exports = router;