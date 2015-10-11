var express = require('express');
var router = express.Router();
//异步处理
var async = require('async');

var loghelper=require('../mdb/common/loghelper');
var common=require('../mdb/common/common');
var QaChannelBO= require('../mdb/bll/qachannelbo');
var bo=new QaChannelBO();

//创建用户bo
var UserBO= require('../mdb/bll/userbo');
var userbo=new UserBO();


var http = require('http');
var url  = require('url');
var request = require('request');
var fs = require('fs');
var BufferHelper = require('bufferhelper')

/* GET home page. */
router.get('/', function(req, res, next) {

    //加载问题通道和所有问题列表
    async.series([bo.getenablelist],function(error,docs){
        console.log(docs);
        if(error!=null)
        {
            loghelper.error(util.inspect(error));
        }
        console.log(req.session.user);
        res.render('index', { title: '勺光,有光就有希望',channels:docs[0],user:req.session.user});
    });
});


router.get('/index', function(req, res, next) {
    //加载问题通道
    //调用bo
    async.series([bo.getenablelist],function(error,docs){
        if(error!=null)
        {
            loghelper.error(util.inspect(error));
        }
        res.render('index', { title: '勺光,有光就有希望',channels:docs[0],user:req.session.user});
    });
});

//用户注册验证,检查邮箱是否已被注册
router.get('/mem/ckemail', function(req, res, next) {

    //查找昵称是否存在
    userbo.findUserByUserName(req.query.semail,function(error,doc){
        if(error!=null)
        {
            loghelper.error(util.inspect(error));
        }
        res.send({valid:doc==null});

    });
});
//用户注册验证,检查昵称是否被用过了
router.get('/mem/cknick', function(req, res, next) {

    //查找昵称是否存在
    userbo.findUserByNickName(req.query.nc,function(error,doc){
        if(error!=null)
        {
            loghelper.error(util.inspect(error));
        }
        res.send({valid:doc==null});

    });
});




//访问用户登录页
router.get('/signin', function(req, res, next) {
    //跳转到登录页
    res.render('login',{title:"用户登录"});
});




router.get('/me', function(req, res, next) {

    res.render('me', { title: '你和我'});
});




module.exports = router;
