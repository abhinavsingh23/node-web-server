const express = require('express');
const hbs =require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs')
// app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to append to server.js');
        }
    });
    next();
});

/********* Maintenance Mode***********************************/

// app.use((req,res,next)=>{

//     res.render('maintenance.hbs');

// });
/*************************************************************/


app.use(express.static(__dirname + '/public'));




hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

app.get('/',(req,res)=>{

    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name:'Abhinav',
    //     likes: [
    //         'Biking',
    //         'Travel',
    //     ]
    // })

    res.render('home.hbs',{
            welcomeMessage: 'Welcome!!!',
            pageTitle: 'Home',
            // currentYear: new Date().getFullYear()
    });




});

app.get('/about', (req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        // currentYear : new  Date().getFullYear()
    });
});

app.listen(port, () =>{
    console.log(`Server is up on Port ${port}`);
});
