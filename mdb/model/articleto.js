/**
 * Created by liujiang on 15/7/5.
 */
/******问题标签/分类*******/
var mongoose=require('../dalbase').mongoose;
var Schema = mongoose.Schema;


//定义文章数据结构
var articleSchema = new Schema({
    title: String,
    summary:String,
    content:String,
    author:String,
    mainimage:String,
    url:String,
    status:Number,
    channel:{ type: Schema.Types.ObjectId, ref: 'qachannel' },
    createdate:Date,
    sortnum:Number,
    browsecount:Number,
    istop:Boolean,
    isnew:Boolean,
    replycount:Number,
    lastreplydate:Date,
    isessence:Boolean,
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'tag' }]
});
//  定义了一个新的模型，但是此模式还未和问题集合有关联
module.exports= mongoose.model('article', articleSchema);