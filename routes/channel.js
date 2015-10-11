/**
 * Created by liujiang on 15/7/2.
 */
var express = require('express');
var util = require('util');
var router = express.Router();

var loghelper=require('../mdb/common/loghelper');
var QaChannelBO= require('../mdb/bll/qachannelbo');
var bo=new QaChannelBO();

//公共信息
var common=require('../mdb/common/common');
//工具类
var utiltools=require('../mdb/common/utiltools');


//问题分类的操作
var action = {
    //保存
    save:function(req, res, next)
    {
        if(typeof(req.body._id)!="undefined" &&req.body._id.length>0 )
        {
            //保存
            bo.update(
                {
                    qadesc:req.body.qadesc,
                    channelname:req.body.channelname,_id:req.body._id},function(error){
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

            var qachannelname=req.body.channelname;
            var qadesc=req.body.qadesc;
            bo.insert({
                qadesc:qadesc,
                channelname:qachannelname,
                createdate:new Date(),
                browsercount:0,
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


//后台分类管理
router.get('/', function(req, res, next){

    res.render('adminchannel', { title: '管理中心-勺光,有光就有希望［分类管理］'});
});
router.get('/detail', function(req, res, next){

    res.render('channeldetail', { title: '管理中心-勺光,有光就有希望［分类管理］'});
});

//分页获取数据
router.get('/list', function(req, res, next){
    //分页获取数据
    console.log(req.query);
    var q=(typeof(req.query.search)=="undefined"|| req.query.search=="")?{}:{channelname:new RegExp(req.query.search)};
    var col=" channelname browsercount articlecount qacount qadesc status createdate sortnum";
    var pageNumber=(req.query.offset==1?0:(req.query.offset/req.query.limit)+1);
    var resultsPerPage=req.query.limit||10;
    var obj={search:q,columns:col,page:{num:pageNumber,limit:resultsPerPage},sort:req.query.sort,order:req.query.order};
    bo.findPagination(obj,function(error,count,result){

        if(error==null && result!=null)
        {
            res.send({"total": count,"rows":result});
        }

    });

    //初始化一些数据进库
    /*var entitys=[{
     channelname: "前端基础",
     browsercount:'2387987',
        articlecount:'5454',
     qacount:"30903",
     qadesc:"三大基础:html(骨架),css(皮),js(肌肉)",
     status:1,
     createdate:new Date(),
     sortnum:10
     },{
     channelname: "HTML5,CSS3,JS",
     browsercount:'356987',
        articlecount:'5454',
     qacount:"60098",
     qadesc:"响应式前端,Webapp,微网站基础",
     status:true,
     createdate:new Date(),
     sortnum:9
     },{
     channelname: "移动应用,Webapp",
     browsercount:'5787464',
        articlecount:'5454',
     qacount:"46453",
     qadesc:"混合式,非混合,微信开发及Webapp",
     status:1,
     createdate:new Date(),
     sortnum:8
     },{
     channelname: "HTML5游戏开发",
     browsercount:'87987',
        articlecount:'5454',
     qacount:"8435",
     qadesc:"Canvas,Websocket,特效算法",
     status:true,
     createdate:new Date(),
     sortnum:7
     },{
     channelname: "ios原生开发",
     browsercount:'27987',
        articlecount:'5454',
     qacount:"4678",
     qadesc:"网络,json,组件应用,动画效果",
     status:1,
     createdate:new Date(),
     sortnum:6
     },{
     channelname: "Android原生开发",
     browsercount:'43225',
        articlecount:'5454',
     qacount:"30093",
     qadesc:"Activity,自定义组件,http请求,JSON,动画效果",
     status:1,
     createdate:new Date(),
     sortnum:5
     }];
     for(var i=0;i<entitys.length;i++)
     {
     var entity=entitys[i];
     bo.insert(entity,function(error){
     //打印错误
     if(error!=null) {
     loghelper.error(util.inspect(error));
     console.log("错误了呢:" + error);
     }
     else
     {
     console.log("新增问题分类成功!");
     }
     });
     }*/

});

/*新增，修改，删除*/
router.post('/',function(req,res,next) {

    action[req.query.action](req, res, next);
});
module.exports = router;