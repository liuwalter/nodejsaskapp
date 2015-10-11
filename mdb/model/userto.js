/**
 * Created by liujiang on 15/7/4.
 */
var mongoose=require('../dalbase').mongoose;
var Schema = mongoose.Schema;
    //定义用户数据结构
var userScheMa = new Schema({
    username: String,
    password: String,
    nickname:String,
    //用户类型为1普通用户 2管理员  3超级管理员
    usertype:Number,
});
//  定义了一个新的模型，但是此模式还未和users集合有关联
module.exports= mongoose.model('user', userScheMa);