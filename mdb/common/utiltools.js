/**
 * Created by liujiang on 15/7/6.
 */
var crypto = require('crypto');
var tools=
{
    md5:function(data)
    {
        return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
    }
};

module.exports=tools;