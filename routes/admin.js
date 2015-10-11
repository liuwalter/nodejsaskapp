/**
 * Created by liujiang on 15/7/7.
 */

var express = require('express');
var router = express.Router();
var util = require('util');


//异步处理
var async = require('async');

//文件操作
var fs = require('fs');
var path = require('path');
var url = require('url');
var uploadsPath = path.resolve("./public/articleuploads/images") + '/';//存储文章图片的路径


var loghelper=require('../mdb/common/loghelper');
//创建问题通道
var QaChannelBO= require('../mdb/bll/qachannelbo');
var bo=new QaChannelBO();

//公共信息
var common=require('../mdb/common/common');
//工具类
var utiltools=require('../mdb/common/utiltools');

//后台admin管理页
router.get('/', function(req, res, next) {
    res.render('admin', { title: '管理中心-勺光,有光就有希望'});
});

//后台上传图片
router.post("/imgupload",function(req,res,next){
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        var filesize = 0;
        var ext = path.extname(filename);

        var newFilename = (new Date() - 0) + ext;
        fstream = fs.createWriteStream(uploadsPath + newFilename);

        file.on('data', function (data) {

            filesize = data.length;
        });

        fstream.on('close', function () {

            res.send(JSON.stringify({
                "originalName": filename,
                "name": newFilename,
                "url": '/articleuploads/images/' + newFilename,
                "type": ext,
                "size": filesize,
                "state": "SUCCESS"
            }));
        });

        file.pipe(fstream);

    });
});

module.exports=router;