var express = require('express');
//生成一个路由实例 路由也是一个实例容器
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/article/list');
});
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,
    success:req.flash('success').toString(),
    error:req.flash('error').toString()
  });
});*/

//flash一闪而过  取值之后会把值删掉


module.exports = router;
