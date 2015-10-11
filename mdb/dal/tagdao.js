/**
 * Created by liujiang on 15/7/5.
 */
//标签
var TagTO=require('../model/tagto');
//写义DAO
function TagDAO()
{

}
//状态变更
TagDAO.prototype.status=function(ids,status,callback) {
    var p = ids.split(",");
    TagTO.update({"_id":{$in:p}},{$set:{status:status}},{ multi: true }, function(error){
        if(error) {
            callback(error);
        } else {
            callback(p.length);
        }});
}
//删除
TagDAO.prototype.delete=function(ids,callback)
{
    var p=ids.split(",");
    TagTO.update({"_id":{$in:p}},{$set:{status:-1}},{ multi: true }, function(error){
        if(error) {
            callback(error);
        } else {
            callback(p.length);
        }});
}
//标签
TagDAO.prototype.insert=function(entity,callback)
{
    TagTO.findOne({tagname:entity.tagname},function(error,doc){
        if(error==null && doc==null) {
            //新增通道/问题分类
            entity.status=1;
            new TagTO(entity).save(callback);
        }
        else if(error!=null)
        {
            callback(error);
        }
        else {
            //名字重复了
            callback(new Error("标签重复了!"));
        }

    });

}

//标签
TagDAO.prototype.update=function(entity,callback)
{
    TagTO.findOne({tagname:entity.tagname,"_id":{$ne:entity._id}},function(error,doc){
        console.log(error);
        if(error==null && doc==null) {
            //修改通道/问题分类
            TagTO.update({'_id':entity._id}, {'$set':entity },function(error){
                callback(error);
            });

        }
        else if(error!=null)
        {
            callback(error);
        }
        else {
            //名字重复了
            callback(new Error("标签重复了!"));
        }

    });

}

//获取可用标签列表
TagDAO.prototype.getenablelist=function(callback)
{
    TagTO.find({status:1},function(error,doc){
        if(error==null)
        {
            doc.sort(function(a,b){return b.sortnum- a.sortnum;})

        }
        callback(error,doc);
    });
}

//分页获取标签列表
TagDAO.prototype.findPagination=function(obj,callback)
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
    var query = TagTO.find(q,col).sort(oj).skip(skipFrom).limit(resultsPerPage);

    query.exec(function(error, results) {
        console.log(results);
        if (error) {
            callback(error, null, null);
        } else {
            TagTO.count(q, function(error, count) {
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
module.exports=TagDAO;