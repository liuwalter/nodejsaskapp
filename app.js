var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util = require('util');



var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);

//文件相关
var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var uuid = require('node-uuid');

var loghelper=require('./mdb/common/loghelper');
var common=require('./mdb/common/common');
var filter=require('./mdb/bll/filter');
var config=require('./config');

// 创建一个日志文件目录
var logDirectory = __dirname + '/log';

// 确保目志目录存在
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// 创建一个文件流
var accessLogStream = FileStreamRotator.getStream({
  filename: logDirectory + '/access.log',
  frequency: '12h',
  verbose: false,
  date_format: "YYYY-MM-DD"
});
//自定义方问者ID
logger.token('id', function getId(req) {
  return req.id;
});

//加载controller
var routes = require('./routes/index');
var users = require('./routes/users');
var ue = require('./routes/ue');
var qa = require('./routes/qa');

//后台管理
var admin = require('./routes/admin');
//分类管理
var channel = require('./routes/channel');
//问题列表
var questionlist = require('./routes/questionlist');
//文章列表
var article = require('./routes/article');
//标签列表
var tags = require('./routes/tags');
var wxpay = require('./routes/wxpay');



var busboy = require('connect-busboy');

//创建应用
var app = express();

var participants = [];
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(5555);

app.use(busboy());

//拦截所有请求，设计访问者id
app.use(function(req, res, next) {
  req.id =uuid.v4();
  next();
});





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
///app.use(logger('dev'));
app.use(logger(':remote-addr - :remote-user [:date[iso]]  [:id] :method :url :response-time', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//session配置
app.use(session({
  secret:config.cookieSecret,
  store: new MongoStore({host:config.host, port:config.port, db:config.db})
}));




//做请求拦截,防止访问需要登录的页面
app.use(filter);




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development')
{
  app.use(function(err, req, res, next) {
    //loghelper.error(util.inspect(req));
    loghelper.error(err.status+"     "+req.url);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});






app.use(function(err, req, res, next) {
  res.status(err.status== 403);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.use('/', routes);
app.use('/users', users);
app.use('/admin', admin);
app.use('/ue', ue);
app.use('/qa', qa);


//后台
app.use('/admin/channel', channel);
app.use('/admin/questionlist', questionlist);
app.use('/admin/article', article);
app.use('/admin/tags', tags);
app.use('/wxpay', wxpay);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  console.log(req.originalUrl);
  console.log(req.query);
  err.status = 404;
  next(err);
});

//socket io
var _socket=null;
/* Socket.IO events */
io.on('connection', function (socket) {

  //participants[data.username]=socket;
  //socket.emit('this', { will: 'be received by everyone'});

  //socket.emit('new', { hello: 'hello walter!' });
  _socket=socket;
  socket.on('photo', function (data) {
       socket.emit('photo', data);
  });

  socket.on('adduser', function (data) {
    //添加一个用户
    participants[data.username]=socket;
  });
});

module.exports = app;
