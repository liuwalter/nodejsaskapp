/**
 * Created by liujiang on 15/7/5.
 */
//文章DAO
var ArctileTO=require('../model/articleto');
//写义DAO
function ArctileDAO()
{

}
//状态变更
ArctileDAO.prototype.status=function(ids,status,callback) {
    var p = ids.split(",");
    ArctileTO.update({"_id":{$in:p}},{$set:{status:status}},{ multi: true }, function(error){
        if(error) {
            callback(error);
        } else {
            callback(p.length);
        }});
}
//删除
ArctileDAO.prototype.delete=function(ids,callback)
{
    var p=ids.split(",");
    ArctileTO.update({"_id":{$in:p}},{$set:{status:-1}},{ multi: true }, function(error){
        if(error) {
            callback(error);
        } else {
            callback(p.length);
        }});
}
//新增文章
ArctileDAO.prototype.insert=function(entity,callback)
{
    ArctileTO.findOne({title:entity.title},function(error,doc){
        if(error==null && doc==null) {
            //文章状态
            entity.status=1;
            new ArctileTO(entity).save(callback);
        }
        else if(error!=null)
        {
            callback(error);
        }
        else {
            //文章重复了
            callback(new Error("文章重复了!"));
        }

    });

}

//修改文章
ArctileDAO.prototype.update=function(entity,callback)
{
    ArctileTO.findOne({title:entity.title,"_id":{$ne:entity._id}},function(error,doc){
        if(error==null && doc==null) {

            //修改文章
            ArctileTO.update({'_id':entity._id}, {'$set':entity },function(error){
                callback(error);
            });

        }
        else if(error!=null)
        {
            callback(error);
        }
        else {
            //文章重复了
            callback(new Error("文章重复了!"));
        }

    });

}

//获取可用文章
ArctileDAO.prototype.getenablelist=function(callback)
{
    ArctileTO.find({status:1},function(error,doc){
        if(error==null)
        {
            doc.sort(function(a,b){return b.sortnum- a.sortnum;})

        }
        callback(error,doc);
    });
}


//查找一篇文章
ArctileDAO.prototype.findOne=function(id,callback)
{
    ArctileTO.findOne({_id:id},function(error,doc){
        callback(error,doc);
    });
}

//分页获取文章列表
ArctileDAO.prototype.findPagination=function(obj,callback)
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
    var query = ArctileTO.find(q,col).sort(oj).skip(skipFrom).limit(resultsPerPage)
        .populate([{path: 'tags', select: { tagname: 1,browsercount:1 }, options: {sort: { sortnum: -1 }}},
            {path: 'channel', select: { channelname: 1,browsercount:1 }, options: {sort: { sortnum: -1 }}}
        ])//('tags', 'tagname',null, {sort: { sortnum: -1 }})
        .exec(function(error, results) {

            if (error) {
                callback(error, null, null);
            } else {
                ArctileTO.count(q, function(error, count) {
                    if (error) {
                        callback(error, null, null);
                    } else {
                        //var pageCount = Math.ceil(count / resultsPerPage);
                        callback(null, count, results);
                    }
                });
            }

        });

   /* query.exec(function(error, results) {

    });*/

}
module.exports=ArctileDAO;