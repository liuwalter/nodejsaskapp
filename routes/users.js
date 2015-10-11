
var express = require('express');
var util = require('util');
var router = express.Router();


//异步处理
var async = require('async');

var loghelper=require('../mdb/common/loghelper');
//创建用户bo
var UserBO= require('../mdb/bll/userbo');
var bo=new UserBO();

//公共信息
var common=require('../mdb/common/common');
//工具类
var utiltools=require('../mdb/common/utiltools');

/*用户登录页 */
router.get('/login', function(req, res, next) {
  res.render('login', { title: '用户登录' });
});

/*用户登出*/
router.get('/logout',function(req,res,next){

  req.session.destroy(function () {
    res.send({status:true});
  });
});

/*用户登录接口*/
router.post('/login',function(req,res,next){
    //获取用户名
    var username=req.body.lemail;
    var password=req.body.pwd;

    console.log("调用bo");
    //查找这个用户是否存在
    bo.findUserByUserName(username,function(error,resultUser){

      console.log(resultUser);
      if(error==null && resultUser!=null)
      {
        //检密码是否存确，如果正确登录成功
        if(resultUser.password==utiltools.md5(password))
        {

            req.session.regenerate(function(){
            req.session.user = {"username":resultUser.username,
              "nickname":resultUser.nickname};
            req.session.success = '授权者: ' + resultUser.username;
              //登录成功
              res.send({
                status:true,message:common.tip.LoginSuccess});
          });


        }
        else
        {
          //登录失败，密码错误
          res.send({status:false,message:common.tip.PasswordError});
        }
      }
      //如果没有查到数据则新增一条
      else if(error==null && resultUser==null)
      {

        res.send({status:false,message:common.tip.LoginNotExists});
      }
      else
      {
        //登录错误,需要联系管理员,这里需要记录日志
        consol.log(error);
        res.send({status:false,message:common.tip.SysDBError});
      }

    });

});

/**
 * 用户注册接口
 * */
router.post('/reg',function(req,res,next) {
  //用户名
  var username = req.body.semail;
  //密码
  var password = utiltools.md5(req.body.pwd);
  //昵称
  var nc = req.body.nc;
  //同时检查用户名和昵称是否有效
  var a = function (callback) {
    bo.findUserByUserName(username, callback);
  };
  var b = function (callback) {
    bo.findUserByNickName(nc, callback);
  };
  //执行两个作务
  console.log("开始执行");
  async.series([a, b], function (error, docs) {
    console.log("执行完毕:" + error);
    if (error != null) {
      loghelper.error(util.inspect(error));
      res.send({status: false, message: common.tip.RegExists});
    }
    else {
      //用户类型为1普通用户 2管理员  3超级管理员
      //开始注册，添加新用户
      bo.insert(
          {
            username: username,
            password: password,
            nickname: nc,
            usertype: 1
          }, function (error) {
            if (error != null) {
              loghelper.error(util.inspect(error));
              res.send({status: false, message: common.tip.RegError});
            }
            else {
              req.session.regenerate(function () {
                req.session.user = {
                  "username": username,
                  "nickname": nc
                };
                req.session.success = '授权者: ' + username;
                //登录成功
                res.send({status: true});


              });
            }
          });

    }

  });
});

module.exports = router;
