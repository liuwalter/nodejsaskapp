/**
 * Created by liujiang on 15/7/5.
 */
/******问题标签/分类*******/
var mongoose=require('../dalbase').mongoose;
var Schema = mongoose.Schema;
//定义标签数据结构
var tagSchema = new Schema({
    tagname: String,
    browsercount:Number,
    qacount:Number,
    articlecount:Number,
    status:Number,
    type:Number,
    createdate:Date,
    sortnum:Number
});
//  定义了一个新的模型，但是此模式还未和问题集合有关联
module.exports= mongoose.model('tag', tagSchema);