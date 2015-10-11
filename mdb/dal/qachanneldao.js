/**
 * Created by liujiang on 15/7/5.
 */
//引用问题分类模型
var QaChannelTO=require('../model/qachannelto');
//写义DAO
function QaChannelDAO()
{

}
//状态变更
QaChannelDAO.prototype.status=function(ids,status,callback) {
    var p = ids.split(",");
    QaChannelTO.update({"_id":{$in:p}},{$set:{status:status}},{ multi: true }, function(error){
        if(error) {
            callback(error);
        } else {
            callback(p.length);
        }});
}
//删除
QaChannelDAO.prototype.delete=function(ids,callback)
{
    var p=ids.split(",");
    /*var data=[];
    for(var i=0;i< p.length;i++)
    {
        data.push({'_id':p[i]});
    }*/
    /*QaChannelTO.find({"$or" : data},function(error,doc){
        if(error) {
            callback(error);
        } else {
            console.log(doc);
            doc.remove(callback);
        }

    });*/
    /*批量删除*/
    /*QaChannelTO.remove({"_id":{$in:p}}, function(error){
        if(error) {
            callback(error);
        } else {
            callback(p.length);
        }});*/
    //console.log(p);
    QaChannelTO.update({"_id":{$in:p}},{$set:{status:-1}},{ multi: true }, function(error){
        if(error) {
            callback(error);
        } else {
            callback(p.length);
        }});

    //QaChannelTO.update({"_id":{$in:p}}, { status: -1 }).exec(callback);
}
//通道/问题分类
QaChannelDAO.prototype.insert=function(entity,callback)
{
    QaChannelTO.findOne({channelname:entity.channelname},function(error,doc){
        //console.log(doc);
        //console.log(error);
        if(error==null && doc==null) {
            //新增通道/问题分类
            entity.status=1;
            new QaChannelTO(entity).save(callback);
        }
        else if(error!=null)
        {
            callback(error);
        }
        else {
            //名字重复了
            callback(new Error("问题分类名重复!"));
        }

    });

}

QaChannelDAO.prototype.update=function(entity,callback)
{
    QaChannelTO.findOne({channelname:entity.channelname,"_id":{$ne:entity._id}},function(error,doc){
        console.log(error);
        if(error==null && doc==null) {
            //修改通道/问题分类
            QaChannelTO.update({'_id':entity._id}, {'$set':entity },function(error){
                callback(error);
            });

        }
        else if(error!=null)
        {
            callback(error);
        }
        else {
            //名字重复了
            callback(new Error("问题分类名重复!"));
        }

    });

}

//获取可用通道列表
QaChannelDAO.prototype.getenablelist=function(callback)
{
    QaChannelTO.find({status:1},function(error,doc){
        if(error==null)
        {
            doc.sort(function(a,b){return b.sortnum- a.sortnum;})

        }
        callback(error,doc);
    });
}

//分页获取通道列表
QaChannelDAO.prototype.findPagination=function(obj,callback)
{

    var q=obj.search||{}
    var col=obj.columns;

    var pageNumber=obj.page.num||1;
    if(pageNumber==0)
    {
        pageNumber=1;
    }
    var resultsPerPage=obj.page.limit||10;

    var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;

    var sort=obj.sort||"sortnum";

    var oj = {}; oj[sort] = (obj.order=="desc"?-1:1);
    //获取分页数据
    q.status={ "$ne":-1};//不等于-1是代表未删除的
    var query = QaChannelTO.find(q,col).sort(oj).skip(skipFrom).limit(resultsPerPage);

    query.exec(function(error, results) {
        console.log(results);
        if (error) {
            callback(error, null, null);
        } else {
            QaChannelTO.count(q, function(error, count) {
                if (error) {
                    callback(error, null, null);
                } else {
                    //var pageCount = Math.ceil(count / resultsPerPage);
                    callback(null, count, results);
                }
            });
        }
    });

}
module.exports=QaChannelDAO;