/**
 * Created by liujiang on 15/7/4.
 */
//引用用户模型
var UserTO=require('../model/userto');
//写义DAO
function UserDAO()
{

}
//查找用户根据用户名
UserDAO.prototype.findUserByUserName=function(username,callback)
{
    console.log("dao被调用");
    //查找一个用户
    UserTO.findOne({"username":username}, callback);
}

//根据用户昵称查找用户是否存在
UserDAO.prototype.findUserByNickName=function(nickname,callback)
{
    console.log("dao被调用");
    //查找一个用户
    UserTO.findOne({"nickname":nickname}, callback);
}

//新增用户
UserDAO.prototype.insert=function(user,callback)
{
    console.log('调用dao');
    console.log("dao被调用");
    //新增一个用户
    new UserTO(user).save(callback);
}
module.exports=UserDAO;