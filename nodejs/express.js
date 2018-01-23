var express = require('express');
var static = require('express-static');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var consolidate = require('consolidate');
var multer = require('multer');
var server = express();

server.listen(8080);

server.use(cookieParser('fhjalfls'));
server.use(cookieSession({
  name:'hsdying',
  keys:['aaa','bbb','ccc'],
  maxAge:20*3600*1000
}))

server.use(bodyParser.urlencoded({extended:false}))
server.use(multer({dest:'./www/upload'}).any());


//配置模版引擎
//1输出什么东西
  server.set('view engine','html');
//模版文件放在哪
  server.set('views','./views');
  //哪种模版引擎
  server.engine('html',consolidate.ejs);

  //接受用户请求
  server.get('/',function(req,res){

        res.render('1.ejs',{name:'ds'})

  })

server.use(static('./www'));
