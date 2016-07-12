/**
 * Created by 58 on 2016/7/9.
 */
module.exports = function(name){  //name  :server
    return function (msg) {
        var DEBUG = process.env.DEBUG;  //读取环境变量ＤＥＢＵＧ的值
        console.log(DEBUG);
        if(DEBUG == name){
            console.log(name,'',msg,' +0ms');
        }

    }
};