/**
 * Created by liujiang on 15/7/5.
 */
//引用标签数据访问层
var TagDAO=require('../dal/tagdao');

//引用标签
var TagTO=require('../model/tagto');

//写义bo
function TagBO()
{

}

//新增标签
TagBO.prototype.insert=function(entity,callback)
{
    //创建一个dao
    var dao=new TagDAO();
    //创建一个标签
    dao.insert(entity,callback);
}
//修改
TagBO.prototype.update=function(entity,callback)
{
    //创建一个dao
    var dao=new TagDAO();
    dao.update(entity,callback);
}
//删除
TagBO.prototype.delete=function(ids,callback)
{

    //创建一个dao
    var dao=new TagDAO();
    dao.delete(ids,callback);
}
//状态改变
TagBO.prototype.status=function(ids,status,callback)
{
    //创建一个dao
    var dao=new TagDAO();
    dao.status(ids,status,callback);
}
//分页获取标签
TagBO.prototype.findPagination=function(obj,callback)
{
    //创建一个dao
    var dao=new TagDAO();
    //获取所有可用标签
    dao.findPagination(obj,callback);
}

//获取所有可用标签
TagBO.prototype.getenablelist=function(callback)
{

    //创建一个dao
    var dao=new TagDAO();
    //获取所有可用标签
    dao.getenablelist(callback);
}
module.exports=TagBO;
