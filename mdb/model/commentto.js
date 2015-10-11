/**
 * Created by liujiang on 15/7/5.
 */
/******问题标签/分类*******/
var mongoose=require('../dalbase').mongoose;
var Schema = mongoose.Schema;
//定义评论数据结构
var commentSchema = new Schema({
    replyperon:{type: Schema.Types.ObjectId, ref: 'user'},
    content:String,
    ref:String,
    status:Number,
    level:Number,
    sortnum:Number
});
//  定义了一个新的模型，但是此模式还未和问题集合有关联
module.exports= mongoose.model('comment', commentSchema);