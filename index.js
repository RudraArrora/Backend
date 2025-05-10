const express = require ('express');
const app =express();
const port = 8000;
// use express router
const db = require("./config/moongose");
//////////////////////////
const session = require('express-session');
const passport = require("passport");
const passportLocal = require("./config/passport");
/////////////////////


app.use(express.urlencoded());;



app.set('view engine','ejs');
app.set('views','./views')

app.use(session({
    name:'codiel',
    secret: 'blahsomething',
    saveUnitialized:false,
    resave : false,
    cookie:{
        maxAge : (1000*60*100)
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/", require("./routes"));
app.listen(port,function(err){
    if (err){
        console.log ('Error:',err);
    }
    else{
        console.log ("Running on server port : ",port);
    }
})
