/**
 * Created by 58 on 2016/7/10.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//引入数据库设置
var settings = require('../settings');
//引入Schema定义
var models = require('./models');

//连接数据库
mongoose.connect(settings.url);

//定义用户模型 文章模型
mongoose.model('User',new Schema(models.User));
mongoose.model('Article',new Schema(models.Article));

//全局对象定义一个方法，用于获取模型
global.Model = function(type){
    return mongoose.model(type);
};
