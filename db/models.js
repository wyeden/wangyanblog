/**
 * Created by 58 on 2016/7/10.
 */

    //编写schema  数据库的集合骨架

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;  //对象id类型

//导出
module.exports = {
    User:{     //设置User的数据模型
        username:{type:String,required:true},   //用户名
        password:{type:String,required:true},   //密码
        email:{type:String,required:true},   //邮箱
        avatar:{type:String,required:true}   //头像
    },
    Article: {  //设置文章的数据模型
        user:{type:ObjectId,ref:'User'},    //用户  type类型ObjectId类型 ref
        title: String,   //标题
        content: String,    //内容
        createAt:{type: Date, default: Date.now()},  //创建时间
        pv:{type:Number,default:0}
    }
};