/**
 * Created by liujiang on 15/7/2.
 */
var express = require('express');
var util = require('util');
var router = express.Router();

var loghelper=require('../mdb/common/loghelper');
var ArticleBO= require('../mdb/bll/articlebo');
var bo=new ArticleBO();

var QaChannelBO= require('../mdb/bll/qachannelbo');
var channelbo=new QaChannelBO();

var TagBO= require('../mdb/bll/tagbo');
var tagbo=new TagBO();

//公共信息
var common=require('../mdb/common/common');
//工具类
var utiltools=require('../mdb/common/utiltools');

//异步处理
var async = require('async');

//后台文章列表管理
var action = {
    //保存
    save:function(req, res, next)
    {

        if(typeof(req.body._id)!="undefined" &&req.body._id.length>0 )
        {
            var data={
                title: req.body.title,
                summary:req.body.summary,
                content:req.body.content,
                author:req.session.user!=null?req.session.user.nickname:"admin",
                mainimage:req.body.img,
                channel:req.body.articletype,
                tags:req.body.lbls.split(","),
                _id:req.body._id
            }

            //保存
            bo.update(
                data,function(error){

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
        else
        {

            var data={
                title: req.body.title,
                summary:req.body.summary,
                content:req.body.content,
                author:req.session.user.nickname,
                mainimage:req.body.img,
                url:"",
                status:1,
                channel:req.body.articletype,
                createdate:new Date(),
                sortnum:0,
                browsecount:0,
                istop:false,
                isnew:false,
                replycount:0,
                lastreplydate:null,
                isessence:false,
                tags:req.body.lbls.split(","),
                comments:[]
            };
            bo.insert(data,function(error){
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


//后台文章列表管理
router.get('/', function(req, res, next){

    res.render('articlelist', { title: '管理中心-勺光,有光就有希望［文章管理］'});
});
router.get('/detail', function(req, res, next){
    var fn=[];
    if(req.query.id)
    {
        fn=[channelbo.getenablelist,tagbo.getenablelist,function(callback){bo.findOne(req.query.id,callback);}];
    }
    else
    {
        fn=[channelbo.getenablelist,tagbo.getenablelist]
    }

    //获取分类和标签
    async.series(fn,function(error,docs){
        if(error!=null)
        {
            loghelper.error(util.inspect(error));
        }
        var article=docs.length>2?docs[2]:null;
        if(article!=null)
        {
            var v=[];
            for(var i=0;i<article.tags.length;i++)
            {

                v.push(article.tags[i]+"")

            }
            article.tags=v;
        }


        res.render('articledetail', { title: '管理中心-勺光,有光就有希望［文章管理］',channels:docs[0],tags:docs[1],article:article});
    });

});


//分页获取数据
router.get('/list', function(req, res, next){
    //分页获取数据
    var q=(typeof(req.query.search)=="undefined"|| req.query.search=="")?{}:{title:new RegExp(req.query.search)};
    var col="title summary" +
        " content  author  mainimage  url  status channel" +
        " createdate  sortnum browsecount istop" +
        "  isnew  replycount  lastreplydate  isessence tags comments";

    var pageNumber=(req.query.offset==1?0:(req.query.offset/req.query.limit)+1);
    var resultsPerPage=req.query.limit||10;
    var obj={search:q,columns:col,page:{num:pageNumber,limit:resultsPerPage},sort:req.query.sort,order:req.query.order};
    bo.findPagination(obj,function(error,count,result)
    {
        if(error==null && result!=null)
        {
            res.send({"total": count,"rows":result});
        }

    });

});

/*新增，修改，删除*/
router.post('/',function(req,res,next) {

    action[req.query.action](req, res, next);
});

module.exports = router;