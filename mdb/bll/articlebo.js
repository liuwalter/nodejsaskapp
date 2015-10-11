/**
 * Created by liujiang on 15/7/5.
 */
//引用文章数据访问层
var ArticleDAO=require('../dal/articledao');

//引用文章
var ArticleTO=require('../model/articleto');

//写义bo
function ArticleBO()
{

}

//新增文章
ArticleBO.prototype.insert=function(entity,callback)
{
    //创建一个dao
    var dao=new ArticleDAO();
    //创建一个文章
    dao.insert(entity,callback);
}
//修改
ArticleBO.prototype.update=function(entity,callback)
{
    //创建一个dao
    var dao=new ArticleDAO();
    dao.update(entity,callback);
}
//删除
ArticleBO.prototype.delete=function(ids,callback)
{

    //创建一个dao
    var dao=new ArticleDAO();
    dao.delete(ids,callback);
}
//状态改变
ArticleBO.prototype.status=function(ids,status,callback)
{
    //创建一个dao
    var dao=new ArticleDAO();
    dao.status(ids,status,callback);
}
//分页获取文章
ArticleBO.prototype.findPagination=function(obj,callback)
{
    //创建一个dao
    var dao=new ArticleDAO();
    //获取所有可用文章
    dao.findPagination(obj,callback);
}

//获取所有可用文章
ArticleBO.prototype.getenablelist=function(callback)
{

    //创建一个dao
    var dao=new ArticleDAO();
    //获取所有可用文章
    dao.getenablelist(callback);
}

//查找一篇文章
ArticleBO.prototype.findOne=function(id,callback)
{

    //创建一个dao
    var dao=new ArticleDAO();
    //查找一篇文章
    dao.findOne(id,callback);
}
module.exports=ArticleBO;
