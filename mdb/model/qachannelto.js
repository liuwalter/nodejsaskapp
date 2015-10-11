/**
 * Created by liujiang on 15/7/5.
 */

/*
*
* var ExampleSchema = new Schema({
 name:String,
 binary:Buffer,
 living:Boolean,
 updated:Date,
 age:Number,
 mixed:Schema.Types.Mixed, //该混合类型等同于nested
 _id:Schema.Types.ObjectId,  //主键
 _fk:Schema.Types.ObjectId,  //外键
 array:[],
 arrOfString:[String],
 arrOfNumber:[Number],
 arrOfDate:[Date],
 arrOfBuffer:[Buffer],
 arrOfBoolean:[Boolean],
 arrOfMixed:[Schema.Types.Mixed],
 arrOfObjectId:[Schema.Types.ObjectId]
 nested:{
 stuff:String,
 }
 });
* */
/******问题通道/分类*******/
var mongoose=require('../dalbase').mongoose;
var Schema = mongoose.Schema;
//定义分类数据结构
var qachannelSchema = new Schema({
    channelname: String,
    browsercount:Number,
    articlecount:Number,
    qacount:Number,
    qadesc:String,
    status:Number,
    createdate:Date,
    sortnum:Number
});
//  定义了一个新的模型，但是此模式还未和问题集合有关联
module.exports= mongoose.model('qachannel', qachannelSchema);