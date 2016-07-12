var express = require('express');
var router = express.Router();

//注册 当用户访问此路径的时候返回一个空白表单
router.get('/reg', function(req, res, next) {
  //第一个是相对路径，相对于views也就是模板的根目录
  res.render('user/reg',{title:'注册'});
});

//接收注册请求
router.post('/reg', function(req, res) {
  //接收请求体，然后保存到数据库中
  //客户端填写注册表单后，点击提交按钮会把请求的表单内容序列化成查询字符串格式，放在请求体中传到后台，bodyparser中间件
  var user = req.body;
  console.log('user:---'+user);
  if(user.password != user.repassword){
      //console.log('密码和重复密码不一致！');
      req.flash('error','密码和重复密码不一致！');
      return res.redirect('back');
  }

  //删除不要的字段
  delete user.repassword;
  user.password = md5(user.password); //密码加密
  user.avatar = "https://secure.gravatar.com/avatar/" +md5(user.email)+"?s=48";

  //保存一个文档
  Model('User').create(user,function(err,doc){
    if(err){
      req.flash('error','注册失败！');
      return res.redirect('back');
    }else{
      //两个参数表示设置消息，一个表示获取消息，flash可以写多次，不会覆盖，是个数组
      //req.flash('success').toString();
      req.flash('error','注册成功！');
      req.session.user = doc;
      res.redirect('/');  //跳到首页
    }
  });

});

function md5(str){
  return require('crypto').createHash('md5').update(str).digest('hex');
}

//登陆 当用户访问此路径的时候返回一个空白表单
router.get('/login', function(req, res, next) {
  //第一个是相对路径，相对于views也就是模板的根目录
  res.render('user/login',{title:'登陆'});
});
router.post('/login', function(req, res) {
  //第一个是相对路径，相对于views也就是模板的根目录
  var user = req.body;
  user.password = md5(user.password);
  Model('User').findOne(user,function(err,doc){
    if(err){
      req.flash('error','登录失败！');
      res.redirect('back');
    }else{
      if(doc){
        req.flash('success','登录成功');
        req.session.user = doc;
        res.redirect('/');
      }else{
        req.flash('error','登录失败');//如果失败的话重定向上个登录页
        res.redirect('back');
      }
    }
  });
});




//退出 当用户访问此路径的时候返回一个空白表单
router.get('/logout', function(req, res, next) {
  //res.send('退出');
  req.session.user = null;
  res.redirect('/user/login');
});




module.exports = router;
