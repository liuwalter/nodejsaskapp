/**
 * Created by liujiang on 15/7/4.
 */
//引和数据访问层
var UserDAO=require('../dal/userdao');

//引用用户模型
var UserTO=require('../model/userto');

//写义bo
function UserBO()
{

}
//查找用户根据用户名
UserBO.prototype.findUserByUserName=function(username,callback)
{
         console.log('调用dao');
         console.log(username);
        //创建一个dao
         var dao=new UserDAO();
         //查找一个用户
         dao.findUserByUserName(username,callback);
}
//根据用户昵称查找用户是否存在
UserBO.prototype.findUserByNickName=function(nickname,callback)
{
    console.log('调用dao');
    //创建一个dao
    var dao=new UserDAO();
    //查找一个用户
    dao.findUserByNickName(nickname,callback);
}
//新增用户
UserBO.prototype.insert=function(user,callback)
{
    console.log('调用dao');
    //创建一个dao
    var dao=new UserDAO();
    //查找一个用户
    dao.insert(user,callback);
}
module.exports=UserBO;