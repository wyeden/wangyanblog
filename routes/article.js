var express = require('express');
//路由工厂生成一个路由实例
var router = express.Router();
var async = require('async');


//文章列表请求
router.get('/list', function(req, res) {
    var keyword = req.query.keyword;
    var pageNum = req.query.pageNum?Number(req.query.pageNum):1; //默认显示第一页
    var pageSize = req.query.pageSize?Number(req.query.pageSize):2; //默认每页2条

    var query = {};
    if(keyword){
        query.title = new RegExp(keyword);
    }
    //populate 负责把一个对象id类型转为json对象
    Model('Article').find(query).count(function(err,count) {
        Model('Article').find(query).skip((pageNum - 1) * pageSize).limit(pageSize).populate('user').exec(function (err, docs) {
            console.log('list' + docs);
            res.render('article/list', {
                title: '文章列表',
                articles: docs,
                keyword: keyword,
                pageNum: pageNum,
                pageSize: pageSize,
                totalPage: Math.ceil(count / pageSize)
            });
        });
    });
});

//添加文章
router.get('/add',function(req,res){
    res.render('article/add',{title:'发表文章',article:{}});
});
router.post('/add',function(req,res){
    //res.render('article/add',{title:'发表文章'});
    var article = req.body;  //请求体转成对象
    var _id = article._id;
    if(_id){//更新
        Model('Article').update({_id:_id},{
            $set:{
                title:article.title,
                content:article.content
            }
        },function(err,doc){
            if(err){
                req.flash('error','更新失败！');
                return res.redirect('back');
            }else{
                req.flash('success','更新成功');
                return res.redirect('/article/detail/'+_id);
            }
        });
    }else{ //保存新文章
        article.user = req.session.user._id;
        delete article._id;

        console.log(article);
        Model('Article').create(article,function(err,doc){ //article对象
            if(err){
                req.flash('error','发表文章失败！');
                return res.redirect('back');
            }else{
                req.flash('success','发表文章成功');
                return res.redirect('/');
            }
        });
    }

});

//查看文章详情
router.get('/detail/:_id',function(req,res){
    var _id = req.params._id;

    async.parallel([
        function(cb){
            //inc 把原来的值增加1
            Model('Article').update({_id:_id},{$inc:{pv:1}},function(err,result){
                cb();
            })
        },
        function(cb){
            //按照ID查询文章的对象
            Model('Article').findById(_id,function(err,doc){
                cb(err,doc);
            })
        }
    ],function(err,result){
        if(err){
            req.flash('error','查看详情失败');
            res.redirect('back');
        }else{
            req.flash('success','查看详情成功');
            //渲染详情页的模板
            res.render('article/detail',{title:'文章详情',article:result[1]});
        }
    });

    /*Model('Article').findById(_id,function(err,doc){
        if(err){
            req.flash('error','查看详情失败！');
            return res.redirect('back');
        }else {
            req.flash('success','查看详情成功！');
            res.render('article/detail', {title: '文章详情', article : doc});
        }
    });*/
});

//删除文章
router.get('/delete/:_id',function(req,res){
    var _id = req.params._id;
    Model('Article').remove({_id:_id},function(err,result){
        if(err){
            req.flash('error','删除失败！');
            return res.redirect('back');
        }else {
            req.flash('success','删除成功！');
            return res.redirect('/');
        }
    });
});

//修改文章
router.get('/update/:_id',function(req,res){
    var _id = req.params._id;
    Model('Article').findById(_id,function(err,doc){
        if(err){
            req.flash('error','更新失败！');
            return res.redirect('back');
        }else {
            req.flash('success','更新成功！');
            res.render('article/add',{
                title:'更新文章',
                article:doc
            });
        }
    });
});


module.exports = router;


