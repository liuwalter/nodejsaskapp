/**
 * Created by liujiang on 15/8/28.
 */
//引用问题数据访问层
var QaDAO=require('../dal/qadao');

//引用问题模型
var QaTO=require('../model/qato');

//写义bo
function QaBO()
{

}

//新增问题
QaBO.prototype.insert=function(entity,callback)
{
    //创建一个dao
    var dao=new QaDAO();
    //创建一个问题
    dao.insert(entity,callback);
}
//修改
QaBO.prototype.update=function(entity,callback)
{
    //创建一个dao
    var dao=new QaDAO();
    dao.update(entity,callback);
}
//删除
QaBO.prototype.delete=function(ids,callback)
{

    //创建一个dao
    var dao=new QaDAO();
    dao.delete(ids,callback);
}
//状态改变
QaBO.prototype.status=function(ids,status,callback)
{
    //创建一个dao
    var dao=new QaDAO();
    dao.status(ids,status,callback);
}
//分页获取问题
QaBO.prototype.findPagination=function(obj,callback)
{
    //创建一个dao
    var dao=new QaDAO();
    //获取所有可用问题
    dao.findPagination(obj,callback);
}

//获取所有可用问题
QaBO.prototype.getenablelist=function(callback)
{

    //创建一个dao
    var dao=new QaDAO();
    //获取所有可用问题
    dao.getenablelist(callback);
}

//查找一篇问题
QaBO.prototype.findOne=function(id,callback)
{

    //创建一个dao
    var dao=new QaDAO();
    //查找一篇问题
    dao.findOne(id,callback);
}
module.exports=QaBO;
