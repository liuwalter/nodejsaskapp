/**
 * Created by liujiang on 15/7/2.
 */
var express = require('express');
var util = require('util');
var router = express.Router();

var loghelper=require('../mdb/common/loghelper');
var QaChannelBO= require('../mdb/bll/qachannelbo');
var bo=new QaChannelBO();


//后台问题列表管理
router.get('/', function(req, res, next){
    res.render('questionlist', { title: '管理中心-勺光,有光就有希望［问题列表管理］'});
});

/*新增，修改，删除*/
router.post('/',function(req,res,next) {

    action[req.query.action](req, res, next);
});
var action = {


};



module.exports = router;