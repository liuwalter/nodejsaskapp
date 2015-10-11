/**
 * Created by liujiang on 15/7/4.
 */
var mongoose=require('mongoose');
var config=require('../config');
mongoose.connect(config.db);
module.exports.mongoose=mongoose;

