/**
 * Created by 58 on 2016/7/9.
 */

var debug = require('debug');

var server = debug('server');
//console.log(typeof server);  //function
server('server log');

//只有环境变量的debug的值和日志记录的名称匹配的时候才会真正的向控制台输出

//调整环境变量
var client = debug('client');
client('client log');