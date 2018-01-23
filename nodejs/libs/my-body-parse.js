var  querystring = require('querystring')

module.exports=function(req,res,next){
  var str = '';
  req.on('data',function(chunk){
    str+= chunk;
  })
  req.on('end',function(){
    req.body = querystring.parse(str);
    next()
  })
}
