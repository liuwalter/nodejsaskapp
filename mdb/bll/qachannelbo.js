/**
 * Created by liujiang on 15/7/5.
 */
//引和数据访问层
var QaChannelDAO=require('../dal/qachanneldao');

//引用问题分类
var QaChannelTO=require('../model/qachannelto');

//写义bo
function QaChannelBO()
{

}

//新增分类
QaChannelBO.prototype.insert=function(entity,callback)
{
    //创建一个dao
    var dao=new QaChannelDAO();

    //创建一个分类
    dao.insert(entity,callback);
}
//修改
QaChannelBO.prototype.update=function(entity,callback)
{
    //创建一个dao
    var dao=new QaChannelDAO();
    dao.update(entity,callback);
}
//删除
QaChannelBO.prototype.delete=function(ids,callback)
{
    var dao=new QaChannelDAO();
    dao.delete(ids,callback);
}
//状态改变
QaChannelBO.prototype.status=function(ids,status,callback)
{
    //创建一个dao
    var dao=new QaChannelDAO();
    dao.status(ids,status,callback);
}
//分页获取问题分类
QaChannelBO.prototype.findPagination=function(obj,callback)
{
    //创建一个dao
    var dao=new QaChannelDAO();
    //获取所有可用通道
    dao.findPagination(obj,callback);
}

//获取所有可用通道
QaChannelBO.prototype.getenablelist=function(callback)
{
    console.log('调用dao');
    //创建一个dao
    var dao=new QaChannelDAO();
    //获取所有可用通道
    dao.getenablelist(callback);
}
module.exports=QaChannelBO;
