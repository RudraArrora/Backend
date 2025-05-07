const express = require ('express');
const app =express();
const port = 8000;
// use express router
const db = require("./config/moongose");
app.use(express.urlencoded());
app.use('/',require('./routes'));


app.set('view engine','ejs');
app.set('views','./views')



app.listen(port,function(err){
    if (err){
        console.log ('Error:',err);
    }
    else{
        console.log ("Running on server port : ",port);
    }
})