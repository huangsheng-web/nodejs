var http = require('http')
var fs = require('fs')
var querystring = require('querystring')
var url = require('url')
var user = {}//act 判断登录还是注册,user /pass

var server = http.createServer(function(req,res){
  const GET = url.parse(req.url,true);
  var query = GET.query;
  var pathname = GET.pathname;
  var str = '';
  if(pathname == '/user'){

    req.on('data',function(chunk){
      console.log(11)
      str += chunk;
    });

    req.on('end',function(){
      var POST = querystring.parse(str)
      switch (POST.act) {
        case 'reg':
          if(user[POST.user]==null){
            user[POST.user] = POST.pass;
            res.write('{"ok":true,"msg":"注册成功"}')
          }else{
            res.write('{"ok":false,"msg":"该用户名已经被注册"}')
          }
          break;
        case 'login':
          if(user[POST.user]==null){
            res.write('{"ok":false,"msg":"用户名不存在"}')
          }else if(user[POST.user]!=POST.pass){
            res.write('{"ok":false,"msg":"用户名或密码不对"}')
          }else{
            res.write('{"ok":true,"msg":"登录成功"}')
          }
          break;
        default:
        res.write('小主不知道您想干嘛')
      }
      res.end()
    })
  }else{
    const file_name = './www'+req.url;
    fs.readFile(file_name,'utf-8',function(err,data){
      if(err){
        res.write('404')
      }else {
        res.write(data)
      }
      res.end()
    })

  }

}).listen(1111,function(){
  console.log('listen to 1111 port')
})
