/**
 * Created by liujiang on 15/7/2.
 */
var express = require('express');
var util = require('util');
var router = express.Router();

var loghelper=require('../mdb/common/loghelper');
var TagBO= require('../mdb/bll/tagbo');
var bo=new TagBO();

//公共信息
var common=require('../mdb/common/common');
//工具类
var utiltools=require('../mdb/common/utiltools');


//后台标签列表管理
router.get('/', function(req, res, next){
    res.render('tags', { title: '管理中心-勺光,有光就有希望［标签列表管理］'});
});
router.get('/detail', function(req, res, next){

    res.render('tagsdetail', { title: '管理中心-勺光,有光就有希望［标签管理］'});
});

/*新增，修改，删除*/
router.post('/',function(req,res,next) {

    action[req.query.action](req, res, next);
});
var action = {
    //保存
    save:function(req, res, next)
    {
        if(typeof(req.body._id)!="undefined" &&req.body._id.length>0 )
        {
            //保存
            bo.update(
                {tagname:req.body.tagname,_id:req.body._id},function(error){
                    if(error!=null)
                    {
                        loghelper.error(util.inspect(error));
                        res.send({status: false, message: common.tip.OperatorError});
                    }
                    else{
                        res.send({status:true});
                    }
                });
        }
        else{

            var tagname=req.body.tagname;
            bo.insert({
                tagname:tagname,
                createdate:new Date(),
                browsercount:0,
                articlecount:0,
                type:1,
                qacount:0,
                status:true,
                sortnum:0},function(error){
                if (error != null) {
                    loghelper.error(util.inspect(error));
                    res.send({status: false, message: common.tip.OperatorError});
                }
                else {
                    res.send({status: true});
                }
            });
        }


    },
    //删除
    delete:function(req, res, next)
    {
        bo.delete(req.body.ids,function(result){

            if(typeof(result)=="number")
            {
                res.send({status: true});
            }else{
                res.send({status: false, message: common.tip.OperatorError});
            }
        });
    },
    //状态改变
    status:function(req, res, next)
    {
        bo.status(req.body.ids,req.body.status,function(result){
            if(typeof(result)=="number")
            {
                res.send({status: true});
            }else{
                res.send({status: false, message: common.tip.OperatorError});
            }
        });
    }

};


//分页获取数据
router.get('/list', function(req, res, next) {
    //分页获取数据
    console.log(req.query);
    var q = (typeof(req.query.search) == "undefined" || req.query.search == "") ? {} : {tagname: new RegExp(req.query.search)};
    var col = " tagname browsercount qacount articlecount status createdate sortnum";
    var pageNumber = (req.query.offset == 1 ? 0 : (req.query.offset / req.query.limit) + 1);
    var resultsPerPage = req.query.limit || 10;
    var obj = {
        search: q,
        columns: col,
        page: {num: pageNumber, limit: resultsPerPage},
        sort: req.query.sort,
        order: req.query.order
    };
    bo.findPagination(obj, function (error, count, result) {

        if (error == null && result != null) {
            res.send({"total": count, "rows": result});
        }

    });
});



module.exports = router;