const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
var fs = require('fs')
var server = express()
server.listen(8080)
var objMulter = multer({dest:'./www/upload/'});//文件存的位置

server.use( bodyParser.urlencoded({extended:false}))//使用bodyParser解析
server.use(objMulter.any())//any代表所有文件
server.post('/',function(req,res){
    var newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
    console.log(newName)
    fs.rename(req.files[0].path,newName,function(err){
      if(err){
        res.send('失败')
      }else{
        res.send('成功')
      }
    })
})
