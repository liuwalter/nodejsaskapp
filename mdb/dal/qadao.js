/**
 * Created by liujiang on 15/8/28.
 */
//问题DAO
var QaTO=require('../model/qato');
//写义DAO
function QaDAO()
{

}
//状态变更
QaDAO.prototype.status=function(ids,status,callback) {
    var p = ids.split(",");
    QaTO.update({"_id":{$in:p}},{$set:{status:status}},{ multi: true }, function(error){
        if(error) {
            callback(error);
        } else {
            callback(p.length);
        }});
}
//删除
QaDAO.prototype.delete=function(ids,callback)
{
    var p=ids.split(",");
    QaTO.update({"_id":{$in:p}},{$set:{status:-1}},{ multi: true }, function(error){
        if(error) {
            callback(error);
        } else {
            callback(p.length);
        }});
}
//新增问题
QaDAO.prototype.insert=function(entity,callback)
{
    new QaTO(entity).save(callback);
}



//获取可用问题
QaDAO.prototype.getenablelist=function(callback)
{
    QaTO.find({status:1},function(error,doc){
        if(error==null)
        {
            doc.sort(function(a,b){return b.sortnum- a.sortnum;})

        }
        callback(error,doc);
    });
}


//查找一个问题
QaDAO.prototype.findOne=function(id,callback)
{
    QaTO.findOne({_id:id},function(error,doc){
        callback(error,doc);
    });
}

//分页获取问题列表
QaDAO.prototype.findPagination=function(obj,callback)
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
    var query = QaTO.find(q,col).sort(oj).skip(skipFrom).limit(resultsPerPage)
        .populate([{path: 'tags', select: { tagname: 1,browsercount:1 }, options: {sort: { sortnum: -1 }}},
            {path: 'channel', select: { channelname: 1,browsercount:1 }, options: {sort: { sortnum: -1 }}}
        ])//('tags', 'tagname',null, {sort: { sortnum: -1 }})
        .exec(function(error, results) {

            if (error) {
                callback(error, null, null);
            } else {
                QaTO.count(q, function(error, count) {
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
module.exports=QaDAO;