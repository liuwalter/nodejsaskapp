/**
 * Created by liujiang on 15/8/28.
 */
var mongoose=require('../dalbase').mongoose;
var Schema = mongoose.Schema;
//定义问题
var qaSchema = new Schema({
    title: String,
    quoteprice:Number,
    channel:{ type: Schema.Types.ObjectId, ref: 'qachannel' },
    content:String,
    askvector:{ type: Schema.Types.ObjectId, ref: 'user' },//发问题
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
module.exports= mongoose.model('qa', qaSchema);