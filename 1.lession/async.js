/**
 * Created by 58 on 2016/7/10.
 */
var async = require('async');
async.parallel([
    function(cb){
        setTimeout(function(){
            cb(null,'1');
        },1000);
    },
    function(cb){
        setTimeout(function(){
            cb(null,'2');
        },1000);
    }
],function(err,result){
    console.log(result);
});