const mySql = require('mysql');
var con=mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'photo_hub'
})
con.connect(function(err,){
    if(err) err;
    console.log('database connected')
})